import {
  isArray,
  throwUnsupported,
  TYPES
} from '../../is.js'
import isPredicateOrIsEmbeddedPredicate from './isPredicateOrIsEmbeddedPredicate.js';

export default function $type(queryPart) {
  // https://www.mongodb.com/docs/manual/reference/operator/query/type/#arrays
  const predicates = isArray(queryPart)
    ? queryPart.map(queryPart => TYPES[queryPart] || throwUnsupported(null, queryPart))
    : [ TYPES[queryPart] || throwUnsupported(null, queryPart) ]
  predicates.forEach(predicate => {
    if (predicate.name !== 'unsupported') return;
    predicate();
  })
  return isPredicateOrIsEmbeddedPredicate((value, path, parent) => {
    return predicates.some(predicate => predicate(value, path, parent));
  });
}
