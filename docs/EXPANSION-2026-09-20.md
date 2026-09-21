# September 20 expansion and repository normalization

Active work. The latest checkpoint below supersedes older chronological checkpoints; outstanding acceptance is stated explicitly.

## Scope and acceptance

1. Preserve original dirty checkouts and local-only commits privately; compare against current GitHub code. Consolidate maintained source onto main after tests. Delete only branches whose work is preserved and merged. Publish verified Android and desktop packages; retain provenance and checksums.
2. Monochrome/color-accessible authoring and remote teaching: stable named colors with distinct patterns, matching palette swatches and used-color legend. Preserve intended color on normal audience outputs. E-ink option minimizes animation; actual reMarkable/BOOX browser compatibility needs hardware acceptance.
3. Licensed Bible import: validated portable upload, copyright/permission metadata, preview and explicit install, church-only storage by default, same passages in Community and SyncShow. Test with openly licensed/synthetic fixtures. LSB purchase for another application does not establish a portable software license; obtain publisher-approved source/use permission.
4. WOTBC cleanup (completed September 20): remove only unpublished songs/translations absent from all authoritative service presentations. Keep backups and a before/after manifest. The user restored 15 PPTX files to `~/Documents/church_services`; slide text and source SHA-256 hashes have been extracted to a private working inventory. The live audit and cleanup are complete; see the checkpoint below.
5. Heritage audio: internal player, persistent book/track/time resume, offline download/removal via Internal Storage, text navigation when alignment exists, native background media session and Android Auto browse/play where supported. Bible audio includes edition/narrator/rights, validated timing data, optional following of the active verse without altering annotations. Do not present approximate alignment as exact, or map a different translation's recording onto text.
6. Original languages parallel: user clarified Hebrew where Hebrew, Aramaic where Aramaic, and Greek where Greek, with actual source editions named. Septuagint is an ancient Greek OT translation, not the requested original-language corpus. Start word alignment with Romans using Greek NT data. Prefer licensed scholarly data and attested word alignments; do not invent equivalences or conflate verse numbering.
7. Later: chronological-plan prophecy fulfillment table. Distinguish prediction date, proposed fulfillment date, scholarly interpretation and uncertainty; connect to contextual chapters and historical sources. Ezekiel/Egypt is a candidate case, not a settled identification.
8. Muse: real streaming/file transcription adapter, preferred provider where language support permits, clear Russian fallback, secure server-side token storage, paste-and-test settings, notes-derived keyword hints and optional reviewed model extraction. Muse ASR currently documents 25 languages excluding Russian/Ukrainian, turn-level (not word-level) timing, 60-minute streaming sessions and $0.18/hour. Do not route Russian silently to unsupported ASR. Notes influence recognition/translation; ASR itself does not synthesize speech.

## Current basis

- Heritage `8662221acc3277a0411b5956ebf19012d70c62a5`
- SyncShow `9a9ebf7379797c68e99a2ea1f7a9dcefd1551458`
- Multilinguum `c92aafe9f317e514240bd9621e2945448d9741d2`
- Integration `933c5f94d0b90cf4fbd96cd3c7300aa04df595a1`
- Isolated working root: `/private/tmp/heritage-expansion-20260920`; all four branches `codex/accessibility-audio-expansion`.
- API test budget remains $20 total; existing ledger accounts $0.81. Token file supplied by user is RTF; never print or commit it.

## Verified primary references

- https://dev.meta.ai/docs/speech-to-text
- https://dev.meta.ai/docs/models
- https://lsbible.org/faqs/ (publisher requests software agreements via info@316publishing.com)
- https://lsbible.org/permission-to-quote-the-lsb/
- https://support.renewedvision.com/hc/en-us/articles/360041814913-Installing-Bibles-in-ProPresenter (purchases tied to ProPresenter licenses)
- https://audiobible.org/ (BSB narrations explicitly CC0)

## Muse implementation checkpoint (September 20, Pacific time)

