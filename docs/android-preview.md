# Heritage Community on Android

The Android Community preview brings Community Home, passage-linked published sermons, member song links and personal notes/progress sync into the installed Heritage Bible app.

## Install or update

In the installed Android app, open **Settings → More settings** and check for updates. [Heritage 1.1.52-preview.1](https://github.com/edydex/heritage_study_bible/releases/tag/v1.1.52-preview.1) is now the normal GitHub Latest release, and the installed checker detects it from earlier builds through 1.1.51. Version code 55 preserves the existing application identity and signer.

You can also download `heritage-study-bible-1.1.52-preview.1-debug.apk` from that release. Install it over the existing Heritage app; keep the previous installation and its data until the phone rehearsal passes. Do not uninstall first. The release check requires the same application ID and signer as v1.1.32 and a higher Android version code. This release increases the numeric version, so the older checker can detect it too.

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

In **Settings → More settings → Sync**, turn on **Automatic Sync** on each device where you want it. It starts off. When signed in, Heritage waits until the Bible and local annotations have opened, then makes a quiet attempt after 10 seconds and every 3 minutes while the app is open and online. It pauses in the background and while typing in an editor, backs off after connection failures, and preserves edits made during requests. **Sync now** remains available.

The setting sends changed personal records; Bible downloads and recordings are not part of personal sync. Three minutes balances update speed against local scanning and server requests. Physical-phone battery use has not been measured.

## Songs and calendar

Pull down from the top of Community → Songs to refresh. The list also refreshes on opening. After about five seconds a stalled refresh ends with a small message; the saved list remains. Opening a published song saves its bilingual words for later offline reading. A successful catalog response follows the server’s Published choices. Personal notes and Bible downloads are preserved.

Community → Calendar starts with Events enabled and Recurring disabled. WOTBC uses America/Los_Angeles, including daylight saving. Church defaults and per-event/series visibility determine which public and member events appear.

## Acceptance boundary

Automated native checks use an Android emulator with Wi-Fi and mobile data disabled. The latest download matches all 696 web assets from its source, the native audio catalog and the verified signer. Thirteen tests cover audio playback/car browsing/storage in addition to the bundled Community screens, native encrypted storage, Automatic Sync preference persistence across activity restart, offline Bible opening, and rejection of ciphertext moved to another storage key. The tests use synthetic values and do not send an email, access a real member song or call a translation provider.

Physical-phone installation/update, real email return into the app, member sign-in, native sharing, microphone/audio playback and a bilingual service rehearsal still require device acceptance. The separate real desktop-browser note/progress synchronization evidence does not substitute for these phone checks.

[Current build, published assets and acceptance evidence](verification/2026-09-22-android-1.1.52.json). Earlier [Automatic Sync native evidence](verification/2026-09-14-automatic-sync.json) remains available.

Version 1.1.35 also formats verse cues and slide dividers as readable headings and paragraph breaks. Its built-in Russian hymns are limited to two sourced texts; church-published songs remain available.

Version 1.1.36 corrects the song list: only built-ins with Russian words show a Russian subtitle. A church-supplied Russian title can appear on the combined listing.

Version 1.1.37 adds the song-sharing popup with copy confirmation and a QR code. Calendar events open dedicated details pages. Pacific abbreviations work in Firefox, and the optional event website field has a clear description and field-level errors.

Version 1.1.38 fixes the first jump to a verse from saved notes and search. Unique prefixes such as Luk and Joh work, while ambiguous prefixes such as Jo and Ma open clickable book choices.

Version 1.1.39 adds first-section previews on mouse hover or keyboard focus. Normal touch taps still open songs. Its accompanying Community update adds passage shortcuts, a more compact sermon editor, right-click Slide settings and Ctrl/Command+Z.

## Audio and original-language reading

Open **Audio** for the Bible or audiobook library. Bible recordings are grouped under a translation such as **BSB Audio Bible**; open it to browse books and chapters. Choose a recording, use the internal player, and return through **Continue listening**. Position and speed are saved; app launch does not start sound. Use download controls while the app is open, then manage files in **Settings → More settings → Internal Storage**. Deleting a recording keeps reading notes and listening position.

The native media session supports background/headset/notification controls and an Android Auto library. Emulator browsing/playback checks passed; a real car/head unit still needs acceptance. All 1,189 BSB chapter recordings are available. Play/Pause is beside the chapter name. Default-on following uses a temporary gray marker and advances the open chapter with playback. Settings → More settings → Audio Settings contains the follow switches, chapters, position/speed and whole-BSB download confirmation. Complete-text timing is accepted for 29,630 of 31,102 entries (95.27% coverage, not accuracy). Tap a timed verse while listening to seek to its beginning. The reading marker moves to the next nonempty verse when the preceding accepted interval ends. Untimed verses still cannot be used for exact seeking; a run of missing timings holds at the first following verse until an accepted interval resumes.

**Go to nearby text** now covers matched portions of all 384 recordings in the ten internally readable audiobooks. Polycarp uses the Lake translation, Tertullian uses Dodgson, and Institutes includes both Allen volumes. Earlier reading editions and bookmarks remain separate. Recording IDs, saved listening positions and existing downloads are preserved. Unmatched passages open the book normally; these are automatic paragraph links, not exact word highlighting. The parallel reader also offers named WLC/OSHB Hebrew-Aramaic and Nestle 1904 Greek texts, with 94,788 checked Greek/BSB word-link groups across 6,596 matching NT verse records. Word occurrence results include BSB wording with the translated phrase highlighted beside the source Greek; missing mappings are labeled. Hebrew/Aramaic results provide BSB context without claiming exact word alignment. Tap words for occurrences; hold them or press Shift+Enter for counterparts. Settings → More settings → B&W switches subtle tints to patterns. Audiobooks now highlight the matched sentence while their matching text is open.

The unpublished 1.1.40 attempt passed native acceptance but its publisher exceeded a response buffer while reading a large source commit. Version 1.1.41 repaired that path; 1.1.48 also passes independent update-feed verification. No older published tag or APK was replaced.

Version 1.1.45 added the chronological plan’s optional Day 250 Egypt prophecy comparison. Oracle dates, proposed events and their evidential limits stay separate; Scripture links open the exact verse. It is preliminary editorial research with specialist review pending.

Version 1.1.46 adds internal Maximus text and paragraph following using the historical edition linked by LibriVox. All ten audiobooks now have internal reading text and installed automatic matches. Existing recordings, downloads and listening positions keep their identities.

Version 1.1.47 removes blank Bible reading highlights between verses. The marker advances as the previous interval ends, while tap-to-seek still requires a verified timestamp. See [continuous-follow verification](verification/2026-09-21-continuous-audio-highlight.json).

Version 1.1.48 fixes Android Bible marker delay by scheduling from the native playback service clock at verse boundaries. Ezekiel 42 exposed the old one-second update interval; pause, seek and 0.75×/1×/2× playback now pass measured native checks. The timestamp dataset is unchanged. [Verification](verification/2026-09-21-android-boundary-clock.json). Physical-phone listening remains the next acceptance step.

Version 1.1.50 groups Bible recordings by translation, fixes Android audio-page system-bar spacing and icon contrast, simplifies reader settings, and adds hold-to-open player controls with a timeline and ten-second jumps. All ten audiobooks now have 55,016 automatic sentence segments across 384 recordings. Existing text, bookmarks, listening positions and downloads are preserved. [Release verification](verification/2026-09-21-android-1.1.50.json). Physical-device and listening acceptance remain open.

Version 1.1.52 puts Community books in **Books** and the ordinary reader/audio library. Open the book and choose **Download book & audio** for resumable offline storage. Downloaded chapters use the Android background player; keep the church account signed in. Sentence highlighting replaces word-by-word highlighting, and following scrolls only enough to keep the active sentence visible. Remove copies in **Internal Storage**. [Verification and device acceptance](verification/2026-09-22-unified-books.md).
