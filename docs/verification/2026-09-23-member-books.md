# Member book discovery — September 23, 2026

Heritage source: `6447035b07d3692b4586bc843b5281698c9d55f4`, [PR #45](https://github.com/edydex/heritage_study_bible/pull/45).

A saved church could show only public books while the reader said “Books are up to date.” Community Home offered no sign-in action for public-only, sync-only or pending-email records. Accepting a workspace administrator invitation does not create a reader session on another device.

Books now offers the applicable church sign-in action, and Community Home lets the reader sign in or resend a link for all these states. The invited email is entered explicitly; no email is sent merely by following a shared church URL. Member catalog refresh on sign-in is covered by a regression test. Existing member-only book access is unchanged.

## Verification

- All 329 frontend tests passed, including the new sign-in and catalog refresh checks.
- Seventeen Community/content protocol tests passed.
- The production web build passed.
- Rendered the new-device Books prompt and direct WOTBC sign-in entry point locally against live discovery.
- Reproduced the prior pending-email/no-sign-in-button state in the live reader.
- Physical iPad sign-in and reading acceptance remain with the invited reader; no other person’s sign-in token was consumed.

## Member steps

1. Open Heritage on the device where you want to read. In Books, choose the church sign-in button. A new device can use `#/community?server=https%3A%2F%2Fchurch.example`.
2. Enter the email the church invited and open its sign-in email link in the same browser.
3. Open Books. The church’s member books load automatically; Refresh retries a failed connection.

This change ships through the web reader deployment. The Community server and desktop/Android installers do not need rebuilding for it.
