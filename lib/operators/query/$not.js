import { isDocument } from '../../is.js'
import queryToPredicate from '../../predicates/queryToPredicate.js'
/** @typedef {import("../../Context").default} Context */

/**
 *
 * @param {*} queryPart
 * @param {Context} context
 * @returns
 */
export default function $not (queryPart, context) {
  if (!isDocument(queryPart)) throw new Error('$not must specify an object')
  const predicate = queryToPredicate(queryPart, context)
  return function (value, path, parent, context) {
    return !predicate(value, path, parent, context)
  }
}
