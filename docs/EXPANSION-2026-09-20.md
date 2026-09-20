# September 20 expansion and repository normalization

Active work; do not treat this document as a delivery receipt.

## Scope and acceptance

1. Preserve original dirty checkouts and local-only commits privately; compare against current GitHub code. Consolidate maintained source onto main after tests. Delete only branches whose work is preserved and merged. Publish verified Android and desktop packages; retain provenance and checksums.
2. Monochrome/color-accessible authoring and remote teaching: stable named colors with distinct patterns, matching palette swatches and used-color legend. Preserve intended color on normal audience outputs. E-ink option minimizes animation; actual reMarkable/BOOX browser compatibility needs hardware acceptance.
3. Licensed Bible import: validated portable upload, copyright/permission metadata, preview and explicit install, church-only storage by default, same passages in Community and SyncShow. Test with openly licensed/synthetic fixtures. LSB purchase for another application does not establish a portable software license; obtain publisher-approved source/use permission.
4. WOTBC cleanup: remove only unpublished songs/translations absent from all authoritative service presentations. Keep backups and a before/after manifest. The user restored 15 PPTX files to `~/Documents/church_services`; slide text and source SHA-256 hashes have been extracted to a private working inventory. Comparison against the live library is pending.
5. Heritage audio: internal player, persistent book/track/time resume, offline download/removal via Internal Storage, text navigation when alignment exists, native background media session and Android Auto browse/play where supported. Bible audio includes edition/narrator/rights, validated timing data, optional following of the active verse without altering annotations. Do not present approximate alignment as exact, or map a different translation's recording onto text.
6. Original languages parallel: user clarified Hebrew where Hebrew, Aramaic where Aramaic, and Greek where Greek, with actual source editions named. Septuagint is an ancient Greek OT translation, not the requested original-language corpus. Start word alignment with Romans using Greek NT data. Prefer licensed scholarly data and attested word alignments; do not invent equivalences or conflate verse numbering.
7. Later: chronological-plan prophecy fulfillment table. Distinguish prediction date, proposed fulfillment date, scholarly interpretation and uncertainty; connect to contextual chapters and historical sources. Ezekiel/Egypt is a candidate case, not a settled identification.
8. Muse: real streaming/file transcription adapter, preferred provider where language support permits, clear Russian fallback, secure server-side token storage, paste-and-test settings, notes-derived keyword hints and optional reviewed model extraction. Muse ASR currently documents 25 languages excluding Russian/Ukrainian, turn-level (not word-level) timing, 60-minute streaming sessions and $0.18/hour. Do not route Russian silently to unsupported ASR. Notes influence recognition/translation; ASR itself does not synthesize speech.

## Current basis

- Heritage `8662221acc3277a0411b5956ebf19012d70c62a5`
- SyncShow `9a9ebf7379797c68e99a2ea1f7a9dcefd1551458`
- Multilinguum `c92aafe9f317e514240bd9621e2945448d9741d2`
- Integration `933c5f94d0b90cf4fbd96cd3c7300aa04df595a1`
- Isolated working root: `/private/tmp/heritage-expansion-20260920`; all four branches `codex/accessibility-audio-expansion`.
- API test budget remains $20 total; existing ledger accounts $0.79. Token file supplied by user is RTF; never print or commit it.

## Verified primary references

- https://dev.meta.ai/docs/speech-to-text
- https://dev.meta.ai/docs/models
- https://lsbible.org/faqs/ (publisher requests software agreements via info@316publishing.com)
- https://lsbible.org/permission-to-quote-the-lsb/
- https://support.renewedvision.com/hc/en-us/articles/360041814913-Installing-Bibles-in-ProPresenter (purchases tied to ProPresenter licenses)
- https://audiobible.org/ (BSB narrations explicitly CC0)
