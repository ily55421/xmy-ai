import { confirmError } from '@/utils/error'
import { i18n } from './i18n'

export interface CheckResult<T> {
  data?: T
  error?: string
}

export function unwrap<T>(res: CheckResult<T>): T | null | undefined {
  if (res.error) {
    confirmError(i18n.global.t('messages.load-storage-error', { error: res.error + '' }))
    return null
  }
  return res.data
}
