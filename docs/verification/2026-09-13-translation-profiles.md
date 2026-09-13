# Quality and Economy profile checkpoint

## Published source

- Multilinguum `fa1aa3a03214a98f8ab442e2d05c4b7f57e38114`, branch `codex/heritage-live-integration`.
- Heritage `f44037b35d355f9d64d3cd157f64b16b0e7dee66`, branch `codex/unified-live-service`.
- SyncShow remains `fe5dc25a91bd84776ab560194ed61f80cd47f1c6`; its embedded Community operator receives the updated managed controls from the companion.

The user authorized publishing and deploying all integration work. The primary dirty application checkouts were preserved. Changes were made in the existing isolated integration checkouts.

## Behavior

Quality defaults to the documented GPT-6 Astra text candidate with low reasoning. Economy defaults to GPT-5.6 Terra with reasoning disabled. These remain candidates until a real bilingual quality/latency rehearsal. Both use the existing Live Transcribe recognition path and independent optional voice.

The operator selects the profile before starting. Session configuration is locked while active; the private archive records model and billing configuration. Public state does not expose it. Key selection happens only in the processor. Audio retains its existing key; Quality can use a separate text key; Economy requires a separate text-project key, rejects the same key used by audio or Quality, and never falls back to those projects.

Economy rejects attached private sermon notes before creating a session. It is disabled by default. It requires administrator confirmation of the sharing project and explicit acceptance of possible billed overage. No account sharing setting was changed. The application cannot establish account/model eligibility or remaining allowance, and a guaranteed zero-charge mode remains unfinished.

Text SDK calls use `store: false`, zero automatic retries, a 30-second timeout and a 4,096-token output ceiling for profiles. `store: false` does not override project sharing. These are request bounds, not a service spending cap.

Managed controls show model rates and recognition cost separately from optional voice in expandable details. The previous generic speech-to-speech estimate is not used for profile sessions: their `estimatedCostUsd` is explicitly marked `transcription-only`. Unknown custom-model rates are displayed as unknown.

Heritage's supported companion setup saves and preserves the eight profile settings through its existing private, atomic configuration flow. Docker passes them only to the translation processor.

## Verification

- Full Multilinguum suite: **82 tests passed**, zero failures (62 processor, 10 operator, 6 listener, 2 protocol, 2 edge).
- Full TypeScript checks and all builds passed; the final managed-client build also passed after the prepared-session voice-display correction.
- Real OpenAI SDK request construction, with synthetic fetch responses: correct project key, model, reasoning effort and output ceiling; one request on a synthetic quota failure, no retry or project fallback.
- Actual processor HTTP/session/archive path with synthetic responses: Economy source/target text, one text request, zero voice requests, profile recorded in archive, no profile/credentials in public state.
- Additional actual processor stage-routing rehearsal: speech-on sent text to the synthetic sharing key and TTS to the separate synthetic audio key. Turning speech off and replaying the next phrase produced another text request and no further TTS request. No audio was played to a device.
- Missing credential, unconfirmed sharing, blocked overage, duplicate-key, private-note and provider-route bypass checks passed before session creation.
- Actual in-app browser, built managed bundle and real loopback processor: unavailable profiles keep Start disabled; configured Economy selection and Russian → English direction persist through start; settings lock while live and unlock after stop; microphone remains unopened; expandable model/charge details and compact layout inspected visually.
- Heritage deployment suite passed, including private configuration preservation, format 3 backup checksums and maintenance/restore boundaries.

The UI rehearsal used only synthetic keys, with outbound provider HTTP disabled. Its two loopback servers and temporary browser tab were stopped/closed after verification. No real recognition, text translation or voice request occurred. Authorized paid-test spend remains **$0 / $20**; the earlier API-key-location question is pending.

Local logs are under `/private/tmp/heritage-unified-20260912/`: `profiles-tests.log`, `profiles-typecheck-final.log`, `profiles-build.log`, `profiles-operator-build.log`, `profile-stages.log`, and `profiles-deploy-tests.log`. Synthetic harnesses: `rehearse-profiles.mjs` and `rehearse-profile-stages.mjs`.

## Official documentation

Fetched official pages on 2026-09-13 confirm [GPT-6 Astra](https://developers.openai.com/api/docs/models/gpt-6-astra), [GPT-5.6 Terra](https://developers.openai.com/api/docs/models/gpt-5.6-terra), and [GPT-Live-Transcribe](https://developers.openai.com/api/docs/models/gpt-live-transcribe) model names and the displayed list rates. Public searches and the sharing settings page did not establish current account allowance. No claim of current eligibility or free audio is made.

## Deployment

The supported WOTBC companion setup completed successfully on the verified Debian 13.7 host `heritage-community`. Final installed Community source is clean `f44037b35d355f9d64d3cd157f64b16b0e7dee66`; the companion uses the separate pinned checkout `/opt/heritage-community/components/multilinguum-fa1aa3a03214a98f8ab442e2d05c4b7f57e38114` and image `heritage-translation:fa1aa3a03214`.

The command built the processor/client image, saved profile fields through private configuration, and ran the supported Community backup/build/migrate/update flow. Community, processor and the existing PostgreSQL container are healthy. PostgreSQL remained the same running container; the existing host tunnel was preserved.

Both format 3 backups passed all seven checksum checks:

- `backup-20260913T070304Z-pre-translation-setup` includes prior companion `6f00fb5`.
- `backup-20260913T070624Z-pre-update` includes new companion `fa1aa3a`.

Both inventories preserve 11 private recording objects totaling 3,883,891 bytes. Final staging is empty. This verifies the existing backup path, not a full combined restore rehearsal.

An authenticated preflight read inside the deployed processor verified both profile descriptors, their expected models/rates, missing audio and text keys, Economy `block`, and sharing confirmation `false`. No API or account setting was activated. Final public HTTP checks returned 200 for `/live`, `/translate`, the updated managed bundle and idle public state. The umbrella doctor reports advertised SyncShow, personal-sync and translation capabilities. The real `/live` browser reloaded successfully, reached “Waiting for the next service,” retained the correct YouTube channel and kept audio off. No current video is selected.

Deployment and final read-only proof logs: `wotbc-profiles-deploy.log` and `wotbc-profile-preflight.log` under the local evidence directory. The deployment command and all final checks exited successfully.

## Still required

Real API access and bilingual translation/latency evaluation, allowance and usage handling, actual mixer and phone audio, packaged SyncShow release, full combined restore, combined installation/release workflow, Heritage entry point and weekly resources/personal-sync acceptance remain open. This is an integration checkpoint, not completion of the unified product.
