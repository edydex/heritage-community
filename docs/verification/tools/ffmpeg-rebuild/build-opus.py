from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import hashlib,json,re,subprocess
root=Path(__file__).resolve().parent
source=root/'opus-source';gn=(source/'BUILD.gn').read_bytes()
assert hashlib.sha256(gn).hexdigest()=='152fdf2929b24444643c9bc91471ecd6b927792c63df8c770c9d3aa5cb0e1c62'
# This fixed Chromium recipe has a common + floating-point list, then x86 and ARM lists.
# Only its C sources in the single opus static_library target are selected for ARM64.
block=gn.decode().split('static_library("opus") {',1)[1].split('\nexecutable("opus_compare")',1)[0]
files=sorted(set(p for p in re.findall(r'"(src/[^"\n]+\.c)"',block) if '/x86/' not in p))
assert files and all((source/p).is_file() for p in files)
assert len(files)==len(set(files)) and all('..' not in Path(p).parts for p in files)
defines=['OPUS_BUILD','OPUS_EXPORT=','ENABLE_HARDENING','USE_ALLOCA','HAVE_ALLOCA_H','HAVE_LRINT','HAVE_LRINTF','CHROMIUM_NO_LOGGING','OPUS_ARM_MAY_HAVE_NEON','OPUS_ARM_MAY_HAVE_NEON_INTR','OPUS_ARM_PRESUME_NEON','OPUS_ARM_PRESUME_NEON_INTR','OPUS_ARM_PRESUME_AARCH64_NEON_INTR']
includes=['src/include','src','src/celt','src/silk','src/silk/fixed','src/silk/float']
flags=['-O2','-fPIC','-fvisibility=hidden','-arch','arm64','-mmacosx-version-min=12.0']+['-D'+x for x in defines]+['-I'+str(source/x) for x in includes]
out=root/'opus-build';out.mkdir(exist_ok=True)
def compile_one(rel):
 obj=out/(rel.replace('/','_')+'.o');cmd=['/usr/bin/clang',*flags,'-c',str(source/rel),'-o',str(obj)];run=subprocess.run(cmd,capture_output=True,text=True)
 if run.returncode:raise RuntimeError(rel+'\n'+run.stderr)
 return obj
with ThreadPoolExecutor(max_workers=8) as pool:objects=list(pool.map(compile_one,files))
subprocess.run(['/usr/bin/ar','rcs',str(out/'libopus.a'),*map(str,objects)],check=True)
(out/'build-inputs.json').write_text(json.dumps({'recipeSha256':hashlib.sha256(gn).hexdigest(),'sources':{p:hashlib.sha256((source/p).read_bytes()).hexdigest() for p in files},'flags':flags,'archiveSha256':hashlib.sha256((out/'libopus.a').read_bytes()).hexdigest()},indent=2)+'\n')
print('Built Chromium Opus ARM64 from '+str(len(files))+' C source files.')
