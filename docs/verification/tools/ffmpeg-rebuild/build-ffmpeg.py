from pathlib import Path
import json,subprocess
root=Path(__file__).resolve().parent;source=root/'source';out=root/'build-reviewed';out.mkdir(exist_ok=True)
# Preserve the shipped Chrome-branding codec/demuxer/parser selection; use the owner's Apple toolchain.
args=[str(source/'configure'),'--disable-everything','--disable-all','--disable-doc','--disable-htmlpages','--disable-manpages','--disable-podpages','--disable-txtpages','--enable-avcodec','--enable-avformat','--enable-avutil','--enable-static','--disable-shared','--enable-libopus','--disable-debug','--disable-bzlib','--disable-error-resilience','--disable-iconv','--disable-network','--disable-schannel','--disable-sdl2','--disable-symver','--disable-xlib','--disable-zlib','--disable-securetransport','--disable-faan','--disable-alsa','--disable-iamf','--disable-autodetect','--disable-linux-perf','--enable-pic','--cc=/usr/bin/clang','--cxx=/usr/bin/clang++','--ld=/usr/bin/clang','--arch=arm64','--target-os=darwin','--optflags=-O2','--enable-decoder=vorbis,libopus,flac,pcm_u8,pcm_s16le,pcm_s24le,pcm_s32le,pcm_f32le,mp3,pcm_s16be,pcm_s24be,pcm_mulaw,pcm_alaw,aac,h264','--enable-demuxer=ogg,matroska,wav,flac,mp3,mov,aac','--enable-parser=opus,vorbis,flac,mpegaudio,vp9,aac,h264','--extra-cflags=-mmacosx-version-min=12.0 -fblocks -I'+str(root/'opus-source/src/include'),'--extra-ldflags=-mmacosx-version-min=12.0']
(out/'build-command.json').write_text(json.dumps(args,indent=2)+'\n')
with (root/'configure-reviewed.log').open('w') as log:subprocess.run(args,cwd=out,stdout=log,stderr=subprocess.STDOUT,check=True)
with (root/'build-reviewed.log').open('w') as log:subprocess.run(['make','-j8'],cwd=out,stdout=log,stderr=subprocess.STDOUT,check=True)
print('Built FFmpeg with the shipped Chrome-branding component selection.')
