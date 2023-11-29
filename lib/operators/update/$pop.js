import { isArray } from '../../is.js'
import {
  pathParse,
  pathCreate
} from '../../paths.js'

const ENDS = {
  FIRST: -1,
  LAST: 1
}

export default function $pop (queryPart) {
  const entries = Object.entries(queryPart).map(([path, end]) => {
    if (end !== ENDS.FIRST && end !== ENDS.LAST) {
      throw new Error('$pop has invalid value')
    }
    return [pathParse(path), end]
  })
  return function (values) {
    entries.forEach(([keys, end]) => pathCreate(values, keys, (oldValue, key, parent) => {
      const value = parent[key]
      if (!isArray(value)) return
      if (end === ENDS.FIRST) {
        value.shift()
        return
      }
      value.pop()
    }))
    return true
  }
}
