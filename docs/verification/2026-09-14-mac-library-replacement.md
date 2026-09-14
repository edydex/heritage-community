# Mac native-library replacement rehearsal

The verified Apple Silicon SyncShow Preview 28 package can load locally modified libvips and FFmpeg libraries after the owner re-signs a copy of its existing ad-hoc bundle. A headless check using that copied Electron runtime also preserved PNG, JPEG and WebP rendering output. This advances the practical replacement requirement; it does not clear the desktop release gates.

## What was tested

- Input: the downloaded Preview 28 QA package from SyncShow source `5301a992638bdcc66a5253026658dd022320eda4`, previously matched to packaging run `34818135279`.
- Original application archive SHA-256: `3c712e03d691f39654d9955374664302f69aa5da44fe76e90bab95c341733291`.
- Target: macOS Apple Silicon, Electron 43.2.0, Sharp 0.35.3 and libvips 8.18.3.
- A separate disposable copy was made with `ditto`. The retained installer, original verified app, normal app profile and system security settings were unchanged.
- The Mach-O install-name metadata of each copied library was changed, yielding different bytes from the original. The libvips ID became `@rpath/libvips-mod.8.18.3.dylib`; FFmpeg's became `@loader_path/libffmod1.dylib`. Filenames remained at the paths expected by their existing consumers.
- The modified libraries and copied bundle were re-signed ad hoc. `codesign --verify --deep --strict` passed, with the original `0x2(adhoc)` signing flags retained.
- The copied runtime's loaded-library report identified both libraries inside the copied bundle, without a system fallback.
- A generated SVG was resized and encoded as PNG, JPEG and WebP. All six encoded/decoded hashes matched the pre-modification baseline; all outputs remained 256 × 144 pixels. The application archive stayed unchanged.

The [JSON record](2026-09-14-mac-library-replacement.json) retains the original/modified library hashes, signing reports, loaded paths and output hashes. The exact probe is [retained here](tools/mac-library-probe.cjs). The disposable check driver and modified bundle remain in the private local rehearsal folder.

## Repeatable steps for this QA preview

These commands apply to a trusted copy of the already ad-hoc-signed Apple Silicon Preview 28 QA package. They are not instructions for bypassing Gatekeeper or converting a future Developer ID release to ad-hoc signing. The metadata change is deliberately small: it checks whether the bundle can load changed library bytes while preserving the existing ABI.

1. Copy the verified app into a new rehearsal directory. Set `APP` to that copied `.app` and `PROBE` to the absolute path of the retained probe. Keep the original app available for comparison. Inspect the copy with `codesign -dv --verbose=2 "$APP"`; this rehearsal requires `Signature=adhoc` and `flags=0x2(adhoc)`.
2. Record the baseline:

   ```sh
   ELECTRON_RUN_AS_NODE=1 "$APP/Contents/MacOS/SyncShow" "$PROBE" "$APP" > baseline.json
   ```

3. Modify the two library IDs inside the copy:

   ```sh
   VIPS="$APP/Contents/Resources/app.asar.unpacked/node_modules/@img/sharp-libvips-darwin-arm64/lib/libvips-cpp.8.18.3.dylib"
   FFMPEG="$APP/Contents/Frameworks/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"
   install_name_tool -id '@rpath/libvips-mod.8.18.3.dylib' "$VIPS"
   install_name_tool -id '@loader_path/libffmod1.dylib' "$FFMPEG"
   codesign --force --sign - "$VIPS"
   codesign --force --sign - "$FFMPEG"
   codesign --force --deep --preserve-metadata=identifier,entitlements,flags --sign - "$APP"
   codesign --verify --deep --strict "$APP"
   ```

4. Repeat the probe into `modified.json`. Compare the image hashes with `baseline.json`, inspect the reported loaded-library paths, and verify with `otool -D` that both changed IDs remain in the copied files. Preserve the original package's hashes separately. A modified owner copy must not be represented as the original release artifact or pass its original file-hash verifier.

## Limits and remaining work

This is a **metadata-only modification**, not a from-source rebuild or a semantic codec change. FFmpeg was loaded by Electron, but no FFmpeg media-decoding test was performed. The probe ran headlessly with `ELECTRON_RUN_AS_NODE`; it did not exercise the GUI, projector outputs or a church service. No claim is made about macOS Intel, Windows, Linux, Developer ID signing or notarization.

Complete corresponding-source/build materials, actual rebuilt-library replacement, FFmpeg decoding after replacement, other native targets and protected release configuration remain required by the existing release gate. The current app and package verifiers were not changed. See the [native release-input record](2026-09-13-native-release-inputs.md).

## Recognition comparison deferred without spending

The next bounded transcription comparison is prepared with the current `aba43f7` capture/recognition modules. It pairs the retained 45-second Russian sermon with and without short synthetic topic hints, and the known 10.485-second English fixture with and without unrelated hints. These hints are a diagnostic constructed from the known passage, not the pastor's original notes. All four fixtures passed the offline pipeline check with zero provider requests.

The original Multilinguum host was unreachable: its pinned LAN route timed out and its configured SSH alias timed out during banner exchange. No paid test process was started and no budget reservation was made. The ready harness is retained privately under `.heritage/rehearsals/2026-09-14/recognition-context-08/`. This is not evidence that notes improve recognition or translation. The ledger remains $0.79 conservatively accounted, with zero pending reservation.
