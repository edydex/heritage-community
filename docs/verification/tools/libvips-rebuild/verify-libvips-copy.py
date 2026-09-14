#!/usr/bin/env python3
"""Replace libvips only in the previously prepared trusted ad-hoc QA copy."""
from pathlib import Path
import hashlib
import json
import os
import shutil
import subprocess

root = Path(__file__).resolve().parent
app = root / 'source-vips-preview/SyncShow.app'
recipe = root / 'sharp-libvips-4da6d14c0d59866adfb9d8cf52bcaa53846dc4f6'
source = recipe / 'target/lib/libvips-cpp.8.18.3.dylib'
library = app / 'Contents/Resources/app.asar.unpacked/node_modules/@img/sharp-libvips-darwin-arm64/lib/libvips-cpp.8.18.3.dylib'
hash_file = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
baseline = json.loads((root / 'app-copy-baseline.json').read_text())
assert json.loads((root / 'libvips-build-result.json').read_text())['exitCode'] == 0
for item in baseline['files']:
    assert hash_file(app / item['path']) == item['sha256'], item['path']
signature = subprocess.run(['codesign', '-dv', '--verbose=4', str(app)], capture_output=True, text=True, check=True).stderr
assert 'Signature=adhoc' in signature and 'flags=0x2(adhoc)' in signature
dependencies = subprocess.check_output(['otool', '-L', str(source)], text=True)
for line in dependencies.splitlines()[2:]:
    dep = line.strip().split(' (', 1)[0]
    assert dep.startswith(('/System/Library/', '/usr/lib/')), dep
with (root / 'vips-replacement.log').open('w') as log:
    log.write(signature+'\n'+dependencies+'\n'); log.flush()
    shutil.copy2(source, library)
    for args in [
        ['install_name_tool', '-id', '@rpath/libvips-cpp.8.18.3.dylib', str(library)],
        ['codesign', '--force', '--sign', '-', str(library)],
        ['codesign', '--force', '--deep', '--preserve-metadata=identifier,entitlements,flags', '--sign', '-', str(app)],
        ['codesign', '--verify', '--deep', '--strict', str(app)],
        ['otool', '-L', str(library)],
    ]:
        subprocess.run(args, check=True, stdout=log, stderr=subprocess.STDOUT)
for item in baseline['files']:
    if 'libvips' not in item['path']:
        assert hash_file(app / item['path']) == item['sha256'], item['path']
shutil.copy2(library, root / 'owned-libvips-cpp.8.18.3.dylib')
env = os.environ.copy(); env['ELECTRON_RUN_AS_NODE'] = '1'
with (root / 'sharp-rebuilt.log').open('w') as log:
    result = subprocess.run([str(app / 'Contents/MacOS/SyncShow'), str(root / 'sharp-source-probe.cjs'), str(app), str(root / 'sharp-rebuilt')], env=env, stdout=log, stderr=subprocess.STDOUT)
record = {'app': str(app), 'probeExitCode': result.returncode, 'builtDylibSha256': hash_file(source), 'signedDylibSha256': hash_file(library), 'signatureVerified': True, 'unchangedOriginalAsarAndFFmpeg': True}
(root / 'vips-replacement-result.json').write_text(json.dumps(record, indent=2)+'\n')
print(json.dumps(record), flush=True)
raise SystemExit(result.returncode)
