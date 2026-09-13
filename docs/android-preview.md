# Heritage Community on Android

The Android Community preview brings Community Home, passage-linked published sermons, member song links and personal notes/progress sync into the installed Heritage Bible app.

## Install or update

Download [Heritage 1.1.33-preview.1](https://github.com/edydex/heritage_study_bible/releases/tag/v1.1.33-preview.1) and choose `heritage-study-bible-1.1.33-preview.1-debug.apk`. Install it over the existing Heritage app; keep the previous installation and its data until the phone rehearsal passes. Do not uninstall first. The release check requires the same application ID and signer as v1.1.32 and a higher Android version code.

This is a development APK, separate from a store release. The release includes `android-build.json` and `SHA256SUMS` identifying its exact source, signing certificate, packaged web assets and native acceptance tests.

## Connect your church

Open **Community Home**, enter `wotbc.heritage.faith` under **Find a church**, and check/save the church. Public resources do not require an account. A church invitation and member sign-in unlock member resources. **My notes and progress** opens personal sync, which is separate from church membership and manager access.

- **Live service** opens the church stream with translation choices.
- **Live translation** opens translation without video.
- **Songs** and **Sermons and notes** open the church's available resources. Reviewed public sermons can also appear beside the Bible passages they reference.
- Save a member song for offline reading while signed in. The saved copy belongs to that church session; access revocation removes it when checked online.

Live pages require connectivity and an active translation service. No translation API key or data-sharing consent is included in the app.

## Acceptance boundary

Automated native checks use an Android emulator with Wi-Fi and mobile data disabled. They exercise the bundled Community screens and the real native encrypted-storage bridge, including activity restart and rejection of ciphertext moved to another storage key. The tests use synthetic values and do not send an email, access a real member song or call a translation provider.

Physical-phone installation/update, real email return into the app, member sign-in, native sharing, microphone/audio playback and a bilingual service rehearsal still require device acceptance. The separate real desktop-browser note/progress synchronization evidence does not substitute for these phone checks.

[Verified build, published assets and native acceptance](verification/2026-09-13-android-preview.json). The exact installer is also retained locally under `.heritage/installers/heritage/1.1.33-preview.1/`.
