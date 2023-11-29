import isPredicateOrIsEmbeddedPredicate from './isPredicateOrIsEmbeddedPredicate.js'

export default function $ne (queryPart) {
  return isPredicateOrIsEmbeddedPredicate(value => (value !== queryPart))
}
