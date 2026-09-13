import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { access, chmod, copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// This suite is for a disposable Debian container, not an installed church server.
assert.equal(process.env.HERITAGE_ISOLATED_RUNNER_TEST, '1', 'Run only in the documented disposable container.');
assert.equal(process.platform, 'linux');
await assert.rejects(access('/etc/default/heritage-community'), 'Do not run against an existing installation.');
const workspace = fileURLToPath(new URL('..', import.meta.url));
const deploy = process.env.HERITAGE_FIXTURE_DEPLOY;
assert.ok(deploy, 'Provide the two real component lifecycle libraries for the fixture.');
const runner = await readFile(join(workspace, 'server/runner.sh'), 'utf8');
const realGit = execFileSync('which', ['git'], { encoding: 'utf8' }).trim();
const repoUrls = { heritage: 'https://github.com/edydex/heritage_study_bible.git', multilinguum: 'https://github.com/edydex/multilinguum.git', syncshow: 'https://github.com/edydex/SyncShow.git' };

async function put(path, text) { await mkdir(join(path, '..'), { recursive: true }); await writeFile(path, text); }
function git(path, ...args) { return execFileSync(realGit, ['-C', path, ...args], { encoding: 'utf8' }).trim(); }
function commit(path, message) { git(path, 'add', '.'); git(path, '-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-qm', message); return git(path, 'rev-parse', 'HEAD'); }

async function fixture(t) {
  const root = await mkdtemp('/tmp/heritage-runner-');
  t.after(() => rm(root, { recursive: true, force: true }));
  const community = join(root, 'community-remote');
  const translation = join(root, 'translation-remote');
  await mkdir(community); await mkdir(translation);
  git(community, 'init', '-q'); git(translation, 'init', '-q');
  await put(join(community, 'community-server/.gitignore'), '.env.production\n');
  await put(join(community, 'community-server/docker-compose.production.yml'), 'services: {}\n');
  await mkdir(join(community, 'community-server/deploy/lib'), { recursive: true });
  for (const name of ['common.sh', 'translation.sh']) await copyFile(join(deploy, 'lib', name), join(community, 'community-server/deploy/lib', name));
  await put(join(community, 'community-server/deploy/install.sh'), `#!/usr/bin/env bash
set -Eeuo pipefail
printf 'install\\n' >>"$FIXTURE_LOG"
[[ "\${FIXTURE_FAIL:-}" != install ]] || exit 19
mkdir -p "$FIXTURE_INSTALL/config" "$FIXTURE_INSTALL/state" "$FIXTURE_INSTALL/backups"
printf 'COMMUNITY_NAME=Fixture church\\nPRIVATE_SENTINEL=keep-this-exactly\\n' >"$HERITAGE_ENV_FILE"
printf 'private-recording-and-account-data' >"$FIXTURE_INSTALL/state/data"
ln -s "$HERITAGE_ENV_FILE" "$HERITAGE_INSTALL_DIR/.env.production"
`);
  await put(join(community, 'community-server/deploy/heritage-community'), `#!/usr/bin/env bash
set -Eeuo pipefail
HERE="$(cd -- "$(dirname -- "\${BASH_SOURCE[0]}")" && pwd -P)"
source "$HERE/lib/common.sh"
heritage_init_context
operation=$1; shift
printf '%s %s\\n' "$operation" "$*" >>"$FIXTURE_LOG"
case "$operation" in
  backup)
    heritage_acquire_operations_lock
    [[ "\${FIXTURE_FAIL:-}" != busy ]] || exit 23
    mkdir -p "$HERITAGE_BACKUP_DIR"
    cp "$FIXTURE_INSTALL/state/data" "$HERITAGE_BACKUP_DIR/preserved-data"
    ;;
  translation)
    [[ "\${FIXTURE_FAIL:-}" != translation ]] || exit 29
    revision=''; source_path=''
    while (($#)); do
      case "$1" in --revision) revision=$2; shift 2;; --source) source_path=$2; shift 2;; *) shift;; esac
    done
    heritage_validate_translation_source "$source_path" "$revision"
    heritage_set_config_value HERITAGE_TRANSLATION_ENABLED true
    heritage_set_config_value HERITAGE_TRANSLATION_REVISION "$revision"
    heritage_set_config_value HERITAGE_TRANSLATION_SOURCE "$source_path"
    ;;
  status) [[ "\${FIXTURE_FAIL:-}" != status ]] || exit 31;;
  restore) exit 0;;
  *) exit 37;;
esac
`);
  await put(join(translation, 'services/processor/Dockerfile'), 'FROM scratch\n');
  await put(join(translation, 'services/processor/heritage-companion.version'), '1\n');
  await put(join(translation, 'apps/operator/src/heritage.tsx'), 'export {};\n');
  const first = { heritage: commit(community, 'first'), multilinguum: commit(translation, 'first'), syncshow: '1'.repeat(40) };
  await put(join(community, 'README.md'), 'next community\n');
  await put(join(translation, 'README.md'), 'next translation\n');
  const next = { ...first, heritage: commit(community, 'next'), multilinguum: commit(translation, 'next') };
  const bin = join(root, 'bin'); await mkdir(bin);
  await put(join(bin, 'git'), `#!${process.execPath}
const {spawnSync}=require('node:child_process');
require('node:fs').appendFileSync(process.env.FIXTURE_GIT_LOG,JSON.stringify(process.argv.slice(2))+'\\n');
const args=process.argv.slice(2), i=args.indexOf('fetch'), originIndex=args.indexOf('origin',i+1);
if(i>=0 && originIndex>i) {
 const at=args.indexOf('-C');
 const origin=spawnSync(${JSON.stringify(realGit)},['-C',args[at+1],'remote','get-url','origin'],{encoding:'utf8'}).stdout.trim();
 args[originIndex]=origin.endsWith('/multilinguum.git')?process.env.FIXTURE_TRANSLATION:process.env.FIXTURE_COMMUNITY;
}
const result=spawnSync(${JSON.stringify(realGit)},args,{stdio:'inherit'});process.exit(result.status ?? 1);
`);
  await chmod(join(bin, 'git'), 0o755);
  const install = join(root, 'installation');
  const log = join(root, 'operations.log'); await writeFile(log, '');
  const gitLog = join(root, 'git.log'); await writeFile(gitLog, '');
  const env = { ...process.env, PATH: `${bin}:${process.env.PATH}`, FIXTURE_INSTALL: install, FIXTURE_LOG: log, FIXTURE_GIT_LOG: gitLog, FIXTURE_COMMUNITY: community, FIXTURE_TRANSLATION: translation, GIT_TERMINAL_PROMPT: '0', GIT_ALLOW_PROTOCOL: 'file' };
  assert.equal(execFileSync('bash', ['-c', 'command -v git'], { env, encoding: 'utf8' }).trim(), join(bin, 'git'), 'The disposable /tmp mount must allow execution of the fixture Git wrapper.');
  async function bundle(pins) {
    const manifest = { schemaVersion: 1, channel: 'fixture', components: Object.entries(pins).map(([id, revision]) => ({ id, repository: repoUrls[id], revision })) };
    const json = JSON.stringify(manifest, null, 2) + '\n';
    const digest = createHash('sha256').update(runner).update(json).digest('hex');
    const path = join(root, `bundle-${digest}`); await mkdir(path, { recursive: true });
    await writeFile(join(path, 'runner.sh'), runner);
    await writeFile(join(path, 'components.lock.json'), json);
    await writeFile(join(path, 'pins.env'), Object.entries(pins).map(([id, rev]) => `UNIFIED_${id.toUpperCase()}_REVISION=${rev}`).join('\n') + `\nUNIFIED_SET_DIGEST=${digest}\n`);
    return { path, digest };
  }
  const firstBundle = await bundle(first), nextBundle = await bundle(next);
  function run(set, operation, overrides = {}) {
    const result = spawnSync('bash', [join(set.path, 'runner.sh'), operation, '--deployment-root', install, '--non-interactive', '--yes'], { env: { ...env, ...overrides }, encoding: 'utf8' });
    if (result.status !== 0) result.stderr += `\nFixture Git calls:\n${readFileSync(gitLog, 'utf8')}`;
    return result;
  }
  const receipt = async () => JSON.parse(await readFile(join(install, 'state/unified-installation.json'), 'utf8'));
  const history = () => readFile(log, 'utf8');
  return { root, install, first, next, firstBundle, nextBundle, run, receipt, history, log };
}

function passed(result) { assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`); }

test('first setup and exact forward update preserve data/configuration and retain prior version records', async t => {
  const f = await fixture(t);
  passed(f.run(f.firstBundle, 'setup'));
  assert.equal((await f.receipt()).setDigest, f.firstBundle.digest);
  assert.equal(git(join(f.install, 'app'), 'rev-parse', 'HEAD'), f.first.heritage);
  passed(f.run(f.nextBundle, 'update'));
  assert.equal(git(join(f.install, 'app'), 'rev-parse', 'HEAD'), f.next.heritage);
  assert.equal((await f.receipt()).setDigest, f.nextBundle.digest);
  await access(join(f.install, 'unified/sets', f.firstBundle.digest, 'components.lock.json'));
  await access(join(f.install, 'components', `multilinguum-${f.first.multilinguum}`));
  assert.equal(await readFile(join(f.install, 'state/data'), 'utf8'), 'private-recording-and-account-data');
  assert.match(await readFile(join(f.install, 'config/community.env'), 'utf8'), /PRIVATE_SENTINEL=keep-this-exactly/);
  const history = await f.history();
  assert.equal((history.match(/^install$/gm) ?? []).length, 1, 'An update must not rerun church/tunnel setup');
  assert.match(history, /backup --quiesce --label pre-unified-update\ntranslation configure/);
  assert.match(history, /--non-interactive --yes/);
});

test('a clone left by interrupted first setup can resume without lost data or a false success receipt', async t => {
  const f = await fixture(t);
  assert.notEqual(f.run(f.firstBundle, 'setup', { FIXTURE_FAIL: 'install' }).status, 0);
  await assert.rejects(f.receipt());
  passed(f.run(f.firstBundle, 'setup'));
  assert.equal((await f.receipt()).setDigest, f.firstBundle.digest);
});

test('uncommitted work, wrong remotes and non-forward versions refuse before a backup or source change', async t => {
  const f = await fixture(t);
  passed(f.run(f.nextBundle, 'setup'));
  const before = await f.history();
  const app = join(f.install, 'app');
  await writeFile(join(app, 'private-work.txt'), 'preserve this');
  assert.notEqual(f.run(f.firstBundle, 'update').status, 0);
  assert.equal(await readFile(join(app, 'private-work.txt'), 'utf8'), 'preserve this');
  await rm(join(app, 'private-work.txt'));
  assert.notEqual(f.run(f.firstBundle, 'update').status, 0);
  git(app, 'remote', 'set-url', 'origin', 'https://github.com/other/repository.git');
  assert.notEqual(f.run(f.nextBundle, 'update').status, 0);
  assert.equal(await f.history(), before);
  assert.equal(git(app, 'rev-parse', 'HEAD'), f.next.heritage);
});

test('a busy service blocks before source advancement; a failed translation update never advances the receipt', async t => {
  const f = await fixture(t);
  passed(f.run(f.firstBundle, 'setup'));
  assert.notEqual(f.run(f.nextBundle, 'update', { FIXTURE_FAIL: 'busy' }).status, 0);
  assert.equal(git(join(f.install, 'app'), 'rev-parse', 'HEAD'), f.first.heritage);
  assert.equal((await f.receipt()).setDigest, f.firstBundle.digest);
  assert.notEqual(f.run(f.nextBundle, 'update', { FIXTURE_FAIL: 'translation' }).status, 0);
  assert.equal((await f.receipt()).setDigest, f.firstBundle.digest);
  assert.equal(await readFile(join(f.install, 'backups/preserved-data'), 'utf8'), 'private-recording-and-account-data');
  passed(f.run(f.nextBundle, 'update'));
  assert.equal((await f.receipt()).setDigest, f.nextBundle.digest);
});
