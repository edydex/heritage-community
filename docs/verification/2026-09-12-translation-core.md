# Translation core verification — 2026-09-12

Revision: Multilinguum `9b8b09d458cc5863fb25ab823f44033dce8e5711`, branch `codex/heritage-live-integration`. Implemented in an isolated clone of `a825169`; the primary checkout was preserved. This revision is a development component, not an accepted integrated deployment.

`pnpm check` passed: repository formatting, all workspace type checks, 57 tests (44 processor, 8 operator, 3 listener timeline, 2 protocol), processor/operator/listener builds, and the listener Worker packaging dry run. The Worker step did not deploy.

Added coverage verifies zero speech requests for EN→RU and RU→EN with audio disabled; immediate captions while speech is pending; cancellation including a renderer that ignores AbortSignal; re-enabling without replaying old speech; captions surviving a speech failure; immediate closure of the paid direct-translation connection; rejection of late direct outputs; clearing an in-progress relay publication; and starting text with an unreachable configured LiveKit server. Anonymous listeners cannot change the speech switch or obtain an audio token for a disabled channel. Finalized text-only archives contain no nonexistent audio tracks.

A real local processor, operator UI, and listener UI were connected in the browser using synthetic text and no provider credentials. Both language feeds appeared with Audio off, and the operator switch changed during the active session without clearing captions. The operator reported that cloud capture was unconfigured, as expected in this fixture. This proves the local text/control path; it does not prove live OpenAI output, real audio playback, phones, microphones/mixer hardware, YouTube synchronization, or deployment at WOTBC.

LiveKit queue tests substitute the native relay transport. The listener's asynchronous playback changes build successfully but still need a real playback/reconnect rehearsal before release.

The combined bootstrap was also run against the real GitHub repositories. All three pinned starter revisions fetched successfully, and `doctor https://wotbc.heritage.faith` confirmed public discovery. That manifest advertises SyncShow and personal sync; it does not yet advertise translation.
