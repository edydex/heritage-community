# Songbook publication and church navigation — September 14, 2026

Feature source: `0009ca9f38cddcba5291c18f0bf603f394bc1498` (main UI change `e14cebe`, final member-sharing compatibility fix `0009ca9`). Unified development merge: `111f631`.

## Behavior

- Every regular admin sidebar follows Payload’s open/close state, uses full-size links and marks the current section. Planner navigation keeps its compact layout and shares the same workspace destinations.
- Public `/songs` searches English/Russian titles, alternate names and authors. The language switch controls displayed titles and sorting; query/language survive song links and returning.
- Managers choose Published, Unlisted or Private in Song library. Bulk editing works through row selection → Edit → Songbook publication.
- Published content reaches the existing Heritage song catalog and detail APIs without requiring member sign-in. Unlisted copies require their direct address. Private songs have no anonymous title/lyrics page.
- Public lyrics/chord text are stored as a whitelist-only copy on an explicit publication save. Ordinary SyncShow edits preserve the last public copy. Private saves and archival revoke existing anonymous public links transactionally. Uploaded files, internal notes, receipts and raw source documents are excluded.
- Existing songs default to Private. No existing WOTBC repertoire song was selected for publication automatically.

## Verification

- TypeScript and the production build pass.
- Eleven focused tests pass, including actual PostgreSQL publication/withdrawal, snapshot preservation, old-link revocation, unauthorized mutation, tenant isolation and compatibility with the previous member-sharing field.
- Fifty-six related song sharing, protocol and authorization regression tests pass.
- GitHub [final Community Server run 34934879997](https://github.com/edydex/heritage_study_bible/actions/runs/34934879997) passed both production-stack and songbook-publication jobs at `0009ca9`; the preceding UI commit passed run 34934209780 as well.
- The real local app passed phone-width navigation, current-section selection, individual publication, unlisted direct access and two-song bulk withdrawal. Private pages returned unavailable after the bulk save. Search in English while displaying Russian found the expected song and lyrics.
- Real WOTBC manager sign-in was supplied by the user and verified by opening the protected song library.
- All 19 unfinished recording files were hash-checked unchanged when the integration checkout advanced. The dirty primary checkout was not changed.
- The broad legacy SyncShow suite at the deployment base still contains unrelated service-plan fixture/discovery failures; the focused song tests above pass. The existing date-sensitive member-sharing fixture was pinned to its intended test date.
- Deep Testing gained R4 (publication modes/bulk editing) and R5 (navigation); physical church/phone acceptance remains separate.

## Deployment

The supported unified server updater completed successfully. A separate post-update status check verified installed Community `0009ca9f38cddcba5291c18f0bf603f394bc1498`, healthy Community/PostgreSQL/translation services, public discovery, the tunnel and backup timer. The pre-update backup passed every checksum and exactly covered all 11 finalized private recording objects (3,883,891 bytes), with no staging files. Translation remains `c92aafe`; provider settings were preserved. No paid provider calls were made.

## Live acceptance

Using the user-supplied WOTBC manager sign-in:

- Opened the actual song library and full-size workspace sidebar.
- Created only synthetic song 37, `heritage-publication-rehearsal-2026-09-14`, with explicitly labeled English and Russian test text. All 36 existing songs remained unchanged and Private.
- Published it; `/songs?lang=ru&q=publication` found the Russian title through the English search, and its public page showed the exact two sets of lyrics.
- Refreshed church resources in the deployed Heritage web reader, opened its Songs menu and the new song, and selected both EN and RU. Both displayed the exact test text without a current church-member session.
- Saved Unlisted; the public search returned zero songs while the direct address remained readable.
- Saved Private; the same public address returned 404, revealing neither title nor lyrics. Archived the test song after withdrawal.
- Refreshed the reader catalog after withdrawal and checked the song was removed from browsing.

The web reader still labels its separate legacy sharing action “Share member-only link,” including on a publicly readable song. This is a wording/share-action refinement for a future reader release; it did not prevent published catalog or bilingual lyric access. Previously downloaded copies are not remotely erased by withdrawal. Physical Android/tablet/venue acceptance remains in the 33-case Deep Testing walkthrough.
