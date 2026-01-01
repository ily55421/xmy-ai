import { loadStateMulti, saveStateMulti } from '@/utils/storage-persistor'
import { reactive } from 'vue'
import { unwrap, type CheckResult } from './types'
import { confirmError } from '@/utils/error'
import { i18n } from './i18n'

const StoragePrefix = 'lambs_ini_ui_playgrounds'
export const getUiPlaygroundStorageKey = (key: string) => `lambs_ini_ui_playgrounds$${key}`

export type QuestionOptions = {
  all: boolean
  network: boolean
  deep: boolean
  translate: boolean
}
export type Playground = {
  questionOptions: QuestionOptions
  pages: string[]
  prefixs: Record<string, string>
  times: number
}
const storage = loadStateMulti<Playground>(StoragePrefix)
export const ini_ui_playgrounds: Record<string, Playground> = reactive(
  unwrap(typeCheck(storage)) || {},
)

function typeCheck(
  playgrounds: Record<string, Playground> | null,
): CheckResult<Record<string, Playground> | null> {
  if (!playgrounds) {
    return { data: null }
  }
  for (const [, playground] of Object.entries(playgrounds)) {
    if (!playground.pages || !(playground.pages instanceof Array)) {
      return { error: i18n.global.t('typecheck.ui-playgrounds-pages') }
    }
    if (!playground.prefixs) {
      return { error: i18n.global.t('typecheck.ui-playgrounds-prefixs') }
    }
    if (!playground.questionOptions) {
      return { error: i18n.global.t('typecheck.ui-playgrounds-questionOptions') }
    }
    if (typeof playground.times !== 'number') {
      return { error: i18n.global.t('typecheck.ui-playgrounds-times') }
    }
  }
  return {
    data: playgrounds,
  }
}

export function replacePlaygrounds(data: Record<string, Playground>) {
  const checked = typeCheck(data)
  if (checked.error) {
    throw confirmError(checked.error)
  }
  for (const key of Object.keys(ini_ui_playgrounds)) {
    delete ini_ui_playgrounds[key]
  }
  for (const [key, value] of Object.entries(data)) {
    ini_ui_playgrounds[key] = value
  }

  saveStateMulti(StoragePrefix, ini_ui_playgrounds)
}
