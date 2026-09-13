# WOTBC paired deployment

The Community and translation companion foundation is deployed. Real provider, microphone, voice, phone, and full combined-restore acceptance remain unfinished.

- User authorization: publish everything; all permissions for this integration work. Paid API testing remains capped at $20.
- Verified target: SSH `wotbc-community`, hostname `heritage-community`, Debian 13.7. Cloudflare carries remote access and is preserved.
- Starting application checkout: clean `5f66b647f050ad45bf596a19a62c308ff65d8294`, branch `codex/wotbc-live-video-assets`.
- Explicit pre-change supported backup completed: `/opt/heritage-community/backups/backup-20260913T051848Z-pre-unified-companion`. The application restarted successfully.
- Fetched and verified published Heritage `e191c151114f688d3197dd37edf6676396490668`; confirmed the previous revision is its ancestor. Created server branch `codex/unified-companion-20260913`, tracking `origin/codex/unified-live-service`. The previous branch remains available.
- `heritage-community update --no-pull` completed successfully, including migrations and local/public health checks. Additional safety backup: `/opt/heritage-community/backups/backup-20260913T052024Z-pre-update`. Its format 2 inventory exactly covers the 11 finalized private recording objects (3,883,891 bytes). Log: `/var/tmp/heritage-translation-rehearsal.5UzwdA/wotbc-community-update.log`.
- Prepared a separate clean Multilinguum checkout at `/opt/heritage-community/components/multilinguum-6f00fb5d77b55029592d31f06f91f13250e39792`, pinned to that full commit from the public origin.
- Actual-host `heritage-community translation configure ... --dry-run` passed source, path, and contract checks. The same command completed successfully with `--non-interactive --yes`, using no provider credentials. Log: `/var/tmp/heritage-translation-rehearsal.5UzwdA/wotbc-companion-setup.log`.
- Setup created safety backups `backup-20260913T052933Z-pre-translation-setup` and `backup-20260913T053300Z-pre-update`. The latter is verified format 3 and includes `translation.tar.gz` pinned to Multilinguum `6f00fb5d77b55029592d31f06f91f13250e39792`.
- Companion status reports healthy and explicitly says OpenAI credentials are still needed. No provider charge occurred.
- WOTBC's supplied YouTube channel and `/translate` were saved through Payload, preserving the remaining settings. The one-off settings container's SMTP transport verification failed with `EAI_AGAIN` on its internal-only network; it sent no email. The settings update completed and was verified publicly. The helper was explicitly stopped after lingering during cleanup.
- The real browser loaded `https://wotbc.heritage.faith/live`, showed the supplied channel link and the connected waiting state, with audio off. `/translate` showed the same feed without video. Floating translation worked. `/admin/live-translation` required sign-in. No credentials were entered and no mixer was opened.
- Public `/live/settings.json` returned the correct church/channel, `translationUrl: "/translate"`, `videoId: null`, and zero stored broadcast delay. No specific current-service video has been supplied or selected.
- Final post-settings backup completed: `/opt/heritage-community/backups/backup-20260913T053846Z-unified-companion-installed`. All seven checksum members passed, including translation storage. Companion, Community, PostgreSQL, tunnel, local/public endpoints, and recording inventory checks passed after restart. Log paths end in `wotbc-postinstall-backup.log` and `wotbc-final-status.log` in the staging directory above.

Known presentation defect: the status command's recording-coverage sentence still says “format 2” for a format 3 set. The actual manifest and translation checksum membership were checked directly and are format 3. Correct that wording with the next component update.

Next: configure the private API key when its location is supplied and continue the active integration goal. Full combined database/media/translation restore, actual manager/capture/voice and phone acceptance, SyncShow controls/layouts, stream alignment, model profiles, and Heritage resource/sync acceptance remain required.
