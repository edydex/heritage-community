# Preview 28: downloadable pastor controls

SyncShow **1.4.0-preview.28**, build **140028**, contains the progressive pointer, nearby slide gallery and host-wide remote-navigation notices. The source revision is `5301a992638bdcc66a5253026658dd022320eda4`.

The [source workflow](https://github.com/edydex/SyncShow/actions/runs/34818135231) and [package workflow](https://github.com/edydex/SyncShow/actions/runs/34818135279) passed for all four targets. The CI merge `3b368b2557f60d60f13f8f6f734f2e2ac8754d03` has the same Git tree as the published revision: `4f50c0a32178d1280ac23602223dfe5d30013b39`.

The downloaded Apple Silicon DMG and ZIP match CI's checksums, as do the app archive, executable and four native libraries. All **324 application files** match the published source byte for byte. The complete app signature passed `codesign --verify --deep --strict`; its native version is Preview 28/build 140028. The **actual downloaded executable** opened its packaged control page and exited successfully using an isolated temporary profile, which was removed afterward.

The teaching rehearsal also passed against the preceding downloaded package's production ASAR modules in a matching Electron test host. That fixture explicitly supplies package resource paths; it is distinct from the actual executable launch check. It exercised continuous progressive expiry, the slide gallery, host-only notifications, ink, Undo, Clear and reconnect. Preview 28 changes only the version/build identity and preview documentation; its application code is identical to that rehearsed revision. See [the original feature evidence](2026-09-14-pastor-controls.md) and [machine-readable package evidence](2026-09-14-desktop-preview-28.json).

The verified Mac installers and evidence are retained in:

```
.heritage/installers/syncshow/1.4.0-preview.28/5301a992638bdcc66a5253026658dd022320eda4/ci-34818135279/qa-package-macos-arm64/
```

The development manifest now selects this SyncShow revision, Heritage `782535d41e870e12983f807d7f8dda2e217e2c56`, and unchanged Multilinguum `21a9576edd1f898ead1be214c90ee271df6bcba1`. The newer Heritage revision includes the reader recovery and Android preview work; its Community server subtree is identical to installed `e7882cf`, so this manifest update does not redeploy WOTBC.

This is a **development QA preview**, not the protected official desktop release. Physical tablet, stylus, projector, mixer and venue-network acceptance remain open. Native dependency source/replacement materials and protected release configuration are still incomplete. The existing [release-input record](2026-09-13-native-release-inputs.md) describes those remaining items.
