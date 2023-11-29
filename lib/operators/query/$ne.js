import isEqualOrIsEmbeddedEqual from './isEqualOrIsEmbeddedEqual.js'

export default function $ne (absoluteValue) {
  // do not allow document to parse as queries instead treat as explicit object comparisons
  // https://www.mongodb.com/docs/manual/reference/operator/query/eq/#security-implications
  const predicate = isEqualOrIsEmbeddedEqual(absoluteValue, { isRegExpAsValue: true })
  return function (value, path, parent, context) {
    return !predicate(value, path, parent, context)
  }
}
