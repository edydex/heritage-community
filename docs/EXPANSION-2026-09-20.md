# September expansion and repository normalization

This public summary describes application behavior, source checks and released artifacts. Private deployment receipts, provider settings, raw transcripts, service-deck/song inventories and budget records remain in the owner's operational handoff. The source repositories are public; private previews and original-workspace backups have separate access controls.

## Implemented

- Named monochrome patterns, palette swatches and a used-color legend for Community authoring and SyncShow teaching; audience colors remain unchanged. Actual e-ink hardware acceptance remains.
- Strict private Bible imports in Community and SyncShow, including file preview, explicit permission, immutable identity and preserved text/credits in offline packages. The sample is public-domain BSB. LSB still requires a publisher-approved software source/agreement.
- Requested unused/unpublished song cleanup; detailed audit and restoration records stay private.
- Internal audiobook player, saved resume/speed/queue, Android downloads and Internal Storage, background media controls and Android Auto browsing.
- All 1,189 BSB chapter recordings and checked automatic markers for 14,912 of 31,102 verses. Unmatched verses continue without guessed highlighting. SYNO/UKRK recording permissions remain unresolved.
- Nearby-text navigation with checked phrase/paragraph matches for five complete books/54 recordings. Longer books are processing locally. Only complete validated books are installed.
- Named WLC/OSHB Hebrew-Aramaic OT and Nestle 1904 Greek NT; 5,187 attested Romans word-link groups across 376 matching verses. Variants and unverified numbering remain unlinked.
- Muse recognition for supported English, explicit OpenAI Russian fallback, bounded notes vocabulary and encrypted server token storage. A bounded English human-narration/translation check passed; physical capture and Russian sermon meaning remain separate acceptance.
- Prophecy-fulfillment tables and the musician screen are documented future work.

## Source and delivery

Heritage PR #16 merged at `5f566e9`; PR #17 fixed large-commit Android publication and merged at `121049e6889513fd3f0868a5040a8a3efc5e3445`. The failed 1.1.40 publisher exceeded its stdout buffer after native acceptance, before publishing release assets. All twenty publisher regressions passed, including bounded SHA resolution. Version 1.1.41-preview.1 / code 44 then completed workflow 35567277038 and published through the normal Latest feed. The previous unpublished tag was not moved.

All three downloaded Android assets, APK signer/application/version, 655 bundled web files, native audio catalog and eleven native XML cases passed independent verification. The actual checker reports an update from 1.1.32 and 1.1.39 and up-to-date from 1.1.41. See [the release receipt](verification/2026-09-20-android-1.1.41.json).

SyncShow Preview 31 is merged at `a25d9d1`; seven owner-test installers and ten receipt/checksum/provenance assets are retained privately and independently download-verified. Multilinguum is merged at `9bf201b`; its runtime companion is installed through the combined server tools. A standalone desktop installer is not claimed. Merged completed branches were pruned only after exact ancestry checks.

The desired development pins select these merged revisions. Installed source and provider configuration must be checked separately through the supported server tools. This set remains a development integration, not an accepted production release.

Read [STATUS](../STATUS.md), the [next-computer guide](CONTINUING-WORK.md), [progress report](progress.html) and [expansion checks](expansion-testing.md) for current work. Private owner previews do not waive public dependency/source/relinking or official-release configuration requirements.
