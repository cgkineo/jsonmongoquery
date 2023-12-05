const ObjectToString = Object.prototype.toString

export const isArray = Array.isArray

export function isNull (value) {
  return (value === null)
}

export function isUndefined (value) {
  return (value === undefined)
}

export function isBool (value) {
  return (typeof value === 'boolean')
}

export function isNumber (value) {
  return (typeof value === 'number')
}

export function isString (value) {
  return (typeof value === 'string')
}

export function isDocument (value) {
  return (ObjectToString.call(value) === '[object Object]')
}

export function isDocumentOrArray (value) {
  return (isDocument(value) || isArray(value))
}

export function isAbsoluteValue (value) {
  return (
    isPassedByValue(value)
  )
}

export function isPassedByValue (value) {
  return (
    isNull(value) ||
    isUndefined(value) ||
    isBool(value) ||
    isNumber(value) ||
    isString(value)
  )
}

export function throwUnsupported (number, alias) {
  return function unsupported (value) {
    throw new Error(`The ${alias}${number ? ` (${number})` : ''} data type is unsupported.`)
  }
}

/**
 * https://www.mongodb.com/docs/manual/reference/bson-types/
 */
export const TYPE_VALIDATE = {
  number: isNumber,
  1: isNumber,
  double: isNumber,
  2: isString,
  string: isString,
  3: isDocument,
  object: isDocument,
  4: isArray,
  array: isArray,
  6: isUndefined,
  undefined: isUndefined,
  8: isBool,
  bool: isBool,
  boolean: isBool,
  10: isNull,
  null: isNull,
  16: isNumber,
  int: isNumber,
  18: isNumber,
  long: isNumber,
  19: isNumber,
  decimal: isNumber,
  0: throwUnsupported(0, 'Missing key'),
  missing: throwUnsupported(0, 'Missing key'),
  5: throwUnsupported(5, 'binData'),
  binData: throwUnsupported(5, 'binData'),
  7: throwUnsupported(7, 'objectId'),
  objectId: throwUnsupported(7, 'objectId'),
  9: throwUnsupported(9, 'date'),
  date: throwUnsupported(9, 'date'),
  11: throwUnsupported(11, 'regex'),
  regex: throwUnsupported(11, 'regex'),
  12: throwUnsupported(12, 'dbPointer'),
  dbPointer: throwUnsupported(12, 'dbPointer'),
  13: throwUnsupported(13, 'javascript'),
  javascript: throwUnsupported(13, 'javascript'),
  14: throwUnsupported(14, 'symbol'),
  symbol: throwUnsupported(14, 'symbol'),
  15: throwUnsupported(15, 'javascriptWithScope'),
  javascriptWithScope: throwUnsupported(15, 'javascriptWithScope'),
  17: throwUnsupported(17, 'timestamp'),
  timestamp: throwUnsupported(17, 'timestamp'),
  '-1': throwUnsupported(-1, 'minKey'),
  minKey: throwUnsupported(-1, 'minKey'),
  127: throwUnsupported(127, 'maxKey'),
  maxKey: throwUnsupported(127, 'maxKey')
}

export const TYPE_NAMES = {
  double: 1,
  string: 2,
  object: 3,
  array: 4,
  undefined: 6,
  bool: 8,
  boolean: 8,
  null: 10,
  int: 16,
  long: 18,
  decimal: 19,
  missing: 0,
  binData: 5,
  objectId: 7,
  date: 9,
  regex: 11,
  dbPointer: 12,
  javascript: 13,
  symbol: 14,
  javascriptWithScope: 15,
  timestamp: 17,
  minKey: -1,
  maxKey: 127
}

/**
 * https://www.mongodb.com/docs/manual/reference/bson-type-comparison-order/
 */
export const TYPE_ORDER = {
  0: -1, // missing
  missing: -1,
  '-1': 0, // min key
  minKey: 0,
  10: 1, // null
  null: 1,
  16: 2, // int
  int: 2,
  18: 2, // long
  long: 2,
  1: 2, // double
  double: 2,
  19: 2, // decimal
  decimal: 2,
  14: 3, // symbol
  symbol: 3,
  2: 3, // string
  string: 3,
  3: 4, // object
  object: 4,
  4: 5, // array
  array: 5,
  5: 6, // bindata
  binData: 6,
  7: 7, // objectid
  objectId: 7,
  8: 8, // boolean
  bool: 8,
  boolean: 8,
  9: 9, // date
  date: 9,
  17: 10, // timestamp
  timestamp: 10,
  11: 11, // regexp
  regexp: 11,
  127: 12, // max key
  maxKey: 12
}

const typeNameEntries = Object.entries(TYPE_NAMES)
export function getType (value) {
  return typeNameEntries.find(([number, name]) => TYPE_VALIDATE[number](value))[1]
}
