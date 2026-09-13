# Broadcast translation timing — 2026-09-13

The development set pairs Heritage `3b48db817a9ae5dded9ae7873b1171783d6eb8ec` (timing feature `7af0ea2`) with Multilinguum `f5b0f8dfe1a5e7d3a2720494113e386db38c829a`. SyncShow remains `cd214139c7f1a21171575ee42f75db23912d16a1`.

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

Community [CI 34757541168](https://github.com/edydex/heritage_study_bible/actions/runs/34757541168) stopped on existing ShellCheck warnings in deployment scripts, before container validation. Follow-up `6ef6e03` removes unused inventory bookkeeping, labels library-owned variables at their assignment sites and makes empty test environment values explicit. Backup/restore checks remain in place. The local deployment and appliance suites passed; [CI 34757765365](https://github.com/edydex/heritage_study_bible/actions/runs/34757765365) passed static checks, build and migrations, then exposed a public-site identity defect: its home page still rendered a hard-coded WOTBC name on an installation configured as CI Church. Follow-up `3b48db8` uses the configured community name in the public header, metadata, home page, footer and sermon list, with shared per-render settings reads. Its local typecheck and production build passed.

## Acceptance still needed

The YouTube iframe remained blank in this internal browser and reached the explicit timeout state, as in the earlier rehearsal. This is not proof of working embedded video or measured broadcast audio synchronization. Native phone/tablet/Picture-in-Picture behavior, a real mixer, EN→RU and RU→EN generated speech, actual source-to-video delay and long-service listening still need a venue/provider rehearsal. Listener counts currently come from LiveKit and do not count buffered HTTP listeners. This is a development feature, not an accepted integrated release.

Provider-test spending remains $0 of the authorized $20.

## Deployment

The first timing deployment (Heritage `7af0ea2`, Multilinguum `f5b0f8d`) completed on WOTBC at `2026-09-13T12:48:19Z`, receipt digest `9f2e1c126d40d0e1a6cfa6954e32550e114892add398af22f63045b56aee02b5`, mode 0600. All local/public health checks passed; private recording coverage remained 11 objects / 3,883,891 bytes with no staging files. Every artifact in each of the three safety backups (`backup-20260913T123700Z-pre-unified-update`, `backup-20260913T123740Z-pre-translation-setup`, `backup-20260913T124102Z-pre-update`) passed an independent SHA-256 check. The public audio route returned 410 for a non-current session.

The deployed shared listener and the local tested bundle had identical SHA-256 `32800ab80fa72e8dde50590bdc94984af3ea8d7b51121b1ed496f87d42cfdd77`. The actual WOTBC `/live` page reloaded to Waiting for the next service with Audio off and the correct church YouTube channel. No service video is currently selected. The existing signed-in internal browser also completed a normal Sync now at 05:53:28 Pacific, displaying Synchronization finished with no conflicts.

The configured-identity follow-up passed [Community CI 34758252819](https://github.com/edydex/heritage_study_bible/actions/runs/34758252819) at exact revision `3b48db8`, including static checks, fresh production containers, bootstrap, authentication, isolation and backup verification. The final pinned update is being applied.
