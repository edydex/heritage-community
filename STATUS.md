# Heritage Community delivery status

Updated September 21, 2026 (UTC). [Interactive progress report](docs/progress.html) · [Continue on another computer](docs/CONTINUING-WORK.md) · [Deep Testing walkthrough](docs/deep-testing.html).

The September expansion is implemented and merged into the component repositories. A bounded English human-narration recognition/translation check passed; real-service acceptance remains separate. The remaining work includes timing review by listening, Russian sermon quality, physical-device/service acceptance and public desktop distribution. The progress report estimates roughly 80% readiness for an integrated first release; this is an engineering estimate, not measured reliability or test coverage.

## Current delivery

| Component | Current result |
| --- | --- |
| Heritage web reader | Live audio library, saved listening position, compact BSB playback, default-on text following, audiobook paragraph navigation and named original-language parallel texts. |
| Android | [1.1.47-preview.1 / code 50](https://github.com/edydex/heritage_study_bible/releases/tag/v1.1.47-preview.1) is published through the normal Latest feed. All three downloaded assets, signer, 697 bundled web files and eleven native tests passed; the actual checker detects it from older versions. [Release receipt](docs/verification/2026-09-21-android-1.1.47.json). |
| Community server | Accessible slide authoring, private Bible imports, existing preparation/calendar/song workflows and Muse settings are implemented. Operational deployment receipts remain private. |
| SyncShow | [Preview 31](https://github.com/edydex/heritage-preview-builds/releases/tag/syncshow-v1.4.0-preview.31) has seven verified private installers: Windows, both Mac architectures and Linux. All 17 assets were downloaded and matched their hashes. Public distribution gates remain open. |
| Multilinguum | Muse recognition, explicit Russian fallback, notes vocabulary and encrypted provider settings are implemented for the Community companion. Both 0.1.1 Mac installers passed hosted builds and independent mounted-bundle verification. The Apple-silicon download launches. [Both Mac installers](https://github.com/edydex/heritage-preview-builds/releases/tag/multilinguum-v0.1.1-preview.1) and seven verification files are published privately; all nine downloads match the verified originals. |
| Repository preservation | Maintained component features are merged into main. Original dirty Heritage/SyncShow workspaces were privately backed up and restored byte-for-byte; they were not reset or replaced. |

The integration/source repositories are **public**. Owner preview installers and original-workspace backups have separate private repositories. Do not place credentials, raw church recordings, service decks or private audit files here.

## September features and evidence

- **Accessible teaching:** named patterns and used-color legends in Community authoring and SyncShow tablet teaching. Normal audience colors are preserved. Browser and package checks passed; reMarkable/BOOX hardware remains untested.
- **Bible imports:** Community and SyncShow validate, preview and privately install authorized portable editions. Immutable source identity, exact passages and credits survive offline package reopening. See [import format and LSB guidance](https://github.com/edydex/heritage_study_bible/blob/main/docs/BIBLE-IMPORTS.md). An LSB publisher software agreement/file is still needed; no purchase or email was made.
- **Library cleanup:** the requested unused/unpublished-song cleanup is complete. Source-deck inventories, exact changes and restoration details remain in the private operational handoff.
- **Audio:** Play/Pause beside the chapter name; Audio Settings holds speed, default-on Bible/book following, chapters and whole-BSB downloads. Persistent resume, download recovery and Internal Storage are implemented. Native background/headset/notification controls and Android Auto browsing are implemented; eleven emulator tests passed. A physical phone and car/head unit remain separate acceptance.
- **BSB audio:** all 66 books / 1,189 Barry Hays recordings. All 1,189 chapters were rebuilt against complete text; accepted automatic timings cover 29,630 of 31,102 verse entries (95.27% coverage, not accuracy). The reading marker advances to the next nonempty verse during timing gaps; exact seeking still requires an accepted timestamp. SYNO/UKRK recordings require permission and exact-edition confirmation. [Audio sources and limits](https://github.com/edydex/heritage_study_bible/blob/main/docs/BIBLE-AUDIO.md).
- **Audiobook text:** all ten internally readable audiobooks / 384 recordings have checked phrase-to-paragraph links. Polycarp and Tertullian have separately named matching translations; Institutes includes both Allen volumes. Existing editions, bookmarks and recording IDs are preserved. Timings are automatic and unmatched passages remain unlinked. [Alignment method and reproducible commands](https://github.com/edydex/heritage_study_bible/blob/main/docs/AUDIOBOOK-TEXT.md).
- **Original languages:** named WLC 4.20 / OSHB Hebrew-Aramaic OT and Nestle 1904 Greek NT. All 27 NT books have checked Greek/BSB maps: 94,788 groups across 6,596 whole-verse matches; 1,347 differing verse records remain unlinked. Occurrence results show the actual BSB phrase highlighted in its full verse beside the original. Missing word mappings are labeled, and Hebrew/Aramaic results show BSB context without claiming exact word alignment. The parallel reader uses gentle color tints by default or patterned B&W links. Tap for word occurrences; hold or Shift+Enter for a checked counterpart. N1904 Greek searches use source lemmas; other searches label their word-form scope. [Sources and attribution](https://github.com/edydex/heritage_study_bible/blob/main/docs/ORIGINAL-LANGUAGES.md).
- **Muse:** English preference, explicit Russian OpenAI fallback, locally extracted sermon vocabulary and encrypted server token storage. Vocabulary extraction filters common Russian and English connecting words before ranking names and terms, preserving the bounded hint budget for bilingual notes. A bounded English recognition and Quality EN→RU translation check used public-domain human narration. It did not open a microphone, generate speech or start a public service. The hint-filter regression does not establish provider recognition accuracy. Operational receipts remain private.
- **Prophecy context:** Day 250 of the chronological plan has an optional Egypt comparison below the timeline. Four entries distinguish oracle dates, proposed events, evidence and unresolved features, with exact Scripture links and historical sources. Specialist review remains pending. [Verification](docs/verification/2026-09-21-prophecy-context.json). The musician screen remains future work.

The bilingual vocabulary correction passed deployed context-store checks using generated notes; see [the bounded verification record](docs/verification/2026-09-21-bilingual-hints.json). This establishes the corrected hint behavior, not measured recognition quality.

Earlier delivered calendar, song sharing/publication, search shortcuts, first-click verse navigation, slide objects/highlighting, compact editor, Undo, pointer/gallery and notes/progress sync remain available. Evidence is retained in [the dated verification records](docs/verification/), [the expansion chronology](docs/EXPANSION-2026-09-20.md), and the current [requirement audit](docs/EXPANSION-AUDIT-2026-09-21.md).

## Desired pins versus installed source

[components.lock.json](components.lock.json) selects these merged development revisions; it is not an accepted integrated production release.

| Component | Selected revision |
| --- | --- |
| Heritage / Community | `1d57fe30a4cac26f95450d928e2acbb33bec4743` |
| SyncShow | `a25d9d1b05de143a91b904fad8f3df1de9800ab8` |
| Multilinguum | `c86c384e3fe7e793e6e583d24bc559c85ba01a95` |

Installed server revisions, private storage inventories and provider-configuration checks belong in the private operational handoff. Inspect the trusted server with the supported status command before maintenance; desired source pins and actual deployment are distinct.

## Remaining acceptance

1. **Audio timing:** review the completed audiobook links by listening. The complete-text BSB alignment is shipped; listen across boundaries in multiple books and report discrepancies. Untimed entries cannot be used for exact seeking; the next nonempty verse stays marked until a verified interval resumes. Do not claim word-perfect synchronization.
2. **Russian/English service quality:** review actual sermon meaning, source capture, optional speech, stop/reconnect and a full-length service. The English provider rehearsal does not close this gate.
3. **Physical devices:** real Android update/sign-in/automatic sync, downloads/background playback/Android Auto, e-ink stylus patterns, projector/stage screens and loaded-service offline continuation.
4. **Authorized external content:** obtain a publisher-approved LSB software source and permitted exact-edition Russian/Ukrainian recordings. Do not infer recording rights from a text's public-domain status.
5. **Distribution:** finish public native dependency source/relinking notices and official SyncShow Drive configuration. Private owner previews do not bypass these public release requirements. Standalone Multilinguum desktop delivery is separate from the integrated server/console.
6. **Other product work:** direct recording-to-sermon attachment/publication remains unfinished. Later lesson replay, musician views, fully offline translation and wider prophecy research are tracked separately.

Paid provider tests require an approved budget and a private usage ledger. Audiobook matching uses local computation.

Maximus now has its matching internal historical text and paragraph following, completing internal text coverage for all ten audiobooks. The recording/download IDs remain stable. [Delivery verification](docs/verification/2026-09-21-maximus-audio-text.json).

Version 1.1.47 removes blank Bible reading highlights between verses. The marker advances as the previous interval ends, while tap-to-seek still requires a verified timestamp. See [continuous-follow verification](docs/verification/2026-09-21-continuous-audio-highlight.json).
