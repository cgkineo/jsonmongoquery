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

export function throwUnsupported (alias) {
  return function unsupported () {
    throw new Error(`The ${alias} data type is unsupported.`)
  }
}

/**
 * https://www.mongodb.com/docs/manual/reference/bson-types/
 */
export const TYPE_VALIDATE = {
  1: isNumber,
  number: isNumber,
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
  null: isNull
}

export const TYPE_NAMES = {
  number: 1,
  string: 2,
  object: 3,
  array: 4,
  undefined: 6,
  bool: 8,
  boolean: 8,
  null: 10
}

/**
 * https://www.mongodb.com/docs/manual/reference/bson-type-comparison-order/
 */
export const TYPE_ORDER = {
  6: 0, // undefined
  undefined: 0,
  10: 1, // null
  null: 1,
  1: 2, // number
  number: 2,
  2: 3, // string
  string: 3,
  3: 4, // object
  object: 4,
  4: 5, // array
  array: 5,
  8: 8, // boolean
  bool: 8,
  boolean: 8
}

const typeNameEntries = Object.entries(TYPE_NAMES)
export function getType (value) {
  return typeNameEntries.find(([number, name]) => TYPE_VALIDATE[number](value))[1]
}
