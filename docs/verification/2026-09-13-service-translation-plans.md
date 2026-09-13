# Saved service translation settings — 2026-09-13

## Scope

Community stores a private companion translation plan per canonical service. Its own revision and exact service revision protect saves; service content changes mark settings stale. The shared operator can select, review, save and reload a plan, refreshes it before creating a session, and retains its operator-declared reference privately with that session. Neither saving nor loading starts capture or provider work. Economy sharing consent remains per-session and is never saved in the plan.

The service editor links to the selected service's translation settings only after its current draft is saved. SyncShow Preview 27 permits its owned console to call only exact GET/PUT Community plan endpoints, with bounded GET selection. Existing permanent-token and processor-lease boundaries remain in place.

## Source and local verification

- Heritage `4cd20fde0775082821e5b559dbe41edc39803fcc`: ten focused authorization/plan tests passed; typecheck and production build passed. The new JSON column has explicit up/down migration. The production-stack workflow now includes real HTTP and PostgreSQL concurrent-save acceptance.
- Multilinguum `21a9576edd1f898ead1be214c90ee271df6bcba1`: all 105 JavaScript/TypeScript tests passed, with typechecking, formatting and builds. CI [34761970728](https://github.com/edydex/multilinguum/actions/runs/34761970728) passed web/service, Python voice-worker and native-shell jobs.
- SyncShow `0b350709b3c237adc195938a15c601a498def010`, `1.4.0-preview.27`: all 2,226 local tests passed with two existing artifact-dependent skips, plus syntax checks. Final [source CI 34762620725](https://github.com/edydex/SyncShow/actions/runs/34762620725) passed on all four operating-system runners. Dedicated token-routing tests cover allowed reads/writes, other windows/origins, methods and malformed queries.

## Real browser, synthetic service

The production operator bundle ran in an actual internal browser against a local processor with all external fetch disabled. The service loaded Russian → English, Economy, speech off and one synthetic note. Saving English → Russian survived reopening. A simulated competing save blocked Start before session creation. Reloading cleared the sharing checkbox. Explicitly selecting that checkbox allowed an audio-free synthetic start; the service title appeared, settings locked, and Stop unlocked them while clearing the checkbox for the next session. The final browser layout and disabled-start explanation were inspected. No mixer was connected and no external provider was contacted. The synthetic server and browser were closed afterwards.

## Acceptance findings

The first real HTTP fixture omitted browser `Sec-Fetch-Site` metadata on an origin-less cookie request, which Payload correctly rejected. The fixture now reproduces browser metadata and separately asserts rejection when it is missing or cross-site. The next run passed real metadata reads, six competing writers, revision checks and protected generic fields; its synthetic service-edit step attempted to change a deliberately frozen parsed service. The fixture now clones that immutable document before editing it. These corrections do not weaken authentication or service immutability.

All four source jobs and all four native package jobs passed for the initial Preview 27 build. Downloaded archive inspection nevertheless found that electron-builder's PR policy had skipped Mac ad-hoc signing. The package workflow now explicitly enables certificate-free ad-hoc signing, disables identity discovery, and runs `codesign --verify --deep --strict` on each Mac bundle. Initial CI artifacts remain retained as diagnostic evidence and are not the recommended Mac installers. Corrected [Package Smoke 34762620729](https://github.com/edydex/SyncShow/actions/runs/34762620729) passed the shared gate and all four native targets, including both Mac signature checks. All seven corrected installers were retained and independently hashed after copying. The downloaded Apple Silicon bundle passed `codesign --verify --deep --strict` on this Mac; its operator bridge matches the published file exactly (SHA-256 `dc3074d6008f97ebcdb6e60cf6f0e0fec4a93e0f1541f2832caa1ba5bbb65434`). Its ASAR is `81cbffbdac0f115bcedc61b86502859e06432dead9d228b00f64c0861e94260e`. CI merge `5b9e711f1edd71e3f3255768c1c188b8803af937` and pinned branch `0b350709` have exact tree `8097234c45319c6f66870139c4bfc7b6724dd8d5`.

The final [Heritage production-container run 34762660862](https://github.com/edydex/heritage_study_bible/actions/runs/34762660862) passed fresh migration, real cookie authentication and browser-origin behavior, six competing writers, protected generic fields, unchanged canonical slides and service status, stale settings after a service edit, explicit review/save, and archived-service rejection. Bootstrap, isolation, backup and local-only operation checks also passed.

## WOTBC deployment

The exact pinned update completed at `2026-09-13T14:44:21Z`, set digest `b1fd3cf691c8b6976e527fb9db1d94d1abeebf5d17ac5129cf4536412428b502`. Both source checkouts are clean, all three services are healthy, and the receipt remains mode 0600. All seven artifacts in each of these three safety backups passed independent checksum verification:

- `backup-20260913T143303Z-pre-unified-update`
- `backup-20260913T143343Z-pre-translation-setup`
- `backup-20260913T143704Z-pre-update`

The public `/live`, `/translate`, operator bundle and public service endpoint return HTTP 200; anonymous plan access returns 401. The served operator bundle matches the locally built module exactly, SHA-256 `46755cb0dddeb796bfdb80cc04282092b8352f4cfab713603c26611f209f5972`. The actual internal browser reconnected to “Waiting for the next service” with audio off. A local Python HTTP client was rejected by the public edge; the deployment's normal public HTTP path and the real browser were used for the successful checks.

The normal update checks confirm 11 finalized recording objects totaling 3,883,891 bytes and no staging files. The real signed-in reader completed a fresh sync at 07:45:51 Pacific and reported that its supported data is up to date. The durable workspace is bootstrapped to the same three component revisions.

## Remaining live acceptance

A real manager session is still needed to verify the plan workflow on WOTBC through the admin console. The reader session does not authenticate that console. No bootstrap administrator password is retained in the running container; the verification stopped before any login attempt, and no account or credential was changed. The church-admin login page is open for the user. Authenticated endpoint and concurrency behavior passed against the real disposable server, and the rendered operator workflow passed with synthetic service data.

Real provider, physical mixer/tablet/projector, phone and venue acceptance remain separate. The paid-provider test ledger remains $0 / $20. Existing personal-sync acceptance remains recorded separately; the signed-in internal browser still reports synchronized reading data.
