# Song preparation and Scripture layouts — September 21, 2026

## Delivered source and installers

- Heritage/Community PRs [31](https://github.com/edydex/heritage_study_bible/pull/31) and [32](https://github.com/edydex/heritage_study_bible/pull/32); final reviewed `37c8c8bffa12769e12e91871c541f4b35eec4673`, merged `0c3ce7d60024224fc6eacc0c0cdd51a2a3d40a41`, identical trees.
- SyncShow [PR 11](https://github.com/edydex/SyncShow/pull/11); reviewed `82ab63a9da0e8febd3fb1452ebeed934633a77d3`, merged `389791c9af20393bdc3bb3b9c0128769895a6756`, identical trees.
- [Preview 32 downloads](https://github.com/edydex/heritage-preview-builds/releases/tag/syncshow-v1.4.0-preview.32): seven installers plus ten receipt/checksum files. All 17 uploaded asset sizes and GitHub SHA-256 digests match local verified files. The Windows EXE was downloaded again and compared byte-for-byte (`8e7635bfefb09a405ceb43ef33b895dcb189f79ef12fa4b114c5cbdc63df3d84`).
- [Four-platform package/launch checks](https://github.com/edydex/SyncShow/actions/runs/35666565564) and [source CI](https://github.com/edydex/SyncShow/actions/runs/35666565566) passed. Packaging attempt 2 reran interrupted uploads; all four platform jobs finished successfully. CI checkout `0fdaae6d2711bfb4209f61a54b4412cfc2b9befe` has the reviewed source tree `107f6e59895e122ceca6e2ab13e38c0ac7905185`.

## Behavior

Songs accept standalone verse/chorus headings with optional spacing, brackets, punctuation, and part letters. English and Russian heading forms are recognized. Repeated choruses remain separate occurrences, and empty imported wrapper markers do not create blank slides. Words are preserved. The real manager-form regression covers an unchanged hidden canonical document submitted alongside an edited visible lyric field; current visible edits now reach the planner.

The Songs list has an inline **Default song language** selector. New planner entries use that preference when the corresponding language is available. Metadata-only updates preserve canonical song documents. Existing saved service snapshots remain unchanged: re-add a song to adopt later library edits.

A Scripture reading outside a sermon begins with an editable passage/edition title card. Sermon passages use the latest title, main point or subpoint from that sermon, with a gold inline reference and white Scripture on black. Browser and native renderers reserve space below wrapped headings. Reference formatting changes only display text; original passage content and credits remain preserved in the service data.

Sermon title images can differ by English/Russian output, with the Russian choice following to the stage-facing output. The legacy shared image remains a fallback. Both images are retained as referenced assets in offline packages.

## Verification and limits

- Heritage's six final CI checks passed, including a real PostgreSQL/Payload song-save regression and production-stack build/migration checks.
- Full SyncShow local CI passed: 2,256 tests passed, two skipped, none failed.
- Chromium and Firefox planner checks passed for song parts/repeated chorus, default language, reading title, sermon context, long-heading non-overlap, independent title-image upload, and save/reload.
- Source references were privately inspected and rendered. The decks, lyrics, private operational logs and service content are not included in this public record.
- Physical projector/Windows/tablet acceptance remains separate from CI package launch and browser checks. Layouts follow the supplied reference structure; this is not a claim of pixel-identical PowerPoint rendering.

## Live Community acceptance

The supported updater completed its backup, migration and local/public health checks at the merged Heritage revision. In the signed-in browser, the song language preference persisted across reload and selected English for a newly added test entry; the prior Russian preference was restored. Both requested song examples were resaved through the corrected visible-lyrics path, then reloaded and compared: English/Russian words and publication state remained unchanged.

A separate unsaved test-service draft gained eight sections plus a title for the first song, and nine sections plus a title for the second. A Psalm 119 reading generated its passage/edition title and Scripture slides. A sermon passage displayed the preceding point in gold above its gold inline reference and white Scripture. English/Russian title-image selectors appeared independently. The rehearsal draft was closed without saving; existing service presentations were not modified. Server details and lyric comparison evidence remain private.
