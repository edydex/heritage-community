# Heritage Community delivery status

Open the [HTML progress report](docs/progress.html) for completion estimates, completed work and next steps (updated September 14).

Updated 2026-09-13. The shared repository, deployed church server and desktop preview support preparation and rehearsal. The Android preview is published for phone testing. The integrated live-service release is not finished: provider setup, mobile/venue acceptance and public desktop packaging remain open.

## What you can use now

| Area | Current result | Evidence or guide |
| --- | --- | --- |
| One development home | This private repository pins all three apps, creates isolated checkouts and a shared editor workspace, and supplies server setup/update/backup/restore commands. | [README](README.md), [server setup](docs/server-setup.md) |
| Church server | WOTBC hosts Community and the translation processor together. Cloud translation does not require the separate GPU worker. Fresh installation and full recovery have been rehearsed on disposable Debian infrastructure. | [Server acceptance](docs/verification/2026-09-13-unified-server.md), [fresh install and restore](docs/verification/2026-09-13-fresh-install.md) |
| Heritage reader | Community Home connects Bible reading to church songs, reviewed passage-linked sermons, commentary, live pages and personal sync. Public resources can be saved without signing in; member songs use the church session and support explicit offline saving. | [Community Home](https://heritage.faith/#/community), [reader evidence](docs/verification/2026-09-13-member-song-reader.md) |
| Personal notes and progress | Real email sign-in and two-way note/reading-position transfer passed between Firefox and the internal browser, including conflict review. A fresh sync also completed after the reader update at 11:13 Pacific. | [Personal-sync acceptance](docs/verification/2026-09-13-personal-sync.md) |
| Watch or follow translation | WOTBC has `/live` for YouTube with translation choices and `/translate` without video. Floating text and measured broadcast-delay playback are implemented. The supplied church channel is configured; no current service video has been selected. | [Live service](https://wotbc.heritage.faith/live), [translation](https://wotbc.heritage.faith/translate), [timing evidence](docs/verification/2026-09-13-broadcast-timing.md) |
| Prepare and present | SyncShow Preview 27 retains Prepare → Load → Show, shared Community service preparation, English/Russian/stage outputs and loaded-service offline continuation. Translation screens can open without a slide presentation. | [Desktop preview](docs/desktop-preview.md), [saved service settings](docs/service-translation-plans.md) |
| Control translation | Community and SyncShow share one manager console with English ↔ Russian, Quality/Economy, saved service choices, optional sermon notes and generated-speech controls. Speech-off stops new voice work while captions continue. | [Translation controls](docs/verification/2026-09-13-service-translation-plans.md) |
| Android reader preview | Published v1.1.33-preview.1 passes native offline screens, encrypted storage, signer/update compatibility and visual inspection. The published download matches the tested package. Physical-phone acceptance remains pending. | [Install Android preview](docs/android-preview.md), [package evidence](docs/verification/2026-09-13-android-preview.json) |
| Teach from a tablet | Paired pen/highlighter, colors, per-slide ink, Undo and Clear are packaged. New source `3af7c31 adds the one-second progressive pointer, nearby-slide gallery and host-wide remote-change notices; its native rehearsal, source CI and all four native packaging jobs passed. Accepted-installer and physical-tablet acceptance remain pending. | [Latest teaching evidence](docs/verification/2026-09-14-pastor-controls.md) |

Public and synthetic-content rehearsals do not prove actual WOTBC sermon publication, paid bilingual translation quality, phone playback or a church service on physical screens. Personal-sync sign-in, church membership and manager access are separate.

## Current deployed and pinned set

The 2026-09-13 read-only server status check confirms these installed Community/translation revisions match the selected set. Community, PostgreSQL and the translation processor are healthy; public discovery works. The latest backup passes all seven checksums and exactly covers the 11 finalized private recording objects. No server update was made during the native-packaging work.

| Component | Current compatible-set pin |
| --- | --- |
| Heritage reader and Community | [`e7882cf`](https://github.com/edydex/heritage_study_bible/commit/e7882cff601284c9872e1d11d2953e24a44e19b1) |
| Multilinguum | [`21a9576`](https://github.com/edydex/multilinguum/commit/21a9576edd1f898ead1be214c90ee271df6bcba1) |
| SyncShow Preview 27 | [`0b35070`](https://github.com/edydex/SyncShow/commit/0b350709b3c237adc195938a15c601a498def010) |

The exact values used by the tools are in [components.lock.json](components.lock.json). New packaging work below has not yet changed these pins. The public reader separately runs `94a87a4`, including member-session recovery; its Community server subtree is identical to the installed server pin. [Deployment and live verification](docs/verification/2026-09-13-personal-sync.md).

## Work being finished

- **SyncShow public packaging:** source `46d6f5c` adds 104 checked Windows libvips source-license texts, alongside the 105 Mac/Linux texts. Source CI and all four native package jobs passed. The downloaded Windows installer contains every expected notice and matches its app/native hashes; its native launch passed. One upstream source tag changed after the pinned release, so that archive remains explicitly unresolved. Complete dependency source/replacement materials and protected release configuration remain unfinished. [Evidence and concrete remaining work](docs/verification/2026-09-13-native-release-inputs.md).
- **Live WOTBC acceptance:** existing OpenAI and LiveKit credentials were located on the original Multilinguum host, and OpenAI model metadata access passed. WOTBC's provider configuration is still empty: automatic approval review requires explicit authorization to transfer those credentials there. The setup command and short synthetic English/Russian recordings are prepared. Manager sign-in and actual live/paid acceptance remain pending. [Provider setup evidence](docs/verification/2026-09-13-provider-setup.md).

## What remains before calling the integration complete

1. Finish public desktop release materials, then update the compatible installation set. The accepted Android preview and its native evidence are retained.
2. Complete WOTBC manager setup and configure provider credentials. Economy needs an explicit sharing-project/overage choice; the app does not verify complimentary-usage eligibility or guarantee zero charges. Sermon-note sharing remains a per-session choice.
3. Run a representative English ↔ Russian service through the real mixer, both controller entry points, captions and optional speech. Check voice-off, stop/reconnect, video alignment, phone listening, tablet ink, physical congregation/stage screens and offline presentation continuation.
4. Complete real-phone sign-in/update/sharing and remaining reading-plan/offline sync coverage. Verify actual church publication and resource access with the intended manager/member accounts.

Paid-provider testing remains **$0 used / $20 authorized**, with no pending reservations. [Budget ledger](docs/verification/api-test-budget.json).

The musician/instrument chord view is recorded as [later work](docs/future-musician-screen.md). The intended product experience stays in the [product brief](docs/product-brief.md); detailed earlier checkpoints are preserved in the [historical delivery record](docs/verification/delivery-history-2026-09-13.md).
