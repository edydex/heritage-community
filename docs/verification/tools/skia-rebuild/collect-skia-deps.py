#!/usr/bin/env python3
"""Retain the dependencies selected by the reviewed Mac Canvas Skia build."""
from pathlib import Path
import concurrent.futures
import hashlib
import json
import re
import tarfile
import urllib.request
import zipfile

root = Path(__file__).resolve().parent
skia = root / 'skia-7219df0fb0ff64f26adad448f94e8c001b964e6a'
downloads = root / 'skia-dep-archives'
downloads.mkdir(exist_ok=True)
selected = {'buildtools', 'brotli', 'dng_sdk', 'expat', 'freetype', 'harfbuzz',
            'highway', 'icu', 'libjpeg-turbo', 'libjxl', 'libpng', 'libwebp',
            'wuffs', 'zlib'}
entries = []
for line in (skia / 'DEPS').read_text().splitlines():
    match = re.match(r'\s*["\']([^"\']+)["\']\s*:\s*["\'](https://[^"\']+)@([0-9a-f]{40})["\']', line)
    if match and Path(match[1]).name in selected:
        target, repository, revision = match.groups()
        entries.append((target, repository, revision))
assert len(entries) == len(selected)

def collect(entry):
    target, repository, revision = entry
    name = Path(target).name
    url = repository.rstrip('/') + '/+archive/' + revision + '.tar.gz'
    archive = downloads / (name + '.tar.gz')
    receipt = downloads / (name + '.json')
    if receipt.exists():
        record = json.loads(receipt.read_text())
        assert record['url'] == url
        assert hashlib.sha256(archive.read_bytes()).hexdigest() == record['sha256']
    else:
        part = archive.with_suffix('.part')
        with urllib.request.urlopen(url, timeout=60) as response, part.open('wb') as out:
            total = 0
            while chunk := response.read(1024 * 1024):
                total += len(chunk)
                if total > 256 * 1024 * 1024:
                    raise ValueError('Unexpectedly large source archive: ' + name)
                out.write(chunk)
        part.replace(archive)
        record = {'name': name, 'target': target, 'repository': repository,
                  'revision': revision, 'url': url, 'bytes': archive.stat().st_size,
                  'sha256': hashlib.sha256(archive.read_bytes()).hexdigest()}
        receipt.write_text(json.dumps(record, indent=2) + '\n')
    destination = skia / target
    if not destination.exists():
        destination.parent.mkdir(parents=True, exist_ok=True)
        staging = downloads / (name + '.extracting')
        staging.mkdir(exist_ok=False)
        with tarfile.open(archive) as contents:
            assert sum(member.size for member in contents.getmembers()) < 1024 * 1024 * 1024
            contents.extractall(staging, filter='data')
        staging.rename(destination)
    else:
        # A prior incomplete extraction must never be accepted just because the
        # directory exists. Preserve mismatched files and report the problem.
        with tarfile.open(archive) as contents:
            for member in contents:
                if member.isfile():
                    path = destination / member.name
                    assert path.resolve().is_relative_to(destination.resolve())
                    assert path.is_file(), path
                    assert hashlib.sha256(path.read_bytes()).digest() == hashlib.sha256(contents.extractfile(member).read()).digest(), path
    return record

records = []
errors = []
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    pending = {pool.submit(collect, entry): entry[0] for entry in entries}
    for result in concurrent.futures.as_completed(pending):
        try:
            record = result.result()
            records.append(record)
            print('Retained', record['name'], record['bytes'], flush=True)
        except Exception as error:
            errors.append({'target': pending[result], 'error': str(error)})
            print('Failed', pending[result], str(error), flush=True)
(root / 'skia-dependencies.json').write_text(json.dumps({'inputs': sorted(records, key=lambda x: x['name']), 'errors': errors}, indent=2) + '\n')
if errors:
    raise SystemExit('Some source archives could not be retained; inspect the recorded errors.')

gn_url = 'https://chrome-infra-packages.appspot.com/dl/gn/gn/mac-arm64/+/git_revision:b2afae122eeb6ce09c52d63f67dc53fc517dbdc8'
gn_zip = downloads / 'gn.zip'
if not gn_zip.exists():
    with urllib.request.urlopen(gn_url, timeout=60) as response:
        gn_zip.write_bytes(response.read())
with zipfile.ZipFile(gn_zip) as archive:
    data = archive.read('gn')
    (skia / 'bin/gn').write_bytes(data)
(skia / 'bin/gn').chmod(0o755)
(downloads / 'gn.json').write_text(json.dumps({'url': gn_url, 'archiveSha256': hashlib.sha256(gn_zip.read_bytes()).hexdigest(), 'binarySha256': hashlib.sha256(data).hexdigest()}, indent=2) + '\n')
print('Retained the GN revision pinned by Skia bin/fetch-gn.', flush=True)
