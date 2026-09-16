# SyncShow Community preview

Version **1.4.0-preview.29** includes Community preparation, full-screen/lower-third/ticker translation, and paired tablet teaching. The new pointer fades progressively over one second; the remote gallery lets the pastor choose nearby slides, and any remote's confirmed slide change shows a wide notice on the host control screen. Translation screens can open without loading slides or starting Show. Preview 29 adds separately approved access to private recordings from the shared controls. The shared console also loads saved language, Quality/Economy, speech and note choices for a prepared service.

## Download and install

The [permanent private GitHub downloads](https://github.com/edydex/heritage-community/releases/tag/syncshow-v1.4.0-preview.29) include the latest tested Opus recording-playback fix at `15fe0d7`. Sign into GitHub with access to the Heritage Community repository. They remain available after the temporary CI artifacts expire.

| Computer | Installer |
| --- | --- |
| Windows 10/11, x64 | [Download Windows installer](https://github.com/edydex/heritage-community/releases/download/syncshow-v1.4.0-preview.29/SyncShow-Setup-1.4.0-preview.29-x64.exe) |
| Mac, Apple Silicon | [Download arm64 DMG](https://github.com/edydex/heritage-community/releases/download/syncshow-v1.4.0-preview.29/SyncShow-1.4.0-preview.29-arm64.dmg) |
| Mac, Intel | [Download x64 DMG](https://github.com/edydex/heritage-community/releases/download/syncshow-v1.4.0-preview.29/SyncShow-1.4.0-preview.29-x64.dmg) |
| Linux, x64 | [AppImage](https://github.com/edydex/heritage-community/releases/download/syncshow-v1.4.0-preview.29/SyncShow-1.4.0-preview.29.AppImage) or [Debian package](https://github.com/edydex/heritage-community/releases/download/syncshow-v1.4.0-preview.29/sync-show_1.4.0-preview.29_amd64.deb) |

1. Quit any running SyncShow copy.
2. On Windows, run the EXE and follow the installer. On Mac, open the DMG and copy SyncShow to Applications. Keep your previous installer until your church rehearsal passes.
3. Open the new copy and confirm application version `1.4.0-preview.29`. Earlier local Preview 29 copies share that version; use these links to get the latest build. The attached provenance file records the exact source and checksums. Native package metadata still has counter `140028`.

The preview uses the normal SyncShow settings and service library. Automated package checks use a separate temporary profile. Windows is unsigned. The Mac preview is ad-hoc signed and not notarized; use macOS's per-app Open Anyway action if it blocks this known preview. No automatic updater is enabled by this private download publication.

These installers are retained for maintainer testing in the private integration repository. SyncShow's public release checks still require dependency source/relinking materials and official Drive configuration. The ordinary QA packages omit maintainer Drive credentials; Community and local presentations do not need those credentials.

## Connect the church

Connect **Heritage Community** to `https://wotbc.heritage.faith` and approve its presentation/translation capabilities. Your usual Prepare → Load → Show workflow remains available offline after the service package is loaded.

- **Live translation** opens the same operator console as the Community administration page. Select a prepared service to load its saved choices, or use Unplanned service. Choose English/Russian, Quality/Economy, notes and generated speech there. Use Save for this service during preparation; Economy note sharing is chosen separately for each session. Provider credentials belong in server setup.
- **Recorded services → Browse recordings** opens finalized original/translated transcripts and available audio. If an older connection asks for recording-review access, reconnect this church and approve that permission, or sign into Community in a browser. This review does not publish or attach material to a sermon.
- Connect the microphone or mixer on the computer that receives the preacher's audio. macOS may request Microphone permission. Text-only translation still needs source audio, but does not generate translated speech.
- Configure each congregation output as full-screen translation, lower third, ticker or hidden. These outputs do not display the pulpit video.
- Without a presentation, choose **Open screen** to use that output for translation alone. **Hide** leaves it black; **Close screen** returns to the desktop. Starting a slide Show takes over its outputs after the normal preflight succeeds. None of these screen controls starts or stops the shared translation session.
- Open **Remote Control**, pair the tablet on the same network, expand **Teach** and select the congregation output. Use pen/highlighter, colors, Undo and Clear ink. **Stylus only** is optional and off initially; leave it off if the browser reports the pen as touch or mouse.
- Choose **Pointer** for temporary emphasis: each part of the trail fades after about one second, even while you keep drawing. It does not alter saved ink. Open the slide gallery to see the current slide and its neighbors; **Show all** expands the list. A confirmed slide selection or previous/next action from any paired remote produces a six-second notice on the host control screen, with a dismiss button. Projection and stage screens do not show that notice.
- Congregants use `/live` for the YouTube player with translation choices, or `/translate` for translation without video.

## Build and verify another platform

Run `node bin/heritage.mjs bootstrap`, then open the pinned SyncShow folder reported by `node bin/heritage.mjs status`. Use Node.js 24, `npm ci`, `npm run ci`, and the native platform build command from [SyncShow's preview guide](https://github.com/edydex/SyncShow/blob/codex/heritage-live-translation/docs/COMMUNITY_PREVIEW.md).

The [integration PR](https://github.com/edydex/SyncShow/pull/7) runs source tests and creates QA packages for Windows x64, Linux x64 and both Mac architectures. The [latest package workflow](https://github.com/edydex/SyncShow/actions/runs/34872066617) passed all four targets, including actual packaged application launch, PDF, Sharp and the shared service workflow. Each downloaded package matches its CI checksum. The CI merge revision `4ffc241` and branch revision `15fe0d7` have identical Git trees. Seven installers/archive copies plus checksums and receipts are now retained in the private GitHub release.

The earlier Apple Silicon package at `3ae4f2b` was also checked manually on this Mac; that observation should not be confused with a physical installation of the newer Windows package. The latest packages' CI launch checks passed, while the installation wizard, real tablet and venue equipment remain in the walkthrough. See the [publication record](verification/2026-09-15-syncshow-preview-release.md).

Physical tablet, mixer and venue-network acceptance remain to be done. A bounded real-sermon provider test ran on the original Multilinguum host, but exposed recognition errors; it does not establish WOTBC delivery or translation quality. See the [Preview 29 and recording-review record](verification/2026-09-14-shared-archive-review.md) and [API-test budget](verification/api-test-budget.json).
