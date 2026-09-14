# Buffered speech during an optional relay outage

Quality and Economy could still fail to start when LiveKit credentials were stored but the relay was unavailable. The shared console allowed speech without LiveKit after the earlier fix, but the backend still selected the configured relay for every service. Both new startup regression cases failed with HTTP 409 before this change.

Multilinguum `c91c678` selects delivery once per service. Buffered-only services use the existing HTTP audio path and do not contact LiveKit. A service containing a direct Realtime channel retains the configured relay path. The old relay-token endpoint rejects a buffered-only service rather than issuing a token for a room that is not created.

## Verification

The full Multilinguum check passed formatting, types, **128 tests** and production builds. The five new cases cover both profiles through start/render/off/on/stop, required relay failure for direct Realtime, and delegate lifecycle cleanup across services or failed setup.

The first CI run failed during archive finalization in the two new streaming tests. Their final fixture disables optional recording, keeping these tests independent of the archive encoder; recording has separate acceptance coverage. Commit `cf60544` contains this test correction with the same production code as `c91c678`.

The built processor and real shared operator/listener were then run locally with dummy provider keys and a real loopback relay endpoint that rejected HTTP and WebSocket connections with 503. Provider fetches were blocked. The browser started Quality and Economy sequentially, received captions and showed **Listening live** for generated tones. Both services made **zero relay requests** and **zero provider requests**.

Speech-off returned the listener to Audio off. New captions continued without another renderer call. Re-enabling Quality speech kept the listener stopped until a new audio choice and fresh phrase; playback then resumed. Economy stopped cleanly and the listener returned to Waiting for the next service. An initial browser autoplay restriction required Retry audio; subsequent fresh playback passed. The local rehearsal exited successfully and its processes were stopped.

This is delivery and failure-isolation evidence. The text translator and speech renderer were synthetic, so it adds no real-sermon quality result, paid-provider acceptance, LiveKit Cloud proof or physical-device listening evidence. The prior successful local WebRTC rehearsal is recorded separately in [audio relay and speech control](2026-09-14-audio-relay-and-speech-control.md).

No existing credentials were read or moved, and no real sharing settings changed. Paid test accounting remains **$0.79 of the $20 cap**, with zero new paid requests.

## WOTBC deployment

CI [34835391032](https://github.com/edydex/multilinguum/actions/runs/34835391032) passed before the supported unified updater installed `cf60544a21aac1df3044d4310666f04e4c58ba92`. Community remains `99bab02`; SyncShow's compatibility pin remains `5301a99`. The updater exited successfully.

The independent audit at `2026-09-14T11:01:39Z` matched the running `server.js`, `buffered-audio-relay.js`, `session-media-relay.js` and operator bundle against the tested local build. All three services are healthy and the tunnel is active. The retained runner and manifest reproduce receipt digest `2623d367aa4b46ad600f85d4b8a7213f03156ca60db8b770d128c66cf7414d7d`.

All seven checksums passed in each safety backup (`105519Z-pre-unified-update`, `105559Z-pre-translation-setup`, `105921Z-pre-update`, on September 14). The updater verified the unchanged inventory of 11 finalized recording objects / 3,883,891 bytes, with no staged files. Comparing against the first backup found only the translation image, source and revision keys changed. Saved provider settings stayed identical; no secret values were returned by the audit. The migration repeated its existing SMTP DNS warning, but the running Community app resolved the configured SMTP hostname. No email was sent in this check.

Both public routes were also checked in the actual browser after deployment: `/live` and `/translate` reached **Waiting for the next service** with **Audio off**. The former retains WOTBC's channel; the latter has no video player. This was idle-route acceptance, without starting a church service or contacting a paid provider. WOTBC manager/provider setup and the physical service rehearsal remain open.

See the [machine-readable evidence](2026-09-14-optional-relay-outage.json) and [current status](../../STATUS.md) for deployment and remaining acceptance.
