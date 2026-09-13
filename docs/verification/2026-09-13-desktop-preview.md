# SyncShow Preview 25 — 2026-09-13

Source: `edydex/SyncShow` commit `cd214139c7f1a21171575ee42f75db23912d16a1`, published to `codex/heritage-live-translation`. [Draft integration PR #7](https://github.com/edydex/SyncShow/pull/7) includes Community preparation, translation and tablet teaching. Application version: `1.4.0-preview.25`, build `140025`.

## Local Apple Silicon package

The build used Node.js 24.3.0, Electron 43.2.0 and the locked native dependencies. The ordinary package omitted maintainer-local Google Drive credentials. Signing is ad-hoc; notarization was not performed.

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| `SyncShow-1.4.0-preview.25-arm64.dmg` | 157151194 | `9bfc229e64681bd992a8fff550665d80a80ff4824968e3b76bae203c5eb3fdd2` |
| `SyncShow-1.4.0-preview.25-arm64.zip` | 157334316 | `c32308e2345d48d5053ab659cd0aa54df3f8c6f27c02458e7908902c5dfb3e7c` |

The app archive SHA-256 is `9e374278afde7914825c888bb9fde9d1b5dd1c49d2a24041858a81af92f76756`. Copies retained under `.heritage/installers/syncshow/1.4.0-preview.25/cd214139c7f1a21171575ee42f75db23912d16a1/macos-arm64/` were independently hashed after copying. The existing installed app, saved profile and dirty primary source checkouts were preserved.

Passed:

- Packaged PDF.js/canvas and Sharp native runtime checks.
- Packaged shared-service workflow, including English, Russian and media role mappings.
- Actual packaged app launch and control-page discovery using an isolated temporary profile; the profile was confirmed and removed after shutdown.
- Package architecture/inventory and absent private Google Drive configuration.
- `codesign --verify --deep --strict` on the finished app.
- Exact source correspondence for 18 main/preload/teaching/translation/remote/storage feature files; per-file hashes are retained in `feature-source-correspondence.json`.
- 2,218 local regression tests passed; two existing artifact-dependent tests skipped. Focused packaging checks and synthetic microphone acquisition/stop/camera denial passed. Prior real Electron teaching and translation rehearsals remain recorded in the teaching and translation checkpoints.

The recovery path now re-reads and flushes the published service pointer before reconciling an activation error. A failure-injection test verifies that an unsuccessful file flush remains an uncertain activation even when the directory flush is unavailable.

The Mac package now preserves `NSMicrophoneUsageDescription`. The build's previous afterPack cleanup had removed the declaration needed for mixer input. Electron's synthetic audio device verifies the app's permission handler without physical capture or provider requests. Electron 42+ no longer downloads through npm postinstall, so fresh Mac package builds explicitly install the pinned runtime to collect its exact notices ([upstream change](https://www.electronjs.org/blog/electron-42-0)).

## Cross-platform CI

[Source CI run 34750060466](https://github.com/edydex/SyncShow/actions/runs/34750060466) and [Package Smoke run 34750060464](https://github.com/edydex/SyncShow/actions/runs/34750060464) test the published revision. Native package jobs build, test PDF/Sharp, round-trip a shared service, launch the app, verify available dependency evidence, and hash artifacts on Windows x64, Linux x64, Intel Mac and Apple Silicon.

All four source jobs and all four native package jobs passed, as did the shared broad gate. Temporary CI installer artifacts were produced for every target. The CI checkout uses the PR merge revision; its artifact manifests retain merge revision `abfb0cf5521ec633df42bab0438353d4647fd7b3` separately from the pinned branch commit. Both Git trees are exactly `2f91c79fbfb9fe9de682806cd150a75668837970`. All seven copied CI installers were independently hashed and retained below `ci-34750060464/` alongside the local Mac build; `retained-ci-installers.json` records the verified inventory.

## Remaining acceptance

The protected public-release workflow still lacks its Google Drive release configuration and the corresponding-source/relinking materials identified by its existing dependency gate. The ordinary QA evidence check records those gaps; it does not clear public distribution. This checkpoint supplies development installers and source publication.

Physical mixer input, physical tablet/stylus behavior, venue networking, phone playback, stream alignment and real bilingual-provider quality remain unverified. Provider keys remain absent and paid test spend is $0 of $20. A synthetic microphone or fake SDK response does not establish translation quality.

Only the desktop pin changed. WOTBC's verified Heritage `2c98f7e` and Multilinguum `9c2c38b` deployment from the preceding checkpoint remains in place. Its prior installation receipt records the previous desktop pin because SyncShow is installed separately on the operator's computer.
