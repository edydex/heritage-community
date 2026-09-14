# Heritage Community delivery status

Updated September 14, 2026. Open the [HTML progress report](docs/progress.html) for completion estimates, completed work and remaining work. The integration is approximately **75% ready for a first usable release**, an engineering estimate rather than measured coverage.

The shared repository, deployed church pages, real personal sync and native previews support preparation and rehearsal. Preview 28 adds the pastor's progressive pointer, nearby-slide gallery and host-wide remote-change notices. Real capture, translation, optional speech, off/on controls and archive finalization passed on the original Multilinguum host, but the supplied sermon exposed recognition problems. WOTBC provider setup, physical-device acceptance and the official desktop release are still unfinished.

## What you can use now

| Area | Current result | Evidence or guide |
| --- | --- | --- |
| One development home | This repository pins all three apps, creates isolated checkouts and a shared editor workspace, and supplies setup/update/backup/restore commands. | [README](README.md), [server setup](docs/server-setup.md) |
| Church server | Community and the translation processor are cohosted on WOTBC. Normal cloud translation does not require a separate GPU worker. Fresh installation and full recovery were rehearsed on disposable Debian infrastructure. | [Server acceptance](docs/verification/2026-09-13-unified-server.md), [fresh install](docs/verification/2026-09-13-fresh-install.md) |
| Heritage reader | Community Home connects Bible reading to songs, passage-linked sermons, commentary, live pages and sync. Public resources support offline saving; member songs use the church session. | [Community Home](https://heritage.faith/#/community), [reader evidence](docs/verification/2026-09-13-member-song-reader.md) |
| Personal notes and progress | Real email sign-in and bidirectional notes/reading-position transfer passed between Firefox and the internal browser, including conflict review. | [Personal-sync acceptance](docs/verification/2026-09-13-personal-sync.md) |
| Watch or follow translation | `/live` combines YouTube and translation choices; `/translate` excludes video. Floating text and measured broadcast-delay playback are implemented. WOTBC's channel is configured. | [Live service](https://wotbc.heritage.faith/live), [timing evidence](docs/verification/2026-09-13-broadcast-timing.md) |
| Prepare and present | SyncShow preserves Prepare → Load → Show, shared Community preparation, English/Russian/stage outputs and loaded-service offline continuation. Translation screens also open without slides. | [Desktop preview](docs/desktop-preview.md), [saved service settings](docs/service-translation-plans.md) |
| Translation controls | Both controller entry points share English ↔ Russian, Quality/Economy, saved choices, optional notes and speech controls. Speech-off prevents new generated-speech work while captions continue. Quality/Economy speech uses buffered audio over the church connection and does not contact LiveKit, even if optional relay settings are saved. | [Control verification](docs/verification/2026-09-13-service-translation-plans.md) |
| Android preview | Published v1.1.33-preview.1 passes emulator offline screens, encrypted storage, signer/update compatibility and artifact checks. Physical-phone acceptance remains open. | [Install Android preview](docs/android-preview.md) |
| Pastor teaching | Preview 28 includes ink/highlighter, colors, Undo/Clear, a progressively fading one-second pointer, nearby-slide gallery and host-only notices for confirmed remote navigation. Native feature rehearsal and all four package builds passed. The downloaded Apple Silicon app matches source and launches. | [Preview 28 evidence](docs/verification/2026-09-14-desktop-preview-28.md) |

Personal-sync sign-in, church membership and manager access are separate. Synthetic resource rehearsals do not establish actual WOTBC publication with the intended church accounts.

## Development pins and deployed versions

| Component | Development pin |
| --- | --- |
| Heritage reader and Community | [`99bab02`](https://github.com/edydex/heritage_study_bible/commit/99bab02cca6bb955aac856e9c9567492f3ba1396) |
| SyncShow Preview 28 | [`5301a99`](https://github.com/edydex/SyncShow/commit/5301a992638bdcc66a5253026658dd022320eda4) |
| Multilinguum | [`cf60544`](https://github.com/edydex/multilinguum/commit/cf60544a21aac1df3044d4310666f04e4c58ba92) |

[components.lock.json](components.lock.json) is the exact development set, not an accepted integrated release. WOTBC now has Community source `99bab02` and processor `cf60544`, including the tested speech-control, optional-relay isolation, recognition and recording fixes. The running relay/server modules and served operator bundle exactly match the tested build. The September 14 code-only update preserved private settings and passed health and backup checks. The public reader separately runs `94a87a4`; the Android preview uses `782535d`.

The [September 14 deployment audit](docs/verification/2026-09-14-wotbc-update.md) verified all three healthy services, three safety backups and unchanged private settings apart from the translation source/image revision. Both public listener pages reconnected in the real browser. The local sermon review's explicit playback/stop controls also passed. These checks do not prove WOTBC provider configuration, manager access or an actual service.

A [September 14 audio rehearsal](docs/verification/2026-09-14-audio-relay-and-speech-control.md) verified real local relay reception, speech-off queue clearing, reconnect and browser playback controls using synthetic tones. The shared operator now allows speech without a separate LiveKit account. Real providers, physical listening and church-service acceptance remain separate.

A separate [optional-relay outage rehearsal](docs/verification/2026-09-14-optional-relay-outage.md) verified that Quality and Economy start and play buffered speech even with a configured but unavailable relay. Both profiles made zero relay/provider requests using synthetic phrases. The final CI run passed; the initial failure and test-fixture correction are retained in the evidence. The same record verifies the deployed `cf60544` modules, healthy services, three safety backups, unchanged saved provider settings and both public browser pages.

## What remains before completion

1. **Improve real-sermon recognition and verify meaning.** The bounded original-host test completed Russian → English and synthetic English → Russian requests, but produced apparent recognition errors and inference-based repairs. The actual capture pipeline now has a tested committed-turn option that preserves phrases at natural pauses and emits final recognition in source order. The Russian term error remains. Review a second excerpt against the audio and test both languages over a longer service. [Capture comparison](docs/verification/2026-09-14-committed-recognition.md), [real speech and recording](docs/verification/2026-09-14-speech-and-recording.md).
2. **Finish WOTBC manager/provider setup.** Existing credentials are on the original Multilinguum host. Automatic approval review requires explicit permission to transfer them to WOTBC; that action remains pending and was not retried. Economy also needs a sharing-project/overage choice. Complimentary eligibility and zero charges are not guaranteed by the app.
3. **Rehearse the physical service.** Use the real mixer, both control entry points, captions and optional speech. Check voice-off, stop/reconnect, YouTube alignment, phone listening, tablet ink, projector/stage outputs and offline presentation continuation.
4. **Finish delivery and remaining account/resource acceptance.** Complete public desktop dependency source/replacement materials and protected release configuration. Finish phone sign-in/update/offline sync and actual church song/sermon publication with the intended manager/member accounts.

See the [API-test ledger](docs/verification/api-test-budget.json) for usage against the **$20 maximum**, and [release-input record](docs/verification/2026-09-13-native-release-inputs.md) for the exact remaining desktop gates. The verified Preview 28 QA installer is retained locally; it is separate from the official release. A [Mac replacement rehearsal](docs/verification/2026-09-14-mac-library-replacement.md) now verifies modified-library loading and unchanged image rendering in an ad-hoc copy; source rebuild and other-target checks remain open.

The musician/instrument chord view remains [documented later work](docs/future-musician-screen.md), excluded from the current readiness percentage. The [product brief](docs/product-brief.md) and [historical delivery record](docs/verification/delivery-history-2026-09-13.md) preserve the broader direction and earlier checks.
