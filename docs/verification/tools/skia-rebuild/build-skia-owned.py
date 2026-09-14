#!/usr/bin/env python3
"""Run the reviewed upstream Mac Skia build using already-retained sources."""
from pathlib import Path
import hashlib
import os
import shutil
import subprocess
import sys

root = Path(__file__).resolve().parent
skia = root / 'skia-7219df0fb0ff64f26adad448f94e8c001b964e6a'
canvas = root / 'canvas-2aa648fb4ed83fbe87af77922ecf89153184f8b5'
runner = root / 'skia-owned'
runner.mkdir(exist_ok=True)
(runner / 'scripts').mkdir(exist_ok=True)
(runner / 'tools').mkdir(exist_ok=True)
script = canvas / 'scripts/build-skia.js'
shutil.copy2(script, runner / 'scripts/build-skia.js')
if not (runner / 'skia').exists():
    (runner / 'skia').symlink_to(skia, target_is_directory=True)
elif (runner / 'skia').resolve() != skia:
    raise SystemExit('Unexpected existing Skia source path')
ninja = runner / 'tools/ninja'
ninja.write_text('#!/bin/sh\nexec "' + str(root / 'tools-venv/bin/ninja') + '" -j6 "$@"\n')
ninja.chmod(0o755)
if not (runner / 'tools/python').exists():
    (runner / 'tools/python').symlink_to(sys.executable)
if shutil.disk_usage(root).free < 4 * 1024**3:
    raise SystemExit('Keep at least 4 GiB free before starting this build')
environment = os.environ.copy()
environment.update({
    'PATH': str(runner / 'tools') + os.pathsep + str(root / 'tools-venv/bin') + os.pathsep + environment['PATH'],
    'MACOSX_DEPLOYMENT_TARGET': '11.0',
    'SKIP_SYNC_SK_DEPS': '0',
})
environment.pop('GN_EXE', None)
# The upstream script removes the C API example while building. Restore the
# exact original BUILD.gn even if its subprocess fails before Node beforeExit.
build_gn = (skia / 'BUILD.gn').read_bytes()
try:
    subprocess.run(['node', str(runner / 'scripts/build-skia.js'), '--target=aarch64-apple-darwin'],
                   cwd=runner, env=environment, check=True)
finally:
    (skia / 'BUILD.gn').write_bytes(build_gn)
    print('Restored BUILD.gn SHA-256:', hashlib.sha256(build_gn).hexdigest(), flush=True)
