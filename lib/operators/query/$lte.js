import isPredicateOrIsEmbeddedPredicate from './isPredicateOrIsEmbeddedPredicate.js'

export default function $lte (queryPart) {
  return isPredicateOrIsEmbeddedPredicate(value => (value <= queryPart))
}
