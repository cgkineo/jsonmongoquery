import isPredicateOrIsEmbeddedPredicate from './isPredicateOrIsEmbeddedPredicate.js'

export default function $gte (queryPart) {
  return isPredicateOrIsEmbeddedPredicate(value => (value >= queryPart))
}
