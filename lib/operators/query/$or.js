import { isArray } from '../../is.js'
import queryToPredicate from '../../predicates/queryToPredicate.js'
/** @typedef {import("../../Context").default} Context */

/**
 *
 * @param {*} queryPart
 * @param {Context} context
 * @returns
 */
export default function $or (queryPart, context) {
  if (!isArray(queryPart)) throw new Error('$or must specify an array')
  const orPredicates = queryPart.map((queryPart, index) => queryToPredicate(queryPart, context.up(index)))
  return function (value, path, parent, context) {
    return orPredicates.some(predicate => predicate(value, path, parent, context))
  }
}
