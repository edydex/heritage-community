# Shared recording review

The shared **Live translation → Recorded services** view lets a church manager browse finalized services, read original and translated transcripts, and play the audio tracks that were actually recorded. Text-only services remain reviewable. English and Russian original/translation labels follow the service's source language.

The review stays beside the running controls. Opening it does not disconnect capture, and renewal of the live-control connection does not reload the selected recording. A saved service title and date identify newly recorded sessions. No transcript is automatically attached to a sermon or published as commentary.

## Access and compatibility

Community managers use their existing church role and browser session. SyncShow requests the separate `syncshow:translation:archives:read` permission only when the server advertises it. Preview 29 understands that permission. An older approved connection keeps live control but cannot read recordings until the church reconnects and approves the new permission. The permission description in approval screens and mail uses readable wording.

The processor issues a short-lived, memory-only recording-review token. It authorizes only archive list, transcript, audio and latency reads. It cannot start or stop a service, capture audio, read context documents, retain/delete recordings or mint another token. Live-control tokens do not grant archive access. Existing Preview 28 discovery remains compatible because the new recording capability is advertised separately.

## Rehearsal evidence

A disposable PostgreSQL database, compiled Community server and actual translation processor were exercised through SyncShow's native `TranslationOperatorWindow` and an ordinary browser. Two finalized synthetic records covered English audio with Russian text only, and Russian original/English translation with no audio. Computer use verified the list, language labels, text-only layout, word seeking and playback. The approved native window made three successful access exchanges while each selected archive file loaded only once. A control-only connection stayed connected and received a clear update/reconnect message when recording review returned 401. The ordinary browser used the synthetic manager sign-in, returned to the controls and opened the Russian text-only record.

The fixture applications, native windows, browser tab and PostgreSQL were stopped. No microphone, mail or paid provider calls were used. This is real application/API and UI evidence with synthetic content; it does not establish sermon transcription quality, real church account approval or physical phone behavior.

## Checks and corrections

- Heritage: 18 focused tests, final TypeScript check and production build passed. The exact production-container workflow passed at `21d3ad9`.
- Multilinguum: all 160 checks in the local full suite passed. CI exposed a missing recording dependency: the runner had no FFmpeg. Removing FFmpeg from the local test path reproduced `spawn ffmpeg ENOENT`; CI now installs the encoder already included in the production image. All 106 processor tests passed with it, and the corrected three-job workflow passed at `c92aafe`.
- SyncShow: 56 focused checks and 2,238 active broad tests passed, with two pre-existing platform-specific skips. The first sandboxed broad run could not bind localhost; the same unmodified remote-server tests passed with socket access.
- Earlier local fixture errors (grant uniqueness and an incorrect seed API call) and test-development corrections are retained in the evidence, followed by the passing runs.

## Delivery and remaining work

Preview 29 (`3ae4f2b`) passed all four source-test targets and all four QA packaging jobs. The downloaded Apple Silicon DMG/ZIP hashes match CI; all 324 bundled application files match the published revision, and native runtime hashes and the deep code-signature check pass. The explicitly excluded thumbnail test page remains excluded. Computer use observed the real packaged Load screen with an isolated temporary profile; the app then quit successfully. The installer and receipts are retained locally. This is a QA preview, separate from the protected official release.

WOTBC's supported update completed at `2026-09-14T16:23:07Z`. Community is clean at `21d3ad9`, and the processor is clean at `c92aafe`. All three services are healthy. Three safety backups pass all seven checksums each; the private installation receipt matches its retained version set. Only the translation source/revision/image settings may change; the exact changed keys are recorded in the JSON audit. Saved provider settings retain their previous digest, with no credential transfer. The running processor modules and served operator bundle match the tested local build. Five public routes and five workspace entry routes pass; all four anonymous archive routes return 401. SMTP connectivity passes without sending mail. The real browser reconnected both public listener pages to **Waiting for the next service**, and the manager entry redirected to the church-workspace sign-in guide with its return destination retained. All eight public-origin curl checks passed, including the four recording denials; the initial Python request was separately rejected by the edge with 403. The actual intended WOTBC manager account and recording-review permission approval remain unverified.

The next product step is attaching selected reviewed transcript and recording material to the canonical sermon, preserving church review and publication decisions. Full-service archive size/phone memory, real manager and device-pair approval, mixer/venue acceptance, provider setup and official desktop release remain open. The readiness estimate remains approximately 75%.

The [machine-readable record](2026-09-14-shared-archive-review.json) separates these scopes. Detailed local evidence is retained outside published source under `.heritage/rehearsals/2026-09-14/shared-archive-review/`. Connection credentials, database files, browser profiles and archive contents are excluded.
