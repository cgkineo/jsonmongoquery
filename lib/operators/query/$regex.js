import { isRegEx } from '../../is.js'
import isPredicateOrIsEmbeddedPredicate from "./isPredicateOrIsEmbeddedPredicate.js";

export default function $regex(queryPart) {
  // options
  const regEx = isRegEx(queryPart)
    ? queryPart
    : new RegExp(queryPart);
  return isPredicateOrIsEmbeddedPredicate(value => regEx.test(value));
};
