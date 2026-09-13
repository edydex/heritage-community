# Companion installation and storage checkpoint

Published source: Heritage `e191c151114f688d3197dd37edf6676396490668`, Multilinguum `6f00fb5d77b55029592d31f06f91f13250e39792`. The user authorized publication of all integration work. Existing dirty primary checkouts were preserved.

## Result

Community can configure an optional translation processor from a separate, clean, exact Multilinguum revision. Setup keeps private provider settings, initializes dedicated storage, and invokes the normal Community update. The processor exposes no host port and needs no GPU worker for cloud/text use. Reconfiguration and ordinary updates include the companion. Prebuilt-only update is currently refused with translation enabled until the third image can be pinned explicitly.

The master-only maintenance endpoint serializes against session transitions and refuses prepared/live services. New session mutations are blocked after maintenance is accepted. A prepared service can be cancelled without provider work or an archive. Backups stop the idle processor before copying SQLite and resume it afterward. Format 3 adds translation data to the exact checksum set. Restore extracts into distinct storage and checks SQLite before changing the configured volume; the previous volume remains available for recovery. Legacy backups preserve current translation storage.

## Verification

- Multilinguum full formatting/type/test/build check passed with 73 tests. The subsequent prepared-session cancellation fix passed processor type checking, all 54 processor tests (one new test), and the operator production build. Total test coverage at this checkpoint is 74 tests; the final Docker build also compiled all packaged components.
- Heritage installer/operator checks passed. New behavioral checks exercise literal private-config updates through a symlink, line-injection rejection, exact format 3 checksum sets, corruption/duplicate rejection, busy-session refusal before stop, idle quiescence ordering, restore-volume collision handling, failed integrity checks leaving the original pointer unchanged, and the actual setup dry-run with clean/mismatched/dirty sources.
- Verified remote host: `heritage-community`, Debian 13.7, Docker 29.7.2. The real processor image was built in `/var/tmp/heritage-translation-rehearsal.5UzwdA`, outside the existing deployment. Image tag `heritage-translation-rehearsal:6f00fb5`, Docker image ID `sha256:66c6bc66a8074a875a8e3644e7d0d00502dcb07d3177c9731e9cea36d6aae2c3`.
- The first Docker run caught a YAML flow-list error in the tmpfs setting. Quoting the complete mount value fixed it. The corrected run used the actual production Compose service in a distinct temporary project, with all volume names overridden and no published port.
- `heritage.js`, `operator.js`, and `pcm-worklet.js` were served from the built image. A literal dollar sign in private configuration survived Compose unchanged. OpenAI and LiveKit credentials were explicitly absent.
- Prepared cancellation, maintenance refusal while prepared/live, and mutation refusal while maintenance was active passed over real HTTP inside the container. Deterministic synthetic English/Russian captions produced two transcript files and no audio tracks.
- SIGTERM exited with code 0. The stopped archive was copied, extracted into a new volume under the service identity, and passed SQLite `quick_check`. The restarted processor served both archived transcripts. The original volume still existed before disposable cleanup.
- Rehearsal containers, volumes and networks were removed. The existing Community and PostgreSQL containers remained healthy; `/opt/heritage-community/app` was still clean at `5f66b647f050ad45bf596a19a62c308ff65d8294`.

Reproduce on an isolated Docker host with the pinned image:

```sh
HERITAGE_TRANSLATION_TEST_IMAGE=heritage-translation-rehearsal:6f00fb5 \
  bash community-server/deploy/tests/translation-docker.sh
```

## Limits and next work

This verifies the real companion container and translation-storage lifecycle. It does not verify complete Community installation, database migrations, combined database/media/translation restore, or an application deployment at WOTBC. The existing tunnel and deployment configuration were untouched. The isolated source directory/build images remain as reproducible staging evidence.

No microphone, live provider, voice relay, actual translation quality, or phone playback was exercised. No paid request or account-sharing setting changed: $0 spent from the $20 allowance. The user has been asked for the existing API key location, not its value. Quality/Economy profiles, SyncShow controls/layouts, stream alignment, Bible/resource entry points, and two-device sync acceptance remain part of the active goal.
