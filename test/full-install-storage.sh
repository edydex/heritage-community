#!/usr/bin/env bash
set -Eeuo pipefail
umask 077
[[ $(hostname) == heritage-install-rehearsal ]]
[[ $(cat /etc/heritage-rehearsal-vm) == disposable-installation-rehearsal-v1 ]]
operation=${1:?}
case "$operation" in seed|mutate|verify) ;; *) exit 2;; esac
source /etc/default/heritage-community
source "$HERITAGE_INSTALL_DIR/deploy/lib/common.sh"
heritage_init_context
heritage_init_docker

bytes='Synthetic private recording for complete restore.'
digest=$(printf '%s' "$bytes" | sha256sum | cut -d ' ' -f 1)
namespace=$(printf '%s' installation-rehearsal | sha256sum | cut -d ' ' -f 1)
key="objects/$namespace/sha256/${digest:0:2}/$digest"
size=${#bytes}
sql() {
  heritage_compose exec -T postgres sh -ec 'exec psql --username="$POSTGRES_USER" --dbname="$POSTGRES_DB" -At -v ON_ERROR_STOP=1'
}
if [[ $operation == seed ]]; then
  heritage_compose exec -T community node - "$key" "$bytes" <<'JS'
const fs=require('node:fs'),path=require('node:path');
const target=path.join('/app/private/sermon-media',process.argv[2]);
fs.mkdirSync(path.dirname(target),{recursive:true,mode:0o700});
fs.writeFileSync(target,process.argv[3],{flag:'wx',mode:0o600});
JS
  sql <<SQL
INSERT INTO public.syncshow_sermon_media_objects
(community_id,sha256,size_bytes,media_type,storage_key,verified_at)
SELECT id,'$digest',$size,'audio/mpeg','$key',now()
FROM public.communities WHERE slug='installation-rehearsal';
SQL
elif [[ $operation == mutate ]]; then
  heritage_compose exec -T community node -e 'require("node:assert/strict").equal(require("node:fs").existsSync("/app/media/restore-rehearsal.txt"), false, "The public upload bytes must be removed before restore.")'
  sql <<SQL
DELETE FROM public.syncshow_sermon_media_objects WHERE sha256='$digest';
SQL
  heritage_compose exec -T community node -e 'require("node:fs").unlinkSync("/app/private/sermon-media/"+process.argv[1])' "$key"
else
  observed=$(sql <<SQL
SELECT sha256 || ':' || size_bytes::text FROM public.syncshow_sermon_media_objects WHERE storage_key='$key';
SQL
)
  [[ $observed == "$digest:$size" ]]
  heritage_compose exec -T community node - "$key" "$digest" <<'JS'
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const data=fs.readFileSync('/app/private/sermon-media/'+process.argv[2]);
assert.equal(crypto.createHash('sha256').update(data).digest('hex'),process.argv[3]);
JS
fi

if [[ $operation != seed ]]; then
  heritage_compose exec -T translation-processor sh -c 'cat > /tmp/restore-baseline.json' < /root/rehearsal-archive-baseline.json
fi
heritage_compose exec -T translation-processor node --input-type=module - "$operation" <<'JS'
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const operation=process.argv[2];
assert.equal(process.env.OPENAI_API_KEY,'');
assert.equal(process.env.OPENAI_QUALITY_TEXT_API_KEY,'');
assert.equal(process.env.OPENAI_ECONOMY_TEXT_API_KEY,'');
const headers={authorization:`Bearer ${process.env.PROCESSOR_CONTROL_TOKEN}`,'content-type':'application/json'};
async function request(path,method='GET',data) {
  const response=await fetch('http://127.0.0.1:4310'+path,{method,headers,...(data?{body:JSON.stringify(data)}:{})});
  assert.ok(response.ok,`${method} ${path}: ${response.status}`); return response;
}
const post=async (path,data)=> (await request(path,'POST',data)).json();
const fs=await import('node:fs/promises');
// The shell copies this baseline to the guest root, outside restored volumes.
const baselinePath='/tmp/restore-baseline.json';
if(operation==='seed') {
  const session={sourceLanguage:'en', targets:['en','ru'].map(language=>({id:'channel-'+language,targetLanguage:language,
    translationProvider:'deterministic',voiceMode:language==='en'?'source':'natural',fallbackOrder:['mute'],muted:false,speechEnabled:false})),
    processingNode:{id:'rehearsal',name:'Synthetic rehearsal',mode:'embedded',endpoint:'http://127.0.0.1:4310',identityFingerprint:'synthetic-rehearsal-identity'},
    archivePolicy:{retentionDays:1,retainIndefinitely:false,recordSource:false,recordTranslations:false},expectedDurationMinutes:5,budgetWarningUsd:20};
  await post('/api/sessions',session); await post('/api/sessions/current/start',{});
  await post('/api/sessions/current/replay',{segments:[{text:'Grace to you and peace from God our Father.',sequence:0,sourceStartMs:0,sourceEndMs:4000,final:true}]});
  const stopped=await post('/api/sessions/current/stop',{});
  assert.equal(stopped.archive.audioTracks.length,0);
  const records={sessionId:stopped.archive.sessionId,transcripts:{}};
  for(const language of ['en','ru']) {
    const response=await request(`/api/archives/${records.sessionId}/transcripts/channel-${language}`);
    const text=await response.text(); assert.ok(text.trim().length>0);
    records.transcripts[language]=createHash('sha256').update(text).digest('hex');
  }
  await fs.writeFile(baselinePath,JSON.stringify(records));
  console.log('PASS: synthetic EN/RU archive created with no provider credentials or speech generation.');
} else {
  const baseline=JSON.parse(await fs.readFile(baselinePath,'utf8'));
  if(operation==='mutate') {
    await request(`/api/archives/${baseline.sessionId}`,'DELETE');
    assert.equal((await (await request('/api/archives')).json()).length,0);
  } else {
    const archives=await (await request('/api/archives')).json();
    assert.ok(archives.some(archive=>archive.sessionId===baseline.sessionId));
    for(const [language,digest] of Object.entries(baseline.transcripts)) {
      const text=await (await request(`/api/archives/${baseline.sessionId}/transcripts/channel-${language}`)).text();
      assert.equal(createHash('sha256').update(text).digest('hex'),digest);
    }
  }
}
JS
if [[ $operation == seed ]]; then
  heritage_compose exec -T translation-processor cat /tmp/restore-baseline.json > /root/rehearsal-archive-baseline.json
fi
printf 'PASS: private managed recording and translation archive %s.\n' "$operation"
