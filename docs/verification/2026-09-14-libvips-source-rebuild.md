# Mac libvips source rebuild and combined native check

libvips and its selected dependencies now build from the retained source set on Apple Silicon. A separately signed SyncShow Preview 28 copy loads the rebuilt library and produces exactly the same encoded images and decoded pixels in all eight tested cases. A second copy also combines the earlier source-built Canvas/Skia and FFmpeg libraries: image, bilingual text, PDF and direct media-decoding checks pass together.

This completes the Mac source-build/replacement checkpoint for these three native inputs. It does not complete the official desktop release, other platforms, GUI media playback or a physical church service. The [machine-readable record](2026-09-14-libvips-source-rebuild.json) preserves the exact scope and results.

## Build inputs and changes

- The build starts from `sharp-libvips` recipe `4da6d14c0d59866adfb9d8cf52bcaa53846dc4f6`, libvips 8.18.3, the previously retained 28 dependency archives and four patches. Every archive/patch request is satisfied by a local helper that checks the recorded byte count and SHA-256; unknown URLs fail.
- Rust 1.97.1, cargo-c `0.10.25+cargo-0.99.0`, Meson 1.12.0, CMake 4.3.0, Ninja 1.13.0, Apple Clang 21.0.0 and SDK 26.5 were used. The dylib declares macOS 11.0; the containing Electron preview still requires macOS 12. Only the current Apple Silicon Mac was exercised.
- The owned recipe uses the pinned stable Rust toolchain in place of the upstream unpinned nightly installer and omits its nightly-only size flags. Compiler jobs are limited to six. The first FreeType build and installed static libraries are preserved instead of deleted. The build stops before upstream packaging cleanup.
- The original librsvg feature edits are retained: embedded GIF/WebP and Cairo PDF/PostScript features are disabled as in the pinned recipe. Its reviewed Cargo lockfile is `39a321a47d50375109eeb75a6f50e1c43b3731be85bcd7a44661bb80c9f636b9`. All 345 registry packages were vendored; all 18,077 recorded vendor-file hashes passed. Compilation ran with offline Cargo and an isolated Cargo home. Dependency files identify 157 compiled vendor directories.
- After building, 29,695 regular files across all 28 extracted source archives remain identical to the archives. The 30 changed files are inventoried: upstream patches/feature edits, the reviewed Cargo lockfile and the generated Expat configuration. No archived regular file is missing. GLib's GVDB sources were already included in its archive.
- The build finished successfully in 308.236 seconds. The retained target contains 40 static-library files, including libvips and librsvg, plus headers and pkg-config files for inspection and relinking. The resulting shared library depends only on macOS system libraries/frameworks after its install name is made relative.

The vendor inventory includes 628 license/notice candidates from optional, test, build and runtime sources. That inventory is not a claim that every package is linked, nor a replacement for the final distributed notice review.

**The earlier libimagequant discrepancy remains explicit.** This owned build uses the retained current 2.4.1 archive, SHA-256 `47d2a84b7b1052975c9d50a3d4e3cacbf57b43d84a4c3131210848ead9964dfb`. Its mutable tag changed after the original upstream release. The original expected `da531249…` archive has not been recovered. Matching rendering results do not establish historical source correspondence or a bit-identical upstream rebuild.

## Runtime evidence

The original QA input remains SyncShow source `5301a992638bdcc66a5253026658dd022320eda4`, Electron 43.2.0, Sharp 0.35.3 and PDF.js 6.2.108. New copies were made with APFS cloning; the retained installer and original app were not changed. Only these already ad-hoc-signed QA copies were re-signed, without changing system security settings.

The signed libvips SHA-256 is `542d65f47998f615102cf87c289c3231da8312e013de60bd8877408b8609fa7a`. All 1,556 identified libvips C/C++ API names remain exported. Of 15,616 total original exported names, only the Rust standard library's compiler-specific `EMPTY_PANIC` symbol changes its encoded crate identity. No libvips API name is missing.

| Check | Result |
| --- | --- |
| SVG shapes, transparency and English/Russian text | Identical original/rebuilt pixels and PNG bytes |
| JPEG, WebP, lossless AVIF and TIFF | Identical encoded bytes and decoded RGBA |
| GIF and palette PNG | Identical encoded bytes and decoded RGBA |
| Pango English/Russian text | Identical dimensions, PNG bytes and RGBA |
| Loaded library paths | libvips and FFmpeg come from the selected app copy |
| Combined Canvas/Skia copy | Original PNG/JPEG/WebP, bilingual text metrics and two PDF pages/text all match |
| Combined FFmpeg copy | AAC: 141 frames; Opus: 151 frames; H.264: 45 frames decoded from retained generated fixtures |
| App signatures and packaged runtime checks | Pass in both the libvips-only and combined copies |

The first probe incorrectly matched `libvips` in the parent folder name when counting loaded libraries. Actual image operations had succeeded; inspection showed the expected copied libraries. Restricting the check to library basenames fixed the probe. Its original script, diagnostic and failure record remain retained alongside the passing rerun.

The combined copy retains the unchanged original ASAR and the previously verified signed Canvas and FFmpeg hashes. The media checks directly load the copied FFmpeg library; they do not verify Electron GUI playback, speakers or projector output. The complete release verifier still reports `releaseLegalStatus: blocked`.

## Retained materials and replay

The private unified workspace retains 178 files totaling 157,602,557 bytes under:

```text
.heritage/rehearsals/2026-09-14/libvips-source-rebuild/
```

The directory includes checksummed vendor, installed build-tool, relinking-target and rendered-result archives; modified source files; build configurations; logs; both successful and initially failed probe records; exported symbols; the signed dylib; and an exact file manifest. The original direct source archives remain under `.heritage/release-inputs/syncshow/1.4.0-preview.27/libvips-source/`. Prior Canvas/Skia and FFmpeg inputs remain in their earlier retained rehearsal directories.

The [exact rehearsal scripts and lockfile](tools/libvips-rebuild/README.md) are checked in separately. They record the tested local paths and build sequence. They are development evidence, not a replacement for the normal [desktop installation workflow](../desktop-preview.md). The scripts refuse to restart over an existing dependency build; a failed stage must be inspected before resuming.

No component pin, deployed server, installed app, provider setting or release gate changed. No paid provider request was made. Remaining work is other native targets, public source/final notice distribution, GUI and physical-device acceptance, protected release configuration and the outstanding WOTBC setup/service checks.
