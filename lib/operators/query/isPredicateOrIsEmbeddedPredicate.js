import { isDocumentOrArray } from '../../is.js'

export default function isPredicateOrIsEmbeddedPredicate (predicate) {
  // queryPart can be directly equal to value or equal to a VALUE in an array OR an object
  // https://www.mongodb.com/docs/manual/reference/operator/query/eq/#array-element-equals-a-value
  // https://www.mongodb.com/docs/manual/reference/operator/query/eq/#field-in-embedded-document-equals-a-value
  return function isPredicateOrIsEmbeddedPredicate (value, path, parent, context) {
    // check value
    const isValueEqual = predicate(value, path, context)
    if (isValueEqual) return true
    const isSubValueEqual = isDocumentOrArray(value) && Object.entries(value).some(([key, subValue]) => {
      // search object/array sub values
      return predicate(subValue, key, value, context.up(key))
    })
    return isSubValueEqual
  }
}
