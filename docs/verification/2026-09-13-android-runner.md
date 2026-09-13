# Android native acceptance runner — 2026-09-13

The Community Android preview remains unpublished pending native acceptance.

The first [package-only run 34769257962](https://github.com/edydex/heritage_study_bible/actions/runs/34769257962), from Heritage `8a0641ccb23eb221e5a5d758607d90b7941b83c4`, built the APK successfully but never reached instrumentation. The recovered `emulator.log` reports `Unknown AVD name [heritage-acceptance]`; `logcat.txt` contains `- waiting for device -`. Cleanup issued unbounded adb commands after emulator startup failed. The obsolete job was explicitly cancelled after that cleanup path had been independently reproduced and fixed; its terminal status is cancelled, not passed.

Heritage `7391f2b` bounds startup, boot checks, instrumentation and cleanup commands, including forced timeout termination. A missing-emulator fault injection reproduced the original cleanup hang; the corrected runner exits with the expected failure and retains its emulator log. The test shortens bounded calls to 0.3 seconds; its roughly two-second completion is a test result, not the production timeout setting. That regression check is included in the workflow before SDK setup.

Heritage `d8e5d438ff345a4d27f35765d6aa9a739f1b2e17` uses an explicit temporary Android user/AVD directory shared by the SDK tools and emulator, chooses avdmanager beside the configured sdkmanager, requires the AVD registration file and retains the AVD-creation log. [Android's environment-variable reference](https://developer.android.com/tools/variables) defines the relevant directory lookup behavior.

The corrected [package-only run 34771300423](https://github.com/edydex/heritage_study_bible/actions/runs/34771300423) started the emulator and passed all three Community integration tests. The run failed on the pre-existing Capacitor sample test, which expected `com.getcapacitor.app` rather than the actual `faith.heritage.app`. Its logs also show that Gradle uninstalled the app before cleanup could pull the screenshot files.

Heritage `181434390ca374b7baeb6978bdf29be689027f5b` corrects the sample assertion, retains the test APK until screenshots are copied, and requires all three PNGs before verifying the package. [Package-only run 34771753817](https://github.com/edydex/heritage_study_bible/actions/runs/34771753817) is the current verification handle. Publication is disabled. Its native test reports, packaged-screen screenshots, signer/version compatibility, packaged web asset comparison and actual release assets must still pass inspection before the APK can be offered as the verified preview. Do not restart this run solely because a status/log query times out.

No real account, email, microphone or paid translation provider is used by these emulator checks. WOTBC and the existing browser deployment were not changed.
