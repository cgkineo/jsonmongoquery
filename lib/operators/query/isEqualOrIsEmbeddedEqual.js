import { isDocumentOrArray } from '../../is.js'
import documentToPredicate from '../../predicates/documentToPredicate.js'
import isPredicateOrIsEmbeddedPredicate from './isPredicateOrIsEmbeddedPredicate.js'

export default function isEqualOrIsEmbeddedEqual (queryPart) {
  // queryPart can be document, array, string, number, null or undefined etc
  if (isDocumentOrArray(queryPart)) {
    // match document or array absolutely
    const predicate = documentToPredicate(queryPart)
    return isPredicateOrIsEmbeddedPredicate((value, path, parent, context) => predicate(value, path, parent, context))
  }
  return isPredicateOrIsEmbeddedPredicate(value => (value === queryPart))
}
