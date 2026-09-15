# Inline song publication — September 15, 2026

Feature source: `4c443d6b503da1c948cf944a5e1416a6788d0dc8`. Unified integration merge: `4f3739b`.

## Change

Each Song library publication cell is a native dropdown. Published, Unlisted and Private save immediately through the existing authenticated song update endpoint, sending only `songbookVisibility`. The existing snapshot and public-link withdrawal hooks remain authoritative. The cell disables duplicate changes while saving, reports Saved, restores the previous choice on failure and keeps the current list/search URL. Read-only users cannot edit; archived songs show a disabled Private control until restored in the editor. Bulk editing and the editor remain available.

## Verified locally

- Production build and TypeScript passed. GitHub [Community Server run 34941636348](https://github.com/edydex/heritage_study_bible/actions/runs/34941636348) passed both production-stack and songbook-publication jobs at the exact feature revision.
- All 11 existing focused checks passed, including actual PostgreSQL publication/withdrawal and privacy boundaries.
- In the rendered production app, changed the synthetic Private rehearsal row to Published, reloaded and confirmed persistence, then selected Unlisted. The list stayed on the same filtered query throughout.
- Stopped only the disposable app server and selected Private. The row returned to Unlisted and showed the connection/reload error. Restarted the server, reloaded, confirmed Unlisted persisted, then successfully saved Private.
- The same list displayed disabled Private controls for archived fixture songs.
- Inspected the actual desktop layout. Native select controls retain keyboard and touch interaction.
- All 19 unfinished integration files were hash-checked unchanged during the fast-forward. The dirty primary checkout was not edited.

## Deployment and live acceptance

The supported WOTBC update completed. A separate status check confirmed installed Community `4c443d6b503da1c948cf944a5e1416a6788d0dc8`, healthy Community/PostgreSQL/translation services, local/public discovery, the tunnel and backup timer. Backup checksums and the exact 11-object private recording inventory (3,883,891 bytes) passed; staging was empty. Translation stayed at `c92aafe`.

Using the real manager session, the Songs collection showed a dropdown in each publication cell. Restored only the existing labeled synthetic rehearsal song 37 to Active/Private, selected Published directly in its row, observed Saving then Saved, reloaded to confirm Published persisted, and found the test song in the public songbook. Selected Private directly in the row to withdraw it again. The previous public address returned 404 and the public list returned zero songs. Archived song 37 again and verified its list dropdown was disabled and Private. All existing repertoire songs remained unchanged. No paid provider calls were made.
