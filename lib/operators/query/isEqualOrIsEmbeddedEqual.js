import { isArray, isDocument, isRegEx, TYPE_ORDER, TYPES } from "../../is.js";
import documentToPredicate from '../../predicates/documentToPredicate.js';
import isPredicateOrIsEmbeddedPredicate from "./isPredicateOrIsEmbeddedPredicate.js";

export default function isEqualOrIsEmbeddedEqual(queryPart, { isExplicitRegExp = false } = {}) {
  // queryPart can be document, array, regex, string, number, null or undefined etc
  if (isRegEx(queryPart)) {
    return isExplicitRegExp
      // match regex absolutely
      ? isPredicateOrIsEmbeddedPredicate(value => isRegEx(value) && (value.source === queryPart.source))
      // allow regex evaluation
      // https://www.mongodb.com/docs/manual/reference/operator/query/eq/#regex-match-behaviour
      : isPredicateOrIsEmbeddedPredicate(value => isString(value) && queryPart.test(value));
  }
  if (isArray(queryPart) || isDocument(queryPart)) {
    // match document or array absolutely
    const predicate = documentToPredicate(queryPart, parentPath, path);
    return isPredicateOrIsEmbeddedPredicate((value, path, parent) => predicate(value, path, parent));
  }
  return isPredicateOrIsEmbeddedPredicate(value => (value === queryPart));
}


