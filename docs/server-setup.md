# Combined server setup and operation

The unified workspace sends a small versioned runner to a server over your existing SSH connection. That runner fetches exact public component commits and uses Community's supported installer, translation setup, update, status, backup and restore commands. Private repository access is needed only on the computer holding this workspace; no private GitHub credential is copied to the server.

## Before setup

- Use Node.js 24 or later on the computer running the unified command.
- Prepare a Debian 12 or 13 server and an SSH alias with root access. Verify its identity and host key through your normal SSH setup first. The command uses strict host-key checking and noninteractive SSH authentication; it does not accept a new key or fall back to a password prompt automatically.
- Use one Community installation per server. An existing `/etc/default/heritage-community` is honored; selecting a different deployment root is refused before installation.
- Choose the intended version of this repository. `components.lock.json` is the desired compatible set. The development set still needs packaged releases and real-service acceptance.

The server does not need Node.js or a GPU for the cloud translation companion. The fresh Community installer handles its Docker and other Debian dependencies. SyncShow and the Heritage reader remain applications on users' devices; their server-side install is not implied by this command.

## Plan and setup

```sh
node bin/heritage.mjs server plan --host your-server
node bin/heritage.mjs server setup --host your-server
```

Replace `your-server` with your established SSH alias. For this project's already configured test church it is `wotbc-community`.

The plan inspects the host and selected/installed versions without changing application source, configuration or services. It temporarily uploads three small files to a private directory, then removes that directory. `--dry-run` on an operation provides the same inspection and its planned phases.

Fresh setup runs the existing Community wizard for church/admin settings, optional email and tunnel, and scheduled backups. It then offers translation-provider and optional audio-relay setup. Enter secrets in the server wizard; the unified command does not forward your local environment. The existing installer may send its configured administrator sign-in test when email authentication is enabled.

Setup on an existing configured server uses its safety backup/update path. It does not rerun the account/tunnel wizard. A failed first setup that already fetched source can be retried with the same version set; private configuration and data are retained. If configuration is missing but database storage exists, the underlying installer requires recovery of that configuration rather than creating replacement credentials.

For an existing server with its settings already saved:

```sh
node bin/heritage.mjs server setup --host your-server --non-interactive --yes
```

An unattended fresh install still needs the existing installer's required server-side answers. It is not an automatic creation of unknown church settings or credentials. Guided setup is the first-install path.

Use `--deployment-root /opt/heritage-community` to select the installation explicitly; that is the default. Symlinked roots and system directories are refused.

## Update the selected set

```sh
node bin/heritage.mjs server plan --host your-server
node bin/heritage.mjs server update --host your-server
```

Update uses this workspace's exact commits, not moving component branch heads. It checks the installed repository identity and clean source, takes the existing operations lock, fetches the selected revisions, makes a safety backup, and accepts only a Community fast-forward. The translation source is stored in its own revision folder, preserving the older checkout.

The companion's normal setup performs its guarded private-config/build/update sequence. Existing provider settings are preserved; update does not prompt for new credentials or opt into sharing. Community's normal updater keeps the recovery tunnel running and verifies local/public service health. A prepared or live translation service refuses maintenance; finish it before updating or backing up.

After success, the runner writes `state/unified-installation.json` and retains the runner, pins and manifest under `unified/sets/<digest>`. This is provenance for the successfully applied source/service set. It is not proof of translation quality, email delivery or phone playback. A failed update does not replace the last successful receipt and does not automatically restore a database or reset code.

## Status, backup and restore

```sh
node bin/heritage.mjs server status --host your-server
node bin/heritage.mjs server backup --host your-server
node bin/heritage.mjs server restore --host your-server --backup /opt/heritage-community/backups/backup-YYYYMMDDTHHMMSSZ-label
```

Status checks exact installed source compatibility and the existing service/backup checks. Backup uses the quiesced combined format, including PostgreSQL, public media, private recording inventory and stopped translation archive storage. It does not back up desktop app profiles or off-server personal files.

Restore requires an explicit absolute backup directory and delegates checksum/structure verification, the safety backup, and typed confirmation to Community's restore command. `--non-interactive --yes` explicitly skips that typed confirmation. No partial-data, skip-backup, destructive cleanup or automatic rollback flags are exposed by the unified wrapper.

After checking the recovered content, run `server backup` again. Restore preserves the pre-restore safety backup as `latest`; that older state may intentionally lack recordings you just recovered. A new backup covers the recovered state and lets the normal status check verify its current recording inventory. Both the selected restoration backup and the safety backup remain available.

If the computer holding this workspace is unavailable, the existing `heritage-community status`, `backup` and `restore` commands remain available directly on the server. Use a workspace matching the installed set for unified status/backup/restore; inspect and deliberately apply a new set with `server update` when versions differ.

## Verification boundary

Unit tests exercise CLI input validation, official pins, SSH staging, exact argument handling and cleanup after failure. The isolated Debian runner suite uses real Git checkouts and the real component locking/configuration/source-validation libraries, with synthetic installer/operator side effects. It covers retries, preserved private state, dirty/wrong source, downgrade refusal, busy-service blocking, failed translation update and receipt integrity. It does not replace a fresh-server installer or full database-restore rehearsal.

`npm test` runs the portable tests. The repository's **Verify unified workspace** GitHub Actions workflow also fetches the selected public Community libraries and runs `test/server-runner.integration.mjs` in a disposable Debian container. That test container has no network, host service socket, credentials or church data. Its root filesystem is read-only; only temporary fixture data and operations locks are writable. The temporary fixture directory permits execution because the suite supplies a Git transport wrapper that redirects fetches to local synthetic repositories. A preflight verifies that the wrapper is actually selected; Git itself also refuses non-file transports.

The separate [full Debian VM rehearsal](../docs/installation-rehearsal.md) exercises the real installation and combined restore commands. Its current outcome, real deployment evidence and remaining acceptance are tracked in [STATUS](../STATUS.md).
