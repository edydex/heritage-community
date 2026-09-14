#!/usr/bin/env python3
"""Supply only the checksummed public inputs previously retained for this recipe."""
from pathlib import Path
import hashlib
import json
import sys

root = Path('/Users/omayo/GitHub/heritage-community/.heritage/release-inputs/syncshow/1.4.0-preview.27/libvips-source')
if len(sys.argv) != 2:
    raise SystemExit('Expected exactly one recorded source URL')
url = sys.argv[1]
for receipt in root.glob('*/receipt.json'):
    record = json.loads(receipt.read_text())
    if url == record['url']:
        source = root / record['localPath']
        data = source.read_bytes()
        if len(data) != record['bytes'] or hashlib.sha256(data).hexdigest() != record['sha256']:
            raise SystemExit('Retained input checksum changed: ' + record['id'])
        sys.stdout.buffer.write(data)
        break
else:
    raise SystemExit('Unrecorded source URL: ' + url)
