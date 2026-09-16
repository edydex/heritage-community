# Calendar and song reading — September 16, 2026

Source: `b12cef6706d20f6dbf6b2af0452c991062bceb6b`. [Machine-readable evidence](2026-09-16-calendar-song-polish.json).

## What changed

- A multi-day event is one continuous calendar bar within a week. Week boundaries split it into connected segments; overlapping events have separate lanes. Selecting a middle date includes the ongoing event. Existing event creation, editing, recurrence, visibility and church time zones remain in place.
- Community Home opens Calendar from its own resource button immediately before Sermons. The public church website has a separate `/calendar` page and the same navigation order. All public navigation links remain visible at phone widths.
- The Android, web and public church song readers share lyric formatting. Standalone numeric caret cues become verse headings; slide-divider lines become paragraph gaps. Verse spacing is distinct from paragraph spacing. The original church song documents and presentation cues are preserved; cached song documents receive the same formatting when displayed.
- Built-in Russian lyrics are limited to “О, благодать” and “Благодатная скала.” These retain established published texts, with sources below. The nineteen English built-in songs and church-managed Russian versions remain. No lyrics were generated for this change.

## Verification

- Reader: 225 unit tests and 124 protocol tests passed; production web build passed.
- Community: ten focused calendar/song tests, TypeScript and production build passed. [Community CI](https://github.com/edydex/heritage_study_bible/actions/runs/35070716230) passed all four acceptance jobs against the exact source, including the real PostgreSQL/HTTP production stack and song publication checks.
- Two browser scenarios passed against the actual reader with isolated fixture data: a three-day event, a week-spanning event, selecting a middle date, and English/Russian lyric paragraphs. Both fit a 390px phone viewport. These fixtures did not modify church data.
- The real WOTBC song shown in the user's screenshot was parsed and every sung line preserved. Each language has three verses containing two, two and three paragraphs. No raw cue or divider becomes visible lyric text.
- [Web deployment](https://github.com/edydex/heritage_study_bible/actions/runs/35070848924) passed. The delivered `/assets/index-jaJvw2f6.js` is byte-identical to the exact-source build, SHA-256 `d42a4a2ba42e4c7b361af6601c48bc1e0cf1d47658c71e271138e03f5fc8c014`.
- [Android CI](https://github.com/edydex/heritage_study_bible/actions/runs/35070718674) passed all four native acceptance tests and the package, signer and web-asset correspondence checks. [Android 1.1.35-preview.1](https://github.com/edydex/heritage_study_bible/releases/tag/v1.1.35-preview.1), code 38, is published in the normal Latest feed. The actual 54,406,520-byte APK was downloaded and both release checksums matched; the packaged reader entry bundle is also byte-identical to the deployed web bundle. APK SHA-256: `e35cd610855b93e148c9beab9f4606700a196e0f6a50735027de2039462b7ab9`.
- The existing update-checker implementation, exercised against GitHub's real Latest response, reports this update from 1.1.32, both 1.1.33 previews and 1.1.34-preview.1; it reports up-to-date on 1.1.35-preview.1. Application identity and signer are unchanged. This does not substitute for updating the user's physical phone.
- The 38 walkthrough case IDs and browser storage key are unchanged, so previously saved results remain available. R1 and E1–E2 now cover these refinements.

## Deployment and live checks

The supported unified WOTBC updater completed successfully. An independent status check verified exact Community `b12cef6`, unchanged translation `c92aafe`, healthy Community/PostgreSQL/translation, public discovery, the tunnel and nightly backup timer. The latest backup is `backup-20260916T080309Z-pre-update`; all seven checksums passed and its inventory matches all 11 finalized recording objects (3,883,891 bytes), with no staging files. The temporary migration process logged a DNS warning while verifying the email transport; migrations completed and email delivery was not retested in this step.

An anonymous browser on the actual WOTBC site verified Calendar before Sermons in the phone navigation, no inline calendar on Home, the working `/calendar` page, Events checked and Recurring unchecked, and no horizontal overflow at 390px. The anonymous calendar retains Pacific time and exposes none of the existing member events. The real public song page renders three verses in each language with the expected paragraph gaps, no raw caret/divider controls, and no browser errors. The published catalog is unchanged and both raw lyric hashes match their pre-deployment values.

## Russian text provenance

- [Hymnary: О, благодать](https://hymnary.org/text/o_blagodat) — the retained six-verse Russian text, documented with the established hymn tune.
- [Песнь возрождения, no. 216](https://noty.propovednik.com/Public/_PV_A_Epp/Daten/216.pdf) — the retained four-verse “Благодатная скала” text and published score crediting Ivan S. Prokhanov.

The app retains source links. Church-published versions are separate from this small bundled selection.

## Remaining acceptance

Install the Android update over the existing app and check the user's actual song, Russian selection, saved offline lyrics and church Calendar. The shared calendar has automated admin-renderer coverage; a fresh signed-in admin browser and the physical phone have not been exercised in this step. No existing church songs, events or publication settings were edited. Primary dirty workspaces were preserved. No paid provider calls were made.
