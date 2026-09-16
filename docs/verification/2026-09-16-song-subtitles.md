# Song subtitle correction — September 16, 2026

Reader source: `271e923c7b8e404c365bd94057da3d5c815225d2`. [Machine-readable evidence](2026-09-16-song-subtitles.json).

The built-in song factory retained its old Russian title when no Russian lyrics were bundled. It now derives the displayed Russian title from the selected Russian lyric edition. Old titles remain internal matching aliases so church versions still group with the same hymn. A combined listing can use a church-supplied Russian title when the built-in source has none. No lyrics or saved data were changed.

All 11 focused song tests and all ten existing browser scenarios passed. Two browser fixtures still required member credentials for public catalog documents; the same tests failed on the previous released source. Those fixtures were corrected to expect the existing anonymous fetch policy. Separate member-only access, revocation, offline-copy and credential-isolation checks remain intact and pass.

The actual https://heritage.faith/#/resources/songs page was checked at desktop and 390px phone widths. All nineteen built-in cards were inspected: only Amazing Grace and Rock of Ages have Russian subtitles. The Russian selector is disabled for Be Thou My Vision, and Amazing Grace still opens its Russian words. The delivered entry bundle is byte-identical to the local build: `/assets/index-CJ_qhROS.js`, SHA-256 `05332ae66ee2636158326eb68a75efa4a4ccd12a5564aa421d66b5fb60055497`.

[Web deployment](https://github.com/edydex/heritage_study_bible/actions/runs/35115137627) and its GitHub Pages deployment completed successfully. Community server source is unchanged; WOTBC and the integration server pin remain `b12cef6`. The complete `community-server` tree is identical between that deployment and this reader release.

The testing walkthrough preserves its 38 case IDs and saved-result storage key. Physical-phone update acceptance remains separate from browser and emulator checks. No paid provider calls or church-content changes were made.

[Android CI](https://github.com/edydex/heritage_study_bible/actions/runs/35115140596) passed all four native checks and published [1.1.36-preview.1](https://github.com/edydex/heritage_study_bible/releases/tag/v1.1.36-preview.1), versionCode 39. The actual 54,406,588-byte APK was downloaded. Both SHA256SUMS entries and all GitHub asset digests matched; its entry bundle matches the live reader byte-for-byte. APK SHA-256: `90408836b96bb5f8751054f74c4278be9256c1c0f463384d793d26a6e0d83f8f`. The signer is unchanged. GitHub Latest is the new release; the existing checker reports an update from 1.1.32, 1.1.34-preview.1 and 1.1.35-preview.1, and up-to-date on 1.1.36-preview.1.
