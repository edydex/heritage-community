# LibreChurch: product intent and next-computer handoff

Snapshot: 2026-11-16. This file describes the intended stack, records the starting revisions, and defines the proposed repository cleanup. Recheck the dated release and server facts before changing them. The [previous handoff](https://github.com/edydex/heritage-community/blob/410b794c23b0d641445135ea594823a59f241ee2/docs/CONTINUING-WORK.md) preserves the earlier reader, audio, and preview work. Start here for current work across the stack.

## The product

**LibreChurch is the church workflow. Libre.Show is the presentation app in that workflow.** A church should prepare a service once, run it with volunteers, let people follow along in their language, and publish the resources it chooses to share. One coherent workflow can be delivered by several independently maintained components.

- **Before the service:** A preparer in Community or SyncShow builds the service from songs and their exact language versions, Bible readings, sermon material, media, and translation cues. Native slides stay editable; existing PowerPoint decks stay usable, with PowerPoint preferred for conversion when available.
- **During the service:** Keep **Prepare → Load → Show**. Load verifies the saved revision and prepares an offline package. A volunteer switches slides, checks screen routing and audio, and runs the show. Audience outputs and the singer view may differ. Use straightforward single-screen and bilingual presets; place routing and provider settings in Admin Settings.
- **For people following along:** Heritage Bible is useful on its own for reading and study. A reader can also find church songs, follow a service, read or listen to translation, find sermons by passage, and sync personal notes and progress. Personal sync, church membership, and public access are distinct.
- **After the service:** A manager decides what to publish. A manuscript, projected notes, passage references, a recording, and a machine transcript are different resources. A live translation or recording does not become public by being captured.

The initial translation pair is **English ↔ Russian**. A manager can use Community, or the operator can use SyncShow, to control the same live session. The church's approved connection authorizes translation; provider credentials stay on the server. The mixer is selected on the capture computer, and manual Translate and saved cues use that default input. Captions should work without speech generation. Hiding screen text can leave the phone feed running; stopping translation stops provider work. Keep caption layout scoped to its selected screen and cue region so ordinary slides keep their full area. A loaded show can continue offline; cloud translation still needs connectivity and a working capture input.

## Repositories and ownership

| Repository | Owns | Start here |
| --- | --- | --- |
| [`edydex/heritage-community`](https://github.com/edydex/heritage-community) | Stack entry point, component pins, workspace bootstrap, server orchestration, and cross-product acceptance | `README.md`, `components.lock.json`, `docs/product-brief.md`, `docs/CONTINUING-WORK.md` |
| [`edydex/heritage_study_bible`](https://github.com/edydex/heritage_study_bible) | Heritage Bible web/Android reader and the Community Server, including its browser planner | Root `README.md` for the reader; `community-server/` for the server, resources, permissions, shared documents, and publication |
| [`edydex/SyncShow`](https://github.com/edydex/SyncShow) | Desktop preparation, local editing, offline show packages, projection and stage displays, translation cue control, and desktop installers | `README.md`, `docs/TRANSLATION-CUES.md`, `packages/service-core/`, `assets/planner-editor/` |
| [`edydex/multilinguum`](https://github.com/edydex/multilinguum) | Captured-audio processing, transcription, translated text, optional speech, and listener/operator runtime | `README.md`, `docs/ARCHITECTURE.md`, `apps/processor/`, `packages/protocol/` |

Community is the authority for shared, saved church content. `ServiceProject` and its format carry authored intent between the browser and desktop. SyncShow's offline `ShowPackage` pins a source revision; later edits do not silently change a running show. Reconcile offline edits explicitly. Multilinguum owns the active processing session; Community owns controller authorization. Two controls must not create two sessions for the same service.

The server and desktop carry copies of shared service code, and SyncShow bundles the Community planner for local editing. A change to shared slide behavior may therefore need coordinated source changes, a rebuilt desktop planner bundle, and both a server deployment and a desktop preview. A browser-only change, or a reader-only update, does not automatically require another desktop release.

## Pick the right baseline

| What you need | Verified starting point on 2026-11-16 |
| --- | --- |
| Church desktop install | [SyncShow v2.1.1](https://github.com/edydex/SyncShow/releases/tag/v2.1.1), stable Latest, source `ec849b78e9b6dfdef98e55c45a2f92cda7638573` |
| Verse spacing and song-font development/test | [v2.1.2-preview.1](https://github.com/edydex/SyncShow/releases/tag/v2.1.2-preview.1), source `09fc6f31824fc99cf3d848d8270041c2fe0e5d72`; [desktop PR #30](https://github.com/edydex/SyncShow/pull/30) is open |
| WOTBC server source | `heritage_study_bible`, branch `codex/syncshow-screen-compat-20261019`, deployed at `15577373f835ebf9e024dd1c3bca783da30215db` ([Community PR #54](https://github.com/edydex/heritage_study_bible/pull/54)). This is distinct from reader `main`. |
| WOTBC translation source | Running image `heritage-translation:syncshow-d6d1dd0`, source `d6d1dd01496a5f4438d0fd74056dd9a51714ada0`; Multilinguum `main` is `639820aedd7b8637bf487fc33e92f2700fa06c11`. Both Community and translation containers were healthy when checked. |
| Reader release | [Heritage Android v1.1.59-preview.1](https://github.com/edydex/heritage_study_bible/releases/tag/v1.1.59-preview.1) is currently served by the reader's GitHub Latest feed. Its independent release history does not select the WOTBC server revision. |
| Historical integrated dev workspace | The current [`components.lock.json`](../components.lock.json) still pins Heritage `6447035b07d3692b4586bc843b5281698c9d55f4`, SyncShow `9a8d41a05e53d0b6edc3202bdad6cd99d405e6c1`, and Multilinguum `674c013930eaa3549cf337626db0d6cef7d36672`. Use this set to reproduce that integration snapshot only. |

Both October desktop releases shipped Windows x64, macOS Apple silicon and Intel, and Linux x64. Their public installers and package receipts were checked. The church reported the Windows translation preview working. The typography preview passed the automated display rehearsal and is still awaiting projector acceptance. On the server, the typography and SyncShow integration checks passed and deployed health was checked; a broader Community CI check named `production-stack` remained red in its account/SMTP verification sequence. See [the CI run](https://github.com/edydex/heritage_study_bible/actions/runs/40412521239) before treating the full test suite as green.

## Start on a new computer

Use Git and Node.js 24. Open this file from GitHub on the new computer, or attach it to a new coding session. Clone into a new folder if you already have a workspace there.

```sh
git clone https://github.com/edydex/heritage-community.git
cd heritage-community
node bin/heritage.mjs doctor https://wotbc.heritage.faith
```

Run `node bin/heritage.mjs bootstrap` when you want the historical pinned workspace above, then `node bin/heritage.mjs status` to verify it. Bootstrap fetches the lockfile revisions into isolated directories and writes `.heritage/heritage.code-workspace`. It is a development setup step, separate from updating the live server. For current typography work, clone the corresponding source alongside the integration repo instead:

```sh
cd ..
git clone --branch v2.1.2-preview.1 --single-branch https://github.com/edydex/SyncShow.git SyncShow-typography
git -C SyncShow-typography switch -c codex/typography-followup

git clone --branch codex/syncshow-screen-compat-20261019 --single-branch https://github.com/edydex/heritage_study_bible.git Community-typography
git -C Community-typography switch -c codex/community-typography-followup 15577373f835ebf9e024dd1c3bca783da30215db
```

Older local work may exist only in dirty checkouts. On the source computer, inspect `git status`, remotes, and branch history before moving it. If it must travel, make a private, reviewed snapshot of tracked edits and relevant untracked source. Do not use this handoff as a backup or overwrite those checkouts with clean clones. Do not commit credentials, local app data, database/media backups, private recordings, or provider transcripts. Arrange trusted SSH and other access separately. See [server setup and recovery](server-setup.md) before doing any server work.

## What “normalize the repos” should mean

1. **Normalize the map.** Make `heritage-community` the single cross-repo starting point. Refresh its README and delivery status around this handoff. Give each component README a short statement of ownership, a link back to the stack, setup/test commands, and its release or deployment path. Keep earlier experiments and verification records as history.
2. **Normalize the version records.** Keep three explicit records: development pins, the last accepted integrated set, and what's actually deployed or published. Preserve the existing pins until a replacement set passes the cross-component checks. Publish release tags and assets immutably. Record the exact source SHA, platform, download/checksum evidence, and any remaining on-site checks.
3. **Normalize shared code changes.** Identify the upstream source and duplication direction for the shared planner/core files, document how to regenerate them, and add a parity or compatibility check. Use the same saved-service fixture in both repos: prepare/save/reopen, load the matching revision, rehearse offline, and check a dense bilingual song, Scripture formatting, stage hints, and Start/Stop translation. Preserve format compatibility for older saved services.
4. **Normalize Git without losing work.** Use clean branches and scoped PRs. Compare the live Community compatibility branch against reader `main` before proposing a convergence PR; do not deploy reader `main` merely because it's the default. Keep a fast-forward/rollback path and preserve the original dirty source. Leave separate repo histories and release cadence in place.
5. **Do the product move in 2.2.** LibreChurch is the proposed stack label; Libre.Show is the planned SyncShow product move. Decide names for the other components separately. Before changing URLs or updater identity, inventory the current domains, download/update links, installer IDs, app data locations, church connection grants, and saved project/package formats. Rehearse upgrade from 2.1.1, old service load, existing church connection, and rollback. Keep old links working through the transition. A GitHub repository or package rename can be decided separately from the visible product name.

For the first venue check, use the existing 2.1.2 preview on the church computer: reopen the service in Prepare, save, go to Load to rebuild, and compare a short and dense verse of the same song plus a Scripture slide on audience and singer outputs. Include slides inside and outside a translated cue region. Use the result to choose what to promote and which exact revisions to pin. Use the published preview for this check. Publish a new build or update the live server only when the owner asks for it.
