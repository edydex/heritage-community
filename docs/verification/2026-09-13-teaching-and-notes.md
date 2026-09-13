# Tablet teaching and optional sermon notes — 2026-09-13

Published component sources: SyncShow `cf7f0c6bf3a3d62cc7bb030a2655b1a2929a5c5e`, Multilinguum `9c2c38b1d9974fab59296c96af97122e3c581d8a`, Heritage `2c98f7e2306edbe8951d5efc71bedf5289fda058`.

## Economy notes

The previous Economy rejection was a privacy default, not a provider limitation or a quality optimization. Selected sermon notes can provide relevant names, passage wording and terminology. Actual quality improvement has not been measured. The operator can now upload/select PDF or UTF-8 text notes in Heritage Community or the shared SyncShow operator console, and opt into including excerpts for an Economy service. No note-sharing choice is on by default. It resets on document selection, profile or service changes, and is fixed once the service is created.

Uploading retains the document on the church server. Retrieval sends selected excerpts only when speech is translated. The prompt treats them as reference data, forbids instructions from the notes, and forbids adding unspoken material. The private archive records the selected IDs and Economy sharing choice. Personal Heritage notes are not automatically attached, and congregation endpoints do not reveal the reference documents.

Verified:

- 83 Multilinguum tests passed, with all package builds/type checks. The actual SDK path with synthetic HTTP responses confirms notes are absent when opted out and present when opted in, with separate text-project credentials and no speech request when voice is off.
- Scoped manager/approved SyncShow leases can list/upload translation notes. Anonymous reads/uploads are denied. Lease minting, archive/replay and voice-profile authority stays restricted.
- Heritage production build passed. Its actual local Next proxy returned 401 anonymously, served scoped metadata with no-store, and accepted a scoped synthetic text upload.
- A real in-app browser opened the shared operator module, selected Economy, selected a synthetic note, confirmed Start remained blocked before explicit sharing, confirmed deselection reset consent, started the synthetic service with the choices locked, and stopped it with sharing reset. No mixer was connected. The fixture disabled external provider fetches.

No real provider call was made; spend remains $0 / $20. Model quality, allowance eligibility/remaining balance and physical mixer acceptance remain unverified.

## Tablet teaching

The paired Remote page has pen/highlighter, six colors, pen size, optional stylus-only filtering, Undo and Clear ink. Drawing is normalized to the exact selected output preview. Each cue/output owns its own marks during a Show; stage outputs are excluded. Clear-to-black hides the ink, returning to a cue restores it, and Show end discards it. Bounds prevent unbounded ink storage and request traffic. Stale slide generations reject delayed drawing and Clear/Undo cannot be undone by late pen packets.

The user explicitly authorized increased remote request allowance for drawing. These are local HTTP request limits, unrelated to OpenAI usage. The client coalesces updates to about nine per second; pairing/authentication, host/origin checks, payload limits, and existing navigation sequencing remain in force.

Verified:

- Full SyncShow regression suite: 2,217 passed, zero failed, two skipped. Final syntax check: 214 JavaScript files.
- `node scripts/verify-teaching-electron.js` passed against the real source main process, preload, native output renderer and authenticated Remote server. It used a temporary profile, synthetic service/displays and a loopback-only browser, without touching normal app data.
- Actual mouse pointer input on the remote canvas reached one selected output, while the other language and stage stayed clear. The check exercised highlighter, Undo, Previous/Next with restored ink, Clear-to-black/Restore, full browser reload/re-pair via its existing cookie, Clear ink and Show end.
- The rehearsal found and fixed initial missing-frame handling and native stage-output filtering. Screenshots of the captured preview and output were inspected.
- The final report and screenshots are in the local evidence folder `/private/var/folders/r2/skqm4ntd0979hfyd9gm1fgnw0000gn/T/syncshow-teaching-AdH0Oz`.

Stylus-only relies on the browser's Pointer Events input classification. It is off by default and tells the operator to turn it off if a stylus is not recognized. Real stylus/palm behavior, tablet browsers, venue Wi-Fi and a packaged release have not been verified. This implementation does not save ink as a reusable lesson or map marks between translated words. The reference behavior is based on the user's description and Desiring God's description of drawing over text; the linked YouTube video itself could not be fetched and was not watched.

The [musician screen](../future-musician-screen.md) is recorded as future work, not implemented.

## Deployment

Server deployment verification is recorded below after applying this source set. Publication alone does not establish deployment or live-service acceptance.
