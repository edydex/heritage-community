# Integrated delivery status

Objective: make Heritage, SyncShow, and Multilinguum convenient to install, configure, operate, and maintain together. Updated 2026-09-12.

## Implemented in this repository

- One product and installation home, with application ownership kept explicit.
- Pinned source bootstrap, isolated revision folders, refusal to overwrite existing work, generated workspace, and capability diagnostics.
- Private GitHub repository published and verified. Bootstrap fetched all three pinned component revisions from GitHub; the WOTBC discovery check returned the advertised capabilities successfully.

## Implemented in component branches

- Multilinguum `9b8b09d458cc5863fb25ab823f44033dce8e5711`: captions publish independently of speech; operator speech switch cancels pending requests and queued audio; direct speech translation closes and continues as text through the cascade; public text/audio availability is separate; listener playback honors audio-off; cloud operation no longer requires the GPU worker. See [verification](docs/verification/2026-09-12-translation-core.md).
- Heritage `18b69a84e6a753b6c9f01ea4155498ed1768fb82`: editable church settings for channel, current service video, listener URL, and broadcast delay; an explicitly shaped public `/live/settings.json`; database migration and access validation. Three parser tests, a real PostgreSQL/Payload round-trip/access test, type checks, and the production build passed. The combined player is not connected yet.

## In progress

- The Heritage integration branch is based on the clean WOTBC deployment (`5f66b647f050ad45bf596a19a62c308ff65d8294`), fetched directly from that server. Its service-document fix is preserved. The church deployment has not been changed by this implementation run.
- Heritage church settings, `/live`, `/translate`, and cohosting the processor beside Community.

## Required before completion

- Supported installation, setup, update, backup/restore, and compatible component releases.
- Community `/live`: configurable YouTube source, original/translated audio choice with mutual exclusion, readable captions, floating view/fallback, and explicit stream alignment.
- `/translate` and Heritage Bible entry point with text/voice choice.
- Authenticated Community and SyncShow control of one translation session, including mixer capture, stop, retry, and reconnect.
- SyncShow full-screen feed, lower third, ticker, output routing, manual override, and offline presentation continuity.
- Quality and shared-data economy configurations with stage-specific credentials/usage and no speech work while disabled.
- Shared service/song/sermon workflows and deliberate publication into Heritage resources.
- Real email sign-in and two-device personal notes/progress/conflict/offline acceptance.
- Bilingual English↔Russian service acceptance, representative phone playback, and video/translation alignment.

## Evidence boundaries

The original public audit verified an inactive listener embedded at WOTBC `/live`; `/translate` was absent. A server identity check confirmed Debian 13 on `heritage-community`, with a clean Git checkout and healthy Community/PostgreSQL containers. The public checks do not prove live audio, SMTP delivery, or two-device synchronization.

The configured `vr-mayos` connection currently requires renewed Cloudflare Access authentication. Its identity and current deployment have not been verified in this implementation run. No change to that host or authentication policy has been made.
