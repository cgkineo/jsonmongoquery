import { isArray, isDocument, isRegEx, isDate, isPassedByValue } from './is'

export default function copy (value) {
  if (!value || isPassedByValue(value)) return value
  if (isArray(value)) {
    const arr = []
    for (const child of value) {
      arr.push(copy(child))
    }
    return arr
  }
  if (isDocument(value)) {
    const newObject = {}
    for (const key in value) {
      const child = value[key]
      newObject[key] = copy(child)
    }
    return newObject
  }
  if (isDate(value)) {
    return new Date(value)
  }
  if (isRegEx(value)) {
    return new RegExp(value.source, value.flags)
  }
  throw new Error(`Unsupported data type ${typeof value}`)
}
