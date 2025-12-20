export function parseFnJson<V>(str: string): V | null {
  try {
    return JSON.parse(str, (k, v) => {
      if (
        typeof v === 'string' &&
        v.indexOf &&
        (v.indexOf('function') > -1 || v.indexOf('=>') > -1)
      ) {
        const Fun = Function
        return new Fun(`return (function(){return ${v}})()`)()
      }
      return v
    })
  } catch (e) {
    console.warn('Failed to load state:', e)
    return null
  }
}
