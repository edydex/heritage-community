# Service flow, translation cues and Community books

## What changed

- Scripture readings have one numbered title parent with their passage slides below it. Following songs stay siblings. New songs and readings end with a removable blank; Media also offers a blank to insert anywhere.
- Scripture pagination uses text-line capacity rather than a four-verse limit. Only the internal BSB technical footer is hidden; imported-edition credits remain intact.
- Refrain is a distinct song part. Repeat counts and previously defined Chorus/Chorus a/Chorus b recalls become consecutive slides. Existing saved service copies retain their custom words; re-add a song to adopt new parsing. Existing split readings are not automatically recombined.
- Reusable slides retain separate English, Russian and stage-facing objects. An automatic opening slide can have an editable bottom topic. Original church artwork is stored privately, outside public source.
- A slide's context menu adds Start Translate or Stop Translate according to the preceding cue. The previous slide prepares the selected input; Start admits audio; Stop ends the owned session. The loaded service revision must match its reviewed translation plan.
- SyncShow remembers the chosen mixer, USB, line-in or virtual audio input for each church connection. A missing device reports an error instead of falling back to the built-in microphone. Jumping/backtracking reconciles the desired cue state; disconnect recovery stops the owned session before a restart.
- The prepared service controls language, recognition profile, optional note sharing and optional phone speech. Existing output controls choose ticker, full-screen/paragraph, lower-third or hidden text. Preparing an input does not send its audio for transcription.
- Community Books accepts a folder of text, chapter audio and word timings. Private book content and every audio request require current membership. Replacement attachment happens only after every audio object validates. The reader highlights words, seeks by paragraph, resumes position and offers a timeline and ten-second jumps.

## Verified source and package evidence

- [Heritage/Community PR 33](https://github.com/edydex/heritage_study_bible/pull/33): merged `b94b368d9bf6921f417fd00abc6e6caf9083a0ae`; reviewed and merged trees match. All seven CI checks passed. Root browser suite 72 passed; all 12 existing song-browser cases pass after correcting a statement boundary in the shared resource viewer. The regression checks retain redirect protection, same-session offline copies and access-denial clearing.
- Real disposable PostgreSQL/Payload book checks cover manager upload, member playback, outsider/anonymous denial, revoked membership and atomic failed replacement. The browser book rehearsal verifies current-time highlighting, paragraph seek, resume, chapter changes while paused, controls and denied audio.
- Chromium and Firefox planner checks cover reading/sermon distinction, bilingual title images, song parts, default language, saved cues and reopening.
- [SyncShow PR 13](https://github.com/edydex/SyncShow/pull/13), merged `70d16d07e03947f30ab9d79291fe6822bd2d2794`; [four-platform package and launch checks](https://github.com/edydex/SyncShow/actions/runs/35678197581), [regression checks](https://github.com/edydex/SyncShow/actions/runs/35678197583).
- [SyncShow Preview 33](https://github.com/edydex/heritage-preview-builds/releases/tag/syncshow-v1.4.0-preview.33) has seven private installers and ten verification files. All 17 uploaded sizes and SHA-256 digests match. The published Windows EXE was downloaded and verified: `2800d8cbf06b0ebdc6d46a7b930a7da28d69dbf31c3499f6a689182a4405e894`. Packaged, reviewed and merged trees match.
- [Multilinguum PR 6](https://github.com/edydex/multilinguum/pull/6), merged `674c013930eaa3549cf337626db0d6cef7d36672`: provider ingress is gated on the current live session, and Start/Stop use an expected-session check. The embedded operator reconciler includes input-disconnect/failed-stop recovery. Source and both Mac build checks passed. Existing standalone 0.1.1 installers are not replaced with different binaries under the same version.

## Acceptance still required

Use the actual mixer-connected Windows computer and all three church outputs. Check quiet preparation, exact Start/Stop boundaries, input unplug/reconnect, jumping over cues, closing Show, optional phone audio and a full service. Automated package launch is not a physical mixer or projector rehearsal.

The new private Community book path reads online in Heritage. It does not yet provide private offline audio downloads, native background playback or Android Auto for these uploaded books. Existing bundled audio features remain separate. Word-timing acceptance requires listening; a matching highlight does not establish narrator/text accuracy.

Private owner desktop previews retain the existing public-distribution limitations: Mac ad-hoc signatures, no notarization, and absent official Drive release credentials. Neither private content nor provider credentials are included in this record.

[Android 1.1.51-preview.1 / code 54](2026-09-21-android-1.1.51.json) is published in the normal Latest feed. The three release downloads, unchanged signer, 698 packaged web files and twelve native tests were independently verified. The actual update-checker function recognizes the live feed from older versions, including 1.1.50.
