# Integrated delivery status

Objective: make Heritage, SyncShow, and Multilinguum convenient to install, configure, operate, and maintain together. Updated 2026-09-13.

## Implemented in this repository

- One product and installation home, with application ownership kept explicit.
- Pinned source bootstrap, isolated revision folders, refusal to overwrite existing work, generated workspace, and capability diagnostics.
- Private GitHub repository published and verified. Bootstrap fetched all three pinned component revisions from GitHub; the WOTBC discovery check returned the advertised capabilities successfully.
- Unified SSH commands for server plan, guided setup, exact-version update, status, backup and restore. They use the supported Community lifecycle, preserve private configuration and prior source sets, and record success after health checks. See [setup guide](docs/server-setup.md).

## Implemented in component branches

- Multilinguum `9b8b09d458cc5863fb25ab823f44033dce8e5711`: captions publish independently of speech; operator speech switch cancels pending requests and queued audio; direct speech translation closes and continues as text through the cascade; public text/audio availability is separate; listener playback honors audio-off; cloud operation no longer requires the GPU worker. See [verification](docs/verification/2026-09-12-translation-core.md).
- Heritage `18b69a84e6a753b6c9f01ea4155498ed1768fb82`: editable church settings for channel, current service video, listener URL, and broadcast delay; an explicitly shaped public `/live/settings.json`; database migration and access validation. Three parser tests, a real PostgreSQL/Payload round-trip/access test, type checks, and the production build passed. This settings foundation is included in the published integration checkpoint below.

## Published live-player checkpoint

- Heritage `445e459e447fcca3b390d61f5af745bda51a92da` and Multilinguum `ba03971cb44aaccf48c0ae74a16fc2551679426a`: shared `/live` and `/translate` client, independent text/audio choices, floating panel, public proxy, and public-state heartbeat. See [verification and limits](docs/verification/2026-09-12-live-player.md).
- 64 Multilinguum tests and builds passed; Heritage's production build and real local public WebSocket/browser text rehearsal passed. Actual video/audio synchronization, native floating-window and phone playback remain unverified.
- The user explicitly approved publication to the two public application repositories and the private unified repository. Both component branches are published and included in the current development set.
- The user authorized up to $20 of paid testing. Current spend against that allowance is $0, tracked in [the budget ledger](docs/verification/api-test-budget.json).

## Published operator checkpoint

- Heritage `a9b0f03bbb47e5fb0289f8dba8f14f9cd66ddecd` and Multilinguum `3817624e902e3ea74b5b5943e5edf0d36df39e16` add authenticated manager controls, renewable scoped access, and explicit mixer capture. See [verification and limits](docs/verification/2026-09-12-operator-control.md).
- 72 Multilinguum tests, 28 focused Heritage access/SyncShow tests, production builds, and a real local manager login/bilingual-caption/stop rehearsal passed. No microphone or paid provider was used.
- The user authorized publication of all integration work. Both operator commits are published to their integration branches.

## In progress

- The Heritage integration branch preserves the prior WOTBC deployment's service-document fix (`5f66b647f050ad45bf596a19a62c308ff65d8294`). WOTBC is now deployed to the published companion checkpoint using its supported backup/update/setup commands; see the deployment record below.
- Heritage church settings, `/live`, `/translate`, and cohosting the processor beside Community. The public client, proxy, Community operator, and companion lifecycle are published; SyncShow control and output wiring are now implemented in the checkpoint below; full paired installation and official releases remain pending; desktop QA package progress is recorded below.

## Latest published companion checkpoint

- Heritage `e191c151114f688d3197dd37edf6676396490668` and Multilinguum `6f00fb5d77b55029592d31f06f91f13250e39792` add private companion setup, pinned-source validation, guarded updates/backups, prepared-session cancellation, graceful archive shutdown, and fresh-volume translation restore. This companion checkpoint used SyncShow `9c616b8`; the current lock advances Heritage and SyncShow as recorded below.
- Local deployment checks and 74 Multilinguum tests across the full check and focused follow-up passed. The final processor Docker image built on the verified WOTBC host. A separate disposable Compose project passed packaged-client, maintenance, clean-shutdown, synthetic EN/RU archive, SQLite integrity, and fresh-volume retrieval checks. Its containers, volumes, and networks were removed. See [verification](docs/verification/2026-09-12-companion-storage.md).
- During the isolated rehearsal, the existing church app and PostgreSQL remained healthy at clean source revision `5f66b647f050ad45bf596a19a62c308ff65d8294`. The separate WOTBC deployment subsequently completed as recorded below. Provider spend remains $0; the key location has been requested from the user.

## Deployed at WOTBC

