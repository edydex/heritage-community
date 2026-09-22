# LSB and NASB95 in Community Planner

Lookup source: Heritage `414da96a1f4076780cecc90f2efc5b48df3beca7`, [PR 42](https://github.com/edydex/heritage_study_bible/pull/42). The selected pin `1f3a7e7517feb8140232497ab9fe6d1ac77b4bb4` also includes [PR 43](https://github.com/edydex/heritage_study_bible/pull/43), the new-service correction found during live testing. These are browser-server updates. No new SyncShow or Android package is required or created.

## Operator walkthrough

1. Open **Plan a service** or **Prepare a sermon**, then **＋ Add slide → Scripture** (or a sermon **Bible passage**).
2. Choose **LSB · Legacy Standard Bible** or **NASB95 · New American Standard Bible 1995** for the English screen. Keep the desired Russian edition for the other screens.
3. Enter a reference such as `John 8:31-32,44` and add it. The saved passage contains only verses 31, 32 and 44, with the selected edition. The existing slide excerpt editor can add omissions or contextual annotations without changing the pinned original.
4. Save the service. Reopening and projecting use the saved text; they do not repeat the public lookup. Existing service passages retain their original editions.
5. **Scripture sources & copyright** exposes the full notices and publisher links. Projected passages carry the edition abbreviation.

No API key is required. LSB uses its official public reader. NASB is explicitly the **1995 edition**, retrieved from the full Biblia reader. The RefTagger tooltip was not sufficient: it silently omitted separated verses and truncated long single verses. Both adapters validate edition/reference/verse identities and reject incomplete results. Upstream errors leave existing slides untouched. An installed authorized edition with the same identifier takes precedence.

## Verification

- 22 targeted tests and Community typecheck passed. Synthetic fixtures cover headings, footnotes, small caps, poetry, selected verses, redirects, response limits, outages, edition integrity and save/reopen without refetching. The new suite runs in Community CI.
- Ten live checks passed: for each edition, John 8:31–32,44; Psalm 119:162–175; 1 Chronicles 3:7–10; Genesis 1:1–3; and the long Esther 8:9. The check records verse counts and content hashes without committing quoted passages.
- All seven GitHub checks passed, including the production build/migration/backup flow and the database-backed integration suites. [Community run](https://github.com/edydex/heritage_study_bible/actions/runs/35790150036) and [root tests](https://github.com/edydex/heritage_study_bible/actions/runs/35790150102). PR 42 is merged.
- The first supported update completed backup, build, migrations, startup and all local/public checks. Authenticated browser additions through WOTBC fetched the exact separated LSB verses and the complete long NASB95 verse. Temporary additions to the prior rehearsal service were discarded without saving.
- Creating a new test service exposed the Welcome default attempting to change a deeply frozen template object. PR 43 copies the slide before applying alignment defaults. Its regression reproduces the exact failure before the fix, and 24 focused tests plus typecheck pass afterward. The final supported update passed all local/public checks, and creating a fresh service in the live browser now succeeds with its automatic Welcome slide.
- PR 43 also passed all seven GitHub checks: [Community integration](https://github.com/edydex/heritage_study_bible/actions/runs/35791495989) and [root tests](https://github.com/edydex/heritage_study_bible/actions/runs/35791495776).
- Final authenticated-browser acceptance passed: create a new service with its Welcome slide; add an LSB John 8:31–32,44 reading; inspect English, Russian and stage outputs and the publisher notice; add the complete NASB95 Esther 8:9 as a sermon passage; save; reload; select the saved service; reopen both passages. The six-slide test service remains at **Saved v3**, with Save disabled and both exact texts and edition labels intact. The LSB slide was also checked visually for fit. Existing non-test services were not edited during this acceptance flow.

These are bounded adapters to public reader responses, not a guaranteed third-party JSON API. Their quotation terms and source details are documented in [BIBLE_PASSAGE_SOURCES.md](https://github.com/edydex/heritage_study_bible/blob/main/community-server/docs/BIBLE_PASSAGE_SOURCES.md). Whole-edition import remains a separate workflow requiring an authorized file. No credentials, private service data or fetched Scripture fixtures are included in this record.
