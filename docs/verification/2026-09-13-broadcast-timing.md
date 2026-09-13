# Broadcast translation timing — 2026-09-13

The development set pairs Heritage `6ef6e030b054b42904de0b4d943494144e77f21e` (timing feature `7af0ea2`) with Multilinguum `f5b0f8dfe1a5e7d3a2720494113e386db38c829a`. SyncShow remains `cd214139c7f1a21171575ee42f75db23912d16a1`.

## Implemented behavior

Heritage passes its existing `broadcastDelaySeconds` setting to the shared listener. A viewer can adjust 0–180 seconds. Captions, including provisional clauses, wait for their source position on the video's measured timeline. The viewer can turn off Match text to video to read immediately, including when an embed cannot load. Text and speech remain independently optional.

Multilinguum wraps the existing speech relay with a private, in-memory live window of already-rendered mono PCM, served as WAV. This makes no extra translation or voice calls. The window is bounded to 64 MiB, 512 clips and four minutes of accessible history. Public metadata contains clip identifiers, source bounds, duration and generation; it contains no private configuration or archive paths. Clip GETs validate UUIDs, require the matching active session and enabled channel, reject old generations and use no-store. The Community and optional listener-edge proxies expose only the narrow public route. Archived recordings remain behind the existing authenticated routes.

Source capture may begin later than session creation. Captions and speech now carry absolute source bounds derived from the capture pipeline's timing, with session-relative fallback for replay/older inputs. The live capture clock currently estimates microphone timing from processor arrival times; network and broadcast latency still require measurement. YouTube media time is not treated as a wall-clock capture timestamp.

The browser keeps one playing phrase and one prefetched phrase. Language changes, voice-off events, session changes, disconnect, cancellation, video pause/seek/buffering/rate changes stop pending playback. A stale fetch/decode cannot restart it. Audio never overlaps; expired phrases are skipped with a timing notice. Browser activation and downloads have bounded waits. After video interruption the listener returns to LIVE at normal speed and explicitly matches the current position before selecting translation again. Original YouTube audio and translation retain the existing mutual-exclusion control.

Quality/Economy cascade speech supports the new source-timed window. The legacy direct Realtime audio adapter does not have a verified source clock; it keeps its in-person LiveKit path and is not offered as aligned broadcast audio. Ordinary cascade listening can use the buffered HTTP path without LiveKit credentials.

## Verification completed locally

- 71 processor tests, 16 listener tests, 10 operator tests, 2 protocol tests and 3 listener-edge tests passed. The new coverage includes source-vs-rendered duration, delayed microphone start, PCM/WAV identity, size/age eviction, current-session-only HTTP delivery, generation invalidation, in-flight cancellation, no overlapping playback, late phrase expiry, source-clock caption gating, manual re-alignment and narrow edge proxying.
- Workspace typechecks, formatting and application/processor/edge builds passed. Listener/edge checks were repeated after their final edits.
- Heritage Community typecheck and production build passed. Three configuration tests passed; the database-backed live-settings test was explicitly skipped because this local invocation had no disposable database. The compiled Next route manifest contains the intended audio rewrite.
- In the actual internal browser, a localhost-only server emitted explicitly labeled synthetic tones and sample bilingual text through the real processor and shared listener. Normal user interaction started audio (Listening live); Stop audio returned to Audio off while captions continued. No external model was called. The rendered timing panel showed the supplied 15-second setting. Turning off Match text to video made the live text available when the reference embed stayed blank.

Multilinguum [CI 34757568873](https://github.com/edydex/multilinguum/actions/runs/34757568873) passed all three jobs (web/service checks, voice worker and desktop shell) for the published integration. [Draft PR 1](https://github.com/edydex/multilinguum/pull/1) keeps it reviewable without promoting the development set to main.

Community [CI 34757541168](https://github.com/edydex/heritage_study_bible/actions/runs/34757541168) stopped on existing ShellCheck warnings in deployment scripts, before container validation. Follow-up `6ef6e03` removes unused inventory bookkeeping, labels library-owned variables at their assignment sites and makes empty test environment values explicit. Backup/restore checks remain in place. The local deployment and appliance suites passed; [CI 34757765365](https://github.com/edydex/heritage_study_bible/actions/runs/34757765365) is the corrected exact-revision run.

## Acceptance still needed

The YouTube iframe remained blank in this internal browser and reached the explicit timeout state, as in the earlier rehearsal. This is not proof of working embedded video or measured broadcast audio synchronization. Native phone/tablet/Picture-in-Picture behavior, a real mixer, EN→RU and RU→EN generated speech, actual source-to-video delay and long-service listening still need a venue/provider rehearsal. Listener counts currently come from LiveKit and do not count buffered HTTP listeners. This is a development feature, not an accepted integrated release.

Provider-test spending remains $0 of the authorized $20.

## Deployment

Publication and WOTBC deployment will be recorded here after their exact revisions and live checks are verified.
