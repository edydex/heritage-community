# Provider documentation refresh

Checked official pages during the companion deployment work on September 12, 2026. No provider request was made and no model configuration was changed.

- The configured `gpt-live-transcribe` name is documented for streaming transcription, with a listed rate of $0.017 per audio minute. [Official model page](https://developers.openai.com/api/docs/models/gpt-live-transcribe).
- The configured `gpt-realtime-translate` name is documented for streaming speech translation, with a listed rate of $0.034 per audio minute. [Official model page](https://developers.openai.com/api/docs/models/gpt-realtime-translate).
- The configured `gpt-5.6-terra` name is documented for text workloads, at $2 input and $12 output per million tokens for ordinary context sizes. Its reasoning effort includes `none`, which may matter for live latency. [Official model page](https://developers.openai.com/api/docs/models/gpt-5.6-terra).

These pages confirm the model names and standard published rates, not the user's project access, actual translation quality/latency, or eligibility for complimentary shared-data tokens. A targeted search of the developer/platform documentation did not establish the current sharing allowance. Verify that separately before describing Economy as free. Keep transcription, text translation, and generated speech as distinct usage stages.
