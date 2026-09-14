#!/usr/bin/env python3
"""Build the retained sharp-libvips recipe using isolated tools and offline sources."""
from pathlib import Path
import json
import os
import subprocess
import time

root = Path(__file__).resolve().parent
canvas = root.parent / 'canvas-rebuild-20260914'
recipe = root / 'sharp-libvips-4da6d14c0d59866adfb9d8cf52bcaa53846dc4f6'
rust_bin = canvas / 'rustup-home/toolchains/1.97.1-aarch64-apple-darwin/bin'
env = os.environ.copy()
env.update({
    'CC': 'clang', 'CXX': 'clang++', 'PLATFORM': 'darwin-arm64v8',
    'PKG_CONFIG': '/opt/homebrew/bin/pkg-config --static',
    'MACOSX_DEPLOYMENT_TARGET': '11.0',
    'FLAGS': '-fno-stack-check -Werror=unguarded-availability-new',
    'MESON': f'--cross-file={recipe}/platforms/darwin-arm64v8/meson.ini',
    'VIPS_RUSTUP_HOME': str(canvas / 'rustup-home'),
    'VIPS_RSVG_LOCK': str(root / 'rsvg-reviewed-Cargo.lock'),
    'VIPS_CARGO_CONFIG': str(root / 'rsvg-vendor-config.toml'),
    'CARGO_NET_OFFLINE': 'true', 'CARGO_BUILD_JOBS': '6',
    'PATH': ':'.join(str(p) for p in [root/'shims', rust_bin, root/'tools/bin', root/'tools-venv/bin', canvas/'tools-venv/bin']) + ':' + env['PATH'],
})
if (recipe / 'deps').exists() or (recipe / 'target').exists():
    raise SystemExit('Existing build state found; inspect and resume the failed stage explicitly.')
start = time.time()
with (root / 'libvips-build.log').open('w') as log:
    result = subprocess.run(['/bin/bash', '-c', 'source versions.properties; source build/owned-posix.sh'], cwd=recipe, env=env, stdout=log, stderr=subprocess.STDOUT)
(root / 'libvips-build-result.json').write_text(json.dumps({'exitCode': result.returncode, 'seconds': time.time()-start, 'log': 'libvips-build.log', 'recipe': str(recipe), 'sourceMode': 'retained source archives and vendored Rust crates; offline Cargo'}, indent=2)+'\n')
print(f'libvips build exited {result.returncode}; see libvips-build.log', flush=True)
raise SystemExit(result.returncode)
