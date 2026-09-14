# Run a service with Heritage and SyncShow

This is the intended weekly workflow for the current preview. WOTBC still needs provider setup and a complete mixer/phone/tablet rehearsal before relying on it for a service. See [current readiness](../STATUS.md).

## Open the right account

Use the [WOTBC church workspace](https://wotbc.heritage.faith/admin) to prepare services, manage songs and sermons, and control translation. Sign in with the church account that has an owner, admin or leader role, or the server administrator account.

Heritage's **Settings → Sync** signs you in for personal notes and reading progress. That reading session does not also sign you into the church workspace. If you need workspace access, ask the church administrator. The existing **Forgot password?** link belongs to the workspace password sign-in.

An already paired SyncShow instance uses its approved connection for the embedded planner and translation controls. Those windows do not need a separate browser sign-in. Opening the church workspace in an ordinary browser still uses the manager account above.

## Prepare before the service

1. Open **Plan a service** in Community or **Prepare** in SyncShow. Select the service and arrange songs, Scripture, sermon material and media.
2. Open **Live translation**. Select that prepared service, choose English → Russian or Russian → English, and choose Quality or Economy.
3. Choose whether to use sermon notes and generate translated speech. **Save for this service** retains the preparation choices. Economy's permission to share selected notes is a separate choice each time a session starts.
4. In SyncShow, **Load** the prepared package and check the English, Russian and stage-facing outputs. Loaded slides and media can continue if Community becomes unavailable.

If translation says it needs server setup, the server administrator must finish provider configuration before translation can start. Saving a plan does not connect the mixer or make provider requests.

## Start at church

1. Open the service's **Live translation** controls from Community or SyncShow. Both entry points control the same processor session.
2. Confirm the speaker's language, prepared service and note-sharing choice. Choose **Start translation**.
3. On the computer physically receiving the mixer's audio, select the intended input and choose **Connect this mixer**. Keep that capture computer connected and awake. The server cannot hear the mixer by itself.
4. Check the input meter and the original/translated text. Opening a control page alone does not activate its microphone.
5. In SyncShow, choose full-screen translation, lower third, ticker or text off. These display choices are separate from generating translated speech.

Another controller can open the same active service. It should show the acknowledged running state, not start a separate translation session. If capture stops after a connection problem, reconnect the intended mixer computer explicitly and check fresh text before continuing.

## Choose voice and audience playback

**Generate translated speech** controls whether the server makes voice output. Turning it off cancels queued voice and prevents new speech requests; text continues. Turning it back on starts with current speech rather than reading an old backlog.

An audience member's **Listen to** choice controls only that person's playback. Muting a phone does not turn off server-side speech generation.

- Share [WOTBC /live](https://wotbc.heritage.faith/live) with viewers who want the YouTube picture and original or translated audio. A service video still needs to be selected in church settings; the channel link is the fallback.
- Share [WOTBC /translate](https://wotbc.heritage.faith/translate) with people who want text or translated audio without video.
- **Float translation** offers a separate text view where the browser supports it. Check the actual phone/browser and measured broadcast delay before the service.

**Service usage** shows captured audio, reported text tokens, speech attempts and known estimated costs. Unknown costs are excluded and marked. Economy is not a promise of free usage, and the cost reminder does not stop spending.

## Finish the service

Choose **Stop translation** and confirm the controls return to the stopped state. In the same shared controls, open **Recorded services → Browse recordings**, choose a completed service, then choose its original or translated language. Audio controls appear when that track was recorded; text-only services still show their transcript. Closing review leaves the live controls available.

In SyncShow, use Preview 29 and a connection approved for recording review. An older connection can still control translation; reconnect the church to request the new permission, or use your manager account in Community. Attaching a reviewed transcript or recording directly to a sermon remains unfinished. A live AI transcript does not automatically become published sermon notes or commentary; a church manager reviews and publishes that material separately.

For server installation, provider setup, updates and backups, use the [server guide](server-setup.md). For tablet teaching, the fading pointer and remote slide gallery, use the [desktop preview guide](desktop-preview.md).
