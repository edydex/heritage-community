# Consistent slide authoring — September 22

Community [PR 39](https://github.com/edydex/heritage_study_bible/pull/39) and SyncShow [PR 15](https://github.com/edydex/SyncShow/pull/15) are merged. Follow-up [Community PR 40](https://github.com/edydex/heritage_study_bible/pull/40) and [SyncShow PR 16](https://github.com/edydex/SyncShow/pull/16) preserve existing page boundaries and keep fitting above the minimum font size. [Community PR 41](https://github.com/edydex/heritage_study_bible/pull/41) removes the superseded per-verse line estimate that falsely warned about overflow. Their shared font metrics, layout metadata and renderer version match. Use SyncShow Preview 35 with this editor.

## What to test

1. In Plan a service or Prepare a sermon, click **＋ Add slide** in the left pane. The palette occupies the main panel; choosing an item returns to the slide. Escape closes the palette.
2. Select a text slide. Use **Text layout** to align Text, Heading or Author/source left, center or right. Font size accepts a typed replacement on Enter or blur. Reading changes apply to all its pages.
3. Select a song lyric slide. Its compiled font size is consistent across the whole song and both audience languages. **Remember for this song** saves the fitted size and alignment for future library additions; existing service copies remain independent.
4. Select a reading title and choose **Pre-sermon**. Reference, edition and topic are separate editable objects, matching the September 20 reference. The same choice is available when adding Scripture.
5. New Welcome slides default to a left-aligned topic. Existing edited service copies are preserved. A Quote/Text slide inherits the current sermon heading; its source field no longer overlays the heading.

## Verification

The local Community typecheck and 32 focused tests passed. GitHub's seven checks passed, including the production build/migration/backup flow and real PostgreSQL suites. Local browser rehearsal verified palette navigation, title/quote layout, template switching and typed font changes. Native rendering/package tests passed 44 targeted checks, followed by the full GitHub regression and package gates on four platforms.

The Heritage source pin `6dc0cea00ab08efd00979f6f9005c6f1eb1523e0` includes the final browser-only warning correction; it does not alter SyncShow packages. PR 41 passed all seven checks and is merged. The supported updater completed its safety backup, build, startup and local/public checks. A fresh live browser load shows the fitting six-verse Psalm page and the normal editing hint, with no false overflow warning. Operational server revision and backup details remain in the private deployment log.

The saved September 20 service has 51 slides. All 117 English/Russian/stage-channel song and Scripture renderings completed at 1920×1080. Regular reading pages retain size 85 and sermon passages 78. “Мы славим Тебя” uses size 82 across the song, allowing its long authored lines to stay intact. Sizes are logical pixels at the native resolution. Reopening that saved service after the final correction keeps all 51 slides in their original order without creating unsaved changes. The final live manager check shows **51 slides · Saved**, with Save disabled. **Remember for this song** persisted size 82 to the song library and was confirmed by the server record. No service was saved during these checks. Private decks, service snapshots and images are excluded. Physical venue acceptance remains separate.

## External Bible sources

The existing foolishandweak.org integration uses NASB95 RefTagger. The publishers permit limited quotations on presentation slides, subject to their terms. A public popup widget is not a confirmed API for an indefinitely retained, editable presentation library. No LSB/NASB API import is enabled in this release; see [verified source options and remaining requirements](https://github.com/edydex/heritage_study_bible/blob/main/community-server/docs/BIBLE_PASSAGE_SOURCES.md). Existing authorized portable Bible imports remain available.

## Release provenance

Final package run [35784567500](https://github.com/edydex/SyncShow/actions/runs/35784567500) passed all four native targets. The tested checkout `1cb722f568fc857f0ecdf26fb8136d584215ffe6` and merged main `9a8d41a05e53d0b6edc3202bdad6cd99d405e6c1` share tree `7b442c98946e91c72f0f779d9792ecf23fb69677`. All seven local installer hashes/sizes match their workflow receipts. The final Windows installer is 129,371,901 bytes with SHA-256 `fae6d9aee159687ef55287d512c376ca900ae40eefd4b7a33d0572c649df774a`.

[Preview 35 is published](https://github.com/edydex/heritage-preview-builds/releases/tag/syncshow-v1.4.0-preview.35) in the private owner-testing repository. All 17 remote asset sizes and digests match the verified local files. A fresh Windows download from the published release matches the hash above. The four-platform [regression run](https://github.com/edydex/SyncShow/actions/runs/35784567431) also passed. These checks cover native launch, PDF/Sharp capabilities and the shared service workflow; they do not establish physical projector or venue acceptance.
