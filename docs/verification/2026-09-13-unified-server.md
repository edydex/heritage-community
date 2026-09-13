# Unified server lifecycle verification — 2026-09-13

The workspace now exposes `server plan`, `setup`, `update`, `status`, `backup` and `restore`. It transports a small versioned runner over an existing trusted SSH connection, then delegates installation and data lifecycle to the pinned Community operator. The server fetches only the public application repositories; it needs neither the private umbrella repository nor a private GitHub credential.

## Selected components

- Community: `f44037b35d355f9d64d3cd157f64b16b0e7dee66`.
- Translation companion: `fa1aa3a03214a98f8ab442e2d05c4b7f57e38114`.
- SyncShow, recorded for device compatibility: `fe5dc25a91bd84776ab560194ed61f80cd47f1c6`. This command does not install a desktop application on the server.

## Automated and isolated checks

[GitHub Actions run 34746517970](https://github.com/edydex/heritage-community/actions/runs/34746517970) passed at `0f2f91b56de3fbba6d1457affde5b78565454375`:

- 11 portable tests: source bootstrap, official exact pins, input validation, shell quoting, SSH staging and cleanup, and no automatic retry of a failed mutation.
- Four isolated Debian lifecycle scenarios: first setup followed by a forward update; retry after interrupted first setup; refusal of dirty source, a wrong origin and a downgrade; propagation of maintenance refusal and retry after a failed translation update without advancing the success receipt.
- The lifecycle fixture uses real Git histories and the selected Community locking, literal configuration and translation-source validation libraries. Installer/operator side effects use synthetic configuration, recordings and backup markers. It does not exercise Docker deployment or PostgreSQL restore.
- The same four scenarios passed in a disposable container on WOTBC. No production volumes, application sockets or credentials were mounted; networking was disabled and test containers were removed after execution.

The first isolated runs found that Docker's default temporary filesystem was mounted `noexec`, causing Bash to skip the synthetic Git executable. The corrected fixture explicitly enables execution on its temporary directory, verifies command selection before starting, and independently restricts Git to local file transport. No networking bypass was introduced to make the test pass.

## Real server inspection

`server plan --host wotbc-community` verified the existing strict SSH host key, hostname `heritage-community`, root UID and Debian 13 before staging the runner. Installed source matched the selected Community and translation pins. `server status` passed the actual service, public-route, recording inventory and backup checks.

A brief later connection failure returned a Cloudflare 502 publicly and a WebSocket handshake failure for SSH. Both recovered without changing the tunnel or host configuration. A fresh check showed all three application/database services healthy and the host still up for nine days. The cause of that transient transport failure was not established.

## Applied WOTBC update

`node bin/heritage.mjs server update --host wotbc-community` exited successfully. This exercised the new wrapper with the current pins, including the operations lock, backup before source advancement, pinned companion configuration/build, Community build and migration, restart, public/local checks and version receipt. Git source in both installed application checkouts remained clean at the selected revisions.

The success record at `/opt/heritage-community/state/unified-installation.json` is mode `0600`, was written at `2026-09-13T08:03:11Z`, and contains set digest `06013dadd9ae383a0ca8143cc91494eea719ce06ba45ad0eb4ddd2221f2d9116`. Independently hashing the retained runner and canonical manifest reproduced that digest. The exact selected manifest and runner are retained under the installation's `unified/sets/` directory.

All seven artifacts in each of these format 3 snapshots passed independent checksum verification:

- `backup-20260913T075952Z-pre-unified-update` — prior to source advancement.
- `backup-20260913T080032Z-pre-translation-setup` — companion setup safety snapshot.
- `backup-20260913T080125Z-pre-update` — normal Community updater safety snapshot.

The live inventory check still covers 11 finalized recording objects / 3,883,891 bytes and no staging files. Community, translation processor and PostgreSQL are all healthy. `/live`, `/translate`, the managed operator bundle and the idle public service endpoint return HTTP 200. The real browser reloaded `/live`, connected and displayed “Waiting for the next service”, with audio off and the correct WOTBC YouTube channel. No current service video is selected and no microphone or provider session was started.

## Acceptance limits

The lifecycle wrapper does not complete packaged desktop release, fresh-server installation, full combined database restore, real email delivery, two-device synchronization, microphone/provider quality or venue display acceptance. Its success receipt records source and service-health verification only. API testing remains **$0 of the authorized $20**, with no real provider requests made.
