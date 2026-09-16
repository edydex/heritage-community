# Preparation workspace, shortcuts and song previews

Source `8662221acc3277a0411b5956ebf19012d70c62a5`. [Machine-readable evidence](2026-09-16-preparation-qol.json).

Prepare Sermon places its title, sermon picker and New sermon above Status/Save in the left pane, with one workspace menu. Slide/sermon/date, screen choices and Undo/Sermon Preview share one row. The Other slide inspector is beside the slide, with independent scrolling. Right-click a slide (or use Shift+F10) and choose Slide settings to open the settings dialog for that slide.

Ctrl+Z and Command+Z use the existing slide undo history. Inputs and inline text retain native text undo; preview presentation and busy saves do not accept project undo. The button remains available. Both keyboard modifiers were exercised in Chrome and Firefox, including preservation of native text undo.

Bible passage entry shares Heritage's parser and book metadata. `1 chr 3 7-10` resolves to 1 Chronicles 3:7–10. Ambiguous prefixes offer canonical book choices, with invalid chapters disabled. Whole-input parsing rejects incomplete or trailing ranges. The existing exact-text Bible lookup remains authoritative; slides require one chapter per reading, while manuscript passages can span chapters. Manual book/verse selection is retained.

Song previews show the first section, with presentation markers removed, on hover or keyboard focus. Escape closes the preview, and moving into it allows reading longer sections. Community song collection cells load through the existing authorized API, the planner uses its authorized library, and public songbook previews derive only from the published snapshot. Heritage reader previews use its existing song resolver and cache. Private songs gain no public access. Touch taps continue to open the song.

## Verification

- 228 reader unit and 124 protocol checks passed. The focused parser, song publication/search, Bible lookup and planner suite passed all 20 cases. Community TypeScript and production build passed.
- Actual Prepare Sermon/Planner components and styles passed isolated API browser rehearsals in Chrome and Firefox: save/reopen, images, highlighted text, drag/resize/rotation, separate Russian and stage previews, sidebar/header placement, right-click settings, hover/focus previews, shortcut resolution and both undo keys. Desktop 1440×1000 and compact 1024×768 screenshots were inspected.
- The live public WOTBC songbook also passed hover, keyboard-focus and Escape checks in Chrome and Firefox with its two published songs; no church content was changed.
- Six live reader checks passed in Chrome and Firefox, covering first-click verse navigation, prefix choices, and song hover/focus without accidental navigation. The live entry file is byte-identical to the source build.

Android 1.1.39-preview.1 (code 42) is published in the normal Latest feed. Its three downloaded assets match their GitHub digests and checksums; all 539 packaged web files match the tested build. CI verified the unchanged signer against the previous APK and passed all four native tests. The actual Latest response passes the existing checker from 1.1.32, 1.1.36 and 1.1.38, and reports 1.1.39 as up to date. All four Community CI jobs passed. WOTBC runs the exact pinned revision. All 30 changed Community source files match the tested checkout, and the running bundles contain the new editor, preview and shortcut controls. Independent health/public-site and backup checks passed. All 11 private recording objects (3,883,891 bytes) retain the same inventory checksum; staging is empty. Safety backup: `backup-20260916T234044Z-pre-update`. A transient SMTP DNS warning occurred during migration; the hostname resolved in the running app afterward. No email was sent. SyncShow Preview 30 is unchanged and remains compatible; no desktop package was rebuilt for this browser editor update.

Physical phone installation and church tablet/projector acceptance remain separate. No paid provider calls or real church sermon edits were made for these checks. The Deep Testing guide retains its 38 case IDs and saved-result key.
