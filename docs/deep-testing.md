# Deep Testing walkthrough

Dated September 16, 2026. Open [the interactive walkthrough](deep-testing.html) for saved results, per-case notes, printing and export. The page stores results only in the browser; export them before changing devices. This text copy provides the same test cases without requiring JavaScript.

## Recommendation

Do a short preparation pass, then freeze features and test. Do not start another broad implementation batch.

1. Install the agreed builds: Android **1.1.38-preview.1**, versionCode 41, and the published **SyncShow Preview 30** installer for your computer. Update over the existing app to test preservation of data. The public web reader can be the manual second device; it also contains Automatic Sync.
2. Complete real WOTBC manager sign-in and approved provider configuration before translation tests. Personal sync, membership and manager access are separate. Healthy server status does not prove provider setup. The last configuration audit found providers unset; this plan does not transfer credentials.
3. Keep direct recording-to-sermon attachment outside the first baseline. It is unpublished local work. Deliver it in a named build before A3, or mark A3 blocked and test everything else now.

Do the short bilingual quality comparison before the long sermon. Previous Russian recognition changed a word's meaning; correct repeatable meaning errors before a full rehearsal. Official public desktop release work, musician screens, saved annotation replay and more features can wait.

## Schedule and equipment

- **Desk: 60–90 minutes.** Preflight, phone sync, church resources, Prepare → Load → Show. No translation spending needed.
- **Church: 90–120 minutes.** Actual outputs, pastor tablet, short bilingual translation, listening and recovery.
- **Full rehearsal: 45–60 minutes or one sermon.** After critical short cases pass, run without coaching and review the archive.

These estimates exclude setup trouble/fixes and the separate attachment follow-up. Use a SyncShow computer, pastor tablet, two reader devices including an Android phone, actual English/Russian and stage outputs, a mixer-connected capture computer, headphones and a bilingual listener. One person can cover multiple roles, but keep someone on the host while the pastor uses the remote.

Create one labeled **DEEP TEST — date** service: bilingual song, Scripture passage, sermon notes, image and short video. Preserve existing data and use harmless rehearsal resources for public-access checks. Previous paid tests used a saved local sermon excerpt: the other laptop is not required unless you choose it as the mixer audio source.

## Record before starting

Run/date/place; operator/pastor/listener; installed versions; phone/tablet OS/browser; output connections; source audio and capture input; direction/profile/actual model selections; notes/speech/sharing choices; remaining budget; unresolved prerequisites.

Use **Not run / Pass / Fail / Blocked**, plus notes, for each case. Executed percentage is (Pass + Fail) / total cases; Blocked never counts as Pass. The older ≈75% product-readiness estimate is not measured test coverage.

## Test baseline

