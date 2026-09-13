#!/usr/bin/env bash
# Runs the unmodified installers in a new Debian VM, never on a church host.
set -Eeuo pipefail
umask 077
[[ ${GITHUB_ACTIONS:-} == true && ${RUNNER_OS:-} == Linux && -c /dev/kvm ]]
root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)
work=$(mktemp -d "${RUNNER_TEMP:?}/heritage-vm.XXXXXXXX")
results="$root/test-results/fresh-install"
mkdir -p "$results"
vm_pid=''; tunnel_pid=''
cleanup() {
  code=$?
  trap - EXIT
  [[ -z $tunnel_pid ]] || kill "$tunnel_pid" 2>/dev/null || true
  if [[ -n $vm_pid ]]; then
    kill "$vm_pid" 2>/dev/null || true
    wait "$vm_pid" 2>/dev/null || true
  fi
  rm -rf -- "$work"
  exit "$code"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

printf 'Downloading and verifying the official Debian 13 cloud image.\n'
image=debian-13-genericcloud-amd64.qcow2
base=https://cloud.debian.org/images/cloud/trixie/latest
curl --fail --location --retry 3 --max-time 90 "$base/SHA512SUMS" -o "$work/SHA512SUMS"
curl --fail --location --retry 3 --max-time 240 "$base/$image" -o "$work/$image"
awk -v file="$image" '$2 == file { print }' "$work/SHA512SUMS" > "$work/image.checksum"
[[ $(wc -l < "$work/image.checksum") -eq 1 ]]
(cd "$work" && sha512sum --check image.checksum)
cp "$work/image.checksum" "$results/debian-image.sha512"
qemu-img resize "$work/$image" 40G
ssh-keygen -q -t ed25519 -N '' -f "$work/client-key"
ssh-keygen -q -t ed25519 -N '' -f "$work/host-key"
python3 - "$work" <<'PY'
import json,sys
from pathlib import Path
p=Path(sys.argv[1])
answers='''HERITAGE_COMMUNITY_NAME="Installation rehearsal"
HERITAGE_COMMUNITY_ID=installation-rehearsal
HERITAGE_COMMUNITY_TIME_ZONE=UTC
HERITAGE_APP_URL=http://127.0.0.1:3000
HERITAGE_APP_ORIGINS=http://127.0.0.1:3000
HERITAGE_ADMIN_NAME="Restore baseline administrator"
HERITAGE_ADMIN_EMAIL=admin@rehearsal.invalid
HERITAGE_ADMIN_PASSWORD=Only-for-disposable-install-rehearsal-2026
HERITAGE_COMMUNITY_AUTH_ENABLED=false
HERITAGE_TUNNEL_MODE=none
HERITAGE_LOCAL_PORT=3000
HERITAGE_DISABLE_SLEEP=false
HERITAGE_BACKUP_SCHEDULE="*-*-* 02:30:00"
'''
config={'hostname':'heritage-install-rehearsal','manage_etc_hosts':True,
 'disable_root':False,'ssh_pwauth':False,'ssh_deletekeys':False,
 'users':[{'name':'root','lock_passwd':True,'ssh_authorized_keys':[(p/'client-key.pub').read_text().strip()]}],
 'ssh_authorized_keys':[(p/'client-key.pub').read_text().strip()],
 'write_files':[
  {'path':'/etc/ssh/ssh_host_ed25519_key','permissions':'0600','content':(p/'host-key').read_text()},
  {'path':'/etc/ssh/ssh_host_ed25519_key.pub','permissions':'0644','content':(p/'host-key.pub').read_text()},
  {'path':'/etc/environment','permissions':'0600','content':answers},
  {'path':'/etc/heritage-rehearsal-vm','permissions':'0600','content':'disposable-installation-rehearsal-v1\n'}],
 'runcmd':[['systemctl','restart','ssh']]}
(p/'user-data').write_text('#cloud-config\n'+json.dumps(config))
(p/'meta-data').write_text('instance-id: heritage-install-rehearsal\nlocal-hostname: heritage-install-rehearsal\n')
PY
cloud-localds "$work/seed.img" "$work/user-data" "$work/meta-data"
mkdir -p "$HOME/.ssh"
chmod 0700 "$HOME/.ssh"
printf '[127.0.0.1]:22222 %s\n' "$(cat "$work/host-key.pub")" > "$work/known_hosts"
cat >> "$HOME/.ssh/config" <<EOF

Host heritage-install-rehearsal
  HostName 127.0.0.1
  Port 22222
  User root
  IdentityFile $work/client-key
  IdentitiesOnly yes
  UserKnownHostsFile $work/known_hosts
  StrictHostKeyChecking yes
  BatchMode yes
  ConnectTimeout 5
EOF
qemu-system-x86_64 -accel kvm -cpu host -smp 2 -m 5120 \
  -drive "file=$work/$image,if=virtio,format=qcow2" \
  -drive "file=$work/seed.img,if=virtio,format=raw" \
  -device virtio-rng-pci -netdev user,id=net0,hostfwd=tcp:127.0.0.1:22222-:22 \
  -device virtio-net-pci,netdev=net0 -display none -monitor none \
  -serial "file:$results/vm-boot.log" > "$results/qemu.log" 2>&1 &
vm_pid=$!
ready=0
for attempt in $(seq 1 90); do
  kill -0 "$vm_pid"
  if ssh heritage-install-rehearsal 'test "$(hostname)" = heritage-install-rehearsal && test "$(id -u)" = 0 && test "$(cat /etc/heritage-rehearsal-vm)" = disposable-installation-rehearsal-v1' 2>/dev/null; then ready=1; break; fi
  sleep 2
done
[[ $ready == 1 ]]
ssh heritage-install-rehearsal 'cloud-init status --wait; test "$HERITAGE_COMMUNITY_ID" = installation-rehearsal; test ! -e /etc/default/heritage-community; test ! -d /opt/heritage-community'
ssh -N -L 127.0.0.1:3000:127.0.0.1:3000 heritage-install-rehearsal > "$results/ssh-tunnel.log" 2>&1 &
tunnel_pid=$!

cd "$root"
printf 'Running fresh setup through the unified SSH command.\n'
node bin/heritage.mjs server setup --host heritage-install-rehearsal --non-interactive --yes > "$results/install.log" 2>&1
node bin/heritage.mjs doctor http://127.0.0.1:3000 > "$results/discovery.log"
node test/full-install-api.mjs seed "$results"
scp test/full-install-storage.sh heritage-install-rehearsal:/root/rehearsal-storage.sh
ssh heritage-install-rehearsal 'bash /root/rehearsal-storage.sh seed' > "$results/storage-seed.log" 2>&1

printf 'Backing up the populated database, media and translation archive.\n'
node bin/heritage.mjs server backup --host heritage-install-rehearsal > "$results/backup.log" 2>&1
backup=$(ssh heritage-install-rehearsal 'readlink -f /opt/heritage-community/backups/latest')
[[ $backup == /opt/heritage-community/backups/backup-* ]]
node test/full-install-api.mjs mutate "$results"
ssh heritage-install-rehearsal 'bash /root/rehearsal-storage.sh mutate' > "$results/storage-mutate.log" 2>&1

printf 'Restoring the full backup through the unified SSH command.\n'
node bin/heritage.mjs server restore --host heritage-install-rehearsal --backup "$backup" --non-interactive --yes > "$results/restore.log" 2>&1
node test/full-install-api.mjs verify "$results"
ssh heritage-install-rehearsal 'bash /root/rehearsal-storage.sh verify' > "$results/storage-verify.log" 2>&1
node bin/heritage.mjs server status --host heritage-install-rehearsal > "$results/status.log" 2>&1
ssh heritage-install-rehearsal 'cat /opt/heritage-community/state/unified-installation.json' > "$results/installation.json"
node --input-type=module - "$results" <<'JS'
import {readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
const root=process.argv[2];
const manifest=JSON.parse(readFileSync('components.lock.json'));
writeFileSync(join(root,'result.json'),JSON.stringify({passed:true,completedAt:new Date().toISOString(),manifest,
 freshDebianInstall:true,combinedRestore:true,checks:['administrator database row','public media bytes','managed private object row and bytes','English and Russian translation archive','service health'],
 providerRequests:0,emailDelivery:false,publicTunnel:false},null,2)+'\n');
JS
printf 'PASS: fresh Debian installation and full combined restore.\n'
