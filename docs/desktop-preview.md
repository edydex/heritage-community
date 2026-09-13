# SyncShow Community preview

Version **1.4.0-preview.25** includes Community preparation, full-screen/lower-third/ticker translation, and paired tablet teaching. The unified workspace pins the matching source alongside Heritage and Multilinguum.

## Install on a Mac

Use the installer for your Mac: `arm64` for Apple Silicon, or `x64` for Intel. The verified local Apple Silicon installer and checksum evidence are retained under:

```
.heritage/installers/syncshow/1.4.0-preview.25/<source-revision>/macos-arm64/
```

1. Quit any running SyncShow copy.
2. Open the DMG and copy SyncShow to Applications. Keep your previous app copy until your church rehearsal passes.
3. Open the new copy and check that About shows `1.4.0-preview.25`.

The preview uses the normal SyncShow settings and service library. Automated package checks use a separate temporary profile. The Mac preview is ad-hoc signed and is not notarized; use macOS's per-app Open Anyway action if it blocks this known preview.

## Connect the church

Connect **Heritage Community** to `https://wotbc.heritage.faith` and approve its presentation/translation capabilities. Your usual Prepare → Load → Show workflow remains available offline after the service package is loaded.

- **Live translation** opens the same operator console as the Community administration page. Select English/Russian, Quality/Economy, notes and generated speech there. Provider credentials belong in server setup.
- Connect the microphone or mixer on the computer that receives the preacher's audio. macOS may request Microphone permission. Text-only translation still needs source audio, but does not generate translated speech.
- Configure each congregation output as full-screen translation, lower third, ticker or hidden. These outputs do not display the pulpit video.
- Open **Remote Control**, pair the tablet on the same network, expand **Teach** and select the congregation output. Use pen/highlighter, colors, Undo and Clear ink. **Stylus only** is optional and off initially; leave it off if the browser reports the pen as touch or mouse.
- Congregants use `/live` for the YouTube player with translation choices, or `/translate` for translation without video.

## Build and verify another platform

Run `node bin/heritage.mjs bootstrap`, then open the pinned SyncShow folder reported by `node bin/heritage.mjs status`. Use Node.js 24, `npm ci`, `npm run ci`, and the native platform build command from [SyncShow's preview guide](https://github.com/edydex/SyncShow/blob/codex/heritage-live-translation/docs/COMMUNITY_PREVIEW.md).

The [integration PR](https://github.com/edydex/SyncShow/pull/7) runs source tests and creates temporary QA packages for Windows x64, Linux x64 and both Mac architectures. Those GitHub artifacts expire after seven days. The verified Preview 25 copies are retained locally under the same source-revision folder in `ci-34750060464/qa-package-<target>/`, covering Windows, Linux and both Mac architectures. This development preview is separate from the protected public-release workflow.

Physical tablet, mixer, venue-network and bilingual-provider acceptance remain to be done. Paid provider testing remains $0 of the authorized $20 allowance. See the [verification record](verification/2026-09-13-desktop-preview.md) for the exact tested revision and package evidence.
