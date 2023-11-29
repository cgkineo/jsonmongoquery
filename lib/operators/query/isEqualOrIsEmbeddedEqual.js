import { isDocumentOrArray, isDate, isRegEx, isString } from '../../is.js'
import documentToPredicate from '../../predicates/documentToPredicate.js'
import isPredicateOrIsEmbeddedPredicate from './isPredicateOrIsEmbeddedPredicate.js'

export default function isEqualOrIsEmbeddedEqual (queryPart, { isRegExpAsValue = false } = {}) {
  // queryPart can be document, array, date, regex, string, number, null or undefined etc
  if (isDate(queryPart)) {
    const time = queryPart.getTime()
    return isPredicateOrIsEmbeddedPredicate(value => isDate(value) && value.getTime() === time)
  }
  if (isRegEx(queryPart)) {
    return isRegExpAsValue
      // match regex absolutely
      ? isPredicateOrIsEmbeddedPredicate(value => isRegEx(value) && (value.source === queryPart.source && value.flags === queryPart.flags))
      // allow regex evaluation
      // https://www.mongodb.com/docs/manual/reference/operator/query/eq/#regex-match-behaviour
      : isPredicateOrIsEmbeddedPredicate(value => isString(value) && queryPart.test(value))
  }
  if (isDocumentOrArray(queryPart)) {
    // match document or array absolutely
    const predicate = documentToPredicate(queryPart)
    return isPredicateOrIsEmbeddedPredicate((value, path, parent) => predicate(value, path, parent))
  }
  return isPredicateOrIsEmbeddedPredicate(value => (value === queryPart))
}
