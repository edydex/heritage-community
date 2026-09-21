# September expansion: hands-on checks

Use Android **1.1.48-preview.1** and SyncShow **1.4.0-preview.31**. Verify the server’s installed version separately before rehearsal. Start with a short recording and a disposable presentation; keep your existing phone app data when updating. Record the actual device, app version, steps and result. This supplements the [earlier walkthrough](deep-testing.html).

1. **Resume listening.** Open Audio, choose an audiobook, seek a few minutes in and change playback speed. Navigate back to the Bible, lock the phone, then return. Pause, close and reopen the app. Expected: the saved recording/position remains; reopening does not start audio unexpectedly. Test headset pause/play and the notification controls too.
2. **Offline files and storage.** Download one short recording, switch the phone offline and play/seek it. Open Internal Storage and remove that recording. Expected: the local file disappears, listening position and reading notes remain, and online streaming works again after reconnecting. Interrupt a second download and verify it is removable/retryable without a corrupt item showing as downloaded. Keep the app open for large downloads.
3. **Nearby audiobook text.** In Confessions or Enchiridion, play a passage and use Go to nearby text. Expected: the matching paragraph is temporarily indicated and audio continues at the same position. Return to the player, seek to a different passage and repeat. There must be no saved note/highlight added. Some recordings use a different translation; an unavailable match should open the book normally instead of guessing.
4. **BSB following.** Open Romans 1 audio and its BSB text. Following starts on by default; listen across a verse boundary and tap a timed verse to seek. Disable it in Audio Settings and scroll manually. Expected: gray audio markers remain distinct from personal annotations. Missing timing data must not interrupt sound or select a guessed verse. Following advances the currently open Bible chapter when the queue advances. Browsing elsewhere should not pull you back.
5. **Android Auto.** Park safely before testing. Connect the actual phone to the head unit, open Heritage in its audio apps, browse the audiobook and Bible roots and play a short recording. Test resume, next/previous and disconnect/reconnect. Expected: the library works without opening the reader first, and phone/car state agrees. If Heritage is absent, record the phone/Auto/head-unit versions and installation method; emulator success does not establish head-unit compatibility.
6. **Original languages.** Enable the named original-language parallel source in an OT passage, an Aramaic portion of Daniel, and Romans. Check right-to-left pointing, narrow-screen readability and source labels. In matching New Testament verses, tap for occurrences and hold for checked word counterparts. Expected: only attested matching groups are connected; variants or unverified verse numbering remain unlinked. The Septuagint is not being substituted for Hebrew/Aramaic.
7. **Monochrome teaching.** Pair the real tablet with SyncShow, select Teach and enable Monochrome. Draw with several named colors; compare palette patterns and the used-color legend. Try pen, highlighter, temporary pointer, Undo, gallery navigation and reconnection. Expected: the tablet remains usable in grayscale and congregation output retains the selected colors. Also create colored text/shapes/highlights in Community's monochrome authoring mode. Check thin marks on the actual e-ink screen; browser emulation is insufficient.
8. **Private Bible import.** Use the included openly licensed sample through Community's Bible translations library or SyncShow Prepare → This computer → Scripture → Bible translations. Review the preview and permission/source information, install, select it for the intended outputs, and add the sample passage. Save and reopen the service; prepare an offline package and disconnect. Expected: the exact words and attribution remain in English, Russian and stage-facing outputs as configured. Missing verses must fail clearly. Obtain publisher-authorized source before trying LSB; do not upload a proprietary file from another application as a substitute.
9. **Muse and speech choices.** Start with a short English passage through the real mixer, Automatic recognition, Quality and speech off. Expected: Muse source recognition, translated captions and no generated speech. Stop completely, then test Russian → English and verify the explicit OpenAI recognition choice. Repeat with reviewed notes, and finally with optional speech. Have a bilingual person review terms and meaning; provider success is not a quality score. Test stopping and network reconnect before a longer service. Keep paid testing within the owner's remaining budget.

The current code/package checks are recorded in [STATUS](../STATUS.md). Report concrete differences from these expectations; include a screenshot or exact error text where useful, without sharing API tokens or private sermon content publicly.

## Additional checks for Android 1.1.42

The release is published and verified through the normal update checker. Install
it over the existing app before testing these edition and navigation changes.

- In the existing Tertullian or Polycarp reading edition, bookmark a chapter and
  note the saved reading position. Play its recording, then choose **Go to nearby
  text**. Confirm the named Dodgson or Lake edition opens at the spoken passage.
  Bookmark this edition too. Use the edition link to return to the earlier text;
  its bookmark and reading position should still be there.
- Seek within the final Institutes track and choose **Go to nearby text**. It
  should open Book IV of the complete Allen text. The original volume-one text
  remains a separate edition; its previous bookmarks should still work.
- Try later recordings in Wars, Antiquities and City of God. Listen before and
  after a link, reload the text page, and compare the highlighted paragraph with
  what is spoken. A match is a nearby paragraph, not a word-by-word cursor.
- Keep a previously downloaded recording and its saved listening position through
  the update. Verify both remain usable offline. No audio redownload should be
  required just because its text edition changed.

## Compact audio and word-study checks (Android 1.1.43)

- **Small controls.** Open BSB Romans 8. Only the existing bottom navigation
  should contain Play/Pause, immediately left of the chapter selector. Start
  playback and tap verses 2, 3, 6, 7 and 8. Each should seek to that verse and
  temporarily mark it gray. Verse 9 remains without a marker because its timing
  did not pass the boundary check. Record early/late starts by verse and seconds;
  coverage percentages are not accuracy scores.
