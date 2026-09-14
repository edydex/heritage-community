# Committed recognition: phrase boundaries improved, terminology still open

The original-host rehearsal completed on September 14 with production capture/transcriber modules matching Multilinguum `a48419b58d1f51a333da208ed5b57f0045673df6`. Credentials stayed inside the original container. Nothing was deployed or configured on WOTBC.

## Result

| Sample | Audio | Commits / nonempty finals | Final text after audio-window end |
| --- | --- | --- | --- |
| Authorized Word of Truth Russian excerpt | 45 seconds | 8 / 8 | 514–1048 ms |
| Known English fixture | 10.49 seconds | 2 / 1 | 733 ms |

The actual capture pipeline paced 20 ms PCM frames and committed at detected pauses. For explicit `gpt-transcribe` selection, a 30-second emergency ceiling replaces the eight-second cutoff. Both provider session requests returned HTTP 200; no provider errors were recorded.

The known English sentence **“We do not earn it by good works”** was preserved in full. The Russian phrase spanning the old forced boundary stayed together. One Russian passage still substituted **искажение** for **снисхождение**. This is an improvement in phrase preservation, not completed bilingual quality acceptance. There is no formal word-error rate or human-reviewed reference.

The adapter also fixes completion ordering: later recognition cannot enter translation ahead of earlier committed audio. Empty and failed results release later completed text; missing results report an error after 30 seconds. Regression tests cover reversed completions, duplicates, empty/failed turns, early partial text, missing results and the longer natural-pause window.

## Scope and defaults

The current capture pipeline and real recognition provider ran. The engine boundary recorded source and cascade input; this comparison did **not** run translation, generated speech, persistent archive writes, LiveKit, UI playback, or a physical microphone/mixer. These timings therefore are not congregation display or listening latency.

`gpt-live-transcribe` remains the configured default. `OPENAI_TRANSCRIBE_MODEL=gpt-transcribe` is an explicit rehearsal candidate documented in Multilinguum; its UI rate remains unknown. The short sample does not justify claiming that recognition quality is solved.

The complete `pnpm check` passed, including 79 processor tests (22 focused adapter/capture tests), formatting, type checks and builds. [Source CI](https://github.com/edydex/multilinguum/actions/runs/34823780603) also passed at this exact revision. The development pin includes it; WOTBC remains on its earlier processor revision. Compiled module hashes from the paid test match the published source build; see [the JSON record](2026-09-14-committed-recognition.json).

## Test sequence and budget

- Run 04 failed because the test fixture omitted its required source channel. It yielded no quality result. A conservative $0.01 remains counted for the uncertain request.
- Run 05 corrected the fixture and exercised the actual pipeline at the old eight-second limit. It completed both languages, while revealing words lost at the forced boundary.
- Run 06 used the updated production adapter and natural pauses. It preserved those words, with the remaining Russian terminology issue described above.

Across all six tests, the conservative total is **$0.15 of the authorized $20**, with **no pending reservation**. This is a bounded list-price estimate, not an account invoice. See [the cumulative ledger](api-test-budget.json) and [earlier provider comparisons](2026-09-14-sermon-provider-test.md).

Raw transcripts, audio, scripts and sanitized results are retained privately under `.heritage/rehearsals/2026-09-14/sermon-providers/`. Next acceptance still requires a second excerpt and bilingual review, notes/context comparison, Economy and generated speech checks, WOTBC provider/manager setup and the full physical service workflow.
