import { isArray } from '../../is.js'
import { pathHas } from '../../paths.js'
import isEqualOrIsEmbeddedEqual from './isEqualOrIsEmbeddedEqual.js'

export default function $nin (queryPart) {
  if (!isArray(queryPart)) throw new Error('$nin must specify an array')
  const predicates = queryPart.map(queryPart => isEqualOrIsEmbeddedEqual(queryPart, { isRegExpAsValue: false }))
  return function (value, path, parent, context) {
    // https://www.mongodb.com/docs/manual/reference/operator/query/nin/#-nin
    if (!pathHas(parent, path)) return true
    return !predicates.some(predicate => predicate(value, path, parent, context))
  }
}
