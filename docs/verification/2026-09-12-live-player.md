# Shared live-player checkpoint

This is local integration evidence, not an accepted church deployment.

## Published development revisions

- Heritage: `445e459e447fcca3b390d61f5af745bda51a92da`, branch `codex/unified-live-service`.
- Multilinguum: `ba03971cb44aaccf48c0ae74a16fc2551679426a`, branch `codex/heritage-live-integration`.
- SyncShow remains at the existing pinned revision; no new projection integration is represented here.

The commits were created in isolated implementation clones and published to the listed integration branches after the user explicitly approved the source publication. The component lock pins these revisions. This is a development checkpoint, not a release or a WOTBC deployment.

## Implemented

Heritage `/live` and `/translate` mount one versioned Multilinguum browser client. `/live` combines the configured YouTube video with independently chosen text and audio; `/translate` has no video. Original video audio comes from YouTube. The text-language preference persists locally; navigating does not automatically start translated audio.

The shared client includes a resizable floating panel, an optional native Document Picture-in-Picture window, caption history/follow controls, generation-fenced audio connection cancellation, and explicit video interruption handling. Moving caption controls does not create a second audio hook or media connection.

The processor packages and serves the public browser module and flat JavaScript chunks. Heritage's build-time proxy forwards only the three public service/token/events endpoints and the client files. Public events contain availability and transcripts instead of raw private session/health objects; periodic public-state messages support disconnect detection.

## Verification

- Multilinguum `pnpm check`: formatting, type checks, 64 tests, all application builds, and the listener Worker deployment dry run passed. No Worker deployment occurred.
- New tests cover controlled audio-source ordering, stale mute confirmations, failed muting, public module delivery including dotted chunk filenames, path restrictions, cross-origin public access, unchanged operator authorization, public event shaping, and SPA-fallback rejection for missing browser modules.
- Heritage production build passed and includes both `/live` and `/translate`; type check and three settings-parser tests passed. The guarded database test is skipped in the ordinary command; its earlier real PostgreSQL/Payload run is recorded in the translation-core checkpoint. This change adds no new migration.
- A real locally running Heritage server forwarded the module, public service JSON, and WebSocket to the real synthetic processor. `/live`, `/translate`, module, and service returned 200; a private processor route under the public prefix returned 404. The proxied WebSocket delivered public state and two caption messages.
- Codex browser rendered the English and Russian synthetic feeds. Russian text and original YouTube audio remained independently selected. Floating/returning the page panel preserved those choices. Russian persisted after reload. `/translate` did not load a video. Stopping the processor changed the page to reconnecting while earlier text remained readable.
- No provider credentials were configured for these synthetic rehearsals. No OpenAI/LiveKit variables were present in the known local project configuration or WOTBC’s documented `config/community.env`; only SMTP variables were found in the latter. Paid test use against the newly authorized $20 allowance remains $0; see `api-test-budget.json`.

## Limits and next acceptance

YouTube remained blank in both the integrated player and an independent plain-iframe comparison in this browser. Opening its embed directly produced missing-referrer error 153. Native Document PiP could not be reliably exercised. A requested phone viewport override did not change the measured 1280×720 viewport, so this is not phone-width evidence. These are recorded as unverified playback/device behavior, not successful tests.

Controlled audio switching is tested with ports, not real YouTube plus LiveKit audio. Native YouTube volume changes are polled every 200 ms, which does not prove zero momentary overlap from manually changing native controls. Video and translated audio/text are not aligned yet; the broadcast-delay setting is stored but not applied.

Docker packaging, actual cohosting, authenticated Community/SyncShow control, actual EN↔RU paid-provider tests, Quality/Economy profiles, SyncShow output screens, and two-device personal sync remain part of the active objective.

WOTBC was rechecked read-only: Debian 13.7, host `heritage-community`, clean deployed revision `5f66b647f050ad45bf596a19a62c308ff65d8294`. No church deployment or data was changed.
