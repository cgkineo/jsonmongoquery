import { isArray } from '../../is.js'
import queryToPredicate from '../../predicates/queryToPredicate.js'

export default function $and (queryPart, parentPath, path) {
  if (!isArray(queryPart)) throw new Error('$and must specify an array')
  const andFunctions = queryPart.map(queryPart => queryToPredicate(queryPart, parentPath, path))
  return function $and (value, path, parent) {
    return andFunctions.every(predicate => predicate(value, path, parent))
  }
}
