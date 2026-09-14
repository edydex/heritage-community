# Real-sermon provider test: requests work; recognition needs improvement

The authorized [Word of Truth sermon](https://www.youtube.com/watch?v=rULLyk5e8Yg&t=2492s) was tested from **41:32 for 45 seconds**, in Russian. A known 10.49-second synthetic English passage tested the opposite direction. Current Multilinguum provider modules from `21a9576` ran inside the original Multilinguum container, using its existing credentials. No WOTBC configuration, key transfer, relay or running service was changed.

## What passed

Both live transcription sessions and both `gpt-6-astra` translation requests returned successfully without provider errors. The translation responses passed the current structured output parser. No speech endpoint was called.

| Sample | First transcript partial | Final transcript after audio-window end | Whole-transcript translation request |
| --- | ---: | ---: | ---: |
| Russian sermon, 45 s | 0.761 s | 0.415–0.706 s | 14.637 s |
| Synthetic English, 10.49 s | 0.680 s | 0.489–0.670 s | 8.364 s |

These are **direct provider measurements**, not live display latency. Audio was paced in real time with eight-second commits. Translation was requested once after the entire transcript was available. The actual capture pipeline additionally detects source pauses and translates incrementally; this harness did not exercise it.

## What failed the quality review

Successful requests did not establish faithful recognition. The known English ending “We do not earn it by good works” became “We do not Not earned by good works” in the source transcript. The text translator recovered that sentence's meaning.

The Russian live recognizer repeatedly produced **искажение**, while an independent whole-file `gpt-transcribe` comparison produced **снисхождение** and more coherent grammar. The English translation inferred “forbearance” from the damaged streaming transcript. That inference cannot substitute for faithful speech recognition.

Two additional ASR-only runs tested higher transcription delay with eight-second commits, and the original low delay with a single final commit. Both completed, but neither resolved the recurring Russian term. No application defaults were changed from these diagnostics.

The whole-file comparison returned in **2.970 seconds after upload** and reported 45 seconds of audio usage. It is an independent automated comparison, **not human ground truth or a live-stream latency result**. No formal word-error rate or translation-quality percentage is claimed. The official [live-transcription guide](https://developers.openai.com/api/docs/guides/realtime-transcription) distinguishes live partial transcription from committed-turn transcription and recommends testing the latency/accuracy tradeoff on representative audio.

## Budget and remaining work

The three bounded runs used **$0.12 conservatively estimated** of the authorized **$20**, with no pending reservations. Provider usage and published list prices imply approximately $0.1001 total; the ledger rounds each run upward. This is not a verified account invoice. See [the ledger](api-test-budget.json), [live transcription pricing](https://developers.openai.com/api/docs/models/gpt-live-transcribe), [text pricing](https://developers.openai.com/api/docs/models/gpt-6-astra), and [file transcription pricing](https://developers.openai.com/api/docs/models/gpt-transcribe).

Next, compare committed-turn `gpt-transcribe` in the actual capture pipeline before choosing the Quality default. Review against the recording with a bilingual listener and a second excerpt; then compare notes, Economy and speech on/off. WOTBC manager setup, relay/phone listening, mixer input and full-service acceptance remain open.

Request usage, timing, fixture hashes and limitations are in [the JSON record](2026-09-14-sermon-provider-test.json). Audio, transcripts and sanitized raw evidence are retained privately under `.heritage/rehearsals/2026-09-14/sermon-providers/`. All credentials remained in the original host's existing container environment.
