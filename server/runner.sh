#!/usr/bin/env bash
set -Eeuo pipefail
umask 077
HERE="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
# This file is generated from the validated manifest by the local CLI, with hex-only values.
source "$HERE/pins.env"
operation=${1:-plan}
shift || true
deployment_root=/opt/heritage-community
yes=0
non_interactive=0
dry_run=0
backup_path=''
unset HERITAGE_OPS_LOCK_HELD
fail() { printf '\nHeritage: %s\n' "$*" >&2; exit 1; }
while (($#)); do
  case "$1" in
    --deployment-root) deployment_root="${2:?Missing deployment root}"; shift 2;;
    --backup) backup_path="${2:?Missing backup directory}"; shift 2;;
    --yes) yes=1; shift;;
    --non-interactive) non_interactive=1; shift;;
    --dry-run) dry_run=1; shift;;
    *) fail "Unknown option: $1";;
  esac
done
case "$operation" in plan|setup|update|status|backup|restore) ;; *) fail 'Unknown operation.';; esac
for revision in "$UNIFIED_HERITAGE_REVISION" "$UNIFIED_MULTILINGUUM_REVISION" "$UNIFIED_SYNCSHOW_REVISION"; do
  [[ "$revision" =~ ^[a-f0-9]{40}$ ]] || fail 'Invalid component revision.'
done
[[ "$UNIFIED_SET_DIGEST" =~ ^[a-f0-9]{64}$ ]] || fail 'Invalid version-set digest.'
[[ "$deployment_root" =~ ^/[A-Za-z0-9._/-]+$ && "$deployment_root" != *'//'* && "$deployment_root" != *'/../'* && "$deployment_root" != */.. && "$deployment_root" != *'/./'* && "$deployment_root" != */. ]] || fail 'Unsafe deployment root.'
deployment_root="${deployment_root%/}"
case "$deployment_root" in ''|/|/bin|/sbin|/usr|/etc|/var|/opt|/srv|/home|/root|/tmp|/var/tmp|/var/lib) fail 'Choose a dedicated installation directory.';; esac
[[ "$(realpath -m -- "$deployment_root")" == "$deployment_root" ]] || fail 'The deployment root must not traverse symlinks.'
app="$deployment_root/app"
server="$app/community-server"
translation="$deployment_root/components/multilinguum-$UNIFIED_MULTILINGUUM_REVISION"
read_default() { [[ ! -f /etc/default/heritage-community ]] || awk -F= -v key="$1" '$1 == key { sub(/^[^=]*=/, ""); print; exit }' /etc/default/heritage-community; }
default_install="$(read_default HERITAGE_INSTALL_DIR)"
export HERITAGE_INSTALL_DIR="$server"
export HERITAGE_ENV_FILE="$deployment_root/config/community.env"
export HERITAGE_BACKUP_DIR="$deployment_root/backups"
if [[ "$default_install" == "$server" ]]; then
  HERITAGE_ENV_FILE="$(read_default HERITAGE_ENV_FILE)"
  HERITAGE_BACKUP_DIR="$(read_default HERITAGE_BACKUP_DIR)"
