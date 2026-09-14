# Church workspace sign-in

The church's custom workspace pages now send a signed-out visitor to the existing manager sign-in form before showing preparation or translation controls. The return link keeps the selected service or sermon. The sign-in page explains the distinction between the church manager account and Heritage's personal reading sync.

The translation page distinguishes an expired session from a role or setup error. Only an authentication failure offers another sign-in. A signed-in manager whose processor is not configured sees the setup message and a link back to the workspace.

This is a navigation and explanation change. Manager authorization, membership scopes, password handling, provider settings and translation leases are unchanged. See the [weekly operator guide](../sunday-operator-guide.md).

## Evidence

Heritage source `eb44bba` contains the feature; `2edb5db` corrects the disposable HTTP acceptance check. Local import-map generation, TypeScript, the production Next build and all 14 workspace-navigation/translation-access/translation-plan tests passed.

The initial [production workflow](https://github.com/edydex/heritage_study_bible/actions/runs/34852976345) passed compilation and container startup but caught a mismatch in the new HTTP assertion. It expected an HTTP redirect or HTML meta refresh. An isolated localhost PostgreSQL instance and the built app reproduced all five responses: Next/Payload returned status 200 with a `NEXT_REDIRECT` error record in the streamed page. Payload's dashboard uses its existing `/admin/login` destination, which returns to the dashboard by default; the custom pages preserve their explicit destinations. The corrected assertion reads the actual redirect record and verifies the same origin, login path and return destination. An ordinary sign-in link does not satisfy it.

The actual internal browser then opened the synthetic live-translation service URL, followed the streamed redirect and showed the new workspace guide. Signing in with the disposable manager account returned to the exact selected service URL. The page correctly showed **Live translation needs to be enabled in server setup**, **Back to the church workspace** and **Try again**, with no extra sign-in prompt. This fixture used no WOTBC account, provider key or microphone. Its application and isolated database stopped afterward.

The corrected [production workflow](https://github.com/edydex/heritage_study_bible/actions/runs/34854667026) passed at exact revision `2edb5db`: compilation, production containers, migration, five anonymous workspace redirects, authenticated page rendering, the login guide, bootstrap, isolation, concurrent plan writes, backup and local-only operation. All 11 integration CLI tests also passed. The supported WOTBC update completed at `2026-09-14T14:32:34Z`. Community is clean at `2edb5db`; the processor remains at `dc46781`. All three services are healthy, all seven checksums passed in each of three safety backups, and the retained version receipt matches its runner and component set. The entire saved configuration is unchanged. The processor modules and operator bundle retain their previously verified hashes. All five listener/resource route checks passed, and all four custom workspace routes contain the correct sign-in destination.

The public browser followed `/admin/live-translation` to the new WOTBC sign-in guide with its return destination intact. The layout was inspected and the existing handoff was retained; no real manager credentials were entered. A DNS lookup warning for SMTP occurred in the migration container. A subsequent check from the running Community container resolved the configured SMTP host and connected successfully. No email was sent, so this does not repeat the earlier real-email delivery acceptance.

## Remaining acceptance

Real WOTBC manager sign-in and provider setup remain open. The browser rehearsal proves the navigation with a synthetic account, not access by the intended church manager. Translation accuracy, physical mixer/tablet/phone acceptance, shared archive review and the official desktop release remain in [current status](../../STATUS.md).

No paid API requests were made in this work. The retained local response files contain only anonymous synthetic fixture pages; real account cookies and credentials are not included in this published record.

See the [machine-readable record](2026-09-14-workspace-sign-in.json).

The response captures, scripts and full check logs are retained in the durable integration checkout under `.heritage/rehearsals/2026-09-14/workspace-sign-in/`, outside published source.
