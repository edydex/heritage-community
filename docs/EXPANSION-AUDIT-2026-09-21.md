# Expansion requirement audit — September 21, 2026

This audit separates delivered behavior from acceptance that still requires the
owner, physical equipment, or an authorized content source. It covers the
September expansion and the subsequent reader refinements. It does not mark
the complete integrated system as production-ready.

## Delivered source and packages

GitHub was checked again for these application revisions and release assets:

| Component | Source and delivery |
| --- | --- |
| Heritage Bible / Community | Reader release source `a16045070e938ab7a22d5cfcf0653a388210ab05`; Android **1.1.48-preview.1**, code **51**, published in the normal Latest feed with APK, build metadata and checksums. The web reader serves the matching assets. |
| SyncShow | Maintenance main `3c669bb2d2598cfba6671b7095e1586919737608` includes the [preview build/download repair](verification/2026-09-21-syncshow-release-routing.json); the published Preview **31** application tree still matches `a25d9d1b05de143a91b904fad8f3df1de9800ab8`. Its seven installers and ten verification/provenance assets remain available in the owner's private preview repository. |
| Multilinguum | Main `c86c384e3fe7e793e6e583d24bc559c85ba01a95`; integrated processor source includes the bilingual hint-budget correction. Standalone **0.1.1** Apple-silicon and Intel Mac installers were built and verified from the earlier `90f9130` application tree; their operator code is unchanged by this processor-only fix. [Permanent private publication](https://github.com/edydex/heritage-preview-builds/releases/tag/multilinguum-v0.1.1-preview.1) is complete; both installers and seven verification files were downloaded and compared byte-for-byte. |

The Android APK SHA-256 is
`b24e946275dce6413c220c0b8873961c6b947f3f26e6f8b0df5b52c9cd50620e`.
The [release receipt](verification/2026-09-21-android-1.1.48.json) records the
unchanged signer, all 697 bundled web files and eleven native test cases.
The live reader's HTML, entry JavaScript/stylesheet, Maximus text and
paragraph timing file, and Romans verse timings were compared with the released build. These checks do not
substitute for a physical phone update or human listening.

## Requirement-by-requirement result

| Request | Delivered and checked | Remaining boundary |
| --- | --- | --- |
| Monochrome teaching and slide authoring | Named patterned palettes, patterned fills/lines and used-color legends exist in Community authoring and SyncShow teaching. Chromium and Firefox checks covered actual pairing, save/reopen, grayscale preview, canonical audience colors and Undo. | Thin marks, stylus behavior, display refresh and usability on an actual reMarkable/BOOX are still untested. |
| Authorized Bible translation upload | Strict private UTF-8 JSON import, preview, permission, immutable digest, exact passage selection and output credits work in Community and desktop SyncShow. Database access checks, browser import flows and desktop save/offline-package checks passed. | LSB has not been acquired. A publisher-authorized structured file and software agreement are needed; no portable retail file was verified. See [the format and acquisition guidance](https://github.com/edydex/heritage_study_bible/blob/343e2324479dfbcb094879c7d7e9c09f2fcc23be/docs/BIBLE-IMPORTS.md). |
| Remove unused unpublished WOTBC songs/translations | Completed against the restored service presentations, with recovery copies and an exact change record. | Source decks, removed content and restoration records remain private. This does not authorize deleting newly added material. |
| Internal audiobooks, resume, downloads and storage | Persistent playback/resume/speed, a serialized recoverable download queue and Internal Storage deletion are implemented. A real LibriVox download played offline in an emulator, resumed after restart and was removed while playing without losing its saved position. | Whole-library downloads require the app to remain open. Physical phone, headset and mobile-network endurance remain acceptance work. |
| Audiobook text navigation and live following | All ten internally readable books / **384 recordings** have installed automatic phrase-to-paragraph data, including matching historical text editions. Following is on by default; unmatched narration is left unmarked. Edition changes preserve old bookmarks. | Match coverage is not a human-reviewed accuracy score. Maximus now uses Hefele/Clark (1896), section 303, with 91 matched paragraphs / 77.7% recording coverage; unmatched narration remains blank. See [coverage and reproduction](https://github.com/edydex/heritage_study_bible/blob/a16045070e938ab7a22d5cfcf0653a388210ab05/docs/AUDIOBOOK-TEXT.md). |
| Android Auto | Media3 library/service supports browsing, resume, shared phone/car controls and background playback. Packaged modern/legacy browser and service tests passed. | No physical car/head-unit acceptance is claimed. A separate Android Automotive OS application was not requested or built. |
| Bible recordings and verse following | All **66 BSB books / 1,189 chapters** are available. Complete-text GPU alignment replaced the old dataset across the entire Bible; **29,630 of 31,102 entries** have accepted timings. Independent large-v3 samples and full-library structural checks are recorded in source. | **95.27% is coverage, not accuracy.** Uncertain entries still cannot be used for exact seeking. During timing gaps the marker advances to the next nonempty verse; several consecutive missing timings hold there until an accepted interval resumes. Exact-edition SYNO/UKRK recording permission is unresolved. See [sources, samples and limitations](https://github.com/edydex/heritage_study_bible/blob/a16045070e938ab7a22d5cfcf0653a388210ab05/docs/BIBLE-AUDIO.md). |
| Minimal reader controls | Play/Pause is beside the chapter selector. Audio Settings contains follow preferences, speed, chapter selection and whole-BSB download confirmation. No forced first-play delay or extra fixed player remains. A verse tap during playback seeks to an accepted timestamp. | Test the new APK on the owner's phone; emulator and desktop browser evidence are distinct. |
| Original-language parallel and word study | Named WLC/OSHB Hebrew-Aramaic and Nestle 1904 Greek sources; 94,788 checked Greek/BSB groups across 6,596 matching verse records in all 27 NT books; occurrence results show contextual BSB phrases and full verses with highlights; gentle tints or B&W patterns with diagonal lines; tap for occurrences and hold for counterpart. Parallel reading omits verse-note interaction. Greek occurrence lookup uses source lemmas. | Other word-form searches explicitly state their narrower scope. Variants, unmatched words and unverified verse numbering are not invented. Hebrew/Aramaic results show BSB context without exact word mapping; other translations are not claimed to have word alignment. See [source details](https://github.com/edydex/heritage_study_bible/blob/c70e88ed35ee248d1ba43e150a751fce9ea41ec5/docs/ORIGINAL-LANGUAGES.md). |
| Muse default, secure token entry and notes bias | Automatic recognition prefers configured Muse for supported English; Russian uses an explicit OpenAI fallback. Manager token entry is encrypted at rest and excluded from browser storage/responses. Bounded local sermon vocabulary biases recognition; the translator receives the configured notes context. English human-narration recognition and translation passed a bounded provider check. | Consult the owner’s private operational handoff for provider-test records and authorization. Venue capture, meaning, optional speech and a full service need acceptance. Optional Spark processing was not needed for the implemented local vocabulary extraction. |
| Repository and release normalization | Maintained changes are on main; Android and private SyncShow packages are published and independently verified. Completed remote branches were pruned after ancestry checks. Original dirty workspaces have private, restore-verified backups. | Standalone Multilinguum private publication and independent download verification are complete. Public SyncShow distribution still has native dependency/source/relinking and official Drive configuration gates. Do not delete unrelated active branches or local work. |
| Proposed prophecy-fulfillment context | The chronological plan’s Day 250 note has four optional Egypt comparisons below its timeline, with oracle/event dates, biblical placement, source links and uncertainty. [Source basis](https://github.com/edydex/heritage_study_bible/blob/5e3bc8e4a2901085648e7fa34bbc4e9547b505db/docs/PROPHECY-HISTORICAL-CONTEXT.md). | Specialist historical/theological review remains pending. No forty-year fulfillment date is invented. Wider coverage and the musician screen remain later work. |

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
