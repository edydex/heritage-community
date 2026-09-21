# SyncShow Community preview

Version **1.4.0-preview.32** includes Community preparation, full-screen/lower-third/ticker translation, and paired tablet teaching. The pointer fades progressively over one second; the remote gallery lets the pastor choose nearby slides, and any remote's confirmed slide change shows a wide notice on the host control screen. Translation screens can open without loading slides or starting Show. Preview 29 adds separately approved access to private recordings from the shared controls. The shared console also loads saved language, Quality/Economy, speech and note choices for a prepared service.

## Download and install

Published September 21, 2026 (Pacific time). All seven installers, provenance and checksums are attached; every published asset’s size and SHA-256 matches the verified local file.

The [permanent private GitHub downloads](https://github.com/edydex/heritage-preview-builds/releases/tag/syncshow-v1.4.0-preview.32) add the distinct reading/sermon Scripture layouts and per-output sermon title images; patterned monochrome tablet controls and authorized Bible imports remain available. Sign into GitHub with access to `edydex/heritage-preview-builds`. That repository is private; the integration/source repositories are public. These downloads remain available after temporary CI artifacts expire.

| Computer | Installer |
| --- | --- |
| Windows 10/11, x64 | [Download Windows installer](https://github.com/edydex/heritage-preview-builds/releases/download/syncshow-v1.4.0-preview.32/SyncShow.Setup.1.4.0-preview.32.exe) |
| Mac, Apple Silicon | [Download arm64 DMG](https://github.com/edydex/heritage-preview-builds/releases/download/syncshow-v1.4.0-preview.32/SyncShow-1.4.0-preview.32-arm64.dmg) |
| Mac, Intel | [Download x64 DMG](https://github.com/edydex/heritage-preview-builds/releases/download/syncshow-v1.4.0-preview.32/SyncShow-1.4.0-preview.32-x64.dmg) |
| Linux, x64 | [AppImage](https://github.com/edydex/heritage-preview-builds/releases/download/syncshow-v1.4.0-preview.32/SyncShow-1.4.0-preview.32.AppImage) or [Debian package](https://github.com/edydex/heritage-preview-builds/releases/download/syncshow-v1.4.0-preview.32/sync-show_1.4.0-preview.32_amd64.deb) |

1. Quit any running SyncShow copy.
2. On Windows, run the EXE and follow the installer. On Mac, open the DMG and copy SyncShow to Applications. Keep your previous installer until your church rehearsal passes.
3. Open the new copy and confirm application version `1.4.0-preview.32`. The attached provenance file records the exact source and checksums. Native package metadata uses counter `140032`. Update Preview 29 before loading a service with Other slides or text highlights.

The preview uses the normal SyncShow settings and service library. Automated package checks use a separate temporary profile. Windows is unsigned. The Mac preview is ad-hoc signed and not notarized; use macOS's per-app Open Anyway action if it blocks this known preview. No automatic updater is enabled by this private download publication.

These installers are retained for owner testing in the private preview-builds repository. SyncShow's public release checks still require dependency source/relinking materials and official Drive configuration. The ordinary QA packages omit maintainer Drive credentials; Community and local presentations do not need those credentials.

## Preview build status

Preview 32 passed all four native package and launch checks. Seven installers and ten verification/checksum files are published permanently at the links above; all uploaded digests match and the Windows download was independently compared. See the [service-layout verification](verification/2026-09-21-service-layout.md).

Preview pushes and manual **Build and Release** runs call the four-platform packaging workflow. Temporary workflow artifacts expire after seven days; the private release downloads do not. Older Preview 31 bytes remain unchanged. See the earlier [workflow repair](verification/2026-09-21-syncshow-release-routing.json).

## Standalone Multilinguum Mac console

[Multilinguum 0.1.1 private downloads](https://github.com/edydex/heritage-preview-builds/releases/tag/multilinguum-v0.1.1-preview.1)
are available for Apple silicon (`aarch64`) and Intel (`x64`), on macOS 13 or
newer. Both installers and all seven checksum/verification files were downloaded
back from GitHub and matched byte-for-byte. The Apple-silicon app was launched
and its version checked; Intel hardware and actual mixer capture remain to be
tested. These are ad-hoc-signed previews, without Developer ID signing or
notarization.

This is an optional standalone console. It connects to an existing configured
processor and contains no provider credentials or bundled translation server.
The integrated controls remain available directly in Community and SyncShow.

## Connect the church

Connect **Heritage Community** to `https://wotbc.heritage.faith` and approve its presentation/translation capabilities. Your usual Prepare → Load → Show workflow remains available offline after the service package is loaded.

- **Live translation** opens the same operator console as the Community administration page. Select a prepared service to load its saved choices, or use Unplanned service. Choose English/Russian, Quality/Economy, notes and generated speech there. Use Save for this service during preparation; Economy note sharing is chosen separately for each session. Recognition defaults to Muse for English and OpenAI for Russian. Muse tokens can be saved in the manager console; the OpenAI key belongs in server setup.
- **Recorded services → Browse recordings** opens finalized original/translated transcripts and available audio. If an older connection asks for recording-review access, reconnect this church and approve that permission, or sign into Community in a browser. This review does not publish or attach material to a sermon.
- Connect the microphone or mixer on the computer that receives the preacher's audio. macOS may request Microphone permission. Text-only translation still needs source audio, but does not generate translated speech.
- Configure each congregation output as full-screen translation, lower third, ticker or hidden. These outputs do not display the pulpit video.
- Without a presentation, choose **Open screen** to use that output for translation alone. **Hide** leaves it black; **Close screen** returns to the desktop. Starting a slide Show takes over its outputs after the normal preflight succeeds. None of these screen controls starts or stops the shared translation session.
- Open **Remote Control**, pair the tablet on the same network, expand **Teach** and select the congregation output. Use pen/highlighter, colors, Undo and Clear ink. **Stylus only** is optional and off initially; leave it off if the browser reports the pen as touch or mouse.
- Choose **Pointer** for temporary emphasis: each part of the trail fades after about one second, even while you keep drawing. It does not alter saved ink. Open the slide gallery to see the current slide and its neighbors; **Show all** expands the list. A confirmed slide selection or previous/next action from any paired remote produces a six-second notice on the host control screen, with a dismiss button. Projection and stage screens do not show that notice.
- Congregants use `/live` for the YouTube player with translation choices, or `/translate` for translation without video.

## Build and verify another platform

Run `node bin/heritage.mjs bootstrap`, then open the pinned SyncShow folder reported by `node bin/heritage.mjs status`. Use Node.js 24, `npm ci`, `npm run ci`, and the native platform build command from [SyncShow's preview guide](https://github.com/edydex/SyncShow/blob/389791c9af20393bdc3bb3b9c0128769895a6756/docs/COMMUNITY_PREVIEW.md).

The [Preview 32 package workflow](https://github.com/edydex/SyncShow/actions/runs/35666565564) built CI checkout `0fdaae6d2711bfb4209f61a54b4412cfc2b9befe`, whose source tree equals reviewed commit `82ab63a9da0e8febd3fb1452ebeed934633a77d3` and merged main `389791c9af20393bdc3bb3b9c0128769895a6756`. Each platform launches its packaged application and checks its runtime before uploading QA artifacts. The release retains these exact verified bytes and provenance.

In Community, choose **Prepare a sermon → Other**, or add Other under Sermon while planning a service. Add text, pictures, braces and circles; drag the Move, Resize and Rotate handles or use numeric controls. Select words for **Highlight**. English and Russian can have separate layouts; Russian follows to the stage output. Save, add the sermon to a service and load it in Preview 32. See the [current verification record](verification/2026-09-16-reader-canvas.md).

Physical tablet, mixer and venue-network acceptance remain to be done. A bounded real-sermon provider test ran on the original Multilinguum host, but exposed recognition errors; it does not establish WOTBC delivery or translation quality. See the [Preview 29 and recording-review record](verification/2026-09-14-shared-archive-review.md) and [API-test budget](verification/api-test-budget.json).

Preview 31 introduced **Monochrome** in tablet teaching, with named patterns and a used-color reference while congregation colors stay unchanged. Authorized Bible editions can be installed through **Prepare → This computer → Scripture → Bible translations**; imported text and credits travel with offline service packages. Check the installed server and configured providers separately before the venue rehearsal; provider success does not establish physical capture or bilingual sermon quality.

The September 21 service-layout update adds forgiving verse/chorus/part headings, per-song default language, a reading title slide and prior sermon-point context over Scripture. English/Russian sermon title images are independent. Existing service song snapshots stay unchanged; re-add a song to adopt updated library formatting. [Verification and acceptance limits](verification/2026-09-21-service-layout.md).
