# Deep Testing plan verification

The September 14 walkthrough is a documentation and local checklist change. No component pins, app builds, provider configuration or deployed services changed. No paid provider requests were made.

## Current target check

The supported unified `server status --host wotbc-community` command exited successfully. Installed Community `21d3ad925144aa512d8e6bff4ce354d93aef9c11` and translation `c92aafe9f317e514240bd9621e2945448d9741d2` match the existing development pins. App, database and processor were healthy; PostgreSQL accepted connections; public discovery, local catalog, tunnel and backup timer checks passed. The latest backup was under 48 hours old, checksum verification passed, and its inventory exactly covered 11 finalized private recording objects. This is a health/backup check, not a manager login or provider rehearsal. The prior audit's unset-provider status remains explicitly dated in the plan.

Android Preview 2's published release and exact version/checksum were rechecked against the retained delivery record. The retained Preview 29 Mac installer is present. Source checkouts contain newer unpublished recording attachment changes, so the first test baseline intentionally excludes them rather than describing them as delivered.

## Walkthrough checks

- 31 uniquely identified cases across nine sections; same case data appears in the HTML and text walkthrough.
- JavaScript syntax and local link checks passed; whitespace/diff checks passed.
- Actual internal-browser preview rendered the case list and expected-result text.
- A labeled UI-only dummy run, status and bilingual note survived reload.
- A Pass produced 1/31 executed; changing it to Blocked returned to 0/31 executed, with one blocked and zero passed.
- The JSON export downloaded and was read back: all 31 cases, run metadata, saved status and bilingual note were present.
- Desktop and 390-pixel phone layouts were visually inspected. The measured document width matched the 390-pixel viewport, without horizontal page overflow. The temporary viewport override was restored.

The dummy data is isolated on the temporary preview origin; the delivered report opens with no product tests marked passed. Print styling and Markdown export are provided, but only the JSON download was exercised in this check. These are checks of the walkthrough, not execution of the planned church-service acceptance cases.
