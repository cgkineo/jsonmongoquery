import { isArray } from '../../is.js'
import { pathHas } from '../../paths.js'
import isEqualOrIsEmbeddedEqual from './isEqualOrIsEmbeddedEqual.js'

export default function $in (queryPart) {
  if (!isArray(queryPart)) throw new Error('$in must specify an array')
  const predicates = queryPart.map(queryPart => isEqualOrIsEmbeddedEqual(queryPart))
  return function (value, path, parent, context) {
    if (!pathHas(parent, path)) return false
    return predicates.some(predicate => predicate(value, path, parent, context))
  }
}
