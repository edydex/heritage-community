# Unified Books reader update

Source: Heritage [`c2e1c0c37abf89b057fcadd40713fa704879b5ad`](https://github.com/edydex/heritage_study_bible/commit/c2e1c0c37abf89b057fcadd40713fa704879b5ad), merged through [PR 35](https://github.com/edydex/heritage_study_bible/pull/35).

- Books refreshes joined Community catalogs automatically and preserves saved listings if refresh fails.
- Community narration uses the normal reader, audio library, resume, player controls and chapter navigation.
- Downloads include text, exact audio and timestamps, resume after interruption, and can be removed in Internal Storage. Audio hashes must match the timing edition.
- Android uses the native playback service for protected chapters. Member tokens remain in Keystore-backed storage; account identity and origin gate local and remote playback.
- Sentence highlighting replaces individual-word highlighting. Spoken references that share a source range remain grouped. The shared book reader scrolls only enough to keep the sentence visible.

Validation: 316 unit tests, 127 protocol tests and 72 browser E2E cases passed. The release build passed all 13 emulator cases, including downloaded Community chapters playing after the reader closes, seek/skip and sign-out. The downloaded APK, unchanged signer, all 696 bundled web files and live update feed were checked independently. See [the release receipt](2026-09-22-android-1.1.52.json).

The published reader was checked in a signed-in browser: the real member book appeared in Books, its complete download succeeded after a stop/resume, and the standard player showed sentence highlighting and small scroll adjustments. Operational book details remain private. The website serves the same built JavaScript/CSS as the verified source.

Minor UI follow-up: the shared pull-to-refresh indicator briefly says “Refreshing songs” while Books refresh is in flight; the Books completion/error labels are correct.

Physical phone, headset and Android Auto acceptance remain user tests. Automatic sentence timing has not been manually reviewed for every recording. Offline access requires the same church account to remain signed in; browser-managed storage can be evicted.
