import { isArray, isDocument } from '../../is.js'
import { pathsJoin } from '../../paths.js'
import queryToPredicate from '../../predicates/queryToPredicate.js'

export default function $elemMatch (queryPart, parentPath, path) {
  if (!isDocument(queryPart)) throw new Error('$elemMatch must specify an object')
  // match queryPart in some array items
  const predicate = queryToPredicate(queryPart, parentPath, path)
  return function $elemMatch (value, path, parent) {
    if (!isArray(value)) return false
    return value.some((value, index) => predicate(value, pathsJoin(path, index), parent))
  }
}
