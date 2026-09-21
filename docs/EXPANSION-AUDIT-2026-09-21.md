# Expansion requirement audit — September 21, 2026

This audit separates delivered behavior from acceptance that still requires the
owner, physical equipment, or an authorized content source. It covers the
September expansion and the subsequent reader refinements. It does not mark
the complete integrated system as production-ready.

## Delivered source and packages

GitHub was checked again for these application revisions and release assets:

| Component | Source and delivery |
| --- | --- |
| Heritage Bible / Community | Reader release source `343e2324479dfbcb094879c7d7e9c09f2fcc23be`; Android **1.1.43-preview.1**, code **46**, published in the normal Latest feed with APK, build metadata and checksums. The web reader serves the matching assets. |
| SyncShow | Main `a25d9d1b05de143a91b904fad8f3df1de9800ab8`; Preview **31**, seven installers and ten verification/provenance assets available in the owner's private preview repository. |
| Multilinguum | Main `c86c384e3fe7e793e6e583d24bc559c85ba01a95`; integrated processor source includes the bilingual hint-budget correction. Standalone **0.1.1** Apple-silicon and Intel Mac installers were built and verified from the earlier `90f9130` application tree; their operator code is unchanged by this processor-only fix. [Permanent private publication](https://github.com/edydex/heritage-preview-builds/releases/tag/multilinguum-v0.1.1-preview.1) is complete; both installers and seven verification files were downloaded and compared byte-for-byte. |

The Android APK SHA-256 is
`ea8a218c2ef2487f06fa369c66b732cb6fd8f454991171e11bc25039bb62b5e8`.
The [release receipt](verification/2026-09-21-android-1.1.43.json) records the
unchanged signer, all 666 bundled web files and eleven native test cases.
The live reader's 66 Bible timing files, Greek concordance, HTML, JavaScript and
stylesheet were also compared with the released build. These checks do not
substitute for a physical phone update or human listening.

## Requirement-by-requirement result

| Request | Delivered and checked | Remaining boundary |
| --- | --- | --- |
| Monochrome teaching and slide authoring | Named patterned palettes, patterned fills/lines and used-color legends exist in Community authoring and SyncShow teaching. Chromium and Firefox checks covered actual pairing, save/reopen, grayscale preview, canonical audience colors and Undo. | Thin marks, stylus behavior, display refresh and usability on an actual reMarkable/BOOX are still untested. |
| Authorized Bible translation upload | Strict private UTF-8 JSON import, preview, permission, immutable digest, exact passage selection and output credits work in Community and desktop SyncShow. Database access checks, browser import flows and desktop save/offline-package checks passed. | LSB has not been acquired. A publisher-authorized structured file and software agreement are needed; no portable retail file was verified. See [the format and acquisition guidance](https://github.com/edydex/heritage_study_bible/blob/343e2324479dfbcb094879c7d7e9c09f2fcc23be/docs/BIBLE-IMPORTS.md). |
| Remove unused unpublished WOTBC songs/translations | Completed against the restored service presentations, with recovery copies and an exact change record. | Source decks, removed content and restoration records remain private. This does not authorize deleting newly added material. |
| Internal audiobooks, resume, downloads and storage | Persistent playback/resume/speed, a serialized recoverable download queue and Internal Storage deletion are implemented. A real LibriVox download played offline in an emulator, resumed after restart and was removed while playing without losing its saved position. | Whole-library downloads require the app to remain open. Physical phone, headset and mobile-network endurance remain acceptance work. |
| Audiobook text navigation and live following | All nine internally readable books / **383 recordings** have installed automatic phrase-to-paragraph data, including matching historical text editions. Following is on by default; unmatched narration is left unmarked. Edition changes preserve old bookmarks. | Match coverage is not a human-reviewed accuracy score. Maximus has external text only, so internal paragraph following is unavailable for that recording. See [coverage and reproduction](https://github.com/edydex/heritage_study_bible/blob/343e2324479dfbcb094879c7d7e9c09f2fcc23be/docs/AUDIOBOOK-TEXT.md). |
| Android Auto | Media3 library/service supports browsing, resume, shared phone/car controls and background playback. Packaged modern/legacy browser and service tests passed. | No physical car/head-unit acceptance is claimed. A separate Android Automotive OS application was not requested or built. |
| Bible recordings and verse following | All **66 BSB books / 1,189 chapters** are available. Complete-text GPU alignment replaced the old dataset across the entire Bible; **29,630 of 31,102 entries** have accepted timings. Independent large-v3 samples and full-library structural checks are recorded in source. | **95.27% is coverage, not accuracy.** Low-confidence, unreviewed numeric and intentionally blank entries remain unhighlighted. Exact-edition SYNO/UKRK recording permission is unresolved. See [sources, samples and limitations](https://github.com/edydex/heritage_study_bible/blob/343e2324479dfbcb094879c7d7e9c09f2fcc23be/docs/BIBLE-AUDIO.md). |
| Minimal reader controls | Play/Pause is beside the chapter selector. Audio Settings contains follow preferences, speed, chapter selection and whole-BSB download confirmation. No forced first-play delay or extra fixed player remains. A verse tap during playback seeks to an accepted timestamp. | Test the new APK on the owner's phone; emulator and desktop browser evidence are distinct. |
| Original-language parallel and word study | Named WLC/OSHB Hebrew-Aramaic and Nestle 1904 Greek sources; attested Romans word correspondences; gentle tints or B&W patterns with diagonal lines; tap for occurrences and hold for counterpart. Parallel reading omits verse-note interaction. Greek occurrence lookup uses source lemmas. | Other word-form searches explicitly state their narrower scope. Variants, unmatched words and unverified verse numbering are not invented. Romans links are not a claim of an aligned whole Bible. See [source details](https://github.com/edydex/heritage_study_bible/blob/343e2324479dfbcb094879c7d7e9c09f2fcc23be/docs/ORIGINAL-LANGUAGES.md). |
| Muse default, secure token entry and notes bias | Automatic recognition prefers configured Muse for supported English; Russian uses an explicit OpenAI fallback. Manager token entry is encrypted at rest and excluded from browser storage/responses. Bounded local sermon vocabulary biases recognition; the translator receives the configured notes context. English human-narration recognition and translation passed a bounded provider check. | Consult the owner’s private operational handoff for provider-test records and authorization. Venue capture, meaning, optional speech and a full service need acceptance. Optional Spark processing was not needed for the implemented local vocabulary extraction. |
| Repository and release normalization | Maintained changes are on main; Android and private SyncShow packages are published and independently verified. Completed remote branches were pruned after ancestry checks. Original dirty workspaces have private, restore-verified backups. | Standalone Multilinguum private publication and independent download verification are complete. Public SyncShow distribution still has native dependency/source/relinking and official Drive configuration gates. Do not delete unrelated active branches or local work. |
| Later prophecy-fulfillment context | A [research and uncertainty roadmap](https://github.com/edydex/heritage_study_bible/blob/343e2324479dfbcb094879c7d7e9c09f2fcc23be/docs/PROPHECY-FULFILLMENT-ROADMAP.md) is committed, as future work. | No fulfillment table is presented as completed historical research. The separately requested musician screen also remains later work. |

## Continue from here

1. Use the current [hands-on acceptance cases](expansion-testing.md) on the
   phone, presentation computer, e-ink tablet and car. Record the actual version,
   recording/passage and timestamp for defects.
2. The standalone Mac installers are now published privately; see the
   [release receipt](verification/2026-09-21-multilinguum-mac-release.json).
   Consult the owner’s private operational handoff, provider-test authorization
   and spending ledger before any further provider work.
3. Obtain licensed LSB source and any additional permitted recording editions
   before adding them. Neither a Bible's text license nor another app's purchase
   establishes permission to import its audio or proprietary module.

Both GPU alignment jobs are finished. No worker needs to be restarted for the
already shipped coverage. Raw recordings, intermediate transcripts, private song
audits, deployment credentials and API usage records remain outside this public
repository. The selected component pins identify reproducible application
revisions; a later documentation-only commit need not force another APK or
server deployment.
