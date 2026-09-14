# Pastor controls and progress report — 2026-09-14

Published SyncShow source: [`3af7c31`](https://github.com/edydex/SyncShow/commit/3af7c310d999c1bac1c870aff512a331e2d50767) on `codex/heritage-live-translation`, part of [PR 7](https://github.com/edydex/SyncShow/pull/7). These additions are not yet in the installed compatible-set pin or a new accepted installer.

The tablet now offers **Trailing pointer · 1 second**. Each fragment fades progressively while the gesture continues. Permanent pen/highlighter ink is unchanged. Transient trails have bounded point storage, do not consume saved ink, and do not restore when returning to a slide. Only the active pointer layer animates; main slide/ink painting is unchanged by pointer-only updates. Preview capture waits for a quiet trail to avoid leaving a frozen pointer in the tablet image. Physical tablet timing and performance remain unmeasured.

**Slide gallery** is accessible beside the teaching controls and in ordinary Remote. It shows the current slide plus up to three on either side, with **Show all slides** for the full catalog. Selecting a slide uses the existing acknowledged navigation and stale-state checks. Drawing is paused immediately on confirmed cue changes until the corresponding preview is ready; the native rehearsal found and resolved that preview handoff race.

Every paired remote's confirmed Previous, Next or gallery change sends the host a full-width banner naming the device and destination slide. It clears after six seconds or can be dismissed. It is sent only to the operator window. Rejected, stale, duplicated or no-op changes do not create a false navigation notice.

## Verification

The final published revision also passed all four source jobs in [CI 34816324009](https://github.com/edydex/SyncShow/actions/runs/34816324009) and the shared gate plus all four native builds in [Package Smoke 34816323979](https://github.com/edydex/SyncShow/actions/runs/34816323979). These are QA packages; this turn has not independently downloaded/inspected them or cleared the official public-release prerequisites.

- Required local suite: **2,237 passed, zero failed, two existing skips**. Syntax check: **219 files**. The final gallery focus adjustment passed the focused regression tests and the repeated native rehearsal.
- The native rehearsal uses the production main process, preload, Remote server and display renderers, with a temporary profile, synthetic service/displays and loopback pairing. It sends actual mouse input through Electron.
- During one continuous 1.65-second gesture, the early screen region had no pointer pixels while the recent region still did. Only the selected language output received the trail; after release it fully expired without creating saved ink.
- A ten-cue service showed four nearby cards at cue one; Show all displayed ten, and toggling back restored four. Gallery selection changed the actual Show. The host banner showed the remote device and destination, while every congregation/stage output lacked the notice element.
- Existing pen, highlighter, Undo/Clear, per-slide ink restore, blackout/restore, reconnect and Show-end checks passed. Gallery and host screenshots were inspected.
- The standalone [HTML progress report](../progress.html) renders ten expandable areas, a weighted approximate completion estimate and a pointer illustration. Desktop rendering and all-area expansion were inspected. At 390px, the document width was exactly 390px with no horizontal overflow.

[Machine-readable evidence and image hashes](2026-09-14-pastor-controls.json). The final JSON, screenshots and test logs are retained privately under `.heritage/rehearsals/2026-09-14/pastor-controls/` in the durable integration checkout.

No physical tablet, stylus, Wi-Fi, projector or phone acceptance is claimed. This is a source-app rehearsal, not proof of a new packaged release. No paid API request was made. The user-authorized [WOTBC sermon at 41:32](https://www.youtube.com/watch?v=rULLyk5e8Yg&t=2492s) is the next real-audio source; its translation test is pending. The provider credential transfer remains subject to the previously requested explicit approval after automatic review rejected that transfer; this turn did not retry it.