- Multilinguum implementation is committed locally as `2e1d16e` on `codex/accessibility-audio-expansion` in the isolated Multilinguum workspace. Community integration is committed locally as `1389b56` on the matching branch in the isolated Heritage workspace.
- Both source commits are published on their named integration branches after the user explicitly approved both commits and public destinations. Remote refs were independently checked: Multilinguum `2e1d16e02163593f40ce7a7e22dc6e7c34fc2821`, Heritage `1389b5639993cc89cf974ec6355cd2fecef5f1e4`. Draft reviews now exist: Heritage PR #16 and Multilinguum PR #2. Multilinguum CI passed all three jobs; all four Community jobs passed on the initial head. Reader CI exposed an older missing-session UI bug and Mac-only screenshot paths; these were fixed in f0c9244 and checks are rerunning on the updated head. Earlier automatic approval review denials were resolved by that specific approval. Source publication is not deployment.
- Implemented: Muse streaming recognition, English preference and explicit Russian fallback, selectable provider in standalone/managed consoles and service-plan settings, locally extracted notes vocabulary for Muse and OpenAI, turn ordering and session rotation, encrypted server token storage, manager-only Community credential proxy and token settings UI.
- Real supplied-token handshake and clean shutdown passed. A 12.306-second synthesized English recognition test retained all expected words, including Ezekiel, Nebuchadnezzar and justification. This is not a human-sermon or venue acceptance test.
- Validation: all 170 Multilinguum tests, full typecheck and build; 17 focused Community tests and Community typecheck. Chromium and Firefox tested the standalone token form with fake credentials and mocked APIs. Token cleared after save and never entered browser storage. Actual supplied token scanned against all changed files before committing and was absent.
- Initial sandboxed macOS speech synthesis produced an empty file; its two-second silence request is explicitly recorded as a fixture failure, not recognition quality evidence. The second fixture's duration and non-silent samples were checked before sending.
- Budget ledger: $0.81 conservatively accounted of $20; no pending reservation. Actual account billing remains unverified. No provider data-sharing setting was changed.
- WOTBC has NOT been updated for Muse. Its last verified app revision remains `8662221`; processor `c92aafe` was the prior delivery basis, not re-inspected in this checkpoint. No token was persisted to WOTBC. No release artifacts were produced for this increment.

### Next required work

1. Finish current integration CI, then build/deploy through the supported unified updater, configure the supplied Muse token via the tested API, and verify the real Community operator flow and an actual capture session. Update component pins and delivery receipts only after successful deployment. Source publication is not deployment.
2. Continue monochrome authoring/teaching, licensed Bible import/LSB publisher-source guidance, internal audio/download/storage/timing/Android Auto, and original-language Romans alignment. The numbered scope above remains intact; these are not completed by the Muse work.
3. Finish preserving original dirty checkouts/local-only commits before repository normalization. Main-branch consolidation, release verification and safe branch cleanup remain undone.

### Evidence handling

GitHub metadata currently identifies `edydex/heritage-community` as PUBLIC. Do not assume integration evidence is private. Raw song inventories, service text, credentials and local backup manifests remain outside all public repositories. The current unpublished local evidence checkpoint needs a public-data review before publication.

## Song cleanup checkpoint

Completed and independently verified on WOTBC: all 15 restored decks / 1,573 slides were compared against individual language documents. Archived 18 unused private families through Payload hooks in one guarded transaction. Eight service-used private families and all ten published families remain active. One previously archived rehearsal row remains unchanged. No individual translation removals were needed: both language versions appear in the retained bilingual families. All lyric/source document bytes remain available for restoration; service documents were not edited.

The supported verified backup is `backup-20260921T002805Z-before-song-cleanup-20260920`. Private before/after snapshots, exact manifest, source-deck hashes and verification are preserved outside Git in the local Documents/Heritage-private-audits folder. Do not publish those raw files. Three task-created maintenance containers were stopped after transaction completion; normal app/processor/database containers remain healthy.

## Original languages checkpoint

Published implementation (10c0087, followed by CI wiring 1d3a92c) adds the named Nestle 1904 Greek NT as a parallel option: 27 books, 260 chapters, 7,943 verse records. Greek/BSB word links for Romans use the publisher’s attested table only where both whole-verse word sequences match the displayed editions; 5,187 groups across 376 verses, 56 verses intentionally unlinked where wording differs. The source is pinned to the Biblical Humanities morphology CSV commit/hash (CC0), not its separately licensed XML markup. UI supports patterned underlines and exact pair focus/hover/tap without changing saved annotation offsets. Hebrew/Aramaic remain outstanding. See Heritage docs/ORIGINAL-LANGUAGES.md. This increment is not yet released or deployed.


## Monochrome and CI repair checkpoint

Published source on `codex/accessibility-audio-expansion`:

- Heritage `ca85c272aa1e31e5ddd3abe486c9a5d2967fcdcb` includes Community authoring patterns and local settings; previous commit `f0c9244` repairs local church-session detection and portable Playwright screenshots.
- SyncShow `ad37d95` includes local tablet preview conversion, named pattern swatches and a current-output ink legend.
- Draft reviews: https://github.com/edydex/heritage_study_bible/pull/16, https://github.com/edydex/SyncShow/pull/8, https://github.com/edydex/multilinguum/pull/2.

