# Synthetic codec fixtures

Generated locally for the FFmpeg replacement rehearsal. No sermon, microphone input or other personal media is included.

Generator: `ffmpeg version 8.0.1 Copyright (c) 2000-2025 the FFmpeg developers`.

```sh
ffmpeg -f lavfi -i 'sine=frequency=440:sample_rate=48000:duration=3' -c:a aac -b:a 96k -movflags +faststart tone-aac.m4a
ffmpeg -f lavfi -i 'sine=frequency=660:sample_rate=48000:duration=3' -c:a libopus -b:a 64k tone-opus.ogg
ffmpeg -f lavfi -i 'testsrc2=size=320x180:rate=15:duration=3' -c:v libx264 -preset veryfast -pix_fmt yuv420p -movflags +faststart pattern-h264.mp4
```

The exact encoded files are retained so decoding can be compared without depending on a different encoder build. See [the verification record](../../2026-09-14-ffmpeg-source-replacement.json) for encoded and decoded hashes, actual sample formats and measured differences.
