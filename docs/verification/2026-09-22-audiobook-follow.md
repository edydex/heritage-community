# Audiobook sentence following

Heritage PRs [37](https://github.com/edydex/heritage_study_bible/pull/37) and [38](https://github.com/edydex/heritage_study_bible/pull/38) refine following in the shared reader used by ordinary and Community books.

- Sentence timing is sorted by spoken order, including a reference spoken before the quotation it follows in print. Overlapping source mappings are merged without dropping the beginning.
- Following advances when the sentence extends below 75% of the screen and places its beginning near 15%. Actual header/footer bounds keep text clear on short screens. A sentence taller than the viewport stays anchored at its beginning instead of repeatedly chasing its end.
- Existing Community book IDs, reading positions and download isolation remain unchanged. Reopen an updated book online for its current narration and timings. Replace an older offline edition using **Remove download**, then **Download book & audio**.

Validation: 319 reader tests and 127 protocol tests passed, and the production build succeeded. A real browser playing a public audiobook through the ordinary reader placed the active sentence at 108px in a 720px viewport, below its 56px header. The test playback was paused afterwards. Tests cover the exact 75% boundary, 15% destination, short screens, obscured text and long sentences. Physical phone listening and subjective narration accuracy remain separate acceptance.

These changes ship together in Android 1.1.53-preview.1 (code 56). The first attempt to build that unpublished version was intentionally cancelled to include the requested scrolling change; no published tag was replaced. Private recordings and their operational receipts remain outside public source.

The web deployment for `ecb0394cf3f310eb0af4677035ae3a6b9c1aea03` passed. The live HTML references the same compiled entry bundle as the local verified build; a brief public audiobook playback check confirmed sentence following and stable placement. Test playback was paused. This is a public-book reader check, not a claim of private member-session or physical-phone acceptance.

[Android 1.1.53-preview.1](https://github.com/edydex/heritage_study_bible/releases/tag/v1.1.53-preview.1) is published in the normal Latest feed. All three downloaded release files matched their hashes; the APK signature, identity, 696 bundled web assets and 13 native tests were independently checked. The actual update-checker code reports an update from 1.1.32 and 1.1.52 and up-to-date on 1.1.53. [Release receipt](2026-09-22-android-1.1.53.json).
