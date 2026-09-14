# Audio delivery and the unnecessary relay requirement

On September 14, a local real-relay rehearsal exposed a setup blocker: the shared Community/SyncShow operator disabled **Generate translated speech** when LiveKit was absent, even though Quality/Economy speech already uses buffered HTTP audio. The operator now checks the OpenAI audio-provider configuration. The setup wizard explains that a separate LiveKit relay is optional for direct Realtime audio.

Published source: Multilinguum [`55d9494`](https://github.com/edydex/multilinguum/commit/55d949498a50e909ac5f1adeff3c05fdea976163), Community setup [`99bab02`](https://github.com/edydex/heritage_study_bible/commit/99bab02cca6bb955aac856e9c9567492f3ba1396). [Machine-readable results](2026-09-14-audio-relay-and-speech-control.json).

## Real local audio transport

The current `aba43f7` processor, session engine, buffered relay, LiveKit publisher and listener bundle ran against LiveKit **1.13.7**, obtained from the official Homebrew bottle recommended by the [LiveKit local-server guide](https://docs.livekit.io/transport/self-hosting/local/). The bottle and extracted binary hashes are in the JSON record. The server bound to loopback using newly generated disposable credentials; no existing OpenAI or LiveKit credentials were copied. All local rehearsal processes were stopped afterward.

Only provider output was synthetic: known Russian/English text and quiet 440 Hz PCM tones. The first case used the normal buffered listener route alongside an actual native WebRTC receiver. The second selected the direct-Realtime channel path and injected deterministic replay output to exercise the actual browser WebRTC listener. It did not make a Realtime provider request.

| Check | Observed result |
| --- | --- |
| Captions with speech off | Russian/English captions appeared; speech render count remained zero. |
| Real relay audio | Native subscriber decoded 48 kHz mono frames, including non-silent tones. |
| Speech off during a queued 15-second tone | The last received frame above RMS 50 occurred 155 ms after the off action; no above-threshold frames appeared after 500 ms while off. This is a local measurement, not a venue latency guarantee. |
| Fresh captions while off | Captions continued; render count stayed at two. |
| Re-enable | Render count stayed at two and the receiver remained silent until a new phrase. Previously discarded speech did not resume. |
| Receiver reconnect | Listener count changed 1 → 0 → 1; fresh audio arrived after reconnect. |
| Buffered browser listener | Showed Listening live, returned to Audio off on operator speech-off, and resumed for fresh audio. |
| WebRTC browser listener | Joined as a listener; an audio element was playing with readyState 4 and advancing media time. Speech-off removed that element and its relay listener count returned to zero. |
| Listener-only stop | Removed browser audio but did not turn off the service's speech generator. A fresh test phrase increased the render count. |
| Service stop | Both browser cases returned to Waiting for the next service and Audio off. |
| Public listener token | Five-minute lifetime, subscribe allowed, publish and publish-data denied. No token string is included in the evidence. |

The native receiver recorded 17,087 ten-millisecond frames, of which 1,333 exceeded RMS 50. The deliberately interrupted long tone accounts for most of the difference between 24 seconds of generated tone and the received non-silent duration. Opus encoding and timing mean decoded samples are not expected to be byte-identical to input.

## Operator regression reproduced and fixed

The actual old built operator, with an audio-provider key configured and no LiveKit settings, displayed a disabled speech checkbox and “Audio relay setup is needed for translated speech.” After rebuilding the fix, the same browser fixture could enable speech, save it with a prepared Economy service, start the session, switch speech off/on while live, and stop.

A second fixture without the audio-provider key kept the checkbox disabled and displayed the correct OpenAI setup explanation. These fixtures used placeholder keys and an outbound `fetch` implementation that throws, and no mixer was connected. They prove control behavior, not new paid translation quality or credential validity.

Validation: full `pnpm check` passed (formatting, types, **123 tests**, and all builds), followed by [Multilinguum CI 34831898472](https://github.com/edydex/multilinguum/actions/runs/34831898472). Community shell syntax and the translation deployment fixture suite passed. The updated integration pin set passed its 11 portable tests.

## Scope and remaining work

No additional paid provider requests or reservations were made; the ledger remains **$0.79 conservatively accounted of $20**. The original provider host's pinned route still timed out, so the prepared recognition-context comparison remains unrun.

Quality/Economy captions and optional speech need the configured OpenAI audio provider and the existing Community connection. A separate LiveKit account is not required for this path. This does not make OpenAI audio complimentary, verify Economy allowance eligibility, or remove the existing provider-credential destination approval boundary.

The local results do not establish physical speaker/headphone audibility, microphone/mixer capture, phone playback, LiveKit Cloud, WAN recovery, YouTube timing, or an accepted church service. Real-sermon recognition and meaning still need work. The original fixture remains a local file; the other laptop is not the source.

Private raw results, measurements and exact rehearsal scripts are retained under `.heritage/rehearsals/2026-09-14/local-audio-relay/`. The initial prototype's cleanup attempted to stop an already stopped session and recorded the expected inactive-session 409; all processes then exited successfully.

## WOTBC deployment

The supported `node bin/heritage.mjs server update --host wotbc-community` command completed successfully. WOTBC now runs Community source `99bab02` and Multilinguum `55d9494`; the receipt digest is `056cbe3f0e103ea1e529c1b445c1748168480f0e3b54f113e87443802f12a2d5` and reproduces from the retained manifest and runner.

The processor's `/app/client/operator.js` and the file served through Community both match the tested local bundle, SHA-256 `c6907647a56ba5720a213497894dcd63566d84901a0962506bbe08004125dc45`. Community, PostgreSQL and the processor are healthy; the public tunnel is active. Three new safety backups each passed all seven artifact checksums. The updater independently verified all 11 finalized recording objects, 3,883,891 bytes, and empty staging.

Comparing the live private configuration with the pre-update recovery archive found only the expected translation image, revision and source-path changes. Provider settings have the same before/after digest. No credential transfer, account-sharing change, paid request, or email send occurred. The isolated migration container repeated its previously observed SMTP DNS warning; live Community runtime DNS resolved successfully afterward. This was not a new email-delivery test.

Both public `/live` and `/translate` pages reconnected in the actual browser and showed Waiting for the next service with Audio off; `/translate` has no video. Manager sign-in and configured-provider operation remain separate acceptance items.
