# Later: musician screen

Requested 2026-09-13. This is planned work, not an implemented feature.

Give each musician a personal screen following the current and next song cue in SyncShow. It should show the musician's own instrument part and chords, with enough of the next section visible to prepare before the congregation slide changes.

The initial interpretation is a chord chart with lyrics and song-section labels. Automatic following should use the Show's confirmed current/next cue and song structure, rather than guessing progress from elapsed time. A musician can hold the current view, scroll or look ahead, then choose **Follow Show** to catch up. Repeated choruses, skipped verses, jumps, and an unexpected extra chorus must follow the operator's actual cue.

Each device selects an instrument or prepared part, with explicit concert/written key, transposition and guitar capo where applicable. Store reviewed arrangements in the service/song data and include needed charts in the offline ShowPackage. Do not generate an arrangement live or change congregation slides when an individual musician changes their view. Disconnection should preserve the last chart and permit manual navigation, with a clear reconnect/follow action.

Before implementation, settle which instruments come first and whether the desired content is chords above lyrics, full notation, tablature, or separately arranged parts. Work out how chords align with song sections and slide splits, and how much next-section material each musician needs to see. The likely first usable version is chord-over-lyrics, current/next section and manual hold/resume, followed by instrument-specific notation when actual arrangements exist.

Related future teaching work: save a lesson's tablet ink for reuse, export/replay annotations, and optionally map marks to corresponding words across English/Russian slides. The first tablet-teaching implementation retains ink only during the current Show.
