import isPredicateOrIsEmbeddedPredicate from "./isPredicateOrIsEmbeddedPredicate.js";

export default function $lt(queryPart) {
  return isPredicateOrIsEmbeddedPredicate(value => (value < queryPart));
}
