# SyncShow live translation integration

Status: implemented, locally rehearsed, and published as SyncShow `fe5dc25a91bd84776ab560194ed61f80cd47f1c6` with Heritage `7d5de50b02c99b8c65e68e05ba21b2cdfb659c5e`; pins are recorded in `components.lock.json`. This is a development checkpoint, not complete bilingual service acceptance.

## Behavior

- One public Community WebSocket in the main process distributes bounded, validated EN/RU captions to all outputs. Heartbeat loss freezes movement; reconnects retain session/sequence/revision checks. Replay bursts are coalesced and a screen joining mid-sermon starts at the latest phrase.
- Independent hidden, full-screen feed, lower-third and ticker layouts, text sizes, and manual overrides. Lower-third/ticker reserve presentation space; live Bible overlays preserve their complete layout above that space. No video feed is added to projection.
- Clear remains black through new captions; Hide and manual replacement are local projection operations. Provider generation and phone listeners are independent.
- Translation controls are available from Load and Show. The same Community operator opens in an isolated Electron window. The permanent device token is injected only into that window's exact same-origin POST lease exchange. Short-lived processor leases remain available to the operator, and audio-only permission is restricted to its top-level translation page. No auto microphone capture.
- Per-venue layout/language/font preferences persist; manual captions and microphone capture do not persist after restart. Open Translation to connect the caption feed after restarting. Projection screens still open through the normal loaded Show workflow; a dedicated translation-only screen launch remains future work.
- Community advertises the explicit translation approval scope when the companion is configured. Existing device grants do not gain that scope automatically.

## Findings corrected during real rendering

The baseline native rehearsal expected old plain verse-number/newline formatting; the current compiler emits superscript verse numbers in a paragraph. A clean original `9c616b8` copy failed that old expectation too. The fixture now independently pins the current text and hashes, including the derived next-line preview.

The repaired rehearsal then exposed an existing real transition bug: optional `videoState` calls returned `undefined` on text layout helpers, which was incorrectly treated as an active video child. Leaving a text cue threw `nested.pauseVideo is not a function` (and a derived stage cue could throw `nested.videoState is not a function`). Native video delegation now selects only children that implement video state. Reveal exceptions reject the pending frame request cleanly. A focused regression checks text scenes' video operations and the actual Electron cue sequence verifies the transition.

With the caption band enabled, the derived stage next-line preview could exceed its reduced height. It now prefers the current cue's typeface and size while bounding the line height to the actual available region.

## Evidence

- Real `verify-translation-electron.js` rehearsal: one credentialless local WebSocket, actual display/singer renderers, EN/RU source text, no HTML interpretation, independent stage manual replacement, Clear/new-caption behavior, ticker motion/freeze, long Russian pagination, per-output hide, and actual sandboxed operator window/device-to-lease exchange. No microphone/provider used.
- Actual `main.js` app through its real preload and IPC, launched twice with an isolated temporary profile: output controls, unconfigured-output rejection, saved language/layout/size, nonpersistent manual text, and actionable disconnected state passed. Screenshots were inspected.
- Native weekly matrices with `SYNCSHOW_REHEARSAL_TRANSLATION_BAND=1`: direct and derived stage routes at 640×360 and 1920×1080 passed, with 108 sender-bound acknowledgments, 36 rendered captures, and four persisted/reopened rehearsal receipts. All nine cues, BSB/LSV source text, sermon text, images, blank/end states and overflow rejection were covered.
- Focused native text/video control, cue navigation, scene, translation, preference, access-boundary, and discovery checks passed. The final full suite passed: 2,213 passed, zero failed, two skipped (2,215 total). Syntax checking covered 209 JavaScript files.
- Actual SyncShow `CommunityClient` discovered WOTBC's translation resource and its `TranslationFeed` connected to the public socket in idle state. No device token, session start, capture, or provider request was used.
- The umbrella `doctor` now reports `translation: true` from the actual WOTBC discovery response.

Local evidence lives under `/private/tmp/heritage-unified-20260912/`: `translation-renderer-sequential.log`, `translation-controls-smoke.log`, `native-baseline.log`, `native-translation-verified.log`, `syncshow-tests-release.log`, and `syncshow-focused-final.log`. The synthetic screenshot folders are in the macOS temporary root (`syncshow-translation-LX6ja6`, `syncshow-translation-controls-vd1Kzo`). They contain no real congregation content.

## WOTBC update

Heritage `7d5de50b02c99b8c65e68e05ba21b2cdfb659c5e` was published and deployed with `heritage-community update --no-pull` from the verified clean previous revision `e191c15`. Source remains clean. Community, PostgreSQL and the unchanged Multilinguum companion `6f00fb5` are healthy. All local/public update checks passed. The safety backup `backup-20260913T062337Z-pre-update` verified all seven checksums, including the translation archive; the private recording inventory still covers 11 objects / 3,883,891 bytes.

No live service was started. No provider key was added, no OpenAI data-sharing setting changed, and paid testing remains $0 of the authorized $20.

## Remaining acceptance

A released/installed SyncShow build, physical venue screen routing, mixer capture with real EN↔RU translation, speech-on/off provider verification, phone playback, the Quality/Economy profiles, service-default/cue association, and standalone translation projection still require work. These tests do not prove those flows or personal email/two-device sync.
