import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const repositories = {
  heritage: 'https://github.com/edydex/heritage_study_bible.git',
  multilinguum: 'https://github.com/edydex/multilinguum.git',
  syncshow: 'https://github.com/edydex/SyncShow.git',
};
const operations = ['plan', 'setup', 'update', 'status', 'backup', 'restore'];

export function parseServerArgs(args) {
  const operation = args.shift() ?? 'help';
  if (['help', '-h', '--help'].includes(operation)) return { operation: 'help' };
  if (!operations.includes(operation)) throw new Error(`Unknown server command: ${operation}`);
  const options = { operation, root: '/opt/heritage-community', yes: false, nonInteractive: false, dryRun: false };
  const seen = new Set();
  while (args.length) {
    const option = args.shift();
    if (seen.has(option)) throw new Error(`Duplicate ${option}.`);
    seen.add(option);
    if (['--host', '--deployment-root', '--backup'].includes(option)) {
      const value = args.shift();
      if (!value || value.startsWith('--')) throw new Error(`${option} requires a value.`);
      const key = { '--host': 'host', '--deployment-root': 'root', '--backup': 'backup' }[option];
      if (key !== 'root' && options[key]) throw new Error(`Duplicate ${option}.`);
      options[key] = value;
    } else if (option === '--yes') options.yes = true;
    else if (option === '--non-interactive') options.nonInteractive = true;
    else if (option === '--dry-run') options.dryRun = true;
    else throw new Error(`Unknown server option: ${option}`);
  }
  if (options.host && (!/^[A-Za-z0-9][A-Za-z0-9_.-]*(?:@[A-Za-z0-9][A-Za-z0-9_.-]*)?$/.test(options.host) || options.host.length > 200))
    throw new Error('Use a trusted SSH host alias or user@hostname; SSH options and URLs are not host names.');
  for (const [name, path] of [['Deployment root', options.root], ['Backup', options.backup]]) {
    if (path === undefined) continue;
    if (!/^\/[A-Za-z0-9._/-]+$/.test(path) || path.includes('//') || path.split('/').some(part => part === '.' || part === '..'))
      throw new Error(`${name} must be an absolute path with letters, numbers, dots, dashes, underscores and slashes, without traversal.`);
  }
  if (['/bin', '/sbin', '/usr', '/etc', '/var', '/opt', '/srv', '/home', '/root', '/tmp', '/var/tmp', '/var/lib'].includes(options.root.replace(/\/$/, '')))
    throw new Error('Choose a dedicated installation directory, not a system directory.');
  if (options.operation === 'restore' && !options.backup) throw new Error('Restore requires --backup /absolute/backup-directory.');
  if (options.backup && options.operation !== 'restore') throw new Error('--backup is only valid with restore.');
  if (!options.host && options.operation !== 'plan') throw new Error('Select the server explicitly with --host SSH_ALIAS.');
  if (options.nonInteractive && !options.yes && !options.dryRun && ['setup', 'restore'].includes(operation))
    throw new Error('Unattended setup or restore requires --yes after reviewing server plan.');
  return options;
}

export function serverPins(manifest) {
  const pins = {};
  for (const [id, repository] of Object.entries(repositories)) {
    const entries = manifest.components.filter(component => component.id === id);
    if (entries.length !== 1 || entries[0].repository !== repository || !/^[a-f0-9]{40}$/.test(entries[0].revision))
      throw new Error(`Server setup requires one exact official ${id} revision.`);
    pins[id] = entries[0].revision;
  }
  return pins;
}

export function shellQuote(value) { return `'${String(value).replaceAll("'", "'\\''")}'`; }

export function processRun(command, args, { input, capture = false, interactive = false } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: [interactive ? 'inherit' : 'pipe', capture ? 'pipe' : 'inherit', 'inherit'] });
    let output = '';
    child.stdout?.on('data', chunk => {
      output += chunk;
      if (output.length > 128_000) { child.kill(); reject(new Error('Server returned excessive control output.')); }
    });
    child.on('error', reject);
    child.on('close', (code, signal) => code === 0 ? resolve(output.trim()) : reject(new Error(`${command} ended with ${signal ?? `exit ${code}`}.${capture && output ? `\n${output.trim()}` : ' Review the preceding server output.'}`)));
    child.stdin?.on('error', () => {});
    if (!interactive) child.stdin.end(input ?? '');
  });
}

