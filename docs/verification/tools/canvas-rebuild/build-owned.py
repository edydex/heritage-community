#!/usr/bin/env python3
"""Build the retained Canvas Rust/C++ wrapper against pinned Skia archives offline."""
import argparse
import json
import os
import pathlib
import subprocess

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('root', type=pathlib.Path)
args = parser.parse_args()
root = args.root.resolve()
source = root / 'canvas-2aa648fb4ed83fbe87af77922ecf89153184f8b5'
toolchain = root / 'rustup-home/toolchains/1.97.1-aarch64-apple-darwin/bin'
if not (root / 'vendor-reviewed').is_dir():
    raise SystemExit('Retain the locked Cargo vendor directory before rebuilding.')
environment = os.environ.copy()
environment.update({
    'PATH': str(toolchain) + os.pathsep + str(root / 'tools-venv/bin') + os.pathsep + environment['PATH'],
    'CARGO_HOME': str(root / 'offline-cargo-home'),
    'RUSTUP_HOME': str(root / 'rustup-home'),
    'SKIA_DIR': str(root / 'skia-7219df0fb0ff64f26adad448f94e8c001b964e6a'),
    'SKIA_LIB_DIR': str(root / 'skia-libs'),
    'MACOSX_DEPLOYMENT_TARGET': '12.0',
    'CARGO_BUILD_JOBS': '8',
})
subprocess.run([
    str(toolchain / 'cargo'), 'build', '--locked', '--offline', '--release',
    '--target', 'aarch64-apple-darwin', '--message-format=json-render-diagnostics',
    '--target-dir', str(root / 'reviewed-target'),
    '--config', 'source.crates-io.replace-with="vendored-sources"',
    '--config', 'source.vendored-sources.directory=' + json.dumps(str(root / 'vendor-reviewed')),
], cwd=source, env=environment, check=True)
