import {
  isAbsoluteValue,
  isArray,
  isDocument
} from "../is.js";
import {
  pathRead,
  pathsJoin
} from "../paths.js";

export default function documentToPredicate(document, parentPath = '', path = '') {
  // match document or array absolutely
  // https://www.mongodb.com/docs/manual/reference/operator/query/eq/#security-implications
  // https://www.mongodb.com/docs/manual/reference/operator/query/eq/#match-a-document-value
  // https://www.mongodb.com/docs/manual/reference/operator/query/eq/#equals-an-array-value
  const isDocumentArray = isArray(document);
  const isDocumentObject = isDocument(document);
  const attributes = Object.entries(document);
  const length = isArray(document)
    ? document.length
    : attributes.length;
  const absolutes = attributes
    .filter(([,document]) => isAbsoluteValue(document));
  const descendants = attributes
    .filter(([,document]) => isDocument(document))
    .map(([path, document]) => {
      return [path, documentToPredicate(document, pathsJoin(parentPath, path), path)];
    });
  return function(value) {
    const isValueArray = isArray(value);
    const isValueObject = isDocument(value);
    if (isDocumentArray !== isValueArray) return false;
    if (isDocumentObject !== isValueObject) return false;
    const vAttributes = Object.entries(value)
    const vLength = isArray(value)
      ? value.length
      : vAttributes.length;
    const hasDifferentLength = (vLength !== length);
    if (hasDifferentLength) return false;
    const hasDifferentAttributes = attributes.some(([key], index) => vAttributes[index]?.[0] !== key);
    if (hasDifferentAttributes) return false;
    const haveAbsolutesPassed = absolutes.every(([path, value2]) => {
      const pathEntries = pathRead(value, path);
      return pathEntries?.some(item => (item === value2));
    });
    if (!haveAbsolutesPassed) return false;
    const haveDescendantsPassed = descendants.every(([path, predicate]) => {
      const pathEntries = pathRead(value, path);
      return pathEntries?.some(item => predicate(item, path, value));
    });
    if (!haveDescendantsPassed) return false;
    return true;
  };
}
