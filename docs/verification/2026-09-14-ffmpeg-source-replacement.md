# Rebuilt FFmpeg replacement on Apple Silicon

A freshly extracted SyncShow Preview 28 copy successfully loaded FFmpeg rebuilt from the matching source, after ad-hoc signing. The package's application archive and original libvips bytes stayed unchanged. This advances the earlier [metadata-only replacement check](2026-09-14-mac-library-replacement.md) with an actual source rebuild and codec decoding.

## Evidence

- The original library came from the verified `5301a99` Preview 28 installer. Its SHA-256 matched the recorded packaged dependency.
- The build used FFmpeg `ad41607`, its shipped Chrome-branding Mac ARM64 codec/demuxer/parser selection, and Chromium's vendored Opus source at Chromium `e69b30b` / upstream Opus `55513e81`. The retained source archives have fixed hashes.
- The Opus helper compiled the pinned Chromium GN target's 143 common, floating-point and ARM C source files, excluding its x86 branch. It preserves the target's ARM64 definitions. No neural model download or upstream training tool is involved.
- Apple Clang 21 built a library targeting macOS 12. All 1,587 original exported symbol names are present in the rebuilt library; it exports 1,719 names in total. This is a symbol check, not a general ABI compatibility guarantee.
- A standalone C probe using headers from the same FFmpeg source decoded generated AAC, Opus and H.264 fixtures. It supplies local data through custom I/O and drains the decoder through EOF.
- The signed replacement inside the app decoded the same bytes as the newly built library. Electron 43.2.0 then loaded that exact in-bundle library in `ELECTRON_RUN_AS_NODE` mode. PNG/JPEG/WebP output hashes matched the original app baseline, and `codesign --verify --deep --strict` passed.

| Fixture | Decoded result | Comparison with packaged library |
| --- | --- | --- |
| H.264 pattern, 3 seconds | 45 distinct frames, 320 × 180 | Pixels identical byte for byte |
| AAC tone, 3 seconds | 144,384 mono float samples at 48 kHz, including codec padding | Largest absolute sample difference `2.98e-8`; not bit-identical |
| Opus tone, 3 seconds | 144,000 mono signed 16-bit samples at 48 kHz | Five samples differ by one integer step; not bit-identical |

The [machine-readable record](2026-09-14-ffmpeg-source-replacement.json) includes source/input hashes, compiler/configuration, every selected Opus C file, exported-symbol coverage, decoded-output hashes, numeric differences, signing results and loaded paths. The runtime emitted its `task_name_for_pid` diagnostic but exited 0 and passed the independent loading/output assertions.

## Repeat the source build

Use an Apple Silicon Mac with Apple's Command Line Tools, `make`, Python 3 and an empty working directory. These steps build an owner replacement for the existing ad-hoc preview; they do not reproduce the upstream binary or describe a Developer ID release. Copy the four files from [tools/ffmpeg-rebuild](tools/ffmpeg-rebuild/) into that directory.

Download the exact archives:

```sh
curl --fail --location 'https://chromium.googlesource.com/chromium/third_party/ffmpeg/+archive/ad41607c61898cf7150e0fb20fe4bbabd44922a3.tar.gz' -o ffmpeg-source.tar.gz
curl --fail --location 'https://chromium.googlesource.com/chromium/src/+archive/e69b30bba288603e514cffb4c79c359cac68e923/third_party/opus.tar.gz' -o chromium-opus.tar.gz
```

Verify these SHA-256 values **before** extracting or building:

```text
2cefa633a2d8d3d52ae5a9fcc896fecf0ec0c46b925c859ed5299e20b6efde4e  ffmpeg-source.tar.gz
968ae63d5c5732ce0938fa4d4fb2f9a0d9fb10ad410ff619fa5924c1e6b1d9b6  chromium-opus.tar.gz
```

Extract into `source/` and `opus-source/`, preserving their archive-relative paths, then run:

