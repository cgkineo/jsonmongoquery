import { isArray } from '../../is.js'
import queryToPredicate from '../../predicates/queryToPredicate.js'

export default function $nor (queryPart, parentPath, path) {
  if (!isArray(queryPart)) throw new Error('$nor must specify an array')
  const orPredicates = queryPart.map(queryPart => queryToPredicate(queryPart, parentPath, path))
  return function (value, path, parent) {
    return !orPredicates.some(predicate => predicate(value, path, parent))
  }
}
