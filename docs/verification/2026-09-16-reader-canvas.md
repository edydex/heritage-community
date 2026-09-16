# Reader navigation, book prefixes and canvas slides

September 16, 2026. Reader/Android source `322806319cdf12dfe266a216170945ce8a3fbf67`; final Community source `8eabb941efee567d96d93fd0703a98f6e0153333`; SyncShow `9a9ebf7379797c68e99a2ea1f7a9dcefd1551458`. [Verification data](2026-09-16-reader-canvas.json).

## Reader

The route reset was racing the delayed verse scroll on first navigation to a different chapter. Verse destinations now travel with the route and scroll after the target chapter has rendered; the ordinary chapter reset skips these destinations. Live Chrome and Firefox checks pass for the first reference search and first saved-note click, including a delay to detect a later scroll reset.

Unique canonical prefixes are derived from the book names. Existing conventional aliases remain supported. `Luk 12:34` and `Joh 3:16` work; ambiguous `Jo` and `Ma` open book choices. Exact full names remain authoritative. Invalid chapter choices explain their limit: for example, Malachi is unavailable for `Ma 5`.

Android 1.1.38-preview.1, versionCode 41, is in the normal Latest feed. Native acceptance and signer compatibility passed in CI. The downloaded APK and metadata match every release digest; all 538 packaged web files match the source build. The actual update response passes the checker for earlier versions including 1.1.37. Physical-phone installation is still an acceptance step.

## Community and SyncShow

Prepare a sermon and the service planner now offer **Other**: text, private uploaded pictures, rotatable/resizable braces, and filled or outline circles. Objects have drag handles, numeric position/size/rotation controls, color and layer order. Text shrinks to its box. English and Russian layouts remain separate; Russian follows to the media/stage channel. Copying a layout to all outputs requires confirmation because it replaces those layouts.

Select words in any supported slide text field and choose **Highlight**. Highlight and foreground color are separate; removing the highlight preserves bold and other emphasis. Source words and offsets stay unchanged.

The canonical service document, asset reachability, compiled cues, browser renderer and native renderer all support these objects. Shared core implementations are byte-identical across the two apps. Preview 30 is required for new canvas slides and highlights. The offline package check publishes a package, removes the original project and picture, and reopens the package with its picture and highlighted text intact.

Chrome and Firefox exercised the real planner UI with isolated API fixtures: editing, selected-text highlighting, image upload/decode, pointer move/resize, rotation controls, save/reopen, and Russian stage preview. Both also rendered the actual native display code with local-file pictures. Screenshots were inspected. These are not physical tablet/projector acceptance or mutations to real church sermons.

Local validation: 228 reader unit tests, 124 reader protocol tests, 10 focused Community tests, Community TypeScript/production build, and 2,244 desktop tests passed (two existing skips). Community CI passed all four jobs, including production containers, migrations, database/API contracts and backup. Desktop CI builds packages and launches the native app on each target. The first manually dispatched desktop build exposed electron-builder's implicit publish behavior; QA builds now explicitly use `--publish never` before verified assets are retained in the private release.

No paid provider calls were made. The [Deep Testing walkthrough](../deep-testing.html) keeps all 38 case IDs and the existing saved-result key; S6 and H5 include the new checks.

The final Community-only correction makes a text box’s own color override older sermon CSS and dismisses the formatting toolbar when focus leaves the text. The final browser rehearsal includes these checks. Android and the public reader keep the unchanged reader build at `3228063`. WOTBC final deployment and permanent desktop release publication are being finalized; the APK and all desktop package/launch evidence are already verified.
