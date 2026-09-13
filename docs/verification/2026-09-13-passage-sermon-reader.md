# Passage-linked sermon reader — 2026-09-13

Heritage `24d92857d79bf5c9231787a3de3a4267f5defe8f` connects reviewed public sermon publications to the Bible reader and church archive. The existing prepared reader work was imported into the isolated integration checkout; SHA-256 checks confirmed that all 29 original working files remained unchanged. Unrelated working changes were excluded.

The reader shows sermons about the selected verse under “On this passage.” Passing references remain under the separate “Appears in N sermons” disclosure. A publication opens with its published text and optional media, without starting playback. Available published text languages can be selected; this does not generate a translation. Church-specific archives retain the chosen church when opening and closing a sermon, and a missing church does not silently show other churches' publications.

Older subscriptions refresh discovery once to learn about the public publication capability. Catalog/detail requests are bounded by a 15-second timeout, including stalled response bodies, and honor cancellation. Previously verified catalog/detail data can survive a temporary interruption in the current view. This is an in-memory cache, not a downloadable sermon library that survives an offline restart. Private and member manuscripts are not published by this reader change.

## Verification

- 183 reader unit tests across 38 files, 105 protocol tests, the production build and all 26 Playwright browser tests passed locally.
- Twelve Community publication/serving tests passed, including exact cross-repository conformance bytes, access exclusions, revision/hash validation and bounded catalog/detail serving.
- Full reader CI [34766240316](https://github.com/edydex/heritage_study_bible/actions/runs/34766240316) passed, including browser tests and production build.
- The actual internal browser used the normal subscription UI against a local synthetic publication server, opened its archive and detail, and displayed the passage panel alongside ordinary commentary at Ephesians 3:18. Desktop layout was visually inspected; an automated 390×844 browser check covers the narrow layout.
- The real WOTBC public manifest and sermon catalog returned HTTP 200 over public HTTPS. The manifest advertises the expected public publication descriptor, and its catalog currently has zero published items. No synthetic sermon was published to WOTBC. Private/member content was not inspected.
- The Community server subtree is byte-identical to the previously deployed `60967fd` version (`d1e9ef8ca565dc362f4e370e47c060bfe60d672d`). SyncShow and Multilinguum pins are unchanged.

## Published and deployed

Web publishing [34766453116](https://github.com/edydex/heritage_study_bible/actions/runs/34766453116) and GitHub Pages deployment [34766482755](https://github.com/edydex/heritage_study_bible/actions/runs/34766482755) succeeded. The actual signed-in browser opened the new archive from Community Home, automatically discovered WOTBC's publication capability after a normal reload, displayed “No sermons have been published yet,” and returned to the same church. No stored account or reading data was cleared.

The supported unified server update completed at `2026-09-13T15:49:01Z`, set digest `96f8e5fc57ca2b5ac1e18b071ec9ae9725c90f03771c6f853fb1d7f951d5a8b4`. Independent checks verified the exact clean source, all three healthy services and all seven artifacts in each of three safety backups. The recording inventory remains 11 finalized objects / 3,883,891 bytes, with zero staging files. [Deployment evidence](2026-09-13-passage-sermon-deployed.json).

The public manifest, catalog, listener routes and anonymous planning denial passed after deployment. A temporary SMTP hostname lookup error during migration did not stop migration; lookup succeeds in the final running app. The first independent catalog check incorrectly expected the descriptor's version 1 for the catalog; the conformance fixture and reader contract correctly specify catalog version 2. The corrected check passed. [Public endpoint evidence](2026-09-13-passage-sermon-public.json).

The existing real personal account completed a fresh synchronization at 08:51:24 Pacific and displayed “Synchronization finished” with supported reading data up to date. The separate Community membership/calendar session and manager console still need their own sign-in. The local publication rehearsal tab and both local servers were closed. Real provider/venue acceptance remains separate; provider-test spending is still $0 / $20.
