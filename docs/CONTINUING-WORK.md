# Continue on another computer

Start from the public integration repository. Application source is maintained in its original repositories; there is no fifth application to migrate or a need to combine their Git histories.

```sh
git clone https://github.com/edydex/heritage-community.git
cd heritage-community
node bin/heritage.mjs bootstrap
node bin/heritage.mjs status
```

Use Node.js 24+, Git, and the platform tools described in each component README. Open the generated `.heritage/heritage.code-workspace`. The bootstrap creates clean exact-revision checkouts; create a `codex/` branch inside the component you intend to change. It refuses to replace dirty work. Read [STATUS](../STATUS.md), the [expansion scope](EXPANSION-2026-09-20.md), and [the hands-on walkthrough](deep-testing.html) before choosing work.

## Source, packages and private material

- `components.lock.json` selects development source. It is not proof that the server or every installed app runs that revision. Check the live server receipt and package metadata separately.
- [SyncShow Preview 34](https://github.com/edydex/heritage-preview-builds/releases/tag/syncshow-v1.4.0-preview.34) is in a **private** owner-testing repository. All seven installers and their receipts were verified; all 17 uploaded asset hashes match, and the Windows installer was downloaded again and compared byte-for-byte. Sign in to GitHub with access to that repository.
- [Heritage Android releases](https://github.com/edydex/heritage_study_bible/releases/latest) use the normal Latest feed so older installed update checkers work. Verify `android-build.json` and `SHA256SUMS`; an Actions artifact alone is not a published update.
- The integrated Multilinguum processor is built and deployed through the server tools. Its 0.1.1 standalone Mac installers passed native Apple-silicon/Intel builds, independent mounted-bundle checks and an Apple-silicon launch. The [permanent private release](https://github.com/edydex/heritage-preview-builds/releases/tag/multilinguum-v0.1.1-preview.1) contains both installers and seven verification files, all downloaded and compared byte-for-byte.
- Original dirty workspaces are preserved separately from maintained source. Obtain the private restoration instructions from the owner if archival local work is needed; do not overwrite the maintained checkout.
- Credentials, private audits, raw provider transcripts and deployment receipts stay outside public source. Obtain the owner's private handoff separately when operational work requires it.

SyncShow preview pushes and manual **Build and Release** runs now create checked installers through the four-platform packaging workflow. Each successful platform summary links its seven-day artifact ZIP. Permanent private releases remain a separate verified publication; use Preview 34 above for installation. The [repair receipt](verification/2026-09-21-syncshow-release-routing.json) distinguishes workflow source from the unchanged published installer source.

## Server access

Configure the new computer's trusted SSH access to WOTBC through the owner's normal SSH setup. Do not copy a private SSH key into a repository, accept an unverified host key, or guess nearby machines. Then inspect before updating:

```sh
node bin/heritage.mjs server plan --host wotbc-community
node bin/heritage.mjs server status --host wotbc-community
```

The version set may be newer than the live receipt. Use the supported `server update` command deliberately; it takes backups, refuses a prepared/live service, preserves private provider settings, checks health, and records the applied source set after success. Provider credentials belong in the server’s private settings, not the development checkout. Ordinary cloud translation does not depend on the old GPU server; cloned-voice workloads are separate.

## Latest reader updates

The current Heritage source is `ecb0394cf3f310eb0af4677035ae3a6b9c1aea03`. It unifies Community books with the ordinary reader and audio library, adds account-scoped text/audio downloads and Android service playback, and follows sentences with minimal auto-scroll. It also includes the prior server fix for saving metadata after a large book upload. The preceding word-study update adds BSB wording and checked phrase highlights to original-language occurrence results. Greek/BSB mappings now cover matching verses in all 27 NT books, loaded by book; Hebrew/Aramaic results show verse context without claimed word alignment. See Heritage `docs/ORIGINAL-LANGUAGES.md` for source hashes and regeneration. The current service-flow set also changes Community and Multilinguum; apply the coordinated server update before using translation cues. See [service-flow delivery and limits](verification/2026-09-21-service-flow.md). Android 1.1.53-preview.1 (code 56) is published in the normal Latest feed; its [independent receipt](verification/2026-09-22-android-1.1.53.json) verifies all three assets, signer, 696 web files and thirteen native tests. The actual checker detects it from earlier versions.

The current reader update also adds the optional Day 250 Egypt comparison, with source links, exact Scripture jumps and explicit unknown dates. Its implementation receipt is [here](verification/2026-09-21-prophecy-context.json). This reader-only change does not require restarting Community.

Maximus’s external scan has been replaced by a matching internal reading edition: Hefele/Clark (1896), section 303. The same recording ID now supports nearby-text navigation and following; source corrections and local large-v3-turbo model provenance are recorded. See [verification](verification/2026-09-21-maximus-audio-text.json).

## Work still requiring acceptance or external input

1. Install the current Android and SyncShow previews on the actual phone, Windows presentation computer and e-ink tablet. Test background audio, offline downloads, Android Auto, patterns, pen input, all three presentation outputs and service continuation after network loss.
2. Rehearse English and Russian through WOTBC's real capture controls, with notes and optional speech. The bounded English Muse/translation check passed; Russian sermon meaning and a complete venue service remain unaccepted. Obtain an explicit provider-test budget and consult the owner's private ledger before spending.
3. Audiobook paragraph navigation and sentence alignment are generated locally, with no API charge. All ten internally readable books/384 recordings are shipped in Android 1.1.50 and the web reader. Matching historical editions are separate resources so old bookmarks remain intact. The GPU audiobook job is finished. The separate BSB full-text GPU job is also complete: all 1,189 chapters were checked and 29,630 verse entries are timed. Source tools, complete-text audit and independent recognition samples are committed in Heritage scripts/bible-audio. No alignment worker remains active; raw recordings and intermediate candidates stay outside Git. See Heritage `docs/AUDIOBOOK-TEXT.md` for reproducible commands. Unmatched spans remain unlinked.
4. LSB requires a publisher-authorized software file/agreement. Contact details and the strict portable import format are in Heritage `docs/BIBLE-IMPORTS.md` and SyncShow's Bible import guide. A ProPresenter purchase is not treated as a transferable data license. SYNO/UKRK recording permissions and exact edition identity remain unresolved.
5. Public SyncShow distribution still needs native dependency source/relinking materials and official Drive configuration. Private owner previews are not a declaration that these gates passed.
6. The first prophecy-fulfillment comparison is implemented in the chronological plan’s Day 250 note. Review its Egypt sources and proposed connections with a historically informed reader before expanding coverage; specialist review is not claimed. The musician screen remains future work. Do not invent historical fulfillment identifications or word correspondences.

When handing work onward, record source SHA, deployed receipt, package version/hash, tests actually run and remaining physical/provider checks. Preserve unrelated dirty work; avoid blanket staging, resets, deletion or moving published tags.

Version 1.1.47 removes blank Bible reading highlights between verses. The marker advances as the previous interval ends, while tap-to-seek still requires a verified timestamp. See [continuous-follow verification](verification/2026-09-21-continuous-audio-highlight.json).

Version 1.1.48 fixes Android Bible marker delay by scheduling from the native playback service clock at verse boundaries. Ezekiel 42 exposed the old one-second update interval; pause, seek and 0.75×/1×/2× playback now pass measured native checks. The timestamp dataset is unchanged. [Verification](verification/2026-09-21-android-boundary-clock.json). Physical-phone listening remains the next acceptance step.

Version 1.1.50 groups Bible recordings by translation, fixes Android audio-page system-bar spacing and icon contrast, simplifies reader settings, and adds hold-to-open player controls with a timeline and ten-second jumps. All ten audiobooks now have 55,016 automatic sentence segments across 384 recordings. Existing text, bookmarks, listening positions and downloads are preserved. [Release verification](verification/2026-09-22-android-1.1.53.json). Physical-device and listening acceptance remain open.

The September 21 service-layout update adds forgiving verse/chorus/part headings, per-song default language, a reading title slide and prior sermon-point context over Scripture. English/Russian sermon title images are independent. Existing service song snapshots stay unchanged; re-add a song to adopt updated library formatting. [Verification and acceptance limits](verification/2026-09-21-service-layout.md).

The latest slide changes permit editable Scripture excerpts and separated verse selections, keep title input available with the overlay hidden, add quotation attribution and fix freeform drag/font editing. Use SyncShow Preview 34. [Passage walkthrough and checks](verification/2026-09-22-passage-editing.md). The shared audiobook reader now follows spoken sentence order and scrolls at the bottom-quarter threshold to the 15% position. [Reader verification](verification/2026-09-22-audiobook-follow.md).
