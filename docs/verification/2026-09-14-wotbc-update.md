# WOTBC processor update and browser review

On September 14, the supported unified updater installed Community source `782535d41e870e12983f807d7f8dda2e217e2c56` and Multilinguum `aba43f734949b673fb14f00e154359f6e5de3530` on WOTBC. The updater exited successfully and an independent audit checked the running modules, retained version receipt, backups and configuration. These are deployment and idle-player results; live provider and physical-device acceptance remain separate.

## Deployment

`node bin/heritage.mjs server plan --host wotbc-community` first confirmed the pinned SSH host, hostname `heritage-community`, root UID and Debian 13. It found Community `e7882cf` and processor `21a9576`. The subsequent `server update` used the operations lock, consistent safety backups, exact public commits, guarded companion setup and the normal Community updater.

Both installed checkouts are clean. The running processor's `session-engine.js`, `archive-store.js` and `realtime-capture-pipeline.js` hashes match the locally built, tested `aba43f7` files. The processor image is `heritage-translation:aba43f734949`, with image ID `sha256:5f32cb322faca5245d96c631e6a4964f530d8c836481096b9298dd8401e4ce03`. Community's unchanged server subtree reused its previous image; advancing the repository pin did not change the separately deployed public reader or Android app.

The success receipt was written at `2026-09-14T09:20:06Z`, is mode `0600`, and records set digest `3790efcda9e3a186a2170d45fbc0d04b4a9d4bc93297c7b78673146fb71443ac`. Independently hashing the retained runner and manifest reproduced that digest. SyncShow `5301a99` is recorded for compatibility; the server command does not install desktop software.

All seven artifacts passed independent checksum verification in each safety backup:

- `backup-20260914T091419Z-pre-unified-update`
- `backup-20260914T091459Z-pre-translation-setup`
- `backup-20260914T091820Z-pre-update`

The latest backup exactly covers 11 finalized recording objects / 3,883,891 bytes. Private staging remains empty. Community, PostgreSQL and the translation processor are healthy; the recovery tunnel and nightly backup timer remain active.

## Configuration and mail

An on-server comparison against the first backup found exactly three changed configuration keys: `HERITAGE_TRANSLATION_SOURCE`, `HERITAGE_TRANSLATION_REVISION` and `HERITAGE_TRANSLATION_IMAGE`. All other saved settings, including provider credentials, model choices, sharing and mail configuration, are unchanged. Secret values were neither printed nor copied. OpenAI and LiveKit credentials remain unconfigured on WOTBC.

Migration completed but its startup transport check logged `EAI_AGAIN smtp.resend.com`. The migration service uses only the internal backend network; the live Community app also has the external edge network. A follow-up from the live app resolved its configured SMTP host and received an SMTP `220` greeting. This supports an isolated migration-network warning rather than a live DNS outage. An initial diagnostic could not import standalone Nodemailer from the packaged app, so the successful probe used Node's built-in network client. It did not authenticate or send email, and does not replace the earlier real email/sync acceptance.

## Routes and actual browser

Local HTTP checks returned 200 for `/live`, `/translate`, `/live/settings.json`, `/translation/client/operator.js` and `/translation/api/public/service`. The service endpoint is idle (`active: false`). Settings retain the requested Word of Truth channel, no selected video, and zero configured broadcast delay.

The Python audit's public HTTP requests returned 403; those are retained as failed probes in the JSON evidence. They are not counted as successful public-route tests. The normal updater's public discovery check passed, and actual browser navigation separately verified both public pages: a fresh `/live` load and `/translate` reached **Waiting for the next service**, with **Audio off**. `/live` shows the church's channel and the no-video-selected message; `/translate` contains no video player. No service was prepared or started.

## Private audio review

The retained phrase-by-phrase review now has explicit **Play AI English** and **Stop playback** buttons. Clicking a native audio control through the internal browser again crashed that review tab; the explicit page buttons worked in a fresh tab. The original phrase stopped at 7.362 seconds, a generated English phrase completed at 6.730 seconds without a media error, switching to another English phrase paused the original, and Stop interrupted that phrase at 0.134 seconds (`ended: false`, `paused: true`). The rendered desktop layout was inspected.

This establishes local review playback controls and decoded media progress. It does not establish speaker/headphone audibility, bilingual meaning approval, live relay buffering, microphone input or phone playback. The local review remains private under `.heritage/rehearsals/2026-09-14/sermon-providers/full-engine-07/review/`; its audio and transcripts were not published to Git.

## Remaining acceptance

No paid requests were made during deployment or this follow-up. The cumulative test ledger remains **$0.79 conservatively accounted against the $20 cap**, with zero pending reservation. The recording and recognition code is now deployed, while the candidate `gpt-transcribe` recognition choice was not made the default or selected by this update. WOTBC still requires manager/provider setup, bilingual sermon review, notes/Economy comparison, and the complete live audio/device rehearsal. The overall readiness estimate stays approximately 75%.

See the [machine-readable record](2026-09-14-wotbc-update.json), [paid speech and recording evidence](2026-09-14-speech-and-recording.md), and [current status](../../STATUS.md).
