import {
  isArray,
  TYPES
} from '../../is.js'
import isPredicateOrIsEmbeddedPredicate from './isPredicateOrIsEmbeddedPredicate.js';

export default function $type(queryPart) {
  // https://www.mongodb.com/docs/manual/reference/operator/query/type/#arrays
  const predicates = isArray(queryPart)
    ? queryPart.map(queryPart => TYPES[queryPart])
    : [ TYPES[queryPart] ]
  return isPredicateOrIsEmbeddedPredicate(value => predicates.some(predicate => predicate(value)));
}
