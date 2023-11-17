import isEqualOrIsEmbeddedEqual from "./isEqualOrIsEmbeddedEqual.js";

export default function $eq(absoluteValue, parentPath, path) {
  // do not allow document to parse as queries instead treat as explicit object comparisons
  // https://www.mongodb.com/docs/manual/reference/operator/query/eq/#security-implications
  return isEqualOrIsEmbeddedEqual(absoluteValue, { isExplicitRegExp: true });
}
