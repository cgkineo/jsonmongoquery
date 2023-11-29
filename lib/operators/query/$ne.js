import isEqualOrIsEmbeddedEqual from './isEqualOrIsEmbeddedEqual.js'

export default function $ne (absoluteValue, parentPath, path) {
  // do not allow document to parse as queries instead treat as explicit object comparisons
  // https://www.mongodb.com/docs/manual/reference/operator/query/eq/#security-implications
  const predicate = isEqualOrIsEmbeddedEqual(absoluteValue, { isRegExpAsValue: true })
  return function (value) {
    return !predicate(value)
  }
}
