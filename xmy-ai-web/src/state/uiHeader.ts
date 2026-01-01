import { loadState, saveState } from '@/utils/storage-persistor'
import { reactive } from 'vue'
import { unwrap, type CheckResult } from './types'
import { confirmError } from '@/utils/error'
import { i18n } from './i18n'

const UiHeaderStorageKey = 'lambs_ini_ui_header'

export type Position = 'top' | 'left'
export type Size = 'small' | 'middle' | 'big'
export type IniUiHeader = {
  position: Position
  size: Size
}
const storage = loadState<IniUiHeader>(UiHeaderStorageKey)
export const ini_ui_header: IniUiHeader = reactive(
  unwrap(typeCheck(storage)) || {
    position: 'top',
    size: 'big',
  },
)

export function switchHeaderPosition(pos: Position) {
  ini_ui_header.position = pos

  saveState(UiHeaderStorageKey, ini_ui_header)
}

export function switchHeaderSize(size: Size) {
  ini_ui_header.size = size

  saveState(UiHeaderStorageKey, ini_ui_header)
}

function typeCheck(header: IniUiHeader | null): CheckResult<IniUiHeader | null> {
  if (!header) {
    return { data: null }
  }
  if (!['top', 'left'].includes(header.position)) {
    return {
      error: i18n.global.t('typecheck.ui-header-position'),
    }
  }
  if (!['big', 'middle', 'small'].includes(header.size)) {
    return {
      error: i18n.global.t('typecheck.ui-header-size'),
    }
  }
  return {
    data: header,
  }
}

export function replaceHeader(data: IniUiHeader) {
  const checked = typeCheck(data)
  if (checked.error) {
    throw confirmError(checked.error)
  }
  ini_ui_header.position = data.position

  saveState(UiHeaderStorageKey, ini_ui_header)
}
