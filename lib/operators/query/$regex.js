import { isRegEx } from '../../is.js'
import isPredicateOrIsEmbeddedPredicate from "./isPredicateOrIsEmbeddedPredicate.js";

export default function $regex(queryPart, parentPath, path, parent) {
  const flags = parent.$options || (isRegEx(queryPart) ? queryPart.flags : '');
  const regEx = new RegExp(queryPart, flags);
  return isPredicateOrIsEmbeddedPredicate(value => regEx.test(value));
};
