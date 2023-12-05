import { isArray } from '../../is.js'
import queryToPredicate from '../../predicates/queryPartToPredicate.js'
/** @typedef {import("../../Context").default} Context */

/**
 * Must intersect all query parts
 * @param {*} queryPart
 * @param {Context} context
 * @returns
 */
export default function $all (queryPart, context) {
  if (!isArray(queryPart)) throw new Error('$all must specify an array')
  /**
   * all queryparts must match, an 'every' version of $in but with query parts
   * instead of string/regex matching
   */
  const predicates = queryPart.map((queryPart, index) => queryToPredicate(queryPart, context.up(index)))
  return function $all (value, path, parent, context) {
    return predicates.every(predicate => predicate(value, path, parent, context))
  }
}
