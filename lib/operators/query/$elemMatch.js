import { isArray, isDocument } from '../../is.js'
import queryToPredicate from '../../predicates/queryPartToPredicate.js'
/** @typedef {import("../../Context").default} Context */

export default function $elemMatch (queryPart, context) {
  if (!isDocument(queryPart)) throw new Error('$elemMatch must specify an object')
  // match queryPart in some array items
  const predicate = queryToPredicate(queryPart, context)
  return function $elemMatch (value, path, parent, context) {
    if (!isArray(value)) return false
    return value.some((child, index) => predicate(child, index, value, context.up(index)))
  }
}
