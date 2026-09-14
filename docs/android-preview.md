# Heritage Community on Android

The Android Community preview brings Community Home, passage-linked published sermons, member song links and personal notes/progress sync into the installed Heritage Bible app.

## Install or update

Download [Heritage 1.1.33-preview.2](https://github.com/edydex/heritage_study_bible/releases/tag/v1.1.33-preview.2) and choose `heritage-study-bible-1.1.33-preview.2-debug.apk`. Install it over the existing Heritage app; keep the previous installation and its data until the phone rehearsal passes. Do not uninstall first. The release check requires the same application ID and signer as v1.1.32 and a higher Android version code.

This is a development APK, separate from a store release. The release includes `android-build.json` and `SHA256SUMS` identifying its exact source, signing certificate, packaged web assets and native acceptance tests.

## Connect your church

Open **Community Home**, enter `wotbc.heritage.faith` under **Find a church**, and check/save the church. Public resources do not require an account. A church invitation and member sign-in unlock member resources. **My notes and progress** opens personal sync, which is separate from church membership and manager access.

- **Live service** opens the church stream with translation choices.
- **Live translation** opens translation without video.
- **Songs** and **Sermons and notes** open the church's available resources. Reviewed public sermons can also appear beside the Bible passages they reference.
- Save a member song for offline reading while signed in. The saved copy belongs to that church session; access revocation removes it when checked online.

Live pages require connectivity and an active translation service. No translation API key or data-sharing consent is included in the app.

## Automatic Sync

In **Settings → Sync**, turn on **Automatic Sync** on each device where you want it. It starts off. When signed in, Heritage waits until the Bible and local annotations have opened, then makes a quiet attempt after 10 seconds and every 3 minutes while the app is open and online. It pauses in the background and while typing in an editor, backs off after connection failures, and preserves edits made during requests. **Sync now** remains available.

The setting sends changed personal records; Bible downloads and recordings are not part of personal sync. Three minutes balances update speed against local scanning and server requests. Physical-phone battery use has not been measured.

## Acceptance boundary

Automated native checks use an Android emulator with Wi-Fi and mobile data disabled. The four tests exercise the bundled Community screens, native encrypted storage, Automatic Sync preference persistence across activity restart, offline Bible opening, and rejection of ciphertext moved to another storage key. The tests use synthetic values and do not send an email, access a real member song or call a translation provider.

Physical-phone installation/update, real email return into the app, member sign-in, native sharing, microphone/audio playback and a bilingual service rehearsal still require device acceptance. The separate real desktop-browser note/progress synchronization evidence does not substitute for these phone checks.

[Verified build, published assets and native acceptance](verification/2026-09-14-automatic-sync.json). The exact installer is also retained locally under `.heritage/installers/heritage/1.1.33-preview.2/`.