Community typecheck and production Next build passed. Chromium and Firefox rehearsed actual planner components: named color editing, undo, save/reopen, exact preservation of canonical item data, local preference persistence and compact layout. Three palette tests are now included in Community CI. Reader session repair passed five unit tests and the 17 browser tests in affected files.

SyncShow syntax check and its full suite passed: 2,247 passing tests, two existing skips. Real local HTTP pairing plus the actual remote UI passed in Chromium and Firefox using a generated host/slide fixture: original blue stored at the host while the tablet preview is all grayscale, persistent preference, undo/legend and narrow layout. Local mode never changes audience ink colors. Raster preview patterns group similar hues; fine marks can require Medium/Bold. Community images are grayscale; semantic objects/highlights and colored-text underlines carry patterns. See each component's monochrome documentation for the distinction.

These are source and local-browser results, not installed-release, projector, WOTBC deployment or real e-ink-device acceptance. No new installers were produced in this checkpoint. WOTBC remains on the previous code revision; only the separately verified song cleanup was applied live. Audio/storage/Android Auto, licensed Bible upload, Hebrew/Aramaic and the remaining release/consolidation work are still outstanding. The goal remains active.

## Internal audiobook player checkpoint

Heritage `7649469bc831846a535b772707ef3bc16def5cf1` is published on the expansion branch. The internal player replaces external embeds, stays active across routes, remembers individual recording positions and speed, and offers Resume without autoplay. The bundled public LibriVox metadata covers ten books/384 tracks, including distinct Antiquities volumes. Android uses the official File Transfer plugin with temporary files, byte-count/MP3-header checks and serialized index commits. Failed downloads preserve existing recordings. Internal Storage lists saved tracks plus interrupted/unused audio files and deletes them with confirmation while retaining listening positions and other data.

Verification: 255 reader unit tests, 124 protocol tests and the complete 45-test Chromium browser suite passed. Three audio tests also passed in Firefox. Real LibriVox streaming in both browsers resumed at 73 seconds and advanced to 74, then sought to 125 and advanced to 126, without page errors. Android debug and instrumentation APKs compile with Java 21/SDK 36; the two native storage tests are awaiting emulator execution. A non-publishing Android workflow was requested for packaged acceptance. No installer is newly released by this checkpoint.

All previous hosted Heritage/Muse/SyncShow checks are green, including SyncShow's four platform QA packages and four platform test jobs. Fresh Heritage checks are running for the audio increment. SyncShow's current branch head is `c8d0331` (optional browser harness import correction after `ad37d95`).

Still outstanding: exact audiobook text timing/navigation, Bible audio with verse timing/autoscroll, native Android background playback/Android Auto, licensed translation upload, Hebrew/Aramaic data, real-device/venue checks, server deployment and final repository/release normalization. The text button currently opens the book; it does not claim sentence alignment. No additional model spending was incurred; the conservative ledger remains $0.81 of $20.

## Native Android audio checkpoint

Heritage `4c2eccb6326a302a28b11b710302cbd9566da2f5` is published on the expansion branch. Android now uses one Media3 service for app, notification, headset and Android Auto media controls. The native catalog browses without launching the reader or signing in, with Continue listening, Downloaded and Audiobooks roots. The car and WebView share the same queue, position and speed. Reopening the app cannot overwrite newer car progress with a stale web cache. The service resolves only bundled recording IDs, rejects arbitrary client URLs and confines downloaded files to its private audio directory. Normal launch never autoplays.

All eleven packaged tests passed on an isolated, offline Android 15 arm64 emulator: four new actual Media3/legacy-browser tests, two audio storage tests, four Community/Keystore/sync tests and the application identity test. A generated PCM recording proved offline decode, app/car shared controls and playback after closing the reader. A notification intent lifecycle issue found in that run was fixed. Five adapter unit tests and three Chromium audio regressions passed; the complete reader unit/protocol suite had passed at 260/124. Android release verification now requires all ten named Community/audio checks and the exact bundled catalog. Source is published; the non-publishing Android workflow is running as 35554078605. The previous audio-foundation hosted Android, reader and Community checks all passed.

Physical phone/headset and car head-unit acceptance remain outstanding. The code provides phone-connected Android Auto media support, not a standalone Android Automotive OS application. GitHub-installed media apps may require Android Auto's documented Unknown sources developer setting. See Heritage docs/AUDIO-PLAYER.md for the device walkthrough. Exact text/verse timings, additional Bible audio, licensed Bible import, Hebrew/Aramaic, deployment and repository/release consolidation remain active work.