- Community `2c98f7e` and companion `9c2c38b` are installed together. Supported updates, migrations, companion startup, local/public checks, and format 3 backups succeeded. Existing church recording objects remain covered by the verified inventory.
- The real `/live` and `/translate` pages connect to the companion. The supplied YouTube channel is configured, floating translation works, and manager controls require sign-in. No current video is selected; no translation service or microphone has been started.
- Provider credentials are still absent. This is a deployed foundation, not complete live-service acceptance. See [deployment evidence and remaining checks](docs/verification/2026-09-12-wotbc-deployment.md).

## Published SyncShow translation checkpoint

- SyncShow `fe5dc25a91bd84776ab560194ed61f80cd47f1c6` adds the shared caption connection, sandboxed Community operator console, explicit translation approval, per-output full-screen/lower-third/ticker/hide controls, manual overrides and saved venue preferences. Heritage `7d5de50` advertises the installed companion and is deployed on WOTBC.
- Final SyncShow suite: 2,213 passed, zero failed, two skipped. Real Electron caption and full-app restart checks passed. Native service matrices with caption bands passed at 640×360 and 1920×1080: 108 acknowledgments, 36 captures and four reopened receipts, covering direct and derived stage routes.
- The rehearsal also found and fixed an existing native text-cue transition crash and stage next-line overflow. Its stale Bible-format expectations were updated against the current compiler's independently pinned text.
- The actual SyncShow discovery client and public caption socket connected to WOTBC in idle state; the umbrella doctor now sees `translation: true`. The supported WOTBC update and all seven safety-backup checksums passed.
- This is published source, not a packaged SyncShow release or real microphone/provider acceptance. See [verification and remaining work](docs/verification/2026-09-12-syncshow-translation.md). Paid testing remains $0 / $20; the API key location question is still pending.

## Published translation-profile checkpoint

- Multilinguum `fa1aa3a` and Heritage `f44037b` add Quality and Economy selection, session model locking, archive provenance, separate text-project credentials, and companion setup support. The current version lock includes them; all three pinned sources bootstrap successfully.
- Economy defaults to blocked. An administrator must confirm the separate sharing project's setup and explicitly allow possible billed overage; account/model eligibility and remaining allowance are not automatically verified. At this checkpoint private sermon-note attachments were rejected; the later optional-notes checkpoint below replaces that restriction. Provider failures never silently change projects.
- 82 Multilinguum tests, all builds/type checks, the Heritage deployment suite, and five umbrella tests passed. Actual SDK/processor checks with synthetic responses verified separate text/audio keys and zero further voice requests after speech-off. Real browser selection/start/lock/stop checks passed without opening a microphone.
- The supported WOTBC update completed; all three services are healthy, both seven-artifact backups passed checksum checks, and the public browser reconnects in idle state. Deployed preflight confirms absent API keys, unconfirmed sharing and blocked Economy overage. See [verification and outstanding acceptance](docs/verification/2026-09-13-translation-profiles.md). Real bilingual model evaluation and guaranteed zero-charge usage remain unfinished; paid-test spend is still $0 / $20.

## Required before completion

- Fresh-server installation and full combined restore acceptance, and compatible packaged component releases. The unified command layer and actual WOTBC update are verified below.
- Community `/live`: configurable YouTube source, original/translated audio choice with mutual exclusion, readable captions, floating view/fallback, and explicit stream alignment.
- `/translate` and Heritage Bible entry point with text/voice choice.
- Authenticated Community and SyncShow control of one translation session, including mixer capture, stop, retry, and reconnect.
- SyncShow full-screen feed, lower third, ticker, output routing, manual override, and offline presentation continuity.
- Quality and shared-data economy configurations with stage-specific credentials/usage and no speech work while disabled.
- Shared service/song/sermon workflows and deliberate publication into Heritage resources.
- Real email sign-in and two-device personal notes/progress/conflict/offline acceptance.
- Bilingual English↔Russian service acceptance, representative phone playback, and video/translation alignment.

## Published unified server checkpoint

- Added the combined server command layer and a repeatable GitHub Actions workflow. Eleven portable tests and four isolated Debian lifecycle scenarios passed. Synthetic data and component side effects remain distinguished from real installation/restore acceptance.
- `server update --host wotbc-community` applied the current exact set through the existing guarded lifecycle. The runner recorded successful installation at `2026-09-13T08:03:11Z`; Community and companion source are clean and all three services are healthy.
- All seven artifacts in each of the three safety backups passed independent checksum validation. The verified recording inventory still covers 11 objects / 3,883,891 bytes with no staging files. Both live routes and the operator bundle return HTTP 200; the real browser reloaded and reached “Waiting for the next service” with audio off.
- These commands are ready for the documented existing-server workflow. Fresh install, full restore, packaged desktop releases and real-service/provider acceptance remain open. Paid provider tests remain $0 / $20. See [verification record](docs/verification/2026-09-13-unified-server.md).

