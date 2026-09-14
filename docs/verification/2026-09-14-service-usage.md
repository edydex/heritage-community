# Private service usage and partial costs

Multilinguum [`dc46781`](https://github.com/edydex/multilinguum/commit/dc4678113d651cc8a265cb223ae763abaca75757) adds observed usage to the shared Community/SyncShow operator, the standalone console and private archive review. [Source CI](https://github.com/edydex/multilinguum/actions/runs/34850358755) passed all three jobs. Local `pnpm check` passed formatting, TypeScript, 157 tests and production builds; the final label edit also passed the operator's 15 tests and rebuild.

## What the readout means

- Captured audio duration provides a recognition estimate for known duration-priced models.
- Reported text tokens provide a standard list-price subtotal, including cached reads, cache writes and long-context multipliers. Unknown models or tiers and missing/invalid counts remain unpriced.
- Speech requests and received audio duration are counted. Binary PCM responses do not supply enough usage to calculate speech token charges, so those charges are excluded and the subtotal is explicitly partial.
- Failed and pending requests stay visible as unpriced work. A reminder does not stop translation or enforce a spending cap. Economy does not claim an account's complimentary allowance has been checked.

The estimate is for this service, not the account invoice. Recognition capture duration can differ from provider-billed processing. Both SDK clients disable automatic retries; request failures do not switch projects. Text requests retain their 30-second timeout and output ceiling; speech requests have a 60-second timeout.

The rate sources are the official [GPT-6 Astra](https://developers.openai.com/api/docs/models/gpt-6-astra), [GPT-5.6 Terra](https://developers.openai.com/api/docs/models/gpt-5.6-terra), [GPT Transcribe](https://developers.openai.com/api/docs/models/gpt-transcribe) and [pricing](https://developers.openai.com/api/docs/pricing) pages, checked September 14. These establish list rates, not account charges or eligibility.

## Actual browser and processor rehearsal

The browser used the production shared operator bundle with the actual processor and OpenAI SDK. A local fixture intercepted every provider request and supplied synthetic text and a three-second tone. It used placeholder keys, no microphone and no paid API calls.

| Check | Observed result |
| --- | --- |
| Quality, text only | One priced text request: 2,000 input and 120 output tokens; zero speech requests. |
| Speech enabled | The next phrase added one speech request and three generated seconds. Voice cost stayed unavailable; the subtotal became partial. |
| Speech disabled, missing text usage | Captions continued. The third text request had no token receipt and added no invented charge. Speech count stayed at one. |
| Reload/reconnect | The Quality usage summary returned from the processor with the same totals. |
| Stop/archive | Three text requests, one speech request, two unpriced requests, 4,000 input/240 output tokens and a $0.052 known subtotal were retained. |
| New Economy service | Counters reset. One text request reported 2,000 input/120 output tokens and a $0.00544 list subtotal; zero speech requests. |
| Public/private separation | The private observer received 14 cost events. Public listener events contained no usage subtotal. |

The final compiled labels and expanded panel were inspected in the actual browser. Both synthetic services stopped and finalized their archives; the rehearsal process exited successfully. Machine evidence records **four local text responses, one local speech response, zero outbound provider requests and no public usage leak**. These dollar figures are fixture calculations, not charges against the user's $20 test budget.

Unit/integration tests also cover frame/receipt deduplication, a burst of 50 captured frames producing one cost update and no full-session updates, speech-off suppressing new voice calls, late cancelled voice responses, frozen archive accounting, next-session isolation, custom recognition rates, malformed translation/PCM output, zero retries on provider errors, and usage included in the private archive integrity hash.

During development, TypeScript caught missing presence guards in the new cost-event handlers; these were corrected before the passing check. The first local server launch was blocked by the filesystem/network sandbox and was rerun with approved localhost binding. Neither caused a provider request. The browser's label locator did not reach the selector in the embedded controls; the accessible native selector worked.

## Delivery and remaining scope

The supported WOTBC updater completed at `2026-09-14T13:45:55Z`. The clean deployed processor is `dc46781`; Community remains `99bab02`. The running session engine, archive store, OpenAI provider, profile module, usage protocol and served operator bundle exactly match the tested local files. Community, PostgreSQL and the processor are healthy; all five local route checks returned 200. Both public pages reconnected in the actual browser to **Waiting for the next service**, with **Audio off**.

All seven artifacts passed checksum verification in each of three safety backups: `backup-20260914T134005Z-pre-unified-update`, `backup-20260914T134046Z-pre-translation-setup` and `backup-20260914T134408Z-pre-update`. The retained version receipt has mode 0600 and its digest matches the retained runner/manifest. Only the translation source, revision and image configuration keys changed; the private provider-settings digest is unchanged. Existing WOTBC OpenAI/LiveKit credentials remain unconfigured. No credential transfer or account setting change was attempted.

Detailed local fixtures, compiled client files, logs and the original rehearsal/audit scripts are retained under `.heritage/rehearsals/2026-09-14/service-usage/` in the durable integration checkout. This ignored evidence folder is separate from the published source and summarized verification record.

Overall readiness remains approximately **75%**. This closes a usage-visibility gap; it does not establish real-sermon accuracy, a guaranteed free mode, WOTBC provider setup, physical listening or an accepted church service. The paid-test ledger is unchanged at **$0.79 conservatively accounted, $0 pending**, with no API spending in this work.

See the [machine-readable record](2026-09-14-service-usage.json), [current status](../../STATUS.md), and Multilinguum's [profile/accounting documentation](https://github.com/edydex/multilinguum/blob/dc4678113d651cc8a265cb223ae763abaca75757/docs/translation-profiles.md).
