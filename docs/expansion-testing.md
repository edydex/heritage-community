# September expansion: hands-on checks

Use Android **1.1.42-preview.1** and SyncShow **1.4.0-preview.31**. Verify the server’s installed version separately before rehearsal. Start with a short recording and a disposable presentation; keep your existing phone app data when updating. Record the actual device, app version, steps and result. This supplements the [earlier walkthrough](deep-testing.html).

1. **Resume listening.** Open Audio, choose an audiobook, seek a few minutes in and change playback speed. Navigate back to the Bible, lock the phone, then return. Pause, close and reopen the app. Expected: the saved recording/position remains; reopening does not start audio unexpectedly. Test headset pause/play and the notification controls too.
2. **Offline files and storage.** Download one short recording, switch the phone offline and play/seek it. Open Internal Storage and remove that recording. Expected: the local file disappears, listening position and reading notes remain, and online streaming works again after reconnecting. Interrupt a second download and verify it is removable/retryable without a corrupt item showing as downloaded. Keep the app open for large downloads.
3. **Nearby audiobook text.** In Confessions or Enchiridion, play a passage and use Go to nearby text. Expected: the matching paragraph is temporarily indicated and audio continues at the same position. Return to the player, seek to a different passage and repeat. There must be no saved note/highlight added. Some recordings use a different translation; an unavailable match should open the book normally instead of guessing.
4. **BSB following.** Open Romans 1 audio and its BSB text. Enable following/autoscroll, listen across a verse boundary, seek, then disable following and scroll manually. Expected: gray audio markers remain distinct from personal annotations. Missing timing data must not interrupt sound or select a guessed verse. Following is currently within the opened chapter. Check chapter advance and the saved queue separately.
5. **Android Auto.** Park safely before testing. Connect the actual phone to the head unit, open Heritage in its audio apps, browse the audiobook and Bible roots and play a short recording. Test resume, next/previous and disconnect/reconnect. Expected: the library works without opening the reader first, and phone/car state agrees. If Heritage is absent, record the phone/Auto/head-unit versions and installation method; emulator success does not establish head-unit compatibility.
6. **Original languages.** Enable the named original-language parallel source in an OT passage, an Aramaic portion of Daniel, and Romans. Check right-to-left pointing, narrow-screen readability and source labels. In matching Romans verses, tap/focus patterned word links. Expected: only attested matching groups are connected; variants or unverified verse numbering remain unlinked. The Septuagint is not being substituted for Hebrew/Aramaic.
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
