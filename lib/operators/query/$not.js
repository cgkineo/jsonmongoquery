import { isDocument } from '../../is.js'
import queryToPredicate from '../../predicates/queryToPredicate.js'

export default function $not (queryPart, parentPath) {
  if (!isDocument(queryPart)) throw new Error('$not must specify an object')
  const predicate = queryToPredicate(queryPart, parentPath)
  return function (value, path, parent) {
    return !predicate(value, path, parent)
  }
}
