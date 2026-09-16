# Heritage Community on Android

The Android Community preview brings Community Home, passage-linked published sermons, member song links and personal notes/progress sync into the installed Heritage Bible app.

## Install or update

In the installed Android app, open **Settings → Advanced Settings** and check for updates. [Heritage 1.1.39-preview.1](https://github.com/edydex/heritage_study_bible/releases/tag/v1.1.39-preview.1) is now the normal GitHub Latest release, and the installed checker detects it from earlier builds through 1.1.38. Version code 42 preserves the existing application identity and signer.

You can also download `heritage-study-bible-1.1.39-preview.1-debug.apk` from that release. Install it over the existing Heritage app; keep the previous installation and its data until the phone rehearsal passes. Do not uninstall first. The release check requires the same application ID and signer as v1.1.32 and a higher Android version code. This release increases the numeric version, so the older checker can detect it too.

Published future Android builds use the same normal update feed, including labelled development previews. The publishing process now rejects suffix-only version increments and native version codes that cannot update the latest APK, verifies asset integrity, and checks the actual Latest response. Build-only CI artifacts are not automatically published. See the [update-feed verification](verification/2026-09-14-android-update-feed.md).

This is a development APK, separate from a store release. The release includes `android-build.json` and `SHA256SUMS` identifying its exact source, signing certificate, packaged web assets and native acceptance tests.

## Connect your church

Open **Community Home**, enter `wotbc.heritage.faith` under **Find a church**, and check/save the church. Public resources do not require an account. A church invitation and member sign-in unlock member resources. **My notes and progress** opens personal sync, which is separate from church membership and manager access.

- **Live service** opens the church stream with translation choices.
- **Live translation** opens translation without video.
- **Calendar** opens a dedicated page from the button before Sermons. Multi-day events span the dates in one bar within each week.
- **Songs** and **Sermons and notes** open the church's available resources. Reviewed public sermons can also appear beside the Bible passages they reference.
- Save a member song for offline reading while signed in. The saved copy belongs to that church session; access revocation removes it when checked online.

Live pages require connectivity and an active translation service. No translation API key or data-sharing consent is included in the app.

## Automatic Sync

In **Settings → Sync**, turn on **Automatic Sync** on each device where you want it. It starts off. When signed in, Heritage waits until the Bible and local annotations have opened, then makes a quiet attempt after 10 seconds and every 3 minutes while the app is open and online. It pauses in the background and while typing in an editor, backs off after connection failures, and preserves edits made during requests. **Sync now** remains available.

The setting sends changed personal records; Bible downloads and recordings are not part of personal sync. Three minutes balances update speed against local scanning and server requests. Physical-phone battery use has not been measured.

## Songs and calendar

Pull down from the top of Community → Songs to refresh. The list also refreshes on opening. After about five seconds a stalled refresh ends with a small message; the saved list remains. Opening a published song saves its bilingual words for later offline reading. A successful catalog response follows the server’s Published choices. Personal notes and Bible downloads are preserved.

Community → Calendar starts with Events enabled and Recurring disabled. WOTBC uses America/Los_Angeles, including daylight saving. Church defaults and per-event/series visibility determine which public and member events appear.

## Acceptance boundary

Automated native checks use an Android emulator with Wi-Fi and mobile data disabled. The four tests exercise the bundled Community screens, native encrypted storage, Automatic Sync preference persistence across activity restart, offline Bible opening, and rejection of ciphertext moved to another storage key. The tests use synthetic values and do not send an email, access a real member song or call a translation provider.

Physical-phone installation/update, real email return into the app, member sign-in, native sharing, microphone/audio playback and a bilingual service rehearsal still require device acceptance. The separate real desktop-browser note/progress synchronization evidence does not substitute for these phone checks.

[Current build, published assets and acceptance evidence](verification/2026-09-16-preparation-qol.md). Earlier [Automatic Sync native evidence](verification/2026-09-14-automatic-sync.json) remains available.

Version 1.1.35 also formats verse cues and slide dividers as readable headings and paragraph breaks. Its built-in Russian hymns are limited to two sourced texts; church-published songs remain available.

Version 1.1.36 corrects the song list: only built-ins with Russian words show a Russian subtitle. A church-supplied Russian title can appear on the combined listing.

Version 1.1.37 adds the song-sharing popup with copy confirmation and a QR code. Calendar events open dedicated details pages. Pacific abbreviations work in Firefox, and the optional event website field has a clear description and field-level errors.

Version 1.1.38 fixes the first jump to a verse from saved notes and search. Unique prefixes such as Luk and Joh work, while ambiguous prefixes such as Jo and Ma open clickable book choices.

Version 1.1.39 adds first-section previews on mouse hover or keyboard focus. Normal touch taps still open songs. Its accompanying Community update adds passage shortcuts, a more compact sermon editor, right-click Slide settings and Ctrl/Command+Z.
