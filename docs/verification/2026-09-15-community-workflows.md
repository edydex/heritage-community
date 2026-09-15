# Community workflows and Android 1.1.34 — September 15, 2026

Source: `9cd8e88f24cdcfd9d7f79db07767b04d35d80017` on the published Heritage integration branch. [Machine-readable evidence](2026-09-15-community-workflows.json).

## What changed

- Songs refresh anonymously from the church’s Published catalog on opening or a deliberate pull down at the top. Successful responses replace the list; failures keep it. Stalled refreshes stop after about five seconds with a small message. Upgrade discovery refreshes previously cached songbook metadata without erasing Bible downloads or personal records.
- Opening a public song saves its English/Russian document in a separate local IndexedDB database. Previously opened words render immediately while checking for updates and remain readable after network/HTTP/invalid-response failures. Never-downloaded words need a connection once. Public song sharing now opens the church’s public song page rather than labeling every song member-only. Existing member-link access remains separate.
- Songs have Solo, Choir and Communal tags. Sorting by tags uses deterministic category order, then Title ascending, then ID. Multiple tags form a stable combined category; empty tags sort separately.
- Prepare a sermon offers the existing slide editor directly. New private drafts have a title, speaker, language and date. Manuscript/passages preparation remains under More. Plan a service can add a whole saved sermon, newest-created first. Imports copy slides, media references and pinned notes with new placement identities; later sermon edits do not silently modify an existing service.
- Public and Heritage Community calendars share Events/Recurring filters (Events on, Recurring off initially). Events administration has calendar preview, date-click creation/editing and persistent defaults. Church-default visibility can be overridden by each event or recurring series. Existing events inherit a Members-only default until a manager chooses otherwise.
- Recurrence supports weekly/monthly intervals and optional ending dates. Local wall time is preserved over daylight saving changes. WOTBC’s intended default is America/Los_Angeles; changing the default does not rewrite existing scheduled instants.

## Verification completed

- Reader: 216 Vitest tests and 124 protocol tests passed; production build passed.
- Community: typecheck/build passed; 212 TypeScript contracts, 63 Node contracts and 5 new calendar/sermon tests passed.
- [Community CI 34953140983](https://github.com/edydex/heritage_study_bible/actions/runs/34953140983) passed all four jobs, including clean PostgreSQL migrations, real HTTP calendar visibility, defaults, tag sorting, sermon idempotency/concurrent-save protection, and real image upload/import/readback with matching SHA-256.
- Browser: authored/saved/reopened English and Russian sermon text, imported the whole deck, and checked English/Russian/stage previews. The corrected library toolbar and mobile song/calendar layouts were inspected.
- Browser outage: deliberately stopped only the disposable church test server. The song list retained the test title; reopening displayed saved English and Russian words with the small refresh-failed message. Reconnection restored normal loading. This is real browser storage/network evidence, separate from physical-phone acceptance.
- Android [run 34953142614](https://github.com/edydex/heritage_study_bible/actions/runs/34953142614) passed build, four emulator acceptance tests, signer comparison with v1.1.32, web-asset correspondence and release publication.
- Downloaded the actual published 54,407,792-byte APK and verified SHA-256 `ec08cd6afd3f8d4e2a24af797583bd04bc04131164a6140cc597fda9caa6e475`, both SHA256SUMS entries, exact tag/source correspondence and packaged feature markers. Version code is 37; signer is unchanged (`21b68369603f988b8d207cbfeef6e045a31fb2b7129e371137b18b487af483de`).
- GitHub’s actual Latest response is **v1.1.34-preview.1**, `draft=false`, `prerelease=false`, with the APK asset. The installed checker logic, exercised against that response, reports an update from 1.1.32 and both 1.1.33 previews, and up-to-date on 1.1.34-preview.1.
- All 19 unrelated recording-work files were hash-checked unchanged. Primary dirty repositories were preserved. No paid provider calls were made.

## Deployment

The supported WOTBC updater completed, followed by an independent status check. Installed Community is `9cd8e88`; translation remains `c92aafe`. Community/PostgreSQL/translation, public discovery, tunnel and backups passed. The latest recovery snapshot is `backup-20260915T094009Z-pre-update`; checksums passed and its inventory exactly covers all 11 private recording objects (3,883,891 bytes), with no staging files.

On the real signed-in WOTBC site, the Songs table exposes Tags and its sort controls, the sermon slide workspace opens, and the calendar shows the existing event to the manager. Calendar defaults were saved as America/Los_Angeles and Members only. Clicking a date prefilled that date, 10:00 AM, Pacific time and Church default (Members only); the unused event form was closed without creating an event. No existing songs, sermons or events were edited.

The real anonymous calendar returned HTTP 200 with Pacific time, no member events and no-store caching. In the deployed Heritage reader without a current church membership session, Calendar rendered Events checked/Recurring unchecked, public-only guidance and no private event details. Its Songs page refreshed successfully to WOTBC’s current published songbook.

[Web deployment 34954078384](https://github.com/edydex/heritage_study_bible/actions/runs/34954078384) passed. The live index references `/assets/index-DQyAO1hR.js`, matching the verified APK’s same-source web build. Both Android and the web reader now include Automatic Sync.

## Remaining acceptance

Install the APK over the existing app on the real phone and test the pull gesture, restart/offline saved lyrics and note preservation. Run the updated walkthrough’s R6–R7, E1–E2 and H5. Actual SyncShow media/video playback after disconnect and church hardware/tablet acceptance remain part of Deep Testing. Recurring-series editing changes the whole series; per-occurrence exceptions and per-occurrence RSVP are not implemented. Previously downloaded public words cannot be remotely erased by making a song Private; a successful catalog refresh removes the browsable church entry.

The overall readiness estimate remains approximately 75%; these features add capability, while a real volunteer-operated service rehearsal remains necessary. Recording attachment work remains separate and unpublished.
