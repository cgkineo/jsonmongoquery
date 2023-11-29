import Context from '../Context.js'
import {
  isAbsoluteValue,
  isArray,
  isDocument,
  isDocumentOrArray
} from '../is.js'
import {
  pathRead
} from '../paths.js'

export default function documentToPredicate (document, context = new Context({ value: document })) {
  if (!isDocumentOrArray(document)) {
    return function (value) {
      return (value === document)
    }
  }
  // match document or array absolutely
  // https://www.mongodb.com/docs/manual/reference/operator/query/eq/#security-implications
  // https://www.mongodb.com/docs/manual/reference/operator/query/eq/#match-a-document-value
  // https://www.mongodb.com/docs/manual/reference/operator/query/eq/#equals-an-array-value
  const isDocumentArray = isArray(document)
  const isDocumentObject = isDocument(document)
  const attributes = Object.entries(document)
  const length = isArray(document)
    ? document.length
    : attributes.length
  const absolutes = attributes
    .filter(([, document]) => isAbsoluteValue(document))
  const descendants = attributes
    .filter(([, document]) => isDocumentOrArray(document))
    .map(([path, document]) => {
      return [path, documentToPredicate(document, context.up(path))]
    })
  return function (value, path = '', parent, context = new Context({ value, path, parent })) {
    const isValueArray = isArray(value)
    const isValueObject = isDocument(value)
    if (isDocumentArray !== isValueArray) return false
    if (isDocumentObject !== isValueObject) return false
    const vAttributes = Object.entries(value)
    const vLength = isArray(value)
      ? value.length
      : vAttributes.length
    const hasDifferentLength = (vLength !== length)
    if (hasDifferentLength) return false
    const hasDifferentAttributes = attributes.some(([key], index) => vAttributes[index]?.[0] !== key)
    if (hasDifferentAttributes) return false
    const haveAbsolutesPassed = absolutes.every(([path, value2]) => {
      const pathEntries = pathRead(value, path)
      return pathEntries?.some(item => (item === value2))
    })
    if (!haveAbsolutesPassed) return false
    const haveDescendantsPassed = descendants.every(([path, predicate]) => {
      const pathEntries = pathRead(value, path)
      return pathEntries?.some(item => predicate(item, path, parent, context.up(path)))
    })
    if (!haveDescendantsPassed) return false
    return true
  }
}