| Part | Version / evidence | Remaining boundary |
| --- | --- | --- |
| Android | [1.1.38-preview.1](https://github.com/edydex/heritage_study_bible/releases/tag/v1.1.38-preview.1), code 41, `3228063` | Physical-phone automatic sync |
| Public reader | heritage.faith, last verified `3228063` | Physical-device automatic-sync acceptance |
| SyncShow | [Windows / Mac / Linux Preview 30 installers](desktop-preview.md), `9a9ebf7` | Real tablet, projector, mixer and volunteer |
| WOTBC | Community `3228063`; translation `c92aafe` | Provider and live device acceptance |
| Recording attachment | Unpublished local changes beyond the baseline | A3 blocked until delivered |

Live status on September 16 passed app/database/processor health, public discovery, tunnel and backup checks. The latest backup was under 48 hours old, checksums passed and its private recording inventory matched. No paid calls were made to create this plan. At the dated budget checkpoint, $0.79 of $20 was conservatively accounted and nothing reserved; check the [current ledger](verification/api-test-budget.json) before paid work. The usage display is partial, not a hard spending cap or guarantee of free Economy use.



New in this baseline: R6–R7 (refresh and tags), E1–E2 (calendar), H5 (sermon slides). The 33 earlier case IDs and saved results are preserved. Rerun affected cases after updating.

## P · Preflight

Before either session. Clear these first. A blocked provider setup only blocks the paid translation section.

### P1 — Install the agreed builds without losing data

1. Export or otherwise retain a recoverable copy of important personal data. Keep the previous SyncShow installer and its existing profile. Ask the server operator to confirm the recent backup is usable; do not perform a destructive restore on the church server.
2. Use Settings → Advanced Settings to check for Android 1.1.38-preview.1, or install its direct APK over the existing app. The checker can detect this numeric-version update from earlier builds through 1.1.37. Quit SyncShow and install the published Preview 30 package for your computer. Record the actual versions and devices above.
3. Open an existing Bible note and an existing service before creating rehearsal content.

**Pass looks like:** Existing data is present, the Bible opens, and the versions match the plan. A clean reinstall alone is not an update-preservation test.

If the tablet is an iPad, test the web remote there. Android release evidence does not imply a native iOS app was tested.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### P2 — Prove the three kinds of access

1. Open Heritage Settings → Sync and confirm the personal account used by both reader devices.
2. Open WOTBC in Heritage as the intended church member and check access to a member resource.
3. Open https://wotbc.heritage.faith/admin as the intended manager. Enter Plan a service and Live translation. Pair SyncShow with WOTBC and approve the presentation/translation permissions it requests.

**Pass looks like:** Each intended role reaches its own screens. Personal-sync login is not mistaken for manager permission; an ordinary member cannot enter manager controls.

Use a separate signed-out browser for public checks. Never paste sign-in links, passwords or pairing credentials into this checklist.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### P3 — Prepare the service, screens and audio route

1. Create DEEP TEST — date with a bilingual song, a Bible passage, sermon notes, one image and one short video. Keep rehearsal publication separate from existing church resources.
2. Label the real English, Russian and stage outputs. Connect the pastor tablet to the intended Wi-Fi. Identify the actual capture input and headphones.
3. For translation, have the authorized server operator finish WOTBC provider configuration and confirm the chosen profile is usable. Record the selected models and sharing/overage choice; otherwise mark the translation cases Blocked.

**Pass looks like:** Everyone knows which app/device controls what. There is one deliberate audio source and one capture input; playback is not feeding back into the microphone.

Healthy server status is not a provider test. Do not copy credentials from another machine as an unreviewed shortcut.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

## S · Bible and personal sync

Desk · 25–35 minutes. Start with manual sync to isolate account problems, then test automation. Use notes labeled DEEP TEST so real writing is easy to distinguish.

### S1 — Phone sign-in, restart and offline Bible

1. On the physical phone, request the real sign-in email and open the link using the normal phone flow. Confirm it returns to Heritage successfully.
2. Open a Bible chapter and an existing note. Close and reopen the app, then turn on airplane mode and reopen that already available Bible content.
3. Navigate to the next chapter, create a labeled note offline, and restart once more. Restore connectivity.

**Pass looks like:** The real email flow works, existing and new local data survive restart, and available Bible content remains readable offline. A lack of internet does not trap navigation.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### S2 — Manual notes and reading position in both directions

1. On device A create DEEP TEST A in a chosen verse, then Sync now. On device B, Sync now and find the same note.
2. Edit that note on B, sync B then A, and confirm the edit. Add DEEP TEST B and repeat the opposite direction.
3. Advance reading position on A and sync both. While B is actively reading another chapter it should stay there. Reopen the reader from its normal starting point to check saved resume behavior.

**Pass looks like:** The supported personal notes and saved position converge both ways. Synchronization does not unexpectedly navigate the actively open reader.

The public web reader can be device B using manual Sync now.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### S3 — Automatic Sync stays out of the way

1. On Android 1.1.38-preview.1 or the updated web reader, open Settings → Sync. For a new installation Automatic Sync starts off; an update preserves your previous choice. Enable it and restart the app.
2. Open the Bible and navigate immediately. Leave it foregrounded and online with no text editor focused. After the initial delay (about 10 seconds, possibly longer while busy), check the last-sync status.
3. Create a note, leave editing, and wait for the next cycle: about 3 minutes after the previous attempt completes. Sync the second device manually to confirm receipt; repeat with B making the change and A receiving automatically.

**Pass looks like:** The preference survives restart, launch/navigation remain responsive, and a real background sync cycle transfers the notes. No second tap on Sync now is needed on A.

This is foreground automation, not a promise to run every 3 minutes with the phone locked. Two automatic clients require two builds containing the feature.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### S4 — Offline, background and toggle-off behavior

1. With Automatic Sync on, go offline, edit a labeled note and continue reading. Return online and to the foreground, leave editing, and allow the scheduler to retry.
2. If a failed attempt occurred, allow for backoff: approximately 6, 12, 24, then at most 30 minutes. Use Sync now if you need to distinguish an account problem from waiting; record that it was manual.
3. Turn Automatic Sync off. After any in-flight sync finishes, make another labeled change and wait longer than 3 minutes. Verify it is not sent until manual sync. Turn automation back on if that is your preference.

**Pass looks like:** Offline data stays safe; background/locked operation does not promise timers. Automatic attempts resume without a burst of duplicates, and turning the option off stops new automatic attempts.

An already started request may finish after the toggle is disabled. Do not call a manual recovery an automatic-sync pass.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### S5 — Conflicting and concurrent edits preserve writing

1. Sync both devices first. Disconnect B, then edit the same labeled note differently on A and B. Reconnect and sync both.
2. Follow the app’s conflict review and keep the intended version; confirm the other text is available to review before resolving.
3. On a slower connection, start syncing a longer labeled note and immediately continue typing. After the request finishes, reopen the note and sync again.

**Pass looks like:** There is no silent loss of either conflicting version. Text entered during a request survives in both the visible editor and saved storage, and reaches the other device after resolution.

Record the two exact labeled texts if something disappears. Do not erase the account to recover from this test.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### S6 — Reading-plan progress and ordinary use

1. Choose a test reading plan and mark one reading complete on A. Sync both devices and check B’s corresponding progress.
2. On B change supported progress, sync back and reopen the plan. Read and annotate for 10 minutes while Automatic Sync is enabled on A.
3. Record any heat, stutter, battery change or unexpected navigation. During the full rehearsal, observe the same phone again.

**Pass looks like:** Supported plan progress converges and normal reading feels unchanged. Battery observations are recorded as observations, not a measured efficiency guarantee.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

## R · Church songs and sermon notes

Desk · 15–20 minutes. Use the real manager/member roles and one labeled resource. Avoid testing public sharing with private sermon preparation.

Additional checks in the September 16 update:

- From a different chapter, search Joh 3:16 once. It should bring verse 16 into view immediately. Open a saved note on another chapter once; the referenced verse should be visible.
- Try Luk 12:34, then Jo 3 and Ma 5. Choose a book in the ambiguity popup; unavailable chapters explain why they cannot be selected.

### R1 — Song edit → prepare → read

1. Add or edit the rehearsal song through SyncShow/Community, including the English and Russian verses and chorus order.
2. Reopen it from the other preparation entry point and add it to the test service.
3. Open the intended shared song in Heritage as a member; compare the actual lyrics and selected version. Confirm ^1/^2 cues become verse headings, dashed slide dividers become paragraph gaps, and the sung lines are unchanged in both languages. Press Share song: confirm Link copied, scan the QR code on a second device, and compare the opened song. If clipboard permission is blocked, the popup must offer manual copying without claiming success. Explicitly save it offline, disconnect that phone, and reopen it.

**Pass looks like:** The same intended song/version appears in preparation and Heritage, both languages retain their text, and the explicitly saved resource opens offline.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### R2 — Sermon notes appear on the correct passage

1. Create a labeled sermon with one primary Bible passage, a second mentioned passage and short reviewed notes.
2. Keep it private first and check a signed-out browser cannot read the private preparation. Publish only the harmless rehearsal resource to the intended audience.
3. From Heritage, open the linked passage and its sermon resources. Verify title, passage, notes, formatting and return-to-Bible navigation. Edit the published notes and check the intended update.

**Pass looks like:** The right passage leads to the right reviewed content. Private preparation remains private, and the reader does not lose its place.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### R3 — Member-only, public and withdrawn resources

1. For the labeled resource, compare manager, member and signed-out access against the selected audience.
2. Change or withdraw its sharing deliberately, refresh each browser and try the old link again.
3. After the test, leave the harmless resource private or remove only the labeled rehearsal copy, according to the intended church workflow.

**Pass looks like:** Fresh server access matches the selected audience and withdrawal. Previously downloaded/offline copies may remain on a device; withdrawal is not remote deletion of an exported copy.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### R4 — Published, Unlisted and Private songs

1. Use one labeled rehearsal song. In Song library, click its publication dropdown and choose Published. Wait for Saved without leaving the list, then reload to confirm it persisted.
2. In a signed-out browser, find it on /songs. Search by both titles, switch Русский/English, open it and return; compare both sets of words.
3. Refresh church resources in Heritage Bible and find the same published song in Songs.
4. Choose Unlisted from the row dropdown and wait for Saved. The public list and refreshed Heritage catalog must omit it, while its direct public link still opens.
5. Choose Private from the row dropdown and wait for Saved. Its title and lyrics must disappear publicly; old song pages and previously issued public links must stop working.
6. Repeat a visibility change using row checkboxes → Edit → Songbook publication. Leave the rehearsal songs Private afterwards.

**Pass looks like:** Individual and bulk choices control fresh public access. Private data and uploaded files are never included. Previously downloaded copies may remain offline.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### R5 — Church workspace navigation on phone and desktop

1. Open Song library, Sermon library, Media library and a sermon editor. Open the hamburger on each page and navigate using its full-size workspace choices.
2. Check that the current section is highlighted and the mobile drawer closes after navigation. Visit Plan a service and confirm its compact menu still works.

**Pass looks like:** All church admin pages provide consistent reachable navigation; the planner keeps its compact layout.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### R6 — Phone pull-down refresh and saved lyrics during failure

1. Publish a clearly labeled bilingual rehearsal song. On the updated phone, open Community → Songs and drag downward from the top until Release to refresh appears. Open the song and read both languages so its words are saved.
2. Turn on airplane mode, return to Songs, and pull down again. A connection failure may be immediate; a stalled request stops after about five seconds. Open the saved song and switch EN/RU. Restart Heritage and try again offline.
3. Restore connectivity. Change only the rehearsal song to Private, then refresh successfully. Confirm it disappears from the Community list. Check an existing Bible note is untouched.

**Pass looks like:** Failed refresh shows a small message and keeps the last successful list and previously opened words accessible. Successful refresh follows Published status. Personal notes and Bible downloads survive.

A song never opened/downloaded needs a connection once. Existing songs are not automatically published. Test both a short pull that cancels and a deliberate pull; normal scrolling must remain comfortable.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### R7 — Song tags sort by category and then title

1. Create or use three labeled rehearsal songs with titles ending Alpha, Middle, and Zulu. Assign Choir to all three; assign Solo and Communal to additional rehearsal songs if available.
2. In Songs, enable the Tags column if your saved column preference hides it. Click Tags to sort and confirm Alpha → Middle → Zulu within Choir. Reverse the category sort and check the same title order inside each group.
3. Filter by Choir, edit one song to Solo, and confirm the list/filter updates. Leave only intended labels and sharing on the rehearsal songs.

**Pass looks like:** Solo, Choir, and Communal are selectable tags; filters work and category ordering has a predictable alphabetical secondary sort.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

## E · Church calendar

Desk · 10–15 minutes. Use clearly labeled rehearsal events. Restore the church defaults afterwards; do not change real events just to test.

### E1 — Calendar privacy and Events/Recurring filters

1. In Events → Calendar settings, record the current default visibility. Create three rehearsal events: Church default, Public, and Members only. Make one weekly series with an end date.
2. In a signed-out browser open the church home, then open Community Home → Calendar on the phone as a signed-in member. Events starts checked and Recurring unchecked; toggle Recurring and inspect dates and details.
3. If authorized for the rehearsal, change the default visibility and confirm only events using Church default follow it. Explicit Public/Members choices stay unchanged. Restore the original default and cancel the rehearsal events.

**Pass looks like:** Anonymous visitors see only public events/series. Members can see member events. Turning a filter off hides its category and selected details. Private titles and locations do not leak into the public feed.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### E2 — Date-click creation and Pacific recurring times

1. Open Events → Calendar settings. Confirm WOTBC uses America/Los_Angeles. Save the default once, reload, then click a date and create a clearly labeled event at 10:00 AM.
2. Create a weekly 10:00 AM rehearsal series across the November clock change, with an explicit ending date. Browse both months in the admin preview and Community calendar. Also create a three-day rehearsal event: it should be one bar within a week, continue on the next row across a week boundary, and open its own details page when clicked. Reload that page and return to the calendar. Check an old event saved with PST in Firefox. The optional registration website can be blank; entering test should identify that field instead of showing a generic save error.
3. Open an occurrence to edit the series, verify the whole-series explanation, and compare its time after saving. Cancel the rehearsal events when finished.

**Pass looks like:** Date-click creation pre-fills the chosen date and saved time zone. WOTBC follows Pacific daylight saving automatically; 10:00 AM stays 10:00 AM after the clock change. Existing event times do not move when the default zone changes.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

## H · Prepare → Load → Show

Desk first; repeat on real outputs. English, Russian, stage, media and offline behavior each need their own observation.

### H1 — Save and reopen a service from both entry points

1. In Community Plan a service, arrange the test song, Scripture, sermon and media. Save and reopen.
2. Open the same service in SyncShow Prepare. Change one harmless item or order, save, and reopen in Community.
3. Save translation direction, profile, optional notes and speech choices for the service without starting translation.

**Pass looks like:** The intended service/order is shared and settings survive reopening. Preparation alone does not activate the microphone or start paid processing.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### H2 — Load complete content and check every output

1. Load the service and wait until its package/assets are ready. Enter Show and move through every test item.
2. Read the actual English and Russian outputs separately. Check line wrapping, punctuation, verse/chorus order and Scripture references.
3. Check the stage-facing screen’s current/next material. Play the short video and image; confirm the intended audio destination and end-of-media behavior.

**Pass looks like:** Each physical output shows its assigned content legibly, including stage information and media. No operator controls or private notes appear on the congregation screen.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### H3 — Continue a loaded presentation offline

1. With the package fully loaded, disconnect only the presentation computer’s network; leave the shared church infrastructure running.
2. Advance and go back through the song, Scripture, image and video. Check every output again.
3. Reconnect, return to Prepare, and deliberately reload if accepting newer server changes.

**Pass looks like:** The already loaded show continues without internet or Community. Restoring connectivity does not silently replace the running show with different content.

This does not promise offline cloud translation or download of media that was never loaded.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### H4 — Open, hide and close translation screens

1. Without a loaded slideshow, use Open screen for the needed translation output.
2. Try Hide, show it again, then Close screen. Load a slideshow afterward and repeat the transition.
3. Observe the operator, congregation and stage screens while doing this.

**Pass looks like:** Hide gives the intended blank output; Close screen removes that output window. Display visibility changes do not themselves start/stop the translation session or speech generation.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### H5 — Prepare a sermon and add all its slides

1. Open Prepare a sermon → New sermon. Give it a rehearsal title, speaker, date and language. Add a main point, exact Bible passage, image and short video. Enter/check English and Russian text, preview the stage screen, and save.
2. Reopen the sermon and verify every slide. In Plan a service → Sermon, choose it from the newest-added-first dropdown and click Add whole sermon. Save and reopen the service.
3. Compare the copied slides and media with the sermon, load the service in SyncShow, and check English/Russian/stage outputs. Disconnect only after loading and verify the media still play.

**Pass looks like:** Sermon slides are reusable and saved independently. Adding the whole sermon copies its current saved slides, notes and media into the service. Later sermon edits do not silently alter the saved service.

An empty or unsaved deck cannot supply slides. The manuscript/passages workflow remains under More; public sermon publication is still a separate reviewed action.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

## T · Pastor teaching and any remote

Church · 15–20 minutes. Use the actual tablet and projector. Stylus-only is optional and should stay off for ordinary finger testing.

Additional checks in the September 16 update:

- Add an Other slide with text, an uploaded picture, a brace, an outline circle and a filled circle. Move, resize and rotate the objects; change their order. Select words and apply a highlight. Save and reopen the sermon.
- Check English, Russian and Stage-Facing Screen previews. Add the whole saved sermon to a service and open it in SyncShow Preview 30. Compare the objects and highlights, then disconnect after Load and advance through the slide offline.

### T1 — Persistent pen, highlight and the fading pointer

1. Pair the tablet through Remote Control, expand Teach and select the intended congregation output.
2. Draw with pen and highlighter in several colors/widths. Try Undo and Clear. Verify marks line up on the actual projected slide.
3. Select Pointer and draw continuously for 3 seconds. Watch the start of the trail disappear while the newer end remains. Stop and wait approximately 1 second. Switch back to pen.

**Pass looks like:** Each pointer fragment fades progressively over roughly 1 second; a long trail does not wait for pen-up to vanish all at once. Persistent ink remains until its explicit removal. Tablet drawing does not scroll the page.

If using an actual stylus, optionally try stylus-only. Some web/browser combinations report it as touch or mouse; keep the normal mode usable.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### T2 — Pastor gallery and host-wide slide-change notice

1. On the tablet open the nearby-slide gallery, select a nearby slide, then use Show all to choose one farther away.
2. Have a second remote use next/previous or choose another slide. Observe the host after each confirmed remote change.
3. Dismiss the host notice once and allow another to expire. Look at the projector and stage screen throughout.

**Pass looks like:** The confirmed slide changes everywhere. The SyncShow host gets a screen-wide notice for slide changes from any remote, lasting about 6 seconds unless dismissed. The notice does not appear on congregation or stage outputs.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### T3 — Remote reconnect and host control stay predictable

1. Disconnect the tablet’s Wi-Fi. Continue changing slides from the host, then reconnect the tablet.
2. Check the tablet reflects the current slide before choosing another. Change slides from the host while the tablet gallery is open.
3. Return to the earlier slide and inspect ink behavior; record what persists and whether it matches the teacher’s expectation.

**Pass looks like:** No stale remote action replays on reconnection, the gallery catches up to the confirmed slide, and the host remains in control. Lesson ink saving/replay after closing the Show is outside this release.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

## L · Translation and listening

Church · 35–50 minutes. Run the short meaning check before the full sermon. WOTBC provider and manager prerequisites must pass first. All paid testing stays within the previously authorized total $20.

### L1 — One session, started from either place

1. Choose the test service in SyncShow, set the intended direction, and start translation with generated speech off. On the mixer computer choose Connect this mixer and the correct input; speak a short phrase and check its level meter.
2. Open the same service’s Live translation controls in Community. Compare the acknowledged running state, direction and speech choice.
3. Stop from Community, confirm capture/session stops, then start from Community and confirm SyncShow sees the same session. Stop again before changing the setup.

**Pass looks like:** Either entry point controls one authoritative service session. Simply opening a page does not capture audio. Stop is acknowledged by both controllers and there is no duplicate billable session.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### L2 — Short English ↔ Russian meaning check

1. Use 60–90 seconds of the authorized WOTBC sermon starting at 41:32, plus a short English source passage. Have a bilingual listener first write down the actual important wording, names, numbers, Scripture references and negations without relying on the AI transcript.
2. Run Quality, speech off, notes off. Compare both recognized source and translated text with that reference. Record at least five source-end → audience-caption delay observations using the actual audio and screen.
3. Repeat the exact excerpt with relevant sermon notes enabled. Check whether terminology improves and whether the output invents anything present only in the notes. Repeat the direction check with English → Russian.

**Pass looks like:** No reversal/omission of important meaning or fabricated sermon content. The bilingual listener accepts both directions and identifies whether notes helped. Record delay and agree whether it is usable; no unmeasured latency promise counts as a pass.

A previous Russian test confused a word meaning condescension with distortion. Listen for actual errors, not merely fluent phrasing. A delay measured after an internal recognition window is not total audience delay.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### L3 — Economy and note sharing on the same excerpt

1. Check the budget ledger and actual provider usage before starting. At this plan’s date, $0.79 of $20 was conservatively accounted, with no pending reservation; this is not a live balance. Reserve no more than $2 of additional spending for the initial short comparison and check usage again before continuing.
2. Select Economy only after its project, sharing and overage behavior are understood. Run the same short excerpt without notes, then with notes if you explicitly enable that session’s sharing choice.
3. Compare important meaning, delay and terminology with L2; record the actual selected models. Stop if costs are unknown enough that the remaining authorized budget cannot be established.

**Pass looks like:** Economy remains a usable optional choice, with honest quality/cost results. Notes are optional, and shared-data notes need an intentional per-session choice. The word Economy never counts as proof of free usage.

The $2 checkpoint is a manual test limit, not an app-enforced hard cap. Service usage is partial and can exclude unknown costs. Do not spend beyond the cumulative $20 authorization.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### L4 — Text displays and voice generation are independent

1. Run a brief live input with speech off. Try full-screen text, lower third, ticker and text off on the chosen output. Confirm no pulpit video appears on these presentation outputs.
2. Enable Generate translated speech, listen on headphones, then disable it during a sentence. Watch the operator/usage evidence for new speech requests, and keep speaking.
3. After text has continued for a while, re-enable speech. Then turn only the text display off, leaving speech enabled.

**Pass looks like:** Text continues with generated speech off and no new TTS requests are made. Turning speech off clears queued translated playback; turning it back on starts current content instead of reading the backlog. Text visibility and server-side speech generation remain independent.

A phone’s Listen to selection is local playback preference. It does not replace the operator’s Generate translated speech switch.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### L5 — Audience phone, live page and translation-only page

1. On the actual phone open https://wotbc.heritage.faith/live. Check the intended Word of Truth channel/service selection and play the original video when a playable service is available.
2. Choose translated listening and text. Confirm you do not unintentionally hear original and translated speech together. Measure perceived alignment; adjust the available delay if needed.
3. Open /translate for an in-person listener, try the floating translation view where supported, rotate the phone, lock/unlock it and return to playback.

**Pass looks like:** The intended WOTBC service/source is shown, text-only attendance works without a video feed, and supported playback resumes predictably. Unsupported floating-view/browser behavior has a usable normal-page fallback.

Record the real phone/browser. Browser automation alone does not prove audible speech or background audio support. An offline YouTube channel is not itself a translation failure.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### L6 — Pause, stop and budget after the short test

1. Pause the audio source for 20 seconds, then speak again. Check that silence does not produce invented sermon text.
2. Stop translation from the other controller and confirm capture, text delivery and generated speech finish/stop as intended. Verify no new processing keeps accumulating afterward.
3. Review Service usage and provider usage, record any unknown amounts, update the cumulative test ledger and keep the total within $20 before approving the long rehearsal.

**Pass looks like:** Silence and stopping do not create phantom content or leave an unnoticed running session. Final usage is recorded honestly; unknown costs are not treated as zero.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

## F · Recover without losing the service

Church · 10–15 minutes. Disconnect one test device at a time. Do not power off shared infrastructure during other people’s work.

### F1 — Capture and listener network interruption

1. During a short harmless phrase, disconnect the capture computer’s network for about 15 seconds. Watch both operator status and listener display. Keep the already loaded presentation moving.
2. Reconnect using the indicated recovery action. Speak a new clearly different phrase and verify current content arrives once.
3. Separately disconnect/reconnect one audience phone while the source continues.

**Pass looks like:** The operator sees the interruption, loaded Show keeps working, reconnect reaches the current session without duplicating old text or flooding speech backlog, and one disconnected listener does not disrupt everyone.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### F2 — Restart the client and explain the recovery

1. With no important unsaved edits, close/reopen the listener and remote. Rejoin the same session.
2. After stopping translation, close/reopen SyncShow, load the saved test package and find the service’s saved settings.
3. Have the volunteer explain the recovery steps unaided. Record any hidden setting, missing message or expert-only step.

**Pass looks like:** Saved work remains available, rejoining does not silently start capture or another session, and the recovery can be performed by the intended volunteer. Server restore/reboot drills are a separate scheduled maintenance test.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

## A · Recordings and sermon publication

After stopping the test service. Archive review is already available. The final attachment case deliberately waits for the unpublished work to be delivered.

### A1 — Review the finished text-only and spoken sessions

1. Stop the service and allow finalization. Open Recorded services → Browse recordings from the manager workspace or an appropriately permitted SyncShow connection.
2. Find the exact session by time/service and inspect original and translated transcripts. Open both the text-only session and the one with generated speech.
3. Play available audio, pause, seek near its end and reopen the record. Compare the transcript/session identity with what was actually run.

**Pass looks like:** The correct completed session and languages are retained. Text-only records are valid without fabricated audio. Available audio really plays and seeks on the intended device.

Preview 29 may need its separate recording-review permission approved. A new permission problem is not proof the archive disappeared.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### A2 — Long recording and private access

1. After the full rehearsal, open its full-length archive on the operator computer and a phone with appropriate access.
2. Play from the start, seek to the middle and near the end, leave/reopen it, and watch for freezing, browser crashes or excessive delay.
3. Try the private recording link in a signed-out browser and with an unprivileged member session.

**Pass looks like:** The full-length recording remains usable on real devices and unauthorized access is denied. Record memory/phone trouble; short synthetic playback does not establish this result.

The existing review loads full audio into memory, so this is a real acceptance risk. There was also an unresolved internal-browser preview crash in local attachment work.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

### A3 — Attach → review → publish → withdraw a sermon recording

1. Prerequisite: deliver the newer recording-to-sermon workflow in a named server/app build and record those versions. Until then choose Blocked; do not hunt for this control in Preview 29.
2. With a harmless test recording, choose transcript only, audio only, then both across separate labeled drafts. Interrupt/resume one upload and retry; confirm no duplicate attachment.
3. Review the private draft, publish only the selected intended content, open it from the Bible passage as a signed-out/member reader as appropriate, then withdraw and retry fresh links.

**Pass looks like:** Selected transcript/audio attaches once, is private before approval, plays after intentional publication, and fresh access is removed after withdrawal. Test full-length audio too before calling this feature ready.

Not in the first frozen baseline. Existing preparation/publication tests and archive browsing can be completed while this case is blocked.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

## G · The full service rehearsal

45–60 minutes or one actual sermon. Only start after the short critical cases for the chosen service mode pass.

### G1 — A volunteer runs the whole service

1. Choose one already accepted profile/direction/display/speech combination. Check the remaining paid-test budget. Record initial phone battery and the source video/time. Use the real mixer path for this rehearsal even if a saved excerpt was easier earlier.
2. Have the volunteer open the apps, select the service, Load, check outputs, start capture, present the song/Scripture/sermon, let the pastor use ink/pointer/gallery, and monitor translation. Do not coach unless needed; write down each intervention.
3. Run the full sermon, with a bilingual listener checking meaning at the beginning, middle and end. Track at least five audience-delay observations throughout, physical audibility, device heat/battery and dropped/repeated material.
4. Stop translation, review usage and the completed recording, confirm reading notes still exist, and complete A2. Export this checklist and decide which failures require fixes before a supervised pilot.

**Pass looks like:** The actual workflow completes without expert rescue, lost work, wrong outputs, private leaks or unaccepted translation errors. Costs stay within authorization. The volunteer can repeat it next week.

A successful local-file run does not prove the physical mixer path. A supervised pilot can omit blocked features, but those omissions must be explicit.

Result: Not run / Pass / Fail / Blocked

Notes / evidence:

[Sunday operator guide](sunday-operator-guide.md) · [Android update guide](android-preview.md) · [Automatic Sync evidence](verification/2026-09-14-automatic-sync.md) · [Recognition evidence](verification/2026-09-14-committed-recognition.md) · [Progress report](progress.html)