```sh
python3 build-opus.py
python3 build-ffmpeg.py
clang -dynamiclib -mmacosx-version-min=12.0 -Wl,-all_load \
  build-reviewed/libavcodec/libavcodec.a \
  build-reviewed/libavformat/libavformat.a \
  build-reviewed/libavutil/libavutil.a opus-build/libopus.a \
  -pthread -lm -framework CoreFoundation -framework CoreVideo -framework CoreMedia \
  '-Wl,-install_name,@loader_path/libffmpeg.dylib' -o rebuilt-libffmpeg.dylib
clang -std=gnu17 -O2 -Wall -Wextra \
  -I source/chromium/config/Chrome/mac/arm64 -I source \
  decode-probe.c -o decode-probe
```

The linker install name implements the same path choice as Electron's retained `link_with_loader_path.patch`. The recipe uses the owner's Apple compiler/SDK rather than Chromium's original Clang toolchain. The initial broad build omitted Opus, and an upstream autotools attempt lacked source-list files pruned by Chromium; neither is the final recipe.

## Replace and verify an owner copy

Extract a new copy of the retained Preview 28 ZIP. Set `REBUILD_APP` to that copied `.app` and save its original FFmpeg library separately for comparison. Verify the copy is the expected ad-hoc preview with `codesign -dv --verbose=2 "$REBUILD_APP"` before changing it. The library path is:

```text
Contents/Frameworks/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib
```

Copy `rebuilt-libffmpeg.dylib` to that path, then run:

```sh
codesign --force --sign - "$REBUILD_APP/Contents/Frameworks/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"
codesign --force --deep --preserve-metadata=identifier,entitlements,flags --sign - "$REBUILD_APP"
codesign --verify --deep --strict "$REBUILD_APP"
```

The retained [Mac library probe](tools/mac-library-probe.cjs) checks actual Electron loading and image output. Run it with an absolute probe path and absolute app path:

```sh
ELECTRON_RUN_AS_NODE=1 "$REBUILD_APP/Contents/MacOS/SyncShow" "$REBUILD_PROBE" "$REBUILD_APP"
```

`decode-probe LIBRARY FIXTURE audio|video OUTPUT.raw` tests the selected library directly and writes JSON metadata to stdout. Copy the three [synthetic fixtures](fixtures/ffmpeg-rebuild/) into the working directory and save the packaged library as `original-libffmpeg.dylib`, then run:

```sh
for variant in original rebuilt; do
  ./decode-probe "./${variant}-libffmpeg.dylib" tone-aac.m4a audio "${variant}-audio.raw" > "${variant}-audio.json"
  ./decode-probe "./${variant}-libffmpeg.dylib" tone-opus.ogg audio "${variant}-opus.raw" > "${variant}-opus.json"
  ./decode-probe "./${variant}-libffmpeg.dylib" pattern-h264.mp4 video "${variant}-video.raw" > "${variant}-video.json"
done
python3 compare-decoding.py
```

Sample-format metadata must be used when interpreting raw audio: AAC was float, while this Opus decoder returned signed 16-bit PCM. The exact source archives, original/rebuilt raw outputs, final build logs and signed replacement are retained privately in `.heritage/rehearsals/2026-09-14/ffmpeg-source-replacement/`.

## Remaining acceptance

No public release gate was cleared. This verifies a source rebuild, three software-decoding fixtures and a headless Electron load on one Mac. It does not verify GUI media playback, speaker audibility, macOS 12 hardware, Intel/Windows/Linux, or notarization. The replacement differs from the upstream compiler output and has the recorded numerical differences.

libvips and Canvas source/rebuild materials, other native targets, complete distribution inputs and protected release configuration remain open. No paid API requests ran. The original translation host's LAN and configured SSH routes both timed out, so the next sermon comparison remains unrun and the ledger stays at $0.79 of the $20 cap.
