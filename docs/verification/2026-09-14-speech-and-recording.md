# Real speech controls and follow-up recording fixes

On September 14, the actual capture pipeline and SessionEngine processed the authorized 45-second Word of Truth sermon and a known 10.49-second English fixture. The original host used `gpt-transcribe`, Quality `gpt-6-astra` and built-in Cedar speech from `gpt-4o-mini-tts`. All 15 provider requests returned HTTP 200. No credentials moved and no WOTBC settings changed.

## What the paid test proved

| Case | Captions | Speech requests | Result |
| --- | --- | --- | --- |
| Russian sermon → English | 7 | 5 | Generated speech, two further captions with voice off and no new speech request, then speech resumed |
| Known English → Russian | 1 | 0 | Text continued with voice off throughout |

The generated speech contained non-silent PCM; 29.31 seconds were returned by the speech endpoint before application trimming/pause handling. The private archive finalized its generated-audio track and transcript tracks; their recorded hashes match the retrieved files.

Russian-phrase-end to caption publication at the local recording relay was **3.62–8.01 seconds**. The English fixture measured **5.52 seconds**. Text requests took 3.03–5.98 seconds; speech requests took 1.17–3.40 seconds. These measurements exclude LiveKit, listener buffering and device playback. The relay was a local recording sink, so this is not network cancellation or phone-listening acceptance.

**Meaning remains unaccepted.** One Russian recognition error reached English as “distortion.” Another phrase says “preserve character” and needs review against the recording. The clip ends mid-sentence. No human-ground-truth error rate or quality percentage is claimed.

The local [phrase-by-phrase review](../../.heritage/rehearsals/2026-09-14/sermon-providers/full-engine-07/review/index.html) contains the original recording, recognized text, translations and five generated speech clips, labeled as AI-generated. It is retained locally and ignored by Git. The HTML loaded in the internal browser, but the browser crashed during the audio-control check; browser playback is not counted as verified.

## Recording defects found and fixed

The paid run used `a48419b58d1f51a333da208ed5b57f0045673df6`. Requested original recording was absent because original playback was off. Inspection and failing regressions also showed that disabled audio-recording flags were ignored and that capture discarded source tails shorter than one second.

Follow-up `aba43f734949b673fb14f00e154359f6e5de3530` separates recording from listener playback: `recordSource` records original audio even when listeners do not hear that channel; `recordTranslations` controls generated and direct translated-audio recording. The archive itself rejects audio for a channel excluded by those flags. Transcripts remain independent. Capture now flushes the complete final audio chunk.

The complete `pnpm check` and [source CI](https://github.com/edydex/multilinguum/actions/runs/34825576648) passed, including **89 processor tests**. A separate offline run with the actual updated capture/engine/archive preserved all 4,320,000 source PCM bytes for Russian and 1,006,584 bytes for English after Opus decoding, including the latter's 0.485-second tail. Recognition, translation and speech providers were test doubles in that follow-up; it made **zero paid requests**. This distinguishes the recording regression proof from the earlier real-provider run.

The development pin includes the follow-up fix. WOTBC remains on processor `21a9576`; these changes have not yet been deployed there.

## Budget and remaining acceptance

The conservative cumulative ledger is **$0.79 / $20**, with **no pending reservation**. This run's text/recognition list-price calculation is $0.1327. Its PCM speech responses have no token-usage field, so $0.10 per speech request remains conservatively counted ($0.50); this is not a verified bill. See [the ledger](api-test-budget.json), [text pricing](https://developers.openai.com/api/docs/models/gpt-6-astra) and [speech pricing](https://developers.openai.com/api/docs/models/gpt-4o-mini-tts).

WOTBC provider/manager setup, bilingual meaning review on a second excerpt, notes/Economy comparison, physical microphone and relay/phone/browser playback remain open. The original-host control result does not satisfy those separate requirements. Raw evidence and source-matched test modules are retained beside the local review.
