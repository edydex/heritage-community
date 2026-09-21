# Heritage Community

The shared installation and integration home for Heritage Bible, Heritage Community Server, SyncShow, and Multilinguum.

Heritage is where people read the Bible, find church resources, follow services, and keep personal notes and progress. Community stores church resources and accounts. SyncShow prepares and presents services. Multilinguum supplies live text and optional translated speech.

This repository owns the combined product brief, compatible component versions, setup tooling, and cross-application acceptance. Application source remains in its existing repositories. The Community Server currently lives in `heritage_study_bible/community-server`.

## Current status

Integration is in development. Community supports the cohosted translation processor, including Muse and OpenAI. SyncShow Preview 31 has verified Windows, both Mac architectures and Linux installers in the private preview-builds repository. The reader now includes internal audio and named original-language sources. Physical-service acceptance and public desktop distribution remain open. See [current delivery status](STATUS.md) and the [next-computer handoff](docs/CONTINUING-WORK.md).

For the next hands-on round, use the [Deep Testing walkthrough](docs/deep-testing.html) or its [text version](docs/deep-testing.md). It separates the short preparation jobs from concrete cases, with expected results, saved notes and result export. Use the [September expansion checks](docs/expansion-testing.md) for audio, monochrome mode, Bible imports and original-language reading. The recommended next step is real-device rehearsal.

## Install the SyncShow preview

For the weekly church workflow, start with the [Sunday operator guide](docs/sunday-operator-guide.md): the right sign-in, preparation, mixer connection, optional voice, audience playback and stopping the service.

The [desktop preview guide](docs/desktop-preview.md) covers all retained installers, church connection, live translation and tablet teaching. Exact Preview 31 source and package checks are recorded in the [package receipt](docs/verification/2026-09-20-syncshow-preview31.json).

## Install the Android preview

The [Android preview guide](docs/android-preview.md) links to the current published APK and explains updating the existing app, connecting WOTBC, audio/storage controls and the remaining phone checks.

## Open the complete development workspace

Prerequisites: Node.js 24+, Git, and GitHub access to the component repositories.

```sh
git clone https://github.com/edydex/heritage-community.git
cd heritage-community
node bin/heritage.mjs bootstrap
node bin/heritage.mjs status
```

Open the generated `.heritage/heritage.code-workspace` in a compatible editor. The bootstrap fetches the exact commits in `components.lock.json` into separate folders. It verifies their origin and revision, refuses to overwrite changed work, and keeps older revision folders available for rollback. It does not run package scripts or change any existing application checkout.

To inspect prerequisites and a Community's advertised capabilities:

```sh
node bin/heritage.mjs doctor https://wotbc.heritage.faith
```

Never copy production `.env` files, API keys, personal notes, recordings, or database backups into this repository.

## Set up or maintain the combined server

From this workspace, use an existing, trusted SSH connection to a Debian 12 or 13 server. The selected SSH account currently needs root access. The server does not need Node.js, GitHub credentials for these public source repositories, or a GPU.

```sh
node bin/heritage.mjs server plan --host your-server
node bin/heritage.mjs server setup --host your-server
node bin/heritage.mjs server status --host your-server
```

First setup uses Community's guided installer, then installs the pinned Multilinguum companion. Existing servers follow the guarded update path and preserve their account, tunnel and private configuration. Audio remains optional; provider credentials may be configured later.

After selecting a new tested version of this workspace:

```sh
node bin/heritage.mjs server plan --host your-server
node bin/heritage.mjs server update --host your-server
node bin/heritage.mjs server backup --host your-server
```

Use `server help` for restore and unattended options. The commands keep exact component pins, refuse dirty or incompatible source, retain safety backups, and record the installed set only after service checks pass. [Setup, recovery, and limits](docs/server-setup.md).

## Product and implementation

- [Product brief](docs/product-brief.md)
- [Live-service experience](docs/live-service.md)
- [Translation integration](docs/translation-integration.md)
- [Prepare translation with a service](docs/service-translation-plans.md)
- [Initial source and public deployment audit](docs/initial-audit.md)
- [Delivery status and remaining acceptance](STATUS.md)

The live-service design includes YouTube video with original or translated audio, captions, and a floating text view where supported. The translation-only `/translate` route also supports people attending in person. Starting translation is available from either Community administration or SyncShow. Turning generated speech off leaves captions running.

## Development checks

```sh
npm test
```

Component tests remain in their own repositories. An accepted integration release also requires a real service rehearsal, published component artifacts, and installation/upgrade/backup verification.
