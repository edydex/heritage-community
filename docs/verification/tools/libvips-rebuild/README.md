# Recorded Apple Silicon libvips rehearsal

These are the exact scripts and owned Cargo lockfile used for the [September 14 source rebuild](../../2026-09-14-libvips-source-rebuild.md). Their absolute paths describe that isolated local rehearsal; they are not the supported installer CLI.

The tested work root is `/private/tmp/heritage-unified-20260912/libvips-rebuild-20260914`. The sibling `canvas-rebuild-20260914` supplies the retained Rust 1.97.1 and CMake/Ninja tools. The retained direct archives/patches and their receipts live at `/Users/omayo/GitHub/heritage-community/.heritage/release-inputs/syncshow/1.4.0-preview.27/libvips-source`.

To replay in a fresh root, copy the saved inputs and scripts first; update the work-root path in `owned-posix.sh`, the source-cache path in `retained-fetch.py`, and the Ninja shim's tool path. Keep the original build and evidence intact. Extract the pinned recipe archive, place `owned-posix.sh` in its `build` directory, and supply:

- `tools/bin` from the retained cargo-c tool archive, Meson 1.12.0 in `tools-venv`, and a `shims/ninja` that invokes the retained Ninja with `-j6`.
- `rsvg-reviewed-Cargo.lock`, the retained `rsvg-vendor` tree and `rsvg-vendor-config.toml` pointing to that tree as a replacement for crates.io.
- The previously verified sibling Rust and CMake/Ninja environment. The driver derives that sibling path from its location.

`build-libvips-owned.py` runs the adapted recipe with the fixed environment and offline Cargo, recording its terminal result and log. It refuses an existing `deps` or `target` directory. `recipe-adaptations.patch` records every change from the upstream recipe; `owned-posix.sh` is the actual generated script.

The library result is `sharp-libvips-4da6d14c0d59866adfb9d8cf52bcaa53846dc4f6/target/lib/libvips-cpp.8.18.3.dylib`. Preserve the target's static libraries, headers and pkg-config files. The retained source/vendor archives and modified-source inventory provide the inputs for rebuilding and relinking; the original upstream binaries are not build inputs for this libvips result.

`verify-libvips-copy.py` requires a separately prepared, trusted, already ad-hoc-signed Preview 28 copy and its `app-copy-baseline.json`. It verifies the original files and signing mode, checks the built library's dependencies, installs it only in the copy, makes its install name relative, re-signs the copy and runs `sharp-source-probe.cjs`. The probe writes eight encoded fixtures and decoded RGBA files, and requires both loaded library paths to remain inside that app.

The initial probe/result is preserved in the private retained materials; the checked-in probe contains the inspected basename-matching correction. Subsequent combined-copy and packaged-runtime results are recorded in the main evidence document. This replay has been exercised on the current Apple Silicon Mac only; it does not establish other targets or official release readiness.
