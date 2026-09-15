# Android update feed repair

The user requested that the existing Android release and future releases appear through the installed update checker.

## Live result

- `v1.1.33-preview.2` is published, non-draft, `prerelease: false`, and explicitly Latest. Development-preview wording remains in the notes and version name.
- Both authenticated and anonymous `/repos/edydex/heritage_study_bible/releases/latest` responses returned that release and the correct APK.
- Executing the unchanged `src/services/appUpdates.js` against the public endpoint, with only native app identity supplied as `versionName: 1.1.32`, returned `update-available`, the correct version and direct APK URL. This exercises real discovery; it does not claim the user's physical phone completed installation.
- The corrected publisher was run against the retained verified release. It checked source/tag correspondence, hashes, completeness and the resulting Latest response successfully. It did not upload replacement files or rebuild the APK.
- APK SHA-256 remains `c65220771fd4b66b72cb3742e96a16064ae486ec904e85af2f2b31a6972c3abd`, size 54,402,791 bytes, Android version code 36 and source `3f30bdb1dd9002a4d9a50b7545fe6bbc6a5b7697`.
- Downloading `android-build.json` through the release-asset API reproduced its published SHA-256 `b8828fd2af09a495fb1653140d45ee632700ea5c6c07f22a4a3c7d91e1f7b7c3`.

## Future publication

The fix is committed and pushed to the current `codex/unified-live-service` integration branch as `db54e69`:

GitHub [Test run 34915950257](https://github.com/edydex/heritage_study_bible/actions/runs/34915950257) passed at exact revision `db54e6935b51c58e5c42500e9723a9ca2fb64c09`: unit/protocol checks, browser E2E and the production reader build. No replacement native build was needed because the delivered APK did not change.

- Upload a new release as a draft; publish as a normal Latest release only after its assets and source match the verified package.
- Find authenticated drafts through the releases listing when GitHub's published-tag endpoint does not return them, allowing interrupted upload recovery.
- Reject downgrades and suffix-only version changes. Existing checkers compare only the numeric core, so the next release after `1.1.33-preview.2` needs at least `1.1.34` or `1.1.34-preview.1`.
- Require a higher native version code and matching package/signer against the latest build metadata, rather than only the older v1.1.32 baseline.
- Preserve tag identity and refuse to overwrite different published bytes. Recheck Latest before promotion and verify the actual feed afterward.
- Serialize Android workflows and run 19 focused publishing regressions before builds. All 19 passed locally, including the existing reader's detection of the next numeric version, draft recovery, integrity failures, signer/version-code mismatch, stale publication and failed promotion.

The older default-branch publisher already publishes new releases on the normal Latest feed. The hidden-preview regression was in the integration publisher, which produced Preview 1 and Preview 2; that path is now corrected. Unpublished CI artifacts still require the existing explicit publication choice. No server/provider settings, personal data or component pins changed.

## Known old-client boundary

An installed Preview 1 (`1.1.33-preview.1`) cannot recognize Preview 2 by its version string, because both have numeric core `1.1.33`. It needs the direct APK for this update or the next numeric-version release. This limitation is why future publication refuses suffix-only changes. No new Android binary was needed to repair discovery from the prior regular release, v1.1.32.
