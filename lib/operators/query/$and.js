import { isArray } from '../../is.js'
import queryToPredicate from '../../predicates/queryToPredicate.js'
/** @typedef {import("../../Context").default} Context */

/**
 *
 * @param {*} queryPart
 * @param {Context} context
 * @returns
 */
export default function $and (queryPart, context) {
  if (!isArray(queryPart)) throw new Error('$and must specify an array')
  const andFunctions = queryPart.map((queryPart, index) => queryToPredicate(queryPart, context.up(index)))
  return function $and (value, path, parent, context) {
    return andFunctions.every(predicate => predicate(value, path, parent, context))
  }
}
