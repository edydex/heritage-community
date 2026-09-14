# SyncShow Community preview

Version **1.4.0-preview.28** (build **140028**) includes Community preparation, full-screen/lower-third/ticker translation, and paired tablet teaching. The new pointer fades progressively over one second; the remote gallery lets the pastor choose nearby slides, and any remote's confirmed slide change shows a wide notice on the host control screen. Translation screens can open without loading slides or starting Show. The shared console also loads saved language, Quality/Economy, speech and note choices for a prepared service.

## Install on a Mac

Use the installer for your Mac: `arm64` for Apple Silicon, or `x64` for Intel. The verified Apple Silicon installer and checksum evidence are retained under:

```
.heritage/installers/syncshow/1.4.0-preview.28/5301a992638bdcc66a5253026658dd022320eda4/ci-34818135279/qa-package-macos-arm64/
```

1. Quit any running SyncShow copy.
2. Open the DMG and copy SyncShow to Applications. Keep your previous app copy until your church rehearsal passes.
3. Open the new copy and check that About shows `1.4.0-preview.28`.

The preview uses the normal SyncShow settings and service library. Automated package checks use a separate temporary profile. The Mac preview is ad-hoc signed and is not notarized; use macOS's per-app Open Anyway action if it blocks this known preview.

## Connect the church

Connect **Heritage Community** to `https://wotbc.heritage.faith` and approve its presentation/translation capabilities. Your usual Prepare → Load → Show workflow remains available offline after the service package is loaded.

- **Live translation** opens the same operator console as the Community administration page. Select a prepared service to load its saved choices, or use Unplanned service. Choose English/Russian, Quality/Economy, notes and generated speech there. Use Save for this service during preparation; Economy note sharing is chosen separately for each session. Provider credentials belong in server setup.
- Connect the microphone or mixer on the computer that receives the preacher's audio. macOS may request Microphone permission. Text-only translation still needs source audio, but does not generate translated speech.
- Configure each congregation output as full-screen translation, lower third, ticker or hidden. These outputs do not display the pulpit video.
- Without a presentation, choose **Open screen** to use that output for translation alone. **Hide** leaves it black; **Close screen** returns to the desktop. Starting a slide Show takes over its outputs after the normal preflight succeeds. None of these screen controls starts or stops the shared translation session.
- Open **Remote Control**, pair the tablet on the same network, expand **Teach** and select the congregation output. Use pen/highlighter, colors, Undo and Clear ink. **Stylus only** is optional and off initially; leave it off if the browser reports the pen as touch or mouse.
- Choose **Pointer** for temporary emphasis: each part of the trail fades after about one second, even while you keep drawing. It does not alter saved ink. Open the slide gallery to see the current slide and its neighbors; **Show all** expands the list. A confirmed slide selection or previous/next action from any paired remote produces a six-second notice on the host control screen, with a dismiss button. Projection and stage screens do not show that notice.
- Congregants use `/live` for the YouTube player with translation choices, or `/translate` for translation without video.

## Build and verify another platform

Run `node bin/heritage.mjs bootstrap`, then open the pinned SyncShow folder reported by `node bin/heritage.mjs status`. Use Node.js 24, `npm ci`, `npm run ci`, and the native platform build command from [SyncShow's preview guide](https://github.com/edydex/SyncShow/blob/codex/heritage-live-translation/docs/COMMUNITY_PREVIEW.md).

The [integration PR](https://github.com/edydex/SyncShow/pull/7) runs source tests and creates temporary QA packages for Windows x64, Linux x64 and both Mac architectures. Preview 28's [package workflow](https://github.com/edydex/SyncShow/actions/runs/34818135279) passed all four targets. These GitHub artifacts expire after seven days. The Apple Silicon installer is retained locally at the path above; its signature, source correspondence and actual executable launch were independently verified. Earlier retained previews remain in their version folders. This development QA preview is separate from the protected public-release workflow.

Physical tablet, mixer and venue-network acceptance remain to be done. A bounded real-sermon provider test ran on the original Multilinguum host, but exposed recognition errors; it does not establish WOTBC delivery or translation quality. See the [Preview 28 record](verification/2026-09-14-desktop-preview-28.md) and [API-test budget](verification/api-test-budget.json).
