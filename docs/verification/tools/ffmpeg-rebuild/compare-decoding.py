from pathlib import Path
import json,hashlib,struct,math
r=Path(__file__).resolve().parent;result={}
for media in ['audio','video','opus']:
 a=json.loads((r/f'original-{media}.json').read_text());b=json.loads((r/f'rebuilt-{media}.json').read_text());left=(r/f'original-{media}.raw').read_bytes();right=(r/f'rebuilt-{media}.raw').read_bytes();assert a==b,(media,a,b);assert len(left)==len(right)>0
 data={'original':a,'rebuilt':b,'rawBytes':len(left),'originalSha256':hashlib.sha256(left).hexdigest(),'rebuiltSha256':hashlib.sha256(right).hexdigest(),'identicalBytes':left==right}
 if media!='video':
  # AV_SAMPLE_FMT_S16=1, FLT=3 and FLTP=8 in the retained public source headers.
  fmt=a['sampleFormat'];assert fmt in [1,3,8],fmt;kind='h' if fmt==1 else 'f';unit=2 if fmt==1 else 4;scale=32768.0 if fmt==1 else 1.0
  aa=[x[0]/scale for x in struct.iter_unpack('<'+kind,left)];bb=[x[0]/scale for x in struct.iter_unpack('<'+kind,right)];assert all(math.isfinite(v) for v in aa+bb)
  assert len(aa)==a['samples']*a['channels'];data['originalRms']=math.sqrt(sum(x*x for x in aa)/len(aa));data['rebuiltRms']=math.sqrt(sum(x*x for x in bb)/len(bb));data['maximumAbsoluteSampleDifference']=max(abs(x-y) for x,y in zip(aa,bb));data['differentSampleCount']=sum(x!=y for x,y in zip(aa,bb))
  assert data['originalRms']>0.01 and data['rebuiltRms']>0.01
 else:
  size=len(left)//a['frames'];data['uniqueOriginalFrames']=len({hashlib.sha256(left[i:i+size]).digest() for i in range(0,len(left),size)});data['uniqueRebuiltFrames']=len({hashlib.sha256(right[i:i+size]).digest() for i in range(0,len(right),size)});assert data['uniqueRebuiltFrames']==45
 result[media]=data
(r/'rebuild-decoding-results.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
