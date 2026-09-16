# Song sharing and event details — September 16, 2026

Source: `e04cf19809e294b06032d24bef2f804a5dfd2cac`. [Machine-readable evidence](2026-09-16-sharing-events.json).

## User-visible changes

- Share song copies the link and opens a popup with confirmation, a locally generated QR code, a selectable URL, Copy link, and optional system sharing. Clipboard denial is stated honestly; manual copying and the QR remain available. Member links contain no session credential and retain their sign-in requirement.
- Calendar bars are links to dedicated event pages. Pages show dates, location, description and an optional registration website. Occurrence-specific links survive reload; returning to the calendar and Heritage's add-to-calendar/member RSVP controls remain available.
- Event setup now calls URL **Registration or event website (optional)** and explains that the internal event page is automatic. Invalid links and other invalid event values produce field validation errors rather than generic server failures.
- Pacific abbreviations are canonicalized to America/Los_Angeles in calendar responses and on save. Defensive browser formatting also handles older records. Saved event instants are not shifted.

## Diagnosis and local verification

A read-only query of WOTBC event 1 confirmed the saved `PST` time zone and an empty optional URL. Firefox rejected the same value with `invalid time zone: PST`; Chromium accepted it. Using that legacy value with the deployed calendar reproduced the click crash. The server logs independently showed that the attempted `test` URL failed in the collection hook, which threw an ordinary error rather than a field validation error.

After the fix, all 32 Chromium/Firefox browser scenarios passed, including event navigation/reload/back, mobile layout, unavailable private events, legacy PST display, public/member song sharing, QR decoding and clipboard denial. The pixels of the QR shown in the browser were decoded and matched the copied URL. Screenshots at 390px were inspected. These browser scenarios use isolated fixture data and do not alter church records.

All 225 reader unit tests, 124 protocol tests, five calendar/time-zone tests, Community TypeScript and production builds passed. Server HTTP acceptance additionally exercises public/member occurrence access, DST dates, canonicalizing PST on save, and a 400 field error for an invalid optional website.

## Acceptance boundary

The physical phone, external camera scanning and the user's signed-in Firefox session still require their device check. The test code independently decodes the actual rendered QR, and the browser reproduction isolates the reported Firefox failure. No church events, song lyrics, visibility settings or provider credentials were changed for this work. No paid provider calls were made.

## Published Android package

[Android CI](https://github.com/edydex/heritage_study_bible/actions/runs/35119915402) passed four native acceptance checks, signer and web-asset validation, and publication. [1.1.37-preview.1](https://github.com/edydex/heritage_study_bible/releases/tag/v1.1.37-preview.1), versionCode 40, is in the normal Latest feed. The actual 54,420,226-byte APK was downloaded; both SHA256SUMS entries and every GitHub asset digest matched. SHA-256: `bd83cb59ff6a2cba298e5dc4ae8f5b8a500bb8bf9aac41f21be40bce30f07dcd`. The signer is unchanged, and the packaged `/assets/index-Ck6E9wKG.js` is byte-identical to the exact-source build. The checker reports an update from 1.1.32, 1.1.35-preview.1 and 1.1.36-preview.1.

[Community CI](https://github.com/edydex/heritage_study_bible/actions/runs/35119912155) passed all four jobs, including production containers/migrations/backup and real HTTP event-privacy, selected-occurrence, Pacific alias and field-validation checks.

## Deployed verification

WOTBC's supported updater deployed `e04cf19`. An independent status run confirmed Community, PostgreSQL and translation healthy, local/public discovery and catalog checks passing, and the unchanged translation revision. Safety backup `backup-20260916T161538Z-pre-update` passed every checksum; its inventory exactly covers the 11 finalized private recordings (3,883,891 bytes), with no staging files. A second read-only query confirmed the existing event's saved timestamps, visibility, optional URL and legacy time zone were unchanged. Responses canonicalize that time zone without moving the event.

[Web build/deploy](https://github.com/edydex/heritage_study_bible/actions/runs/35121544223) and [Pages delivery](https://github.com/edydex/heritage_study_bible/actions/runs/35121603955) passed. The actual reader entry is byte-identical to the exact-source build and published APK. Live Chromium and Firefox checks decoded the QR for the actual published WOTBC song and matched its canonical public URL; Chromium's real clipboard contents also matched. The private event endpoint correctly returned 404 to an anonymous browser. The deployed event renderer was then exercised with a clearly labelled legacy-PST fixture: opening, reloading, and returning to the calendar passed at 390px with no browser errors. The church's English and Russian song text was unchanged.

The migration container logged the existing temporary SMTP DNS verification warning; migrations and runtime checks passed. This change does not claim a new email-delivery acceptance result.
