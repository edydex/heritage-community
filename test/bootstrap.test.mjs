import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { bootstrapComponent, git, sourcePath, validateManifest } from '../bin/heritage.mjs';

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'heritage-bootstrap-'));
  t.after(() => rm(root, { recursive:true, force:true }));
  const remote = join(root, 'remote');
  await git(['init', '--quiet', remote], root);
  await writeFile(join(remote, 'README.md'), 'original\n');
  await git(['add', 'README.md'], remote);
  await git(['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.test', 'commit', '--quiet', '-m', 'fixture'], remote);
  return { root, component:{id:'fixture', name:'Fixture', repository:remote, revision:await git(['rev-parse','HEAD'],remote)} };
}

test('installs the exact revision and a repeated bootstrap preserves the checkout', async t => {
  const {root,component} = await fixture(t);
  const first = await bootstrapComponent(root,component);
  const second = await bootstrapComponent(root,component);
  assert.equal(first.revision,component.revision);
  assert.deepEqual(first,second);
  assert.equal(await readFile(join(first.path,'README.md'),'utf8'),'original\n');
});

test('refuses to overwrite dirty existing work', async t => {
  const {root,component} = await fixture(t);
  await bootstrapComponent(root,component);
  const path = join(sourcePath(root,component),'README.md');
  await writeFile(path,'private work\n');
  await assert.rejects(bootstrapComponent(root,component),/Uncommitted work/);
  assert.equal(await readFile(path,'utf8'),'private work\n');
});

test('rejects a repository mismatch without rewriting origin', async t => {
  const {root,component} = await fixture(t);
  await bootstrapComponent(root,component);
  const path = sourcePath(root,component);
  await git(['remote','set-url','origin','https://example.test/other.git'],path);
  await assert.rejects(bootstrapComponent(root,component),/Repository mismatch/);
  assert.equal(await git(['remote','get-url','origin'],path),'https://example.test/other.git');
});

test('a failed fetch leaves no partially installed checkout', async t => {
  const {root,component} = await fixture(t);
  const invalid = {...component,revision:'f'.repeat(40)};
  await assert.rejects(bootstrapComponent(root,invalid));
  assert.deepEqual(await readdir(join(root,'.heritage','sources')),[]);
});

test('rejects traversal, moving refs, and credential-bearing repository URLs', () => {
  const component = {id:'heritage',repository:'https://github.com/edydex/heritage_study_bible.git',revision:'a'.repeat(40)};
  for (const change of [{id:'../elsewhere'},{revision:'main'},{repository:'https://token@github.com/edydex/repo.git'}]) {
    assert.throws(()=>validateManifest({schemaVersion:1,components:[{...component,...change}]}));
  }
});
