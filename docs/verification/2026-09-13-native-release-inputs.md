# Native release inputs — 2026-09-13

This investigation advances the existing SyncShow public-release gate. It does not clear that gate or change a shipped package. The examined SyncShow source is `0b350709b3c237adc195938a15c601a498def010` (Preview 27).

## Retained evidence

The [upstream input inventory](2026-09-13-native-upstream-inputs.json) identifies 18 downloaded build/notice/dependency text files by immutable commit and SHA-256. The complete local download set, including the official 85,450,496-byte libvips release workspace, is retained under `.heritage/release-inputs/syncshow/1.4.0-preview.27/` in the durable unified workspace. Upstream scripts were read, not executed.

| Runtime input | Resolved upstream source |
| --- | --- |
| `@img/sharp-libvips-*` 1.3.2 | [`lovell/sharp-libvips` 4da6d14](https://github.com/lovell/sharp-libvips/tree/4da6d14c0d59866adfb9d8cf52bcaa53846dc4f6) |
| `@napi-rs/canvas` 1.0.3 | [`Brooooooklyn/canvas` 2aa648f](https://github.com/Brooooooklyn/canvas/tree/2aa648fb4ed83fbe87af77922ecf89153184f8b5) |
| Canvas Skia submodule | [`google/skia` 7219df0](https://github.com/google/skia/tree/7219df0fb0ff64f26adad448f94e8c001b964e6a) |
| Electron 43.2.0 | [`electron/electron` 9b58e96](https://github.com/electron/electron/tree/9b58e96340a34cccaccc08e410e76838b50b0cb2) |
| Electron's Chromium 150.0.7871.129 | [`chromium/chromium` e69b30b](https://github.com/chromium/chromium/tree/e69b30bba288603e514cffb4c79c359cac68e923) |
| Chromium's FFmpeg | [`chromium/third_party/ffmpeg` ad41607](https://chromium.googlesource.com/chromium/third_party/ffmpeg/+/ad41607c61898cf7150e0fb20fe4bbabd44922a3) |

The official [libvips workspace asset](https://github.com/lovell/sharp-libvips/releases/download/v1.3.2/npm-workspace.tar.xz) has SHA-256 `572b0c345e150172c5817fe50fb7d397206948f2ae9b33e6c0bf326b686c05d9`, matching GitHub's published asset digest. Its Darwin ARM64 dylib and `versions.json` match the files installed in the isolated pinned SyncShow checkout byte for byte. Its notice file matches the pinned upstream source. [Exact comparison](2026-09-13-libvips-upstream-comparison.json).

This comparison covers the local installed dependency. It does not establish all four packaged targets' complete corresponding-source or replacement coverage, and does not replace the existing installer/source correspondence checks.

## Concrete remaining work

- **libvips:** the release workspace provides binaries, version data and a notice index; it is not a complete source archive. Retain the dependency source archives and patches from the pinned build recipe, actual license texts, platform build configuration and replacement/relinking evidence. The POSIX recipe downloads one patch from a pull-request URL and the notice index from `main`; pin those bytes before relying on it for repeatable builds. Windows uses a separate `libvips/build-win64-mxe` binary input and needs its own source/configuration inventory.
- **Canvas:** the source tree pins Skia but contains no `Cargo.lock`; its manifest uses version ranges for Rust dependencies. Identify the actual resolved dependency set and associated notices for each upstream binary, or produce owned native builds from a retained lockfile and pinned toolchain. The source commit alone is insufficient evidence for the existing exact-input gate.
- **Electron/FFmpeg:** the source chain now resolves to a concrete FFmpeg commit. Retain that source, Electron's patches and target-specific build configuration, and verify replacement instructions against packaged runtimes. Electron's general [build instructions](https://www.electronjs.org/docs/latest/development/build-instructions-gn) are a starting point, not a completed target-specific acceptance result.

The public-release workflow still has its separate protected Google Drive configuration prerequisite. No release credentials were changed. These collected materials do not authorize disabling any release check; readiness must be established from the completed, reviewed package inputs.

## Packaged notice follow-up

SyncShow `5b3da20224e2d74d150f54e8a85dc97fce4d54d0` now bundles the retained 1.3.2 libvips notice index on its reviewed Mac/Linux targets and checks its fixed upstream hash during generation and verification. Windows keeps its separate source/notice requirement. Eight focused packaging tests and 217-file syntax validation passed, followed by full [CI 34770759898](https://github.com/edydex/SyncShow/actions/runs/34770759898) and all four target jobs in [Package Smoke 34770759899](https://github.com/edydex/SyncShow/actions/runs/34770759899). Every target passed the package legal-evidence verifier, and both Mac signature checks passed.

The workflow built pull-request merge commit `891fb4ecb99fbb93effd13ecfa4602a7c7032dac`. Its Git tree `d36834f032358de8c841c61281f5193a23294d54` is identical to the published integration commit's tree. The downloaded Apple Silicon ZIP and DMG match the recorded hashes; the actual ZIP contains the exact upstream notice bytes. [Inspection record](2026-09-13-packaged-libvips-notice.json). These diagnostic packages and evidence are retained in `.heritage/release-inputs/syncshow/1.4.0-preview.27/qa-34770759899/`. The compatible-set pin remains at the earlier accepted Preview 27 checkpoint pending the combined packaging follow-up. No public release gate was cleared.

## FFmpeg source follow-up

The exact Chromium FFmpeg archive `ad41607c61898cf7150e0fb20fe4bbabd44922a3` is now retained: 18,432,607 bytes, SHA-256 `2cefa633a2d8d3d52ae5a9fcc896fecf0ec0c46b925c859ed5299e20b6efde4e`, with 11,122 archive entries. The archive includes license terms and generated Chrome-branding configurations for Mac ARM64/x64, Linux x64 and Windows x64. Electron 43.2.0's retained `all.gn` selects Chrome branding and proprietary codecs; `release.gn` selects shared FFmpeg. Its one listed FFmpeg patch, `link_with_loader_path.patch`, passes `git apply --check` against the archived `BUILD.gn`. The patch was checked without applying or building it.

[The exact file inventory](2026-09-13-ffmpeg-source-inputs.json) records source URLs, hashes, selected configuration/license files and the patch check. The archive and inputs are retained under `.heritage/release-inputs/syncshow/1.4.0-preview.27/ffmpeg-source/` in the durable unified workspace. Complete build-toolchain/dependency retention and replacement checks against the packaged runtimes remain open. This collection does not clear the public desktop-release requirements.

## Canvas build provenance follow-up

All four native Canvas 1.0.3 binaries pinned by SyncShow now match the retained artifacts from successful [upstream build 30338026389](https://github.com/Brooooooklyn/canvas/actions/runs/30338026389), source `2aa648fb4ed83fbe87af77922ecf89153184f8b5`. The npm tarballs were checked against SyncShow's lockfile SHA-512 values, then their `.node` bytes were compared directly with the upstream artifacts. This covers Mac ARM64/x64, Linux x64 GNU and Windows x64 MSVC. The locally installed Mac ARM64 binary also matches.

The retained per-target logs identify the Skia `skia-7219df0f` binary inputs and observed Rust compilation versions: 84 crate/version entries on each Mac/Linux target and 78 on Windows. These lists may omit cached dependencies; they are not a complete Cargo lockfile or license inventory. The exact tarball URLs, integrity values, binary hashes, log hashes and observed inputs are in [the comparison record](2026-09-13-canvas-build-inputs.json). Downloaded binaries and upstream scripts were not executed.

The four npm archives, upstream binaries, build logs and inventory are retained under `.heritage/release-inputs/syncshow/1.4.0-preview.27/canvas-build-30338026389/`. Full resolved Cargo dependencies, Skia transitive source/notices and the existing release acceptance remain open.
