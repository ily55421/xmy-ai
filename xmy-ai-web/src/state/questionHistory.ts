import { loadState, saveState } from '@/utils/storage-persistor'
import { ref } from 'vue'
import { unwrap, type CheckResult } from './types'
import { i18n } from './i18n'

const QuestionHistoryKey = 'lambs_ini_questionHistory'

export type QuestionHistory = string[]
const storage = loadState<QuestionHistory>(QuestionHistoryKey)
export const questionHistory = ref<QuestionHistory>(unwrap(typeCheck(storage)) || [])

export function appendQuestion(question: string) {
  let h = loadState<QuestionHistory>(QuestionHistoryKey) || []
  h = h[0] === question ? h : [question, ...h]
  if (h.length > 100) {
    h = h.slice(0, 100)
  }
  questionHistory.value = h
  saveState(QuestionHistoryKey, h)
}

function typeCheck(data: QuestionHistory | null): CheckResult<QuestionHistory | null> {
  if (!data) {
    return { data: null }
  }
  if (!(data instanceof Array)) {
    return { error: i18n.global.t('typecheck.questionHistory') }
  }
  return {
    data,
  }
}
