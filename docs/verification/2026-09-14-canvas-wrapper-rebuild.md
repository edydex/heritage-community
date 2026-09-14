# Canvas wrapper rebuild and packaged rendering

An owned Apple Silicon build of Canvas 1.0.3’s Rust/C++ wrapper now loads in a separately re-signed SyncShow Preview 28 copy. English/Russian text, PNG/JPEG/WebP output, image decoding and two PDF pages match the original preview exactly in the retained fixtures. The build uses a complete retained Cargo lockfile and vendored Rust sources. **Skia still comes from the verified upstream static archives; this is not a complete from-source Skia build or a cleared desktop release.**

The [exact record](2026-09-14-canvas-wrapper-rebuild.json) contains source hashes, toolchain details, loaded native-library paths, both sets of rendering hashes, failures and scope limits. The [Rust source inventory](2026-09-14-canvas-rust-inputs.json) records all 93 registry packages in the owned lockfile and 158 license/attribution file candidates. That inventory includes build and other-target dependencies; it is not a determination that every component is linked.

## What changed and what caught the failure

The original Canvas source has version ranges and no Cargo lockfile. An initial resolution built successfully with Rust 1.97.1, but the packaged runtime rejected both decoded `Image` and `Canvas` objects in `drawImage`. Merely loading the addon or encoding a PNG did not catch this.

Pinning these five N-API crates to the versions observed in the retained original Mac build log resolved the incompatibility:

| Crate | Reviewed version |
| --- | --- |
| napi | 3.11.0 |
| napi-derive | 3.6.0 |
| napi-derive-backend | 6.0.0 |
| napi-sys | 3.3.0 |
| napi-build | 2.3.2 |

The five were changed together; no single culprit was isolated. Other packages retain the owned resolution. This lockfile is not a recovered copy of the missing upstream lockfile.

