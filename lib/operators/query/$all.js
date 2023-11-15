import { isArray } from '../../is.js';
import queryToPredicate from '../../predicates/queryToPredicate.js';

/**
 * Must intersect all query parts
 * @param {*} queryPart
 * @param {*} parentPath
 * @param {*} path
 * @returns
 */
export default function $all(queryPart, parentPath, path) {
  if (!isArray(queryPart)) throw new Error('$all must specify an array');
  /**
   * all queryparts must match, an 'every' version of $in but with query parts
   * instead of string/regex matching
   */
  const predicates = queryPart.map(queryPart => queryToPredicate(queryPart, parentPath, path));
  return function(value, path, parent) {
    if (!isArray(value)) return false;
    return predicates.every(predicate => predicate(value, path, parent));
  };
}
