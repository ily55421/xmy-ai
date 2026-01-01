import { loadState, saveState } from '@/utils/storage-persistor'
import { reactive, ref, watch } from 'vue'
import { unwrap, type CheckResult } from './types'
import { confirmError, tipError } from '@/utils/error'
import { i18n } from './i18n'

const StorageKey = 'lambs_ini_ui_workspace'

export type Workspace = {
  key: string
  title: string
  actived?: boolean
}
const storage = loadState<Workspace[]>(StorageKey)
export const ini_ui_workspace: Workspace[] = reactive(
  unwrap(typeCheck(storage)) || [
    {
      key: 'default',
      title: 'Default',
      actived: true,
    },
  ],
)

export const currentWorkspace = ref<Workspace>(ini_ui_workspace[0]!)
watch(
  () => ini_ui_workspace,
  () => {
    const ls = ini_ui_workspace.find((it) => it.actived) || ini_ui_workspace[0]
    if (!ls) {
      throw tipError('Activated workspace was not found')
    }
    if (currentWorkspace.value != ls) {
      currentWorkspace.value = ls
    }
  },
  { deep: true, immediate: true },
)

export function switchLayout(key: string) {
  for (const ls of ini_ui_workspace) {
    ls.actived = false
  }
  const ls = ini_ui_workspace.find((it) => it.key === key)
  if (ls) {
    ls.actived = true
  }
  saveState(StorageKey, ini_ui_workspace)
}

function typeCheck(workspace: Workspace[] | null): CheckResult<Workspace[] | null> {
  if (!workspace) {
    return { data: null }
  }
  if (!(workspace instanceof Array)) {
    return { error: i18n.global.t('typecheck.ui-workspace') }
  }
  let actived = false
  const keys = new Set()
  for (const ls of workspace) {
    if (!ls.key) {
      return { error: i18n.global.t('typecheck.ui-workspace-key-required') }
    }
    if (!ls.title) {
      return { error: i18n.global.t('typecheck.ui-workspace-title') }
    }
    if (keys.has(ls.key)) {
      return { error: i18n.global.t('typecheck.ui-workspace-key-unique') }
    }
    keys.add(ls.key)
    if (ls.actived) {
      if (!actived) {
        actived = true
      } else {
        return { error: i18n.global.t('typecheck.ui-workspace-actived-unique') }
      }
    }
  }
  if (!actived) {
    return { error: i18n.global.t('typecheck.ui-workspace-actived-required') }
  }
  return {
    data: workspace,
  }
}

export function replaceLayoutSwitching(data: Workspace[]) {
  const checked = typeCheck(data)
  if (checked.error) {
    throw confirmError(checked.error)
  }
  ini_ui_workspace.length = 0
  ini_ui_workspace.push(...data)

  saveState(StorageKey, ini_ui_workspace)
}
