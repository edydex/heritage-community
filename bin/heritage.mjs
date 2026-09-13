#!/usr/bin/env node
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, readFile, writeFile, mkdtemp, rename, rm, lstat, realpath } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const execute = promisify(execFile);
export const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export async function git(args, cwd) {
  const { stdout } = await execute('git', args, {
    cwd,
    maxBuffer: 4 * 1024 * 1024,
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
  });
  return stdout.trim();
}

export function validateManifest(value) {
  if (value?.schemaVersion !== 1 || !Array.isArray(value.components) || !value.components.length) {
    throw new Error('Unsupported or empty components.lock.json.');
  }
  const ids = new Set();
  for (const component of value.components) {
    if (!/^[a-z][a-z0-9-]*$/.test(component.id) || ids.has(component.id)) {
      throw new Error('Component IDs must be unique lowercase names.');
    }
    ids.add(component.id);
    if (!/^[a-f0-9]{40}$/.test(component.revision)) throw new Error('Pin a full Git commit SHA.');
    if (!/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\.git$/.test(component.repository)) {
      throw new Error('Components must use explicit GitHub HTTPS repository URLs.');
    }
  }
  return value;
}

export function sourcePath(root, component) {
  return join(root, '.heritage', 'sources', `${component.id}-${component.revision}`);
}

async function exists(path) {
  try { return await lstat(path); }
  catch (error) { if (error.code === 'ENOENT') return undefined; throw error; }
}

export async function inspectCheckout(path, component) {
  const stat = await exists(path);
  if (!stat) return { state: 'missing', path };
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error(`Unsafe checkout path: ${path}`);
  const top = await git(['rev-parse', '--show-toplevel'], path);
  if (await realpath(top) !== await realpath(path)) throw new Error(`Expected a separate Git checkout at ${path}`);
  const [head, origin, dirty] = await Promise.all([
    git(['rev-parse', 'HEAD'], path),
    git(['remote', 'get-url', 'origin'], path),
    git(['status', '--porcelain'], path),
  ]);
  if (origin !== component.repository) throw new Error(`Repository mismatch at ${path}; leaving it untouched.`);
  if (head !== component.revision) throw new Error(`Revision mismatch at ${path}; leaving it untouched.`);
  if (dirty) throw new Error(`Uncommitted work at ${path}; leaving it untouched.`);
  return { state: 'ready', path, revision: head };
}

export async function bootstrapComponent(root, component) {
  const destination = sourcePath(root, component);
  const existing = await inspectCheckout(destination, component);
  if (existing.state === 'ready') return existing;
  await mkdir(dirname(destination), { recursive: true });
  const staging = await mkdtemp(join(dirname(destination), `.install-${component.id}-`));
  try {
    await git(['init', '--quiet', staging], root);
    await git(['remote', 'add', 'origin', component.repository], staging);
    await git(['fetch', '--quiet', '--depth=1', 'origin', component.revision], staging);
    await git(['checkout', '--quiet', '--detach', component.revision], staging);
    const verified = await inspectCheckout(staging, component);
    await rename(staging, destination);
    return { ...verified, path: destination };
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
}

export async function bootstrap(root, manifest) {
  const folders = [{ name: 'Heritage Community · Integration', path: root }];
  for (const component of manifest.components) {
    const result = await bootstrapComponent(root, component);
    folders.push({ name: component.name, path: result.path });
    process.stdout.write(`${component.name}: ${result.revision.slice(0, 12)} ready\n`);
  }
  const path = join(root, '.heritage', 'heritage.code-workspace');
  await writeFile(path, JSON.stringify({ folders }, null, 2) + '\n');
  process.stdout.write(`Workspace: ${path}\n`);
}

export async function checkCommunity(address) {
  const base = new URL(address);
  if (base.username || base.password || !['https:', 'http:'].includes(base.protocol)) {
    throw new Error('Use the public Community HTTP(S) address without credentials.');
  }
  const response = await fetch(new URL('/.well-known/heritage-community.json', base), {
    signal: AbortSignal.timeout(10_000),
    redirect: 'error',
  });
  if (!response.ok) throw new Error(`Community discovery returned HTTP ${response.status}.`);
  const text = await response.text();
  if (text.length > 128_000) throw new Error('Community discovery response is too large.');
  const manifest = JSON.parse(text);
  if (manifest.kind !== 'heritage-community') throw new Error('This address is not a Heritage Community.');
  return {
    community: manifest.name,
    syncshow: Boolean(manifest.integrations?.syncShow),
    personalSync: Boolean(manifest.capabilities?.personalProgressSync),
    translation: Boolean(manifest.integrations?.translation),
  };
}

async function main(args) {
  const command = args[0] ?? 'help';
  if (!['bootstrap', 'status', 'doctor', 'help', '--help'].includes(command)) throw new Error(`Unknown command: ${command}`);
  if (command === 'help' || command === '--help') {
    process.stdout.write('Heritage Community\n\nbootstrap             Fetch the exact component revisions into isolated folders.\nstatus                Verify installed component revisions without changing them.\ndoctor [community-url] Check prerequisites and optionally public Community discovery.\n\nThis development workspace is not yet a combined production installer.\n');
    return;
  }
  const manifest = validateManifest(JSON.parse(await readFile(join(repositoryRoot, 'components.lock.json'), 'utf8')));
  if (command === 'bootstrap') return bootstrap(repositoryRoot, manifest);
  if (command === 'status') {
    let missing = false;
    for (const component of manifest.components) {
      const result = await inspectCheckout(sourcePath(repositoryRoot, component), component);
      process.stdout.write(`${component.name}: ${result.state} (${component.revision.slice(0, 12)})\n`);
      missing ||= result.state === 'missing';
    }
    if (missing) process.exitCode = 1;
    return;
  }
  if (Number(process.versions.node.split('.')[0]) < 24) throw new Error('Node.js 24 or later is required.');
  process.stdout.write(`Node: ${process.versions.node}\n${await git(['--version'], repositoryRoot)}\n`);
  if (args[1]) {
    const result = await checkCommunity(args[1]);
    for (const [key, value] of Object.entries(result)) process.stdout.write(`${key}: ${value}\n`);
    process.stdout.write('Discovery describes advertised capabilities; sign-in and a service rehearsal still need verification.\n');
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).catch(error => {
    process.stderr.write(`Heritage: ${error.message}\n`);
    process.exitCode = 1;
  });
}
