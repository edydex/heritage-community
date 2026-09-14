// Decode only locally generated fixtures with a specifically selected packaged library.
#include <dlfcn.h>
#include <errno.h>
#include <inttypes.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "libavformat/avformat.h"
#include "libavcodec/avcodec.h"
#include "libavutil/imgutils.h"
#include "libavutil/samplefmt.h"
#define FUNCTIONS(X) \
 X(avformat_alloc_context) X(avio_alloc_context) X(avio_context_free) \
 X(avformat_open_input) X(avformat_find_stream_info) X(avformat_close_input) \
 X(av_find_best_stream) X(av_read_frame) X(avcodec_alloc_context3) \
 X(avcodec_parameters_to_context) X(avcodec_open2) X(avcodec_send_packet) \
 X(avcodec_receive_frame) X(avcodec_free_context) X(avcodec_version) \
 X(av_frame_alloc) X(av_frame_free) X(av_frame_unref) X(av_packet_alloc) \
 X(av_packet_free) X(av_packet_unref) X(av_malloc) X(av_freep) X(av_strerror) \
 X(av_get_bytes_per_sample) X(av_sample_fmt_is_planar) \
 X(av_image_get_buffer_size) X(av_image_copy_to_buffer)
#define DECLARE(name) static __typeof__(&name) p_##name;
FUNCTIONS(DECLARE)
static void fail(const char *what, int code) {
 char message[256] = ""; if (p_av_strerror) p_av_strerror(code,message,sizeof(message));
 fprintf(stderr,"%s: %d %s\n",what,code,message);exit(1);
}
static int read_data(void *opaque, uint8_t *buffer, int size) {
 size_t n=fread(buffer,1,(size_t)size,(FILE*)opaque);
 return n ? (int)n : feof((FILE*)opaque) ? AVERROR_EOF : AVERROR(EIO);
}
static int64_t seek_data(void *opaque,int64_t offset,int whence) {
 FILE *f=opaque;
 if (whence==AVSEEK_SIZE) {off_t here=ftello(f);fseeko(f,0,SEEK_END);off_t end=ftello(f);fseeko(f,here,SEEK_SET);return end;}
 if(fseeko(f,offset,whence & ~AVSEEK_FORCE))return AVERROR(errno);return ftello(f);
}
static int frames=0,samples=0,width=0,height=0,channels=0,rate=0,sampleFormat=-1;
static int drain(AVCodecContext *ctx,AVFrame *frame,FILE *out,int audio) {
 int status;
 while((status=p_avcodec_receive_frame(ctx,frame))>=0) {
  frames++;
  if(audio) {
   channels=frame->ch_layout.nb_channels;rate=frame->sample_rate;samples+=frame->nb_samples;sampleFormat=frame->format;
   int bps=p_av_get_bytes_per_sample(frame->format), planar=p_av_sample_fmt_is_planar(frame->format);
   if(channels<1||channels>8||bps<1)fail("unexpected audio format",AVERROR(EINVAL));
   // Interleave samples so the output is independent of frame partitioning.
   for(int s=0;s<frame->nb_samples;s++)for(int c=0;c<channels;c++) {
    const uint8_t *data=planar?frame->extended_data[c]+s*bps:frame->extended_data[0]+(s*channels+c)*bps;
    if(fwrite(data,1,(size_t)bps,out)!=(size_t)bps)fail("write audio",AVERROR(EIO));
   }
  } else {
   width=frame->width;height=frame->height;
   int size=p_av_image_get_buffer_size(frame->format,width,height,1);if(size<0)fail("image size",size);
   uint8_t *pixels=malloc((size_t)size);if(!pixels)fail("allocate pixels",AVERROR(ENOMEM));
   int got=p_av_image_copy_to_buffer(pixels,size,(const uint8_t *const*)frame->data,frame->linesize,frame->format,width,height,1);
   if(got!=size)fail("copy pixels",got);if(fwrite(pixels,1,(size_t)size,out)!=(size_t)size)fail("write pixels",AVERROR(EIO));free(pixels);
  }
  p_av_frame_unref(frame);
 }
 if(status!=AVERROR(EAGAIN)&&status!=AVERROR_EOF)fail("receive frame",status);return status;
}
int main(int argc,char **argv) {
 if(argc!=5){fprintf(stderr,"Usage: decode-probe LIBRARY FIXTURE audio|video OUTPUT\n");return 2;}
 void *library=dlopen(argv[1],RTLD_NOW|RTLD_LOCAL);if(!library){fprintf(stderr,"dlopen: %s\n",dlerror());return 1;}
 #define LOAD(name) p_##name=(__typeof__(&name))dlsym(library,#name);if(!p_##name){fprintf(stderr,"missing %s\n",#name);return 1;}
 FUNCTIONS(LOAD)
 if(p_avcodec_version()!=LIBAVCODEC_VERSION_INT)fail("source header/library version mismatch",AVERROR(EINVAL));
 int audio=!strcmp(argv[3],"audio");if(!audio&&strcmp(argv[3],"video"))return 2;
 FILE *in=fopen(argv[2],"rb"),*out=fopen(argv[4],"wb");if(!in||!out)fail("open local fixture/output",AVERROR(errno));
 AVFormatContext *format=p_avformat_alloc_context();uint8_t *buffer=p_av_malloc(32768);if(!format||!buffer)fail("allocate input",AVERROR(ENOMEM));
 AVIOContext *io=p_avio_alloc_context(buffer,32768,0,in,read_data,NULL,seek_data);if(!io)fail("allocate IO",AVERROR(ENOMEM));
 format->pb=io;format->flags|=AVFMT_FLAG_CUSTOM_IO;
 int status=p_avformat_open_input(&format,NULL,NULL,NULL);if(status<0)fail("open input",status);
 status=p_avformat_find_stream_info(format,NULL);if(status<0)fail("find stream",status);
 const AVCodec *codec=NULL;int stream=p_av_find_best_stream(format,audio?AVMEDIA_TYPE_AUDIO:AVMEDIA_TYPE_VIDEO,-1,-1,&codec,0);if(stream<0)fail("best stream",stream);
 AVCodecContext *ctx=p_avcodec_alloc_context3(codec);if(!ctx)fail("allocate decoder",AVERROR(ENOMEM));
 status=p_avcodec_parameters_to_context(ctx,format->streams[stream]->codecpar);if(status<0)fail("codec parameters",status);
 status=p_avcodec_open2(ctx,codec,NULL);if(status<0)fail("open decoder",status);
 AVPacket *packet=p_av_packet_alloc();AVFrame *frame=p_av_frame_alloc();if(!packet||!frame)fail("allocate frame",AVERROR(ENOMEM));
 while((status=p_av_read_frame(format,packet))>=0) {
  if(packet->stream_index==stream) {
   int sent=p_avcodec_send_packet(ctx,packet);
   if(sent==AVERROR(EAGAIN)){drain(ctx,frame,out,audio);sent=p_avcodec_send_packet(ctx,packet);}
   if(sent<0)fail("send packet",sent);drain(ctx,frame,out,audio);
  }
  p_av_packet_unref(packet);
 }
 if(status!=AVERROR_EOF)fail("read packet",status);
 status=p_avcodec_send_packet(ctx,NULL);if(status<0)fail("flush",status);if(drain(ctx,frame,out,audio)!=AVERROR_EOF)fail("decoder did not finish",AVERROR(EINVAL));
 if(frames<1)fail("no decoded frames",AVERROR(EINVAL));
 printf("{\"codec\":\"%s\",\"codecVersion\":%u,\"frames\":%d,\"samples\":%d,\"channels\":%d,\"sampleRate\":%d,\"width\":%d,\"height\":%d,\"sampleFormat\":%d}\n",codec->name,p_avcodec_version(),frames,samples,channels,rate,width,height,sampleFormat);
 p_av_packet_free(&packet);p_av_frame_free(&frame);p_avcodec_free_context(&ctx);p_avformat_close_input(&format);p_av_freep(&io->buffer);p_avio_context_free(&io);fclose(in);if(fclose(out))fail("close output",AVERROR(errno));dlclose(library);return 0;
}