fi
[[ "$HERITAGE_ENV_FILE" == /* && "$HERITAGE_BACKUP_DIR" == /* ]] || fail 'Installed configuration paths are invalid.'

inspect_checkout() {
  local path="$1" repository="$2" expected="${3:-}"
  [[ -d "$path" && ! -L "$path" && "$(git -C "$path" rev-parse --show-toplevel)" == "$path" ]] || fail "Expected a separate checkout: $path"
  [[ "$(git -C "$path" remote get-url origin)" == "$repository" ]] || fail "Unexpected repository at $path; it was preserved."
  [[ -z "$(git -C "$path" status --porcelain)" ]] || fail "Local changes at $path were preserved. Commit or preserve them before updating."
  [[ -z "$expected" || "$(git -C "$path" rev-parse HEAD)" == "$expected" ]] || fail "Source at $path differs from the selected version set."
}
community_repo=https://github.com/edydex/heritage_study_bible.git
translation_repo=https://github.com/edydex/multilinguum.git
existing=0
configured=0
if [[ -e "$app" || -L "$app" ]]; then
  inspect_checkout "$app" "$community_repo"
  existing=1
fi
if [[ -e "$translation" || -L "$translation" ]]; then
  inspect_checkout "$translation" "$translation_repo" "$UNIFIED_MULTILINGUUM_REVISION"
fi
printf '\nSelected Community: %s\nSelected translation: %s\n' "$UNIFIED_HERITAGE_REVISION" "$UNIFIED_MULTILINGUUM_REVISION"
if (( existing )); then
  printf 'Installed Community: %s\n' "$(git -C "$app" rev-parse HEAD)"
  [[ -f "$server/deploy/lib/common.sh" ]] || fail 'Installed Community has no supported lifecycle tools.'
  source "$server/deploy/lib/common.sh"
  if [[ -f "$HERITAGE_ENV_FILE" ]]; then
    configured=1
    heritage_init_context
    printf 'Installed translation: %s\n' "$(heritage_config_value HERITAGE_TRANSLATION_REVISION not-installed)"
  else
    printf 'Community source exists; guided installation has not completed.\n'
  fi
fi
if [[ "$operation" == plan ]] || (( dry_run )); then
  printf '\nNo installation or service changes will be made.\n'
  case "$operation" in
    backup) printf 'Would run the existing combined, quiesced backup including translation.\n';;
    restore) printf 'Would verify and restore %s, first making a safety backup.\n' "$backup_path";;
    *)
      if (( configured )); then
        printf 'Existing-server phases: preserve configuration -> operations lock -> safety backup -> exact source fast-forward -> pinned translation setup -> build/migrate -> local/public checks -> version receipt.\n'
      else
        printf 'New-server phases: install Git/CA certificates if needed -> fetch exact sources -> guided Community setup -> pinned translation setup -> local/public checks -> version receipt.\n'
        printf 'The guided installer configures Docker, church/admin settings, optional email/tunnel, and scheduled backups.\n'
      fi
      printf 'Audio is optional. No GPU worker or desktop app is installed on the server.\n';;
  esac
  if [[ -n "$default_install" && "$default_install" != "$server" ]]; then
    printf 'Application setup is blocked: this host already manages %s. Select that deployment root.\n' "$default_install"
  fi
  exit 0
fi

[[ $EUID == 0 ]] || fail 'Use a root SSH account for server operations.'
[[ -r /etc/os-release ]] || fail 'Debian 12 or 13 is required.'
source /etc/os-release
[[ "$ID" == debian ]] || fail 'Debian 12 or 13 is required.'
case "$VERSION_ID" in 12|13|12.*|13.*) ;; *) fail 'Debian 12 or 13 is required.';; esac
[[ -z "$default_install" || "$default_install" == "$server" ]] || fail "This host already manages $default_install. Select that deployment root."
if [[ "$operation" != setup ]] && (( ! configured )); then fail 'No configured server was found. Run server setup first.'; fi

require_selected_set() {
  inspect_checkout "$app" "$community_repo" "$UNIFIED_HERITAGE_REVISION"
  [[ "$(heritage_config_value HERITAGE_TRANSLATION_REVISION)" == "$UNIFIED_MULTILINGUUM_REVISION" ]] || fail 'The installed translation revision differs from this workspace. Use the matching version set or run server update.'
  heritage_validate_translation_source
}
operator="$server/deploy/heritage-community"
if [[ "$operation" == status || "$operation" == backup || "$operation" == restore ]]; then
  require_selected_set
  case "$operation" in
    status) bash "$operator" status --verify-backup;;
    backup) bash "$operator" backup --quiesce --label unified-manual;;
    restore)
      [[ "$backup_path" == /* && -d "$backup_path" ]] || fail 'Choose an existing absolute backup directory.'
      restore_args=()
      (( ! yes )) || restore_args+=(--yes)
      bash "$operator" restore "${restore_args[@]}" -- "$backup_path";;
  esac
  exit 0
fi

staging=''
cleanup() {
  local result=$?
  [[ -z "$staging" ]] || rm -rf -- "$staging"
  if (( result != 0 )); then
    printf '\nUnified setup stopped. Existing data and prior backups are retained. Inspect heritage-community status and retry the same selected set after resolving the reported error.\n' >&2
  fi
  exit "$result"
}
trap cleanup EXIT

fetch_checkout() {
  local destination="$1" repository="$2" revision="$3"
  if [[ -e "$destination" ]]; then inspect_checkout "$destination" "$repository" "$revision"; return; fi
  mkdir -p -- "$(dirname -- "$destination")"
  staging="$(mktemp -d "$(dirname -- "$destination")/.unified-source.XXXXXXXX")"
  git init --quiet "$staging"
  git -C "$staging" remote add origin "$repository"
  git -C "$staging" fetch --depth=1 origin "$revision"
  git -C "$staging" checkout --quiet --detach "$revision"
  inspect_checkout "$staging" "$repository" "$revision"
  mv -- "$staging" "$destination"
  staging=''
}

if (( ! configured )); then
  command -v git >/dev/null || { apt-get update; apt-get install -y ca-certificates git; }
  fetch_checkout "$app" "$community_repo" "$UNIFIED_HERITAGE_REVISION"
  fetch_checkout "$translation" "$translation_repo" "$UNIFIED_MULTILINGUUM_REVISION"
  source "$server/deploy/lib/common.sh"
  heritage_acquire_operations_lock
  setup_args=(--deployment-root "$deployment_root")
  (( ! yes )) || setup_args+=(--yes)
  (( ! non_interactive )) || setup_args+=(--non-interactive)
  bash "$server/deploy/install.sh" "${setup_args[@]}"
  heritage_init_context
else
  heritage_acquire_operations_lock
  git -C "$app" fetch origin "$UNIFIED_HERITAGE_REVISION"
  git -C "$app" merge-base --is-ancestor HEAD "$UNIFIED_HERITAGE_REVISION" || fail 'The selected Community revision is not a fast-forward. No source was changed; choose a compatible set.'
  fetch_checkout "$translation" "$translation_repo" "$UNIFIED_MULTILINGUUM_REVISION"
  bash "$operator" backup --quiesce --label pre-unified-update </dev/null
  git -C "$app" merge --ff-only "$UNIFIED_HERITAGE_REVISION"
fi
translation_args=(configure --source "$translation" --revision "$UNIFIED_MULTILINGUUM_REVISION")
if [[ "$operation" == update ]]; then
  translation_args+=(--non-interactive --yes)
else
  (( ! yes )) || translation_args+=(--yes)
  (( ! non_interactive )) || translation_args+=(--non-interactive)
fi
bash "$operator" translation "${translation_args[@]}"
require_selected_set
bash "$operator" status --verify-backup </dev/null

# Record only after the actual lifecycle commands and current-source checks pass.
receipt_dir="$deployment_root/unified/sets/$UNIFIED_SET_DIGEST"
[[ ! -L "$deployment_root/unified" && ! -L "$deployment_root/unified/sets" && ! -L "$receipt_dir" ]] || fail 'Version-record directories must not be symlinks.'
mkdir -p -- "$receipt_dir"
for file in runner.sh pins.env components.lock.json; do
  if [[ -e "$receipt_dir/$file" ]]; then
    cmp -s "$HERE/$file" "$receipt_dir/$file" || fail 'An existing version record differs; it was preserved.'
  else cp -- "$HERE/$file" "$receipt_dir/$file"; fi
done
record="$(mktemp "$deployment_root/state/.unified-installation.XXXXXXXX")"
jq -n --arg installedAt "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" --arg digest "$UNIFIED_SET_DIGEST" --slurpfile manifest "$HERE/components.lock.json" \
  '{schemaVersion:1,installedAt:$installedAt,setDigest:$digest,manifest:$manifest[0],acceptance:"source-and-service-health; provider and device rehearsal remains separate"}' >"$record"
chmod 0600 "$record"
mv -f -- "$record" "$deployment_root/state/unified-installation.json"
printf '\nUnified server setup verified. Version record: %s/state/unified-installation.json\n' "$deployment_root"
