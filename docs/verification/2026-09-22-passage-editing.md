# Editable passages and sermon layout

Community PR [36](https://github.com/edydex/heritage_study_bible/pull/36) and SyncShow PR [14](https://github.com/edydex/SyncShow/pull/14) add matching authoring and presentation support. Use SyncShow Preview 34 or newer for these service documents.

## Operator walkthrough

- Enter `John 8:31-32,44` in Passage shortcut. Only verses 31, 32 and 44 are included, on one slide for this short selection. The operator decides where to put `…`.
- Click Scripture text in either a sermon passage or a regular reading to remove words or add `[context]`. Edits affect the slide; the original Bible passage and its checksum remain intact. English and Russian are independent, and the stage output follows Russian.
- To start over, right-click the passage in the left pane and choose **Restore original passage text**. Undo can restore the excerpt again.
- On a Title slide, enter the title beside **Show title text**. The title supplies the following passage heading even when the checkbox is off. The first point then becomes the context heading.
- Quote/Text has an optional centered heading, left-aligned quotation, and separate right-aligned author/source. Empty guides are not projected.
- In Other slides, text being edited stays attached to its box while moving it. Font size accepts a replacement value and applies its bounds when Enter is pressed or the field loses focus.

## Verification

Community typecheck and production build passed. The protocol suite passed 275 tests, and the feature gate passed 78; the focused passage suite covers selections, save/reopen, source integrity, quotation fields and legacy hidden titles. SyncShow's full local suite passed 2,263 tests with two existing skips; final native rendering/scene checks passed 24 tests, including a pixel check for right-aligned quotation attribution.

A real browser against an isolated local planner verified hidden-title entry; separated-verse insertion; English and Russian excerpt edits; stage output; regular reading editing; saving and reopening; restoration and undo; quotation layout; and typing immediately followed by dragging and a font-size replacement. This is separate from native package launch tests and physical venue acceptance. Private recording replacements and storage inventories are maintained in the church operational handoff, separately from these public source receipts.


## Published packages and deployed editor

Both source PRs are merged. The Community workflow passed all six jobs, including its production stack and real PostgreSQL integration suites. The supported Community updater completed its backup, migration, local health and public discovery checks. The live manager editor exposes the independent title field and editable Scripture text; no existing service was changed during that read-only check.

[SyncShow Preview 34](https://github.com/edydex/heritage-preview-builds/releases/tag/syncshow-v1.4.0-preview.34) is published in the private owner-testing repository. Packaging run [35693320350](https://github.com/edydex/SyncShow/actions/runs/35693320350) passed Windows, Linux and both Mac architectures. The release has seven installers and ten checksum/provenance/verification files. All 17 remote asset digests and sizes match the verified local artifacts. The Windows installer was downloaded from the published release again and matched SHA-256 `265cd8a4968d4d2e4c23cbdae49dd295c774390968f57f9274c4656c9bc37f51` (129,328,621 bytes).

The merged SyncShow source is `933bd709e812cb9858e2bfaad795d7279a06a8a3`. Its tree matches the tested packaging checkout. Physical projector, stage and venue acceptance remain separate.
