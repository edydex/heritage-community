import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { parseServerArgs, runServer, serverPins, shellQuote } from '../lib/server.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const manifest = JSON.parse(await readFile(new URL('../components.lock.json', import.meta.url), 'utf8'));

test('requires an explicit destination and rejects SSH options, traversal, system roots and ambiguous flags', () => {
  for (const args of [
    ['setup'], ['status', '--host', '-oProxyCommand=bad'], ['status', '--host', 'host;touch-bad'],
    ['status', '--host', 'user@host@other'], ['update', '--host', 'church', '--deployment-root', '/opt/../etc'],
    ['update', '--host', 'church', '--deployment-root', '/etc'],
    ['status', '--host', 'church', '--host', 'other'], ['status', '--host', 'church', '--skip-backup'],
    ['setup', '--host', 'church', '--non-interactive'], ['restore', '--host', 'church'],
    ['backup', '--host', 'church', '--backup', '/opt/backup'],
  ]) assert.throws(() => parseServerArgs(args));
  assert.deepEqual(parseServerArgs(['update', '--host', 'root@church.example']), {
    operation: 'update', host: 'root@church.example', root: '/opt/heritage-community', yes: false, nonInteractive: false, dryRun: false,
  });
});

test('requires all three official pinned components without substituting moving branch heads', () => {
  assert.equal(serverPins(manifest).heritage.length, 40);
  for (const components of [manifest.components.slice(1), [...manifest.components, manifest.components[0]],
    manifest.components.map(component => ({ ...component, revision: 'main' })),
    manifest.components.map(component => ({ ...component, repository: 'https://github.com/other/repo.git' })),
  ]) assert.throws(() => serverPins({ ...manifest, components }));
  assert.equal(shellQuote("a'$(b)"), "'a'\\''$(b)'");
});

function transport({ stage = '/var/tmp/heritage-unified.abcdefgh', failRun = false } = {}) {
  const calls = [];
  return { calls, run: async (command, args, settings = {}) => {
    calls.push({ command, args, settings });
    if (calls.length === 1) return 'Host: fixture\nUID: 0\nOS: debian 13';
    if (calls.length === 2) return stage;
    if (failRun && calls.length === 3) throw new Error('Fixture setup failed');
    return '';
  } };
}

test('uploads only the selected bundle, runs an exact remote command and cleans its private staging folder', async () => {
  const { run, calls } = transport();
  await runServer(root, manifest, parseServerArgs(['update', '--host', 'church']), run);
  assert.equal(calls.length, 4);
  for (const call of calls) {
    assert.equal(call.command, 'ssh');
    assert.ok(call.args.includes('BatchMode=yes'));
    assert.ok(call.args.includes('StrictHostKeyChecking=yes'));
  }
  assert.match(calls[0].args.at(-1), /hostname/);
  assert.equal(calls[1].args.at(-1), 'bash -s');
  const upload = calls[1].settings.input;
  assert.ok(upload.includes('umask 077'));
  const encodedFiles = [...upload.matchAll(/printf '%s' '([^']+)' \| base64 -d > "\$stage\/([^"\n]+)"/g)];
  assert.deepEqual(encodedFiles.map(match => match[2]), ['runner.sh', 'components.lock.json', 'pins.env']);
  const decoded = Object.fromEntries(encodedFiles.map(match => [match[2], Buffer.from(match[1], 'base64').toString()]));
  assert.deepEqual(JSON.parse(decoded['components.lock.json']), manifest);
  assert.match(decoded['pins.env'], /^UNIFIED_HERITAGE_REVISION=[a-f0-9]{40}\n/);
  assert.match(decoded['pins.env'], /UNIFIED_SET_DIGEST=[a-f0-9]{64}\n$/);
  assert.equal(calls[2].args.at(-1), "'bash' '/var/tmp/heritage-unified.abcdefgh/runner.sh' 'update' '--deployment-root' '/opt/heritage-community'");
  assert.equal(calls[3].args.at(-1), "rm -rf -- '/var/tmp/heritage-unified.abcdefgh'");
});

test('a failed setup cleans only its own upload and does not retry the mutation', async () => {
  const { run, calls } = transport({ failRun: true });
  await assert.rejects(runServer(root, manifest, parseServerArgs(['setup', '--host', 'church', '--non-interactive', '--yes']), run), /Fixture setup failed/);
  assert.equal(calls.length, 4);
  assert.match(calls[3].args.at(-1), /^rm -rf -- '\/var\/tmp\/heritage-unified\./);
});

test('untrusted staging output cannot become a command or deletion path', async () => {
  const { run, calls } = transport({ stage: '/var/tmp/heritage-unified.abcdefgh;echo bad' });
  await assert.rejects(runServer(root, manifest, parseServerArgs(['status', '--host', 'church']), run), /Unexpected server staging path/);
  assert.equal(calls.length, 2);
});

test('a local plan prints the selected version set without contacting any server', async () => {
  let calls = 0;
  await runServer(root, manifest, parseServerArgs(['plan']), async () => { calls++; });
  assert.equal(calls, 0);
});