## Android route and Bible import checkpoint

Heritage `0142f8c` repairs a fresh-start race where saved-passage navigation could replace an incoming audio notification link. HomeRedirect now checks the actual route before redirecting. All 264 reader unit tests, 124 protocol tests and 45 Chromium tests passed. Hosted Android run `35555304857` passed all eleven packaged tests. A real 3,040,072-byte LibriVox MP3 also passed download, offline playback/seek, force-stop/restart at the retained paused position, and active-file deletion without losing that position. Physical car/phone acceptance remains outstanding; no new APK release was published.

Heritage `951a2c6` adds the private church Bible library: strict portable JSON validation, sample preview, recorded permission, immutable digest-checked editions, manager/origin checks, hidden full-text storage, and per-output edition selectors in service/sermon preparation. Selected excerpts retain their attribution and source identity. The supplied sample is public-domain BSB Romans 1:1–3, not LSB. Direct proprietary/OSIS/USFM imports remain unsupported; publisher-approved exports can use the documented JSON format. No LSB purchase or publisher email was performed.

Actual migrated PostgreSQL acceptance covered authorization, tenant boundaries, hidden source, immutable/conflicting installs, preview/permission binding, exact passages and missing verses. Chrome and Firefox exercised upload through saved service slides on a production local server, including narrow layout. TypeScript, production build and 25 focused regressions passed. Heritage head `c454190` also aligns the shared renderer identity. All six hosted reader/Community jobs passed, including dedicated Bible import database acceptance (Community run `35557611661`, reader run `35557611719`).

SyncShow `006e786` projects Scripture credits separately from the verse words and stage next-line text in native audience/stage scenes and raster previews. Renderer 12 prevents reuse of old uncredited package artifacts, while existing renderer-11 packages still open offline unchanged. New credited packages require the updated app. Full local CI passed: 2,250 tests and two existing skips. Forty focused tests include old-package compatibility; 24 Chrome/Firefox layout cases covered three presets, two canvas sizes and audience/stage views. All nine hosted jobs passed, including Windows, both Mac architectures and Linux QA packages (runs `35557708757` and `35557708905`). These QA builds are not a new published installer release.

These source changes are on the expansion branches and draft PRs. WOTBC has not been redeployed for them, and the deployment lock remains unchanged. Standalone SyncShow full-edition installation is the next Bible-import increment; Community-prepared excerpts already use the pinned passage contract. Exact audiobook text timing, Bible audio/verse timing, Hebrew/Aramaic, Muse deployment and human-sermon acceptance, private preservation of original dirty work, main consolidation and verified releases remain active work. The API ledger remains $0.81 of $20.

## Desktop Bible import and UTF-8 checkpoint

SyncShow `ee25a1c` completes standalone full-edition installation under Prepare → This computer → Scripture → Bible translations. The same strict JSON parser is used in Community and desktop. Native file selection previews an immutable, expiring main-process snapshot; explicit permission is required before installation. Files are private, digest-checked and immutable; damaged files and missing verses fail visibly without falling back to another edition. Per-output selectors update after installation. Sample export and format guidance are included.

Real Electron acceptance installed the public sample, selected it, added Romans 1:1–3 to a service, and saved all three exact outputs with credits. A separate package rehearsal prepared that saved service, removed the source installation, and reopened the package with the same text and credits on all outputs. That is local package evidence, not an interactive venue rehearsal. Full desktop CI passed 2,254 tests with two existing skips. All nine hosted jobs passed on this head: package run `35558803871` and test run `35558803883`, including actual packaged runtime checks on Windows, Linux and both Mac architectures.

Heritage `0e32102` adds fatal UTF-8 decoding before upload, preventing silent replacement of invalid source bytes. Chrome/Firefox rejected invalid bytes before any preview API request and accepted a valid UTF-8 BOM sample. TypeScript and production build passed. Reader CI passed; the Community run `35558843179` was still running at this checkpoint.

Both heads are published. There is no new installed release or WOTBC deployment in this checkpoint. Bible audio/timing, audiobook text alignment, Hebrew/Aramaic, Muse deployment and real capture, repository preservation/consolidation and releases remain active work. No additional API spending.

## BSB audio checkpoint (September 21 UTC)

Heritage `6433c79dcd7fae799db7e11946dcc0cedca121a4` is published. The internal player now includes all 66 BSB books / 1,189 Barry Hays chapter recordings, a separate Bible library/car root, resume/download/delete support, chapter controls, temporary gray verse markers and optional scrolling within the current chapter. Explicit text navigation chooses BSB; saved notes and highlights are unaffected. Runtime text mismatches and timing-fetch failure do not interrupt playback.

