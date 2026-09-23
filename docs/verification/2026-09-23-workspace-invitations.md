# Church workspace invitations

Heritage source: `ef1710b5a802a689b426da0ff93d95cea13561af`, [PR 44](https://github.com/edydex/heritage_study_bible/pull/44).

Previously, leader/administrator invitations sent only a Heritage reader magic link. Creating a separate account did not send workspace setup instructions. **Invitations** now provides both workflows:

1. Create an invitation; the configured church is selected by default.
2. Choose **Member** for a Heritage reader join link, or **Church leader / Church administrator — workspace access** for workspace setup.
3. Save with **Email this invitation now** selected. The sent date means the configured mail service accepted the message; it does not prove inbox receipt.
4. A workspace recipient opens the email and chooses their own password, or signs in with an existing workspace password. The intended church membership is accepted at successful login. Existing stronger roles remain, and this does not grant server-wide administration.
5. Select the email checkbox and save to resend. Setup links last 24 hours and a resend replaces the preceding link. The recipient can also use **Forgot Password** on `/admin/login`. Inactivate an invitation before acceptance to prevent the pending church-role grant.

Local validation passed: TypeScript and 24 existing account/security tests. The captured-mail PostgreSQL regression exercises real Payload save, login and password-reset operations, member invitations, new and existing workspace users, resend/expiry/replay, inactive invitations, church scoping, unauthorized invitation creation, preserving stronger roles, and rolling back/retrying a workspace invitation after mail failure. Test credentials and messages stay in the isolated local test; no test email is sent. The new regression runs in Community CI.

This is a server update only. No new SyncShow or Android release is created. Recipient addresses, sign-in/setup links, private server logs and credentials are excluded from this record.

All eight GitHub checks passed, including the production build/migration/backup check and the new invitation regression: [Community CI](https://github.com/edydex/heritage_study_bible/actions/runs/35812384446), [reader/root tests](https://github.com/edydex/heritage_study_bible/actions/runs/35812384358).

The supported server update completed its backup, build, migrations and all local/public health checks. A new media object arriving during the first build made its pre-update inventory stale; a fresh quiesced backup and cached rebuild completed successfully without removing media. The authenticated live browser shows the new Invitations form, default church selection and workspace-role choices. Recipient acceptance remains a separate step; password choice belongs to the invitee.

A live administrator invitation was saved through the browser; the form returned the persisted invitation, an email-sent timestamp and an unchecked send checkbox after the configured mail service accepted it. Inbox delivery and recipient password setup are not claimed.