- **Other books.** Listen across several boundaries in Genesis 1, Psalm 23,
  John 3 and a chapter you choose. All 1,189 chapters have been reprocessed.
  Keep the spoken text and highlighted verse together; report any mismatch.
- **Settings and continuation.** In Settings → Audio Settings, turn Bible
  auto-scroll off, return, scroll away and verify playback does not pull you
  back. Re-enable it and listen through a chapter ending. The open reader should
  follow the next chapter. Browsing elsewhere must not pull you back.
- **Download without losing files.** Review the whole-BSB size and cancel before
  downloading. On Wi-Fi with enough space, start it, navigate away and return,
  then stop after the current chapter. Saved chapters should play offline.
  Resume should skip completed files. Do not download the entire library merely
  to prove that cancellation works.
- **Audiobook following.** Open a matching audiobook text while playing. Follow
  paragraphs across a book chapter boundary. Disable audiobook auto-scroll and
  browse manually. Existing notes and saved highlights must remain unchanged.
- **Parallel word study.** Open BSB/Original Romans 1. Tap “servant” to see Greek
  lemma occurrences; hold it to identify its Greek counterpart. On a keyboard,
  Shift+Enter also reveals the match. Choose an occurrence and confirm the first
  click opens that verse. Toggle Settings → B&W word links, verify diagonal
  strokes differ from dots, then turn it off for color tints. Word actions must
  not open the verse-note editor.

## Translated word occurrences (introduced in Android 1.1.44 and web)

- Open **BSB + Original**, Romans 1, and tap **servant**. Each occurrence should
  show the actual BSB verse and the highlighted English wording, with its Greek
  source underneath. Matthew 8:9 shows **servant**; Matthew 20:27 shows **slave**.
- Use **Show more** to reach Romans 6:19. Both appearances of **in slavery**
  should be highlighted. These are contextual translations of the same source
  lemma, not a single dictionary gloss copied into every verse.
- Matthew 18:27 should show the full BSB verse and **Exact word mapping
  unavailable**, without a guessed highlight. Other source-edition differences
  can also remain unlinked. Hebrew/Aramaic lookups currently provide BSB context,
  not exact translated-word highlights.
- Tap an occurrence: the first tap should open its verse. In Acts 13:9, tap
  **Paul** with word-link colors disabled; source-lemma lookup should still work.
- On the updated Android app, repeat offline. Its installed maps are bundled.
  A web browser can reuse already loaded maps, but a new book may require a
  connection. A failed request must preserve source verses and offer retry.

These checks verify behavior. A reader should still spot-check source senses
and contextual translations; structural correspondence checks do not constitute
a complete scholarly review.

## Egypt prophecy comparison (introduced in Android 1.1.45 and web)

1. Open the chronological plan at Day 250, then the Egypt note. The dated-oracle timeline should appear first; the proposed-fulfillment section starts collapsed.
2. Expand it. On a phone, each entry stacks vertically without horizontal scrolling. Read the distinction between the attested campaign and its disputed outcome; the forty-year desolation must retain an unknown fulfillment date.
3. Tap the exact **Ezekiel 29:17** context link. The reader should land at verse 17 on the first click. Go back; following the reference must not mark the note done.
4. Open the historical sources and have a historically informed reader review the claims and limitations. Automated layout/link tests do not establish historical or theological acceptance.
5. Existing saved chapter/note completion should remain. The new Egypt note is a separate reading item; opening its optional comparison alone does not complete it.

## Maximus internal text (introduced in Android 1.1.46 and web)

1. Resume Maximus in Audio Settings from an existing timestamp; choose **Go to nearby text**. It should open inside Heritage, at a marked paragraph, on the first tap.
2. Confirm **William R. Clark, 1896 · Audio text** and the source scan link. This is Hefele’s historical account of the disputation.
3. Check beginning, middle and closing narration. Automatic matching covers 77.7% of duration, not all speech; introductions, short replies and uncertain passages can remain unmarked. Record exact timestamps for incorrect matches.
4. Reload and confirm the same nearby paragraph. The compact Play/Pause control should still work, without an extra fixed player. Existing saved audio should continue to play offline after the update.

## Continuous Bible audio marker (Android 1.1.47 and web)

1. Play Romans 8 with following enabled. Watch the transition from verse 8 to verse 9: verse 9 should be marked as soon as verse 8 ends, without a blank interval.
2. Tap verse 9: because its timing is not verified, the app should explain that it has no verified audio position and leave playback unchanged. Tap verse 10 to check verified seeking.
3. Try ordinary pauses in other chapters and the closing narration. The final verse stays marked through the outro; the next chapter introduction remains unmarked.
4. When several consecutive verses lack timings, the first following verse remains marked until a verified interval resumes. This is a reading cue, not newly verified alignment. Report recording, chapter and timestamp for mismatches.

## Android verse boundary timing (1.1.48)

1. Update without uninstalling, then open BSB Ezekiel 42 and play from the beginning.
2. Watch verses 1–4: the first marker should begin with the first verse; later markers advance when the preceding verse ends, including the breath before the next one.
3. Pause just before a transition, wait, and resume. The marker must remain still while paused and resume with playback.
4. Tap an earlier timed verse, then try 0.75×, 1× and 2×. Lock/unlock the phone while playback continues and verify following resumes correctly.
5. If a spoken boundary still differs, record app version, chapter, verse, playback speed and whether the delay is before or after the words. The fix removes display polling delay; it does not certify every automatic alignment mark.
