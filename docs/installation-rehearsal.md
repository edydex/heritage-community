# Fresh installation and recovery rehearsal

The manual **Rehearse full Debian installation** workflow starts a new Debian 13 virtual machine on an ephemeral GitHub runner. It downloads the official cloud image, verifies its SHA-512 checksum and records that checksum with the result. The VM has its own kernel, systemd, Docker daemon, disks and generated SSH keys.

The runner pins the generated host key before the first connection. It reaches the guest only through loopback SSH and forwards the guest's loopback web port. The unified CLI performs its normal host identity checks and runs the real component installation, backup, restore and status commands at the commits in `components.lock.json`.

The scenario:

1. Install a local-only synthetic church, administrator, database and translation companion from a fresh OS.
2. Sign in through the running Community API, upload public notes, create one synthetic managed private object with its database inventory row, and create an English/Russian archive using deterministic replay.
3. Make a complete combined backup through `server backup`.
4. Change the administrator's display name and remove the public file, private object/row and translation archive. The remaining state is valid and can be safety-backed-up.
5. Restore the selected full backup through `server restore`, including its normal safety backup and validation.
6. Sign in again and compare the restored administrator row, public file bytes, private object row/bytes and both archive transcripts with their original values. Finish with the installed service and backup checks.

Private recording bytes are synthetic storage fixtures; this is not recording playback or a SyncShow upload rehearsal. Translation uses deterministic replay with all provider credentials absent. The test enables neither member email delivery nor a public tunnel and does not use church data.

Run it from the repository's Actions page, or:

```sh
gh workflow run install-rehearsal.yml --repo edydex/heritage-community --ref main
```

The VM shuts down and its temporary disks and keys are removed on completion or failure. The diagnostic artifact contains logs and a result only when the relevant steps completed. A successful `result.json` establishes this installation/restore scenario; it does not establish public DNS/tunnel setup, email delivery, physical devices or translation quality.

The script requires a GitHub Linux runner with KVM and refuses to run as a general-purpose command on an existing server. The shorter container fixture remains useful for fast lifecycle edge-case tests. Keep those simulated checks separate from this real VM result when reporting acceptance.
