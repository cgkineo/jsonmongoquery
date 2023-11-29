import isPredicateOrIsEmbeddedPredicate from './isPredicateOrIsEmbeddedPredicate.js'

export default function $gt (queryPart) {
  return isPredicateOrIsEmbeddedPredicate(value => (value > queryPart))
}
