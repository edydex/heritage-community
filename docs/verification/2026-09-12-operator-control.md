# Authenticated operator checkpoint

This is local integration evidence, not a church deployment.

## Published operator revisions

- Heritage `a9b0f03bbb47e5fb0289f8dba8f14f9cd66ddecd`, branch `codex/unified-live-service`.
- Multilinguum `3817624e902e3ea74b5b5943e5edf0d36df39e16`, branch `codex/heritage-live-integration`.

Both commits are published to their integration branches. The user subsequently authorized publication of all integration work, resolving the earlier approval boundary. Later companion checkpoints include these operator changes; `components.lock.json` records the current published development set.

## Implemented

Heritage's church workspace links to `/admin/live-translation`, which loads a versioned Multilinguum manager module. The console provides English/Russian direction, cloud translation start/stop, optional generated speech, explicit mixer connect/disconnect, input selection/metering, shared capture status, and bilingual live captions.

The Community server checks manager membership or system administrator access and exchanges its permanent processor key for a signed ten-minute lease. Browser requests require the configured same Origin. SyncShow needs the explicitly granted `syncshow:translation:control` scope and a still-valid manager connection. Leases cannot mint more leases, replay transcripts, or manage archives, sermon-context documents, or voice profiles. The browser renews in memory; capture continues across renewal. Expired or invalid access stops the capture socket. Revocation has a maximum ten-minute lease window.

Both the standalone and embedded operators now wait for an explicit mixer action before opening audio input. The capture stream waits for processor readiness, refuses a second capture console, stops on congestion, and does not silently reconnect. Concurrent session creation/start/stop is serialized. The existing public listener contract is preserved; the Heritage proxy now also enumerates the authenticated control routes while excluding the permanent-key lease issuer and archive administration.

The processor Dockerfile includes the operator module and PCM worklet. Heritage's Compose configuration passes the processor origin at build and runtime and carries the private control key. This does not yet install a companion or extend archive backup/restore.

## Verification

- Multilinguum full check: formatting, type checks, 72 tests, production application builds, and Worker dry run passed. The final voice-switch availability/layout adjustment was followed by a successful operator production build.
- Tests cover forged/expired/wrong-server leases, same-operator renewal, rejection of operator/master takeover, an actual injected operator WebSocket renewal/rejection, private endpoint scope boundaries, competing session creation, proxy path preservation, and frontend event-socket renewal without reconnection.
- Heritage's 28 focused access/SyncShow tests passed, including anonymous/member rejection, cross-origin rejection, explicit device scope, revoked device/current manager checks, and secret-free upstream errors. Type checking, the production build, and existing installer/operator tests passed.
- Real disposable PostgreSQL/Payload account and browser login succeeded. Opening the operator anonymously showed sign-in required. After sign-in, the page loaded the processor module and authenticated state through Heritage's proxy.
- The rendered page was inspected. A planner-specific layout collision was found and fixed; the corrected production build displayed the intended full-width controls.
- A real local processor session using deterministic providers sent English and Russian synthetic captions into the open manager page. Clicking **Stop translation** ended that session and returned the UI to its connected, stopped state. The language selector then switched to Russian → English.
- Opening the page did not request microphone access; the page and processor reported no mixer connected. Real microphone capture was not exercised. Starting a cloud session correctly remained disabled with no OpenAI key configured.
- No paid provider calls, no microphone recordings, no account data-sharing changes, no Docker image execution, and no WOTBC deployment occurred. Spend remains $0 of the authorized $20.

## Still needed

Supported companion installation/configuration/update and archive backup/restore; actual provider credentials and English/Russian quality/latency tests; Quality/Economy profiles; recovery from provider startup failures; actual capture renewal/reconnect and voice relay; SyncShow screen layouts and shared control wiring; YouTube/translation alignment; phone/device acceptance; Heritage Bible resources and two-device personal sync acceptance.
