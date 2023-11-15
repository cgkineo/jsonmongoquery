import isEqualOrIsEmbeddedEqual from "./isEqualOrIsEmbeddedEqual.js";

export default function $eq(queryPart, parentPath, path) {
  // do not allow document to parse as queries instead treat as explicit object comparisons
  // https://www.mongodb.com/docs/manual/reference/operator/query/eq/#security-implications
  return isEqualOrIsEmbeddedEqual(queryPart, { isExplicitRegExp: true });
}
