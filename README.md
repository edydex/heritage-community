# Heritage Community

The shared installation and integration home for Heritage Bible, Heritage Community Server, SyncShow, and Multilinguum.

Heritage is where people read the Bible, find church resources, follow services, and keep personal notes and progress. Community stores church resources and accounts. SyncShow prepares and presents services. Multilinguum supplies live text and optional translated speech.

This repository owns the combined product brief, compatible component versions, setup tooling, and cross-application acceptance. Application source remains in its existing repositories. The Community Server currently lives in `heritage_study_bible/community-server`.

## Current status

Integration is in development. The version bootstrap and source checks work; the combined installer and live-service experience are being implemented. Do not treat the pinned starting revisions as a service-ready integrated release. See [delivery status](STATUS.md).

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

Component package installation and combined server deployment are the next installer steps. Never copy production `.env` files, API keys, personal notes, recordings, or database backups into this repository.

## Product and implementation

- [Product brief](docs/product-brief.md)
- [Live-service experience](docs/live-service.md)
- [Translation integration](docs/translation-integration.md)
- [Initial source and public deployment audit](docs/initial-audit.md)
- [Delivery status and remaining acceptance](STATUS.md)

The live-service design includes YouTube video with original or translated audio, captions, and a floating text view where supported. The translation-only `/translate` route also supports people attending in person. Starting translation is available from either Community administration or SyncShow. Turning generated speech off leaves captions running.

## Development checks

```sh
npm test
```

Component tests remain in their own repositories. An accepted integration release also requires a real service rehearsal, published component artifacts, and installation/upgrade/backup verification.
