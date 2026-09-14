# Preserve paired SyncShow workspace entry

The preceding sign-in update had an integration regression: its server-side guards required a Payload browser cookie before loading Live translation and Plan a service. SyncShow deliberately supplies its scoped device credential only to the relevant API calls after the HTML page loads. A normal browser check passed while those paired windows were blocked.

Heritage `42382f2` corrects the product behavior; `05c9835` corrects the HTTP regression assertion. The two embedded entry pages load their client first and let the authenticated API decide access. An ordinary browser receiving an initial 401 redirects to manager sign-in, retaining its selected service. Setup and role failures do not become another sign-in request. The planner only redirects on initial entry; authentication errors during editing leave unsaved work on screen. The existing server-side guards remain on the dashboard and cookie-authenticated sermon views.

No device credential is added to HTML requests, browser storage, navigation URLs or unrelated endpoints. Membership checks, scopes, lease renewal, provider settings and the existing desktop pairing remain unchanged.

## Actual paired-window verification

A disposable PostgreSQL database was seeded with a synthetic manager, a scoped SyncShow connection and a service. The compiled Community app ran alongside the actual Multilinguum processor with no provider keys. The normal database-backed authorization endpoints returned 401 without credentials and 200 with the scoped connection for both translation access and service documents.

The native Electron fixture launched SyncShow's actual `TranslationOperatorWindow` class. A separate planner window used the exact `communityPlannerRequestHeaders` function from SyncShow's main source. Both policies were compared with Preview 28 (`5301a99`) and are unchanged. The planner wrapper was a standalone test window, not the complete installed SyncShow Prepare layout.

Codex computer use observed these results:

| Flow | Result |
| --- | --- |
| Translation entry | The page reached **Connected**, with English ↔ Russian, prepared-service choices and no mixer connected. |
| Lease renewal | The same native window completed a second successful lease exchange while remaining connected. |
| Planner entry | The paired window listed and opened **Paired window acceptance service**, without a browser login. |
| Planner write | Ephesians 3:14–21 produced three slides. **Save service** succeeded and showed **Saved v2**. The actual service-document PUT returned 200. |
| Ordinary browser | After signing out of the synthetic account, both entry pages redirected to the manager guide. The translation return URL retained the selected service. |
| Cleanup | Both native windows, the browser test tab, the fixture applications and PostgreSQL stopped. |

The fixture did not test the device-pairing approval UI, a real church account, physical audio or the installed desktop package. It verifies the existing native credential policies against the actual Community/processor APIs. No microphone was connected, no translation service started, and no mail or paid provider request was sent.

## Automated checks

All 14 relevant Community navigation/access/plan tests and ten SyncShow window-policy/contract tests passed. The corrected production Next build passed, including TypeScript. During development, TypeScript caught the planner refresh button passing a mouse event into the new initial-entry flag; the event wrapper was corrected before the passing build.

The first [production workflow](https://github.com/edydex/heritage_study_bible/actions/runs/34858563271) passed compilation, container startup, bootstrap, isolation and backups but failed the new HTTP assertion. Anonymous Payload views defer their children until browser hydration, so their HTTP body contains the requested title and React startup data, not the visible controls. Captured responses established that behavior. The corrected test verifies the exact page title, client bootstrap and absence of a sign-in redirect; the previous `2edb5db` response would fail it. The actual native checks above establish that the client subsequently authenticates and works.

The corrected [production workflow](https://github.com/edydex/heritage_study_bible/actions/runs/34859366587) passed at exact revision `05c9835`, including the PostgreSQL HTTP regression checks, production containers, migration, bootstrap, isolation, backup and local-only operation. All 11 integration CLI tests also passed. The supported WOTBC update completed at `2026-09-14T15:20:55Z`. Community is clean at `05c9835`; the processor stays at `dc46781`. All three services are healthy. Each of three safety backups passes all seven checksums, and the retained private version receipt matches its runner and component set. The entire saved configuration is unchanged. Processor modules and the served operator bundle match the preceding verified hashes. Five public listener/resource routes and five workspace routes passed the deployment audit.

The real public browser then opened both the planner and live-translation entry pages. Each redirected after its initial unauthorized API response to the new manager guide, retaining the appropriate return destination. No real manager credentials were entered. The translation sign-in handoff remains open. SMTP DNS and TCP connectivity passed from the running app; no mail was sent.

This supersedes the embedded-entry claim in the [earlier sign-in record](2026-09-14-workspace-sign-in.md). The overall readiness estimate stays at approximately 75%. Shared archive review, real WOTBC manager/provider setup, physical-device acceptance and release delivery remain open.

See the [machine-readable record](2026-09-14-paired-workspace-entry.json). Response captures, native request observations and full check logs are retained under `.heritage/rehearsals/2026-09-14/paired-workspace-entry/` in the durable integration checkout, outside published source. Synthetic credentials, browser profiles, database files and temporary archives are excluded from that evidence set.