## Evidence boundaries

The original public audit verified an inactive listener embedded at WOTBC `/live`; `/translate` was absent. A server identity check confirmed Debian 13 on `heritage-community`, with a clean Git checkout and healthy Community/PostgreSQL containers. The public checks do not prove live audio, SMTP delivery, or two-device synchronization.

The configured `vr-mayos` connection currently requires renewed Cloudflare Access authentication. Its identity and current deployment have not been verified in this implementation run. No change to that host or authentication policy has been made.

## Published tablet teaching and optional notes

- SyncShow `cf7f0c6` adds paired tablet pen/highlighter teaching, with per-slide/per-output ink, Undo, Clear ink, and optional stylus-only input. Source-app browser-to-projector checks pass. This is now included in Preview 25 below; physical-tablet acceptance remains pending.
- Multilinguum `9c2c38b` and Heritage `2c98f7e` add selectable sermon-note uploads in the shared operator console. Economy requires an explicit per-service note-sharing choice. The scoped manager/device lease can list and upload translation reference notes; anonymous callers are denied. Existing archive, replay and voice-profile restrictions remain.
- 83 Multilinguum tests and builds passed. SyncShow: 2,217 passed, two skipped; syntax checks and real Electron teaching rehearsal passed. Heritage production build and actual local proxy listing/upload/access checks passed. The real browser verified Economy selection, consent reset, locked live settings and Stop with no microphone or provider request.
- [Musician-screen follow-up](docs/future-musician-screen.md) records instrument-specific chord views, current/next song-section following, manual hold/resume and offline charts.
- The WOTBC unified update completed at `2026-09-13T09:02:09Z`. All three services are healthy, the new operator bundle is public, the notes route returns 401 anonymously and 200 with a scoped lease, and the real `/live` browser reconnects with audio off. All seven artifacts in each of three safety backups passed independent checksums. See [verification and limitations](docs/verification/2026-09-13-teaching-and-notes.md). Paid-provider testing remains $0 / $20.

## Published SyncShow Preview 25

- The lock now pins SyncShow `cd214139c7f1a21171575ee42f75db23912d16a1`, version `1.4.0-preview.25`. The microphone purpose declaration is preserved in the Mac package, fixing optional mixer access. Clean package builds install Electron's required notices and handle host-specific ASAR paths and Linux native dependencies.
- Windows preparation now saves thumbnails through Node's long-path-capable, atomic writer. Isolated test profiles use native canonical paths; directory-flush handling matches Windows support. The full local suite passes: 2,218 tests, two existing skips. All four source jobs and all four native package jobs pass in CI.
- The final local Apple Silicon DMG and ZIP passed packaged PDF/Sharp rendering, shared-service round trip, actual app launch with a temporary profile, native architecture and artifact inventory, and Mac signature verification. Eighteen feature/storage files match the published source exactly. The verified local Mac installers and all seven CI installers are retained with checksum evidence in the unified workspace's ignored `.heritage/installers/` folder.
- [PR #7](https://github.com/edydex/SyncShow/pull/7) publishes the complete integration for review and runs all four native package targets. This remains a development preview; protected public-release prerequisites and real tablet/mixer/provider acceptance remain open. See [installation instructions](docs/desktop-preview.md) and [exact verification](docs/verification/2026-09-13-desktop-preview.md).
- This checkpoint changes the desktop source pin only. WOTBC still runs the same verified Heritage `2c98f7e` and Multilinguum `9c2c38b`; no unnecessary server redeployment was performed. Paid-provider testing remains $0 / $20.

## Fresh Debian installation rehearsal

- The manual VM workflow uses the real unified CLI and component installers on a newly booted Debian 13 system, with its own systemd, Docker daemon, disk and pinned SSH host key. It exercises a full database/public-media/private-object/translation-archive restore with synthetic data. [Scenario and boundaries](docs/installation-rehearsal.md).
- Initial [run 34750873160](https://github.com/edydex/heritage-community/actions/runs/34750873160) booted the verified official cloud image, established the real SSH workflow, installed Docker, and built the Community images. Fresh migration then failed because privately checked-out source files were copied as root-owned and unreadable by the image's non-root user.
- Heritage `692f1a8ded8cdf01bddef0300b6748f797c09f1a` fixes migration-stage ownership inside the image. The existing installer/operator suite passed. The lock advances to that fix for the next actual VM run; full fresh-install/restore acceptance is not yet established.
- WOTBC remains at its preceding verified deployment until this new installation fix passes the complete rehearsal. No email or paid-provider test is part of the VM scenario.
