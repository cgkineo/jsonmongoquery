export function isObject(value) {
  return (typeof value === 'object');
}

export function isArray(value) {
  return Array.isArray(value)
}

export function isNull(value) {
  return (value === null);
}

export function isUndefined(value) {
  return (value === void 0);
}

export function isBool(value) {
  return (typeof value === 'boolean');
}

export function isNumber(value) {
  return (typeof value === 'number');
}

export function isString(value) {
  return (typeof value === 'string');
}

export function isRegEx(value) {
  return (value instanceof RegExp);
}

export function isAbsoluteValue(value) {
  return (
    isNull(value) ||
    isUndefined(value) ||
    isBool(value) ||
    isNumber(value) ||
    isString(value) ||
    isRegEx(value)
  );
}

export function isDocument(value) {
  return (
    !isNull(value) &&
    isObject(value) &&
    !isArray(value) &&
    !isRegEx(value)
  );
}

export function throwUnsupported(number, alias) {
  return function(value) {
    throw new Error(`The ${alias} or ${number} data type is unsupported.`);
  }
}

/**
 * https://www.mongodb.com/docs/manual/reference/bson-types/
 */
export const TYPES = {
  number: isNumber,
  1: isNumber,
  double: isNumber,
  2: isString,
  string: isString,
  3: isDocument,
  object: isDocument,
  4: isArray,
  array: isArray,
  5: throwUnsupported(5, 'binData'),
  binData: throwUnsupported(5, 'binData'),
  6: isUndefined,
  undefined: isUndefined,
  7: throwUnsupported(7, 'objectId'),
  objectId: throwUnsupported(7, 'objectId'),
  8: isBool,
  bool: isBool,
  9: throwUnsupported(9, 'date'),
  date: throwUnsupported(9, 'date'),
  10: isNull,
  null: isNull,
  11: isRegEx,
  regex: isRegEx,
  12: throwUnsupported(12, 'dbPointer'),
  dbPointer: throwUnsupported(12, 'dbPointer'),
  13: throwUnsupported(13, 'javascript'),
  javascript: throwUnsupported(13, 'javascript'),
  14: throwUnsupported(14, 'symbol'),
  symbol: throwUnsupported(14, 'symbol'),
  15: throwUnsupported(15, 'javascriptWithScope'),
  javascriptWithScope: throwUnsupported(15, 'javascriptWithScope'),
  16: isNumber,
  int: isNumber,
  17: throwUnsupported(17, 'timestamp'),
  timestamp: throwUnsupported(17, 'timestamp'),
  18: isNumber,
  long: isNumber,
  19: isNumber,
  decimal: isNumber,
  '-1': throwUnsupported(-1, 'minKey'),
  minKey: throwUnsupported(-1, 'minKey'),
  127: throwUnsupported(127, 'maxKey'),
  maxKey: throwUnsupported(127, 'maxKey')
}

/**
 * https://www.mongodb.com/docs/manual/reference/bson-type-comparison-order/
 */
export const TYPE_ORDER = [
  -1, // min key
  10, // null
  16,18,1,19, // int, long, double, decimals
  14,2, // symbol, string
  3, // object
  4, // array
  5, // bindata
  7, // objectid
  8, // boolean
  9, // date
  17, // timestamp
  11, // regexp
  127 // max key
]

