# Fresh Debian installation and recovery — 2026-09-13

The full VM rehearsal runs the actual unified SSH commands and Community installers on a new Debian 13 system. It uses a verified official cloud image, a private temporary disk, systemd, Docker and a generated SSH host key pinned before connection. The [scenario](../installation-rehearsal.md) describes the fixtures and boundaries.

## Installation fixes

The installer checks out source with `umask 077`. Docker preserves those restrictive file modes when copying files. Its non-root maintenance processes therefore need ownership of their copied source as well as ownership of their writable data.

- [First run](https://github.com/edydex/heritage-community/actions/runs/34750873160) reached the actual database migration, which failed because `/app/package.json` was root-owned. Heritage `692f1a8` corrected the migration image's copied-file ownership.
- [Second run](https://github.com/edydex/heritage-community/actions/runs/34751286936) completed migration and initial administrator creation. Its initial backup failed because recording maintenance selects UID/GID 1001 through Compose, while the same image's source belonged to UID/GID 1000.
- Heritage `236d3f007224302f9e6d7ec4f5555cf55ad1ceed` makes the maintenance image and its copied source use the runtime's existing 1001:1001 identity. Both migrations and recording maintenance retain non-root execution. Host source permissions, private recording permissions and Compose's restricted service configuration remain intact.

The existing installer/operator suite passed after the final fix. The [portable workspace and isolated runner checks](https://github.com/edydex/heritage-community/actions/runs/34751747625) also passed at umbrella `bbcaf901ad9a8e5f590681cfca9f2ac99bc1b6c8`.

## Complete rehearsal

[Run 34751756549](https://github.com/edydex/heritage-community/actions/runs/34751756549) tested Heritage `236d3f0`, Multilinguum `9c2c38b` and the recorded SyncShow `cd21413` device version. Fresh setup completed with all three services healthy, the scheduled backup timer active, a successful installation receipt and a verified seven-artifact backup. Administrator sign-in, public-note upload, private-object creation, deterministic EN/RU archive creation and a populated combined backup also succeeded.

The fixture then expected HTTP 404 when anonymously requesting a deleted public upload; Payload returned HTTP 403 because its file-access check precedes absence reporting. This is a fixture correction, not a further application change. The corrected fixture verifies public bytes before backup, checks that the deleted database record is absent, accepts either 403 or 404 for the anonymous URL, and independently checks that the public file no longer exists inside the guest's media volume. Full restore acceptance remains pending.

[Run 34752316208](https://github.com/edydex/heritage-community/actions/runs/34752316208) passed that corrected application mutation check and confirmed the public file's on-disk absence. It then stopped at archive deletion with HTTP 409. The fixture unconditionally sent a JSON content type even for a DELETE without a body. A local check with the actual Fastify dependency reproduced `FST_ERR_CTP_EMPTY_JSON_BODY` and HTTP 409 under the processor's error mapping; the same DELETE without that header returned 204. The helper now supplies the content type only with JSON data and retains bounded response-error details for diagnosis.

The restore must recover the installer-created administrator's display name, a published notes file uploaded through the application API, a synthetic private object and its inventory row, and the English/Russian archive transcripts. The fixture changes or removes each of those after making a combined backup, then uses the normal restore command with its safety backup. API sign-in and exact byte/digest comparisons verify recovery.

The private object is a synthetic storage fixture, not playable recording media or an actual SyncShow upload. The translation archive uses deterministic replay with provider credentials absent. This scenario does not prove email delivery, public tunnel setup, real provider translation, physical devices or video/audio alignment. No paid provider test is performed.
