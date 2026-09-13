# The live service

Accepted direction, 2026-09-12: `/live` combines the church's YouTube stream with optional translation, while `/translate` remains useful without video.

## Watching and listening

The church sets its YouTube stream in Community administration. Do not hard-code the reference video from another church. A service may override the usual stream. Handle missing, offline, and non-embeddable video with an honest state and a link to the configured YouTube page.

WOTBC's accepted channel is [Word of Truth Bible Church](https://www.youtube.com/@wordoftruthbiblech), supplied by the user and verified in the channel page. The September 13 scheduled stream was visible as `yVg2nsbpJC0`; this is an observation for rehearsal, not a permanent channel default. Store the channel separately from the current service video.

Offer original YouTube audio, a currently available translated language, and muted audio. Only one source plays. Selecting translated audio mutes YouTube before playback; selecting original stops the translated track before unmuting YouTube. A failed translated connection leaves the original muted until the listener chooses it, preventing an unexpected language or loud audio switch.

Translation text is independently selectable. The main page can show video and captions together. Add a floating caption/control window when Document Picture-in-Picture is supported, with an inline layout available everywhere. Keep YouTube's controls and branding unobscured. Ordinary video picture-in-picture does not carry arbitrary HTML captions or language controls.

YouTube's IFrame Player API supplies playback, mute, and time controls. Document Picture-in-Picture supports arbitrary page content but needs feature detection and user activation. Verify both against supported browsers. [YouTube API](https://developers.google.com/youtube/iframe_api_reference), [Document Picture-in-Picture](https://developer.chrome.com/docs/web-platform/document-picture-in-picture)

## Timing is part of the feature

The YouTube broadcast and Multilinguum each introduce delay. Do not claim synchronized viewing merely because both play. Separate in-person listening (minimum practical delay) from watching the broadcast (aligned playback).

Carry source timestamps through captions and generated speech. The broadcast needs a source-to-video timing anchor; the YouTube player's current time alone is not a reliable wall-clock capture timestamp. Provide a measured church default and a listener adjustment, retain a bounded translated audio/text buffer, and reset alignment when the broadcast or translation session changes. A DVR seek or pause must not leave unrelated live speech playing over old video. Until replay alignment is ready, stop translated audio during such a seek and offer an explicit return to the aligned live view.

Both EN→RU and RU→EN need a real video/audio rehearsal. Caption and generated-audio timing remain separate so a slow or failed speech renderer does not stop screen text.

## Operator control

Community and SyncShow attach to the same active session. The operator chooses source language, target language, quality/economy profile, microphone/mixer input, and whether to generate speech. The public listener controls only its own view and playback; it cannot start provider work or obtain operator credentials.

Ordinary cloud speech already exists and belongs in the first integrated version. The required changes are explicit speech gating, clearing stale queued output, truthful availability, and the shared session controls. Cloned voice remains optional and does not make a GPU mandatory for ordinary installation.

## Current implementation

The first shared browser client and Heritage public proxy are implemented and published in the development pins. The local bilingual text and floating-panel rehearsal passed. See [the verification record](verification/2026-09-12-live-player.md) for the actual evidence and the outstanding video/audio/device checks. Timing remains unfinished; the broadcast-delay setting is not yet applied.