export function serverHelp() {
  return `Heritage unified server commands

  server plan                           Show the selected component set
  server plan --host SSH_ALIAS           Inspect the server and show intended phases
  server setup --host SSH_ALIAS          Guided first install, or update an existing server
  server update --host SSH_ALIAS         Apply this workspace's exact component set
  server status --host SSH_ALIAS         Verify installed versions and service health
  server backup --host SSH_ALIAS         Run the combined consistent backup
  server restore --host SSH_ALIAS --backup /absolute/backup-directory

Options: --deployment-root /opt/heritage-community, --dry-run, --yes, --non-interactive
SSH uses your existing configuration, BatchMode and strict host-key checking.
The selected SSH account must have root access. Interactive setup uses the server's
existing wizard. Secrets are entered there or kept in its private configuration;
this command does not copy local environment variables to the server.
Desktop applications are recorded in the version set; they are not installed on the server.
`;
}

export async function runServer(root, manifest, options, run = processRun) {
  if (options.operation === 'help') { process.stdout.write(serverHelp()); return; }
  const pins = serverPins(manifest);
  process.stdout.write(`Heritage Community ${manifest.channel} set\nCommunity: ${pins.heritage}\nTranslation: ${pins.multilinguum}\nSyncShow: ${pins.syncshow}\n`);
  if (!options.host) return;
  const sshOptions = ['-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes', '-o', 'ConnectTimeout=15', '-o', 'ServerAliveInterval=15', '-o', 'ServerAliveCountMax=4'];
  const ssh = (command, settings) => run('ssh', [...sshOptions, '-T', options.host, command], settings);
  // Inspect before uploading or changing the host. No host key is accepted automatically.
  const identity = await ssh('printf "Host: "; hostname; printf "UID: "; id -u; . /etc/os-release; printf "OS: %s %s\\n" "$ID" "$VERSION_ID"; test "$(id -u)" = 0; test "$ID" = debian; case "$VERSION_ID" in 12|13|12.*|13.*) ;; *) exit 1;; esac', { capture: true });
  process.stdout.write(`${identity}\nDeployment: ${options.root}\n`);
  const runner = await readFile(join(root, 'server/runner.sh'), 'utf8');
  const canonicalManifest = JSON.stringify(manifest, null, 2) + '\n';
  const digest = createHash('sha256').update(runner).update(canonicalManifest).digest('hex');
  const pinFile = Object.entries(pins).map(([id, revision]) => `UNIFIED_${id.toUpperCase()}_REVISION=${revision}`).join('\n') + `\nUNIFIED_SET_DIGEST=${digest}\n`;
  const upload = [
    'set -eu', 'umask 077', 'stage=$(mktemp -d /var/tmp/heritage-unified.XXXXXXXX)',
    ...Object.entries({ 'runner.sh': runner, 'components.lock.json': canonicalManifest, 'pins.env': pinFile }).map(([name, content]) =>
      `printf '%s' '${Buffer.from(content).toString('base64')}' | base64 -d > "$stage/${name}"`),
    'printf "%s\\n" "$stage"',
  ].join('\n');
  const stage = await ssh('bash -s', { input: upload, capture: true });
  if (!/^\/var\/tmp\/heritage-unified\.[A-Za-z0-9]{8}$/.test(stage)) throw new Error('Unexpected server staging path; no setup command was run.');
  const interactive = !options.nonInteractive && !options.dryRun && ['setup', 'restore'].includes(options.operation);
  if (interactive && !process.stdin.isTTY) {
    await ssh(`rm -rf -- ${shellQuote(stage)}`, {});
    throw new Error('Guided setup/restore needs a terminal. For an unattended existing server, use --non-interactive --yes.');
  }
  const args = [options.operation, '--deployment-root', options.root,
    ...(options.yes ? ['--yes'] : []), ...(options.nonInteractive ? ['--non-interactive'] : []),
    ...(options.dryRun ? ['--dry-run'] : []), ...(options.backup ? ['--backup', options.backup] : [])];
  try {
    await run('ssh', [...sshOptions, interactive ? '-t' : '-T', options.host,
      ['bash', `${stage}/runner.sh`, ...args].map(shellQuote).join(' ')], { interactive });
  } finally {
    await ssh(`rm -rf -- ${shellQuote(stage)}`, {}).catch(() => process.stderr.write(`Temporary setup files remain at ${stage}; installed data is separate.\n`));
  }
}
