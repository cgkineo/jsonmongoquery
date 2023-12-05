import isPredicateOrIsEmbeddedPredicate from './isPredicateOrIsEmbeddedPredicate.js'
/** @typedef {import("../../Context").default} Context */

/**
 *
 * @param {*} queryPart
 * @param {Context} context
 * @returns
 */
export default function $regex (queryPart, context) {
  const flags = context.parent.$options || ''
  const regEx = new RegExp(queryPart, flags)
  return isPredicateOrIsEmbeddedPredicate(value => regEx.test(value))
};
