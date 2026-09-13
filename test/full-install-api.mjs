import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

assert.equal(process.env.GITHUB_ACTIONS, 'true');
const [operation, results] = process.argv.slice(2);
assert.ok(['seed', 'mutate', 'verify'].includes(operation));
const base = 'http://127.0.0.1:3000';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const credentials = { email: 'admin@rehearsal.invalid', password: 'Only-for-disposable-install-rehearsal-2026' };
const login = await fetch(`${base}/api/users/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(credentials) });
assert.equal(login.status, 200, 'The installer-created administrator must be able to sign in.');
const authenticated = await login.json();
const headers = { Authorization: `JWT ${authenticated.token}` };
async function json(path, options = {}) {
  const response = await fetch(base + path, { ...options, headers: { ...headers, ...options.headers } });
  assert.ok(response.ok, `${path}: HTTP ${response.status}: ${(await response.clone().text()).slice(0, 400)}`);
  return response.json();
}
if (operation === 'seed') {
  for (const route of ['/live', '/translate', '/translation/client/operator.js', '/translation/api/public/service']) {
    assert.equal((await fetch(base + route)).status, 200, route);
  }
  const churches = await json('/api/communities?limit=10');
  const church = churches.docs.find(doc => doc.slug === 'installation-rehearsal');
  assert.ok(church, 'The installer must create the selected church.');
  const bytes = Buffer.from('Public sermon notes: Grace and peace. Благодать и мир.\n');
  const form = new FormData();
  form.set('_payload', JSON.stringify({ community: church.id, status: 'published', alt: 'Restore rehearsal notes' }));
  form.set('file', new Blob([bytes], { type: 'text/plain' }), 'restore-rehearsal.txt');
  const created = await json('/api/media', { method: 'POST', body: form });
  const media = created.doc;
  assert.ok(media?.id && media.url);
  assert.equal(media.filename, 'restore-rehearsal.txt');
  const published = await fetch(new URL(media.url, base));
  assert.equal(published.status, 200, 'Published notes must be readable before the backup.');
  assert.equal(hash(Buffer.from(await published.arrayBuffer())), hash(bytes));
  const baseline = { userId: authenticated.user.id, displayName: authenticated.user.displayName,
    mediaId: media.id, mediaUrl: media.url, mediaSha256: hash(bytes), communityId: church.id };
  await writeFile(join(results, 'api-baseline.json'), JSON.stringify(baseline, null, 2) + '\n');
} else {
  const baseline = JSON.parse(await readFile(join(results, 'api-baseline.json')));
  if (operation === 'mutate') {
    const changed = await json(`/api/users/${baseline.userId}`, { method: 'PATCH',
      headers: { 'content-type': 'application/json' }, body: JSON.stringify({ displayName: 'Changed after the backup' }) });
    assert.equal(changed.doc.displayName, 'Changed after the backup');
    await json(`/api/media/${baseline.mediaId}`, { method: 'DELETE' });
    const remaining = await json(`/api/media?where[id][equals]=${encodeURIComponent(baseline.mediaId)}`);
    assert.equal(remaining.docs.length, 0, 'The deleted upload record must be absent.');
    // Payload may deny an anonymous file request before reporting its absence.
    // The guest storage check separately proves the file bytes were removed.
    const missing = await fetch(new URL(baseline.mediaUrl, base));
    assert.ok([403, 404].includes(missing.status), `Deleted public file: HTTP ${missing.status}`);
  } else {
    assert.equal(authenticated.user.id, baseline.userId);
    assert.equal(authenticated.user.displayName, baseline.displayName, 'Administrator row must return to its backup state.');
    const media = await json(`/api/media/${baseline.mediaId}`);
    const response = await fetch(new URL(media.url, base));
    assert.equal(response.status, 200);
    assert.equal(hash(Buffer.from(await response.arrayBuffer())), baseline.mediaSha256, 'Public file bytes must be restored.');
  }
}
console.log(`PASS: application API ${operation}`);