Public-domain recording permission is stated by Bible Hub and AudioBible.org. Exact media URLs, sizes/durations and bounded header hashes were collected from OpenBible.com. A pinned, MIT-licensed contributed MMS alignment dataset had many truncated verse texts. The importer deliberately accepted only 14,912 complete matching verses with confidence, duration and overlap checks. The remaining 16,190 verse records are unhighlighted. These are automatic timings, not auditory verification or complete synchronization. Details and deterministic generator: Heritage docs/BIBLE-AUDIO.md.

267 unit tests / 124 protocol tests passed. All five audio browser tests passed in Chromium and Firefox; real public Romans 1 playback/seek also passed in both with no page errors/phone overflow. Playback smoke was muted, so it does not establish spoken-word alignment accuracy. Android app/instrumentation packages compile and native car acceptance now checks the Bible root/queue. Hosted non-publishing Android run35559852399 and reader35559855486/Community35559855487 are running. No new released APK or deployment yet. Previous Heritage0e32102 checks all passed.

SyncShowee25a1c all9checks passed; Multi2e1d16e unchanged. No added API spend ($0.81 ledger). Remaining work includes complete timing quality, exact audiobook alignment, Hebrew/Aramaic, Muse deployment/capture, dirty-original preservation, main consolidation and verified releases.

## Hebrew and Aramaic checkpoint

Heritage `b22dae852faf69cb65c85ea40ec543f258f5a892` is published on the expansion branch. All 39 OT books now use the named WLC 4.20 / Open Scriptures Hebrew Bible witness. Right-to-left text keeps written readings separate from qere alternatives; the generator accounts for all 305,507 written source words, retains source references and handles reviewed BSB verse-boundary differences. Hebrew Psalm headings remain separate. Nehemiah 7:68 is absent from this witness and is not invented. Unverified primary numbering such as UKRK leaves the source column empty. Greek and attested Romans links remain available. See Heritage docs/ORIGINAL-LANGUAGES.md.

271 reader unit tests and 124 protocol tests passed. Five focused Hebrew/audio browser tests passed in each of Chromium and Firefox, including narrow layouts and the visible BSB audio marker in parallel mode. Production build passed. Hosted acceptance for this head is running: Android 35560995243, reader 35560940843, Community 35560940758. All BSB 6433c79 hosted checks, including eleven packaged Android tests, finished successfully.

No new deployment or released APK in this checkpoint. Exact audiobook text navigation, improved Bible-audio timing, Muse deployment/human-sermon capture and repository preservation/consolidation/releases remain active. No added API spending.

## Deployed Muse and private preservation checkpoint (September 21 UTC)

The supported unified updater completed on WOTBC at 04:55 UTC. The independent deployment receipt and checkout confirm Heritage `b22dae852faf69cb65c85ea40ec543f258f5a892` and processor `2e1d16e02163593f40ce7a7e22dc6e7c34fc2821`; SyncShow `ee25a1c` is recorded in the compatible set, not installed by the server updater. Community, PostgreSQL and the processor are healthy. Public discovery, the tunnel, nightly backup timer, and all seven checksums in `backup-20260921T044754Z-pre-update` passed. That backup includes all 12 finalized private recording objects. Running Muse adapter and encrypted-store module SHA-256 values match the locally built published source.

The user-provided Muse key was verified through the provider handshake and saved on WOTBC. The settings file is encrypted, mode 0600, and contains no plaintext key. The real signed-in Community manager page confirms the saved token and the Automatic preference for English. The server currently has no OpenAI key; the UI correctly blocks translation startup and explains the missing provider. This is configuration and deployment evidence, not a human-sermon translation acceptance result. Recovery of the existing original processor key is in progress; no extra provider spend was incurred.

Original dirty Heritage and SyncShow workspaces were preserved separately from maintained source. Staged/unstaged patches, untracked files and local-only commit bundles restore all 243 Heritage and 677 SyncShow changed paths byte-for-byte, including index state. Bundle prerequisites resolve against current public source clones. The user explicitly approved uploading the archives and restore instructions to a separate private backup repository. Both published archives were downloaded and their SHA-256 checksums match. The original workspaces remain untouched; private notes/images and raw audit material were not added to public source.

All hosted checks on Heritage `b22dae8` passed, including eleven packaged Android tests (35560995243), reader (35560940843) and Community (35560940758). Audiobook paragraph navigation is undergoing a local full-library Whisper pass; it is not yet published or included in a released APK. Source consolidation and new verified desktop/Android releases remain active work.
