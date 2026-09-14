#!/usr/bin/env python3
"""Build Canvas against the retained Rust sources and freshly source-built Skia."""
import argparse
import json
import os
from pathlib import Path
import subprocess

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('root', type=Path)
root = parser.parse_args().root.resolve()
source = root / 'canvas-2aa648fb4ed83fbe87af77922ecf89153184f8b5'
skia = root / 'skia-7219df0fb0ff64f26adad448f94e8c001b964e6a'
toolchain = root / 'rustup-home/toolchains/1.97.1-aarch64-apple-darwin/bin'
for name in ['skia', 'skparagraph', 'skshaper', 'svg', 'skunicode_core', 'skunicode_icu',
             'skottie', 'skresources', 'sksg', 'jsonreader']:
    if not (skia / 'out/Static' / ('lib' + name + '.a')).is_file():
        raise SystemExit('Complete the Skia source build before building Canvas: ' + name)
environment = os.environ.copy()
environment.update({
    'PATH': str(toolchain) + os.pathsep + str(root / 'tools-venv/bin') + os.pathsep + environment['PATH'],
    'CARGO_HOME': str(root / 'source-skia-cargo-home'),
    'RUSTUP_HOME': str(root / 'rustup-home'),
    'SKIA_DIR': str(skia),
    'SKIA_LIB_DIR': str(skia / 'out/Static'),
    'MACOSX_DEPLOYMENT_TARGET': '12.0',
    'CARGO_BUILD_JOBS': '6',
})
subprocess.run([
    str(toolchain / 'cargo'), 'build', '--locked', '--offline', '--release',
    '--target', 'aarch64-apple-darwin', '--message-format=json-render-diagnostics',
    '--target-dir', str(root / 'source-skia-target'),
    '--config', 'source.crates-io.replace-with="vendored-sources"',
    '--config', 'source.vendored-sources.directory=' + json.dumps(str(root / 'vendor-reviewed')),
], cwd=source, env=environment, check=True)