SyncShow [`8404883`](https://github.com/edydex/SyncShow/commit/8404883c0cd3e533b39fce3854be28ea8c452e86) adds image round-trips to the existing packaged PDF runtime verifier. It draws a generated image and canvas onto a second canvas, including a transparent pixel, and compares the exact pixels. The original preview passes; the actual first incompatible rebuild fails with the reproduced native-class error; the reviewed rebuild passes. The three existing PDF package contract tests, syntax check and diff check also pass. [Source CI 34841069377](https://github.com/edydex/SyncShow/actions/runs/34841069377) and all four native jobs in [Package Smoke 34841069396](https://github.com/edydex/SyncShow/actions/runs/34841069396) completed successfully, including the packaged PDF/image check on each target. These CI packages retain the original upstream native binaries; the owned replacement was tested separately on this Mac. This changes build verification, not the shipped application. The compatible-set pin remains at the retained Preview 28 package source, `5301a99`.

## Retained build inputs

| Input | Identity |
| --- | --- |
| Canvas source | `2aa648fb4ed83fbe87af77922ecf89153184f8b5`; archive SHA-256 `a1a4c08bc2e4160528e6cdc0a4c57c37ce37c657f7b664244dcfaee033829fd6` |
| Skia source and headers | `7219df0fb0ff64f26adad448f94e8c001b964e6a`; archive SHA-256 `83edae36346f1cd9122a1674b82277693bb101d17a106822835c0863f002b5bd` |
| Skia static archives | Ten `darwin-aarch64` assets from upstream `skia-7219df0f`; all match GitHub’s published SHA-256 digests. Their individual URLs/hashes are in the exact record. |
| Rust | Upstream-pinned 1.97.1, installed into a separate temporary toolchain home |
| Cargo source set | [Owned Cargo.lock](tools/canvas-rebuild/Cargo.lock), 93 registry archives verified against their lockfile checksums, complete `vendor-reviewed` directory |
| Build tools | Apple Clang 21.0.0; isolated CMake 4.3.0 and Ninja 1.13.0 |
| Target | `aarch64-apple-darwin`, macOS 12 minimum, source’s `apple-a14` Rust configuration |

All raw inputs, the vendored-source archive, logs, generated renderings and signed rebuilt addon are retained privately under `.heritage/rehearsals/2026-09-14/canvas-wrapper-rebuild/` in the durable integration workspace. The full temporary build trees, toolchain installation and copied app remain in `/private/tmp/heritage-unified-20260912/canvas-rebuild-20260914/`. No upstream release script was executed or uploaded to its repository.

## Working reconstruction recipe

The retained [build helper](tools/canvas-rebuild/build-owned.py) accepts the build-root path. Arrange the root as follows, using the exact archive hashes and asset names in the JSON record:

```text
canvas-source.tar.gz
canvas-2aa648fb4ed83fbe87af77922ecf89153184f8b5/
  Cargo.lock                        # the reviewed lockfile linked above
skia-source.tar.gz
skia-7219df0fb0ff64f26adad448f94e8c001b964e6a/
skia-libs/                          # libskia.a, libskshaper.a, etc.
vendor-reviewed/                   # exact retained Cargo vendor sources
rustup-home/toolchains/1.97.1-aarch64-apple-darwin/bin/
tools-venv/bin/                     # pinned CMake and Ninja
build-owned.py
```

The source archive URLs are recorded in the JSON. Strip `-darwin-aarch64` from each downloaded Skia archive filename, as the upstream wrapper’s linker expects names such as `libskia.a`. Extract archives safely into this disposable root; do not reuse a primary application checkout. No source patch is required: only the retained Cargo lockfile is added to Canvas.

To provision the isolated tools, set `CANVAS_REBUILD_ROOT` to the absolute build root and use the installed `rustup` command with both homes redirected:

```sh
CARGO_HOME="$CANVAS_REBUILD_ROOT/cargo-home" \
RUSTUP_HOME="$CANVAS_REBUILD_ROOT/rustup-home" \
rustup toolchain install 1.97.1 --profile minimal --no-self-update
python3 -m venv "$CANVAS_REBUILD_ROOT/tools-venv"
"$CANVAS_REBUILD_ROOT/tools-venv/bin/pip" install cmake==4.3.0 ninja==1.13.0
```

If reconstructing the vendor directory from the published lockfile rather than the retained archive, use the same redirected Cargo/Rustup homes, run `cargo fetch --locked` from the extracted Canvas source, then `cargo vendor --locked --offline ../vendor-reviewed`. Cargo validates registry source checksums against the lockfile. The historical lockfile-generation commands are not needed for replay.

Then run:

```sh
python3 "$CANVAS_REBUILD_ROOT/build-owned.py" "$CANVAS_REBUILD_ROOT"
```

The helper builds with `--locked --offline`, an empty separate Cargo home and the vendored source replacement. The successful reviewed run compiled 84 package IDs, including the root wrapper, and completed in 57.40 seconds on this Mac. The resulting library is `reviewed-target/aarch64-apple-darwin/release/libcanvas.dylib`.

For owner replacement, use a separate copy of the trusted, already ad-hoc-signed Preview 28 app and retain its bundle name `SyncShow.app` inside a new parent folder. First verify that the original app ASAR has SHA-256 `3c712e03d691f39654d9955374664302f69aa5da44fe76e90bab95c341733291` and that its signing information reports `Signature=adhoc`, `flags=0x2(adhoc)`.

Copy the rebuilt library over the copy’s `Contents/Resources/app.asar.unpacked/node_modules/@napi-rs/canvas-darwin-arm64/skia.darwin-arm64.node`. Re-sign that file ad hoc, re-sign the copied bundle preserving identifier/entitlements/flags, and verify its signature, following the [already tested owner-copy signing procedure](2026-09-14-mac-library-replacement.md). This recipe applies to the ad-hoc preview, not a future Developer ID or notarized release.

Run the retained [Canvas/PDF probe](tools/canvas-rebuild/canvas-probe.cjs) through that copy’s Electron executable:

```sh
ELECTRON_RUN_AS_NODE=1 "$CANVAS_COPY/Contents/MacOS/SyncShow" \
  "$CANVAS_PROBE" "$CANVAS_COPY" "$CANVAS_RENDER_OUTPUT"
```

All three arguments must be absolute paths. The probe uses the Mac’s Arial font; its exact font hash is recorded, so cross-system font substitutions must not be mistaken for native-library changes. It verifies two PDF text extractions, renders both pages, draws Latin/Cyrillic text and graphics, and encodes/decodes PNG, JPEG and WebP. Its loaded-library report must point into the copied app. Compare its result with the original app’s result on the same machine.

## Results and remaining scope

- The signature check passed. The application ASAR, original FFmpeg and original libvips stayed byte-identical to the preview.
- All three encoded image hashes, all three decoded RGBA hashes, text measurements, two PDF page hashes and extracted text matched the original preview. The generated bilingual image was also visually inspected.
- The runtime loaded the signed replacement addon from the copied app. Its SHA-256 is `6d9c56c8b57c8a4eb8063d9d3c7206f54f3693349214e7d00a26ea571768d5b2`.
- The runtime printed the existing `task_name_for_pid` diagnostic and exited successfully; this is not a claim of a diagnostic-free launch.
- No paid API requests were made. No provider settings or installed user app changed.

Skia and its transitive sources/notices still need their full source-built/reproducible input set. The initial cache-backed and vendored wrapper builds had different binary hashes, so no byte-for-byte deterministic-build claim is made. Other platforms, GUI/physical presentation, full distribution materials and protected official-release configuration remain open. The readiness estimate stays at approximately 75% overall and 60% for installers.
