import {
  isArray,
  throwUnsupported,
  TYPE_VALIDATE
} from '../../is.js'
import isPredicateOrIsEmbeddedPredicate from './isPredicateOrIsEmbeddedPredicate.js'

export default function $type (queryPart) {
  // https://www.mongodb.com/docs/manual/reference/operator/query/type/#arrays
  const predicates = isArray(queryPart)
    ? queryPart.map(queryPart => TYPE_VALIDATE[queryPart] || throwUnsupported(queryPart))
    : [TYPE_VALIDATE[queryPart] || throwUnsupported(queryPart)]
  predicates.forEach(predicate => {
    if (predicate.name !== 'unsupported') return
    predicate()
  })
  return isPredicateOrIsEmbeddedPredicate((value, path, parent, context) => {
    return predicates.some(predicate => predicate(value, path, parent, context))
  })
}
