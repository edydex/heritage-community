# SyncShow Preview 29 testing downloads

The user requested permanent SyncShow installers for the testing round, especially Windows. The [private GitHub preview](https://github.com/edydex/heritage-community/releases/tag/syncshow-v1.4.0-preview.29) retains all seven installer/archive files from the latest passing QA build. GitHub sign-in with access to this integration repository is required. See the [installation guide](../desktop-preview.md) for direct platform links.

## Source and package evidence

- Application version: `1.4.0-preview.29`. The existing native build counter remains `140028`; earlier local Preview 29 packages have the same application version, so download the files linked above.
- Branch revision: `edydex/SyncShow@15fe0d784f13f8598b565002123dc062f9a696b3`. This includes the Opus recording playback fix after the previously retained `3ae4f2b` build.
- CI checkout: `4ffc24108eeb70d49468e074f1b44d40c1b98471`, the PR merge revision. Both revisions resolve to the identical Git tree `c94e471c7e7f2853a5d9bc945b36b72c9f57dd6a`; this was independently checked using GitHub's Git API.
- [Source CI](https://github.com/edydex/SyncShow/actions/runs/34872066538): all four native targets passed.
- [Package CI](https://github.com/edydex/SyncShow/actions/runs/34872066617): the shared broad gate and Windows x64, Linux x64, Mac arm64 and Mac x64 jobs passed. Every platform passed PDF, Sharp, shared service workflow and actual packaged application launch with an isolated profile. The legal-evidence check passed in evidence-only mode and reports public release blocked.
- Every downloaded installer/archive size and SHA-256 matches its CI package receipt. Each launch receipt's archive and executable hashes match the package receipt, and the native architecture matches its target. All seven files total 1,073,243,162 bytes.
- The Windows installer is renamed from `SyncShow Setup 1.4.0-preview.29.exe` to `SyncShow-Setup-1.4.0-preview.29-x64.exe` for a stable, readable download URL. Its bytes are unchanged: SHA-256 `65c4f4624c3fdc8fb2c9cc03bb636c5d1ae92454f807df2f98efe0865aaf1029` (129,307,663 bytes).
- The release includes the four package receipts, four launch receipts, build provenance and SHA256SUMS. [Machine-readable provenance](2026-09-15-syncshow-preview-release.json) records all package hashes and exact successful checks.

## Published-download verification

Published at `2026-09-16T07:20:20Z` as a private prerelease, with draft status false. All 17 GitHub asset sizes and stored SHA-256 digests match the staged files. The Windows installer was downloaded again from the published release; its 129,307,663 bytes and SHA-256 match the original CI receipt. The release tag identifies integration record `2db2878`; the attached build-provenance file identifies the separate SyncShow source revision.

## Boundary and remaining acceptance

This is private maintainer-test delivery. The existing public SyncShow release workflow remains unchanged and blocked on dependency source/relinking materials and official Drive configuration. No credentials are included in these QA packages. Community and local presentation workflows do not depend on maintainer Drive credentials.

Windows is unsigned; Mac is ad-hoc signed and not notarized. CI launched the unpacked Windows application; it does not prove the Windows installer wizard on the user's laptop. Install over the existing copy, confirm settings and service-library preservation, and follow the physical-device and full-service walkthrough. No automatic update feed was added. The earlier manual Mac check was at `3ae4f2b` and is not relabeled as a manual check of these newer packages.

No SyncShow source changes, primary-checkout resets, Community deployment, provider calls or active service changes were made for this publication. The integration pin now matches the installer source. Existing walkthrough case IDs and saved-result keys are preserved.
