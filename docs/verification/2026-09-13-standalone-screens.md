# SyncShow Preview 26: translation without slides

Source: `edydex/SyncShow` revision `34edaf474a5ac4427f0b927b415ba8c0d5f4038b`, published on `codex/heritage-live-translation`. Version `1.4.0-preview.26`, build `140026`. Heritage remains `3b48db8`; Multilinguum remains `a9d4cc8`.

## Delivered behavior

From Prepare or Load, Translation can open an output on its saved venue screen with no imported presentation or active Show. English/Russian and full-screen/lower-third/ticker choices remain independent per output. Hide leaves the translation-only window black; Close screen removes that window. The existing public caption connection and manual overrides supply its text. Opening/closing a screen never starts provider processing, microphone capture or translated speech.

The saved display identity resolver is shared with Show, including conservative handling of ambiguous fingerprints. The operator screen, missing assignments, disabled outputs and an already-occupied display are rejected. A disconnected/reassigned display, changed geometry, renderer failure or load timeout closes the corresponding window. Late readiness cannot reveal a cancelled window. Starting a valid Show takes over translation-only windows at the existing replacement boundary; preflight failure preserves currently visible translation screens. Show completion/failure refreshes the translation controls.

The standalone renderer has a receive-only caption preload, no provider/network API and no presentation/video content. It uses the existing text-only caption renderer, including readable pagination and bounded ticker queues.

## Local verification

- All 2,225 regression tests passed with two existing artifact-dependent skips, plus 217 JavaScript syntax checks. The initial sandboxed invocation failed four localhost server tests with `listen EPERM`; the normal authorized networking invocation and final repeat passed.
- Twenty-three focused translation/display-routing tests passed. Seven new cases cover opening without presentation data, independent captions, hidden/disabled/occupied/operator/missing screens, duplicate opens, close-during-load, renderer failure/timeout, Show takeover, unplug/reassignment and saved identity matching.
- The actual macOS source app was operated through normal UI controls with an empty, isolated temporary profile and two simulated display descriptors. Russian/full-screen selection enabled Open screen without any service loaded. The new window appeared in the app's Window menu. The manual bilingual test text was accepted, Hide retained the window with Hidden selected, and Close removed it from the menu. The rehearsal app was then closed. This is desktop control-path evidence, not physical projector placement or inspection of actual generated captions.
- Final packaged PDF/Sharp runtime checks, English/Russian/media shared-service round trip, isolated packaged app launch, native architecture and artifact inventory passed. The final app passed `codesign --verify --deep --strict`. Fifteen main/preload/control/renderer/projection files match the published source byte for byte.

## Retained Apple Silicon package

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| `SyncShow-1.4.0-preview.26-arm64.dmg` | 157159522 | `0b63bb7f2be7a1d7e7e567ec13d1f204a4316af7620f6b091c07a421f459b412` |
| `SyncShow-1.4.0-preview.26-arm64.zip` | 157335328 | `f7d769d2c526e42f25f19846ca43767c0ef6e7555f186f53f63c8a8c6068e9ad` |

The app archive SHA-256 is `a7473fa3dcd45d1e1dc56cedf270591a187c5773525bca9e075e3595e9e0ec6c`. Installers and evidence are retained in the durable workspace under `.heritage/installers/syncshow/1.4.0-preview.26/34edaf474a5ac4427f0b927b415ba8c0d5f4038b/macos-arm64/`; the copied files were independently hashed. Preview 25, the installed app, saved normal profiles and dirty primary checkouts were preserved.

[Source CI 34760295778](https://github.com/edydex/SyncShow/actions/runs/34760295778) passed all four platform jobs. [Package Smoke 34760295784](https://github.com/edydex/SyncShow/actions/runs/34760295784) passed the shared regression gate and all four native package jobs: Windows x64, Linux x64, Intel Mac and Apple Silicon. The unified workspace's 11 portable tests also passed via `npm test`; the direct broad Node test invocation correctly refused its two disposable-container-only fixtures.

All seven CI installers were downloaded, checked against their artifact hash manifests, copied into the durable workspace below the same source-revision folder in `ci-34760295784/qa-package-<target>/`, and independently hashed again. `retained-ci-installers.json` records the inventory. CI records PR merge revision `b3a66bba453af29be58872e99cf459a74da4f702`; that revision and pinned branch commit `34edaf4` both have exact Git tree `331b4d78ed9c86cab54779606e954665817de161`.

This is a development preview with an ad-hoc signed, non-notarized Mac installer. The existing protected public-release gates remain separate. Real projector/venue, microphone/provider, tablet and phone/video timing acceptance remain open. Provider-test spending is unchanged at $0 of $20.

Only the desktop source pin changes. The verified WOTBC Heritage/Multilinguum services from the broadcast-timing checkpoint remain in place; no server redeployment is needed for this desktop feature. The server's historical installation receipt still records the desktop pin selected at that deployment.
