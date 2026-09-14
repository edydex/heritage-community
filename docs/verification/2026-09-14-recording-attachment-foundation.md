# Recording attachment: storage prerequisites

September 14, 2026. **Published development source; the attachment workflow is unfinished.** No server update or accepted installer was produced in this step. The integration pins still identify the previously verified deployment and Preview 29.

Heritage source [`83e180b`](https://github.com/edydex/heritage_study_bible/commit/83e180b8de6aa7501fe465b707e24ae214aea2c3) adds ordinary manager authority to private sermon recording storage. Upload rows retain either the real manager user or the paired SyncShow connection. Current role checks, same-origin browser writes, actor quotas and restart recovery use that authority. No synthetic device connection is created for a browser manager.

Community and SyncShow source [`15fe0d7`](https://github.com/edydex/SyncShow/commit/15fe0d784f13f8598b565002123dc062f9a696b3) now understand native Ogg Opus recordings. Framing, page checksums and mono/stereo headers are checked using bounded reads. Exact bytes remain in private storage; the native file picker, recording transport and local playback accept Opus. No conversion or paid provider call is needed for this step. The sibling format capability keeps the strict Preview 29 discovery descriptor intact; its actual source client and the new client both accepted the current Community manifest.

## Verified locally

- Community type-check and all **275** protocol/static checks pass.
- SyncShow syntax and full suite: **2,242 passed, two explicitly skipped**.
- Four real PostgreSQL scenarios pass: service planning; recording storage/concurrency/manager recovery; song-link lifecycle; and separately isolated sermon-history constraints.
- The new recording cases preserve an existing paired upload through migration down/up, retain a browser manager actor, reject missing/double actors and invalid recording metadata, verify exact Opus bytes, recover after process loss, and reject access after the manager loses their role. Rollback refuses to discard newly recorded manager/Opus history.
- The Mac's real free-space reserve rejected the first storage rehearsal. A new sparse 1 GB test volume allowed the small synthetic fixtures to run with its own reserve. The volume was detached and the disposable database stopped afterward; the live-server reserve was unchanged.

The authentication boundary uses unit request fixtures; the recording/recovery paths use real Payload/PostgreSQL state. These checks do **not** establish a real WOTBC manager session, physical listening, or full-sermon performance.

## Restored verification gates

The full Community suite had drifted out of CI. Restored the full suite, the dedicated migrated lifecycle database and an independent destructive history-test database. Recovered the original service-plan vector byte-for-byte from SyncShow (SHA-256 `26b6bd29cd9b8bb97aa32cebbb4b0359bf50ef39dcafea1803dfa1889f578afc`), pinned the expiring-song fixture clock, and corrected stale UI-copy/Docker ownership assertions. The concurrency fixture now observes expected rejection promises before releasing locks, avoiding an unhandled-rejection race. Initial failures and final local results are retained in the private rehearsal evidence.

CI runs: [Community](https://github.com/edydex/heritage_study_bible/actions/runs/34872051486), [SyncShow platforms](https://github.com/edydex/SyncShow/actions/runs/34872066538), [SyncShow packaging](https://github.com/edydex/SyncShow/actions/runs/34872066617). All three runs passed on the exact published source: Community production stack plus both database jobs, all four SyncShow platforms, and the broad gate plus all four QA packages. These builds do not constitute a new accepted installer or a deployment.

## Still required for the user-facing workflow

Add **Attach to sermon** in the shared recorded-service review, with sermon/language selection, independent transcript/audio choices, same-church source and destination authorization, canonical revision checks and interruption-safe retries. Preserve the existing manuscript and slide notes.

Source inspection confirmed another missing step: private sermon-media storage currently completes uploads but does not supply a sermon recording playback/publication route. The existing publication editor handles stable external audio URLs. Add private review playback and explicit publication of selected retained audio, with byte-range support and withdrawal checks. Never expose private archive leases or all stored objects through a public hash URL.

Rehearse the complete browser and paired SyncShow paths, private/public behavior, publish/withdraw, reader playback, long recordings and intended church accounts. Then package and deploy the compatible set. Readiness remains about **75% ±10**, an estimate of the full first release rather than a percentage of tests passed. The paid-test ledger remains **$0.79 conservatively accounted, $0 pending** against the authorized $20 maximum.
