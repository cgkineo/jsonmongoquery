import { isArray, isDocument } from '../../is.js'
import {
  pathParse,
  pathCreate
} from '../../paths.js'

export default function $addToSet (queryPart) {
  const entries = Object.entries(queryPart).map(([path, value]) => {
    const options = (isDocument(value) && value.$each)
      ? value
      : { $each: [value] }
    return [
      pathParse(path),
      options
    ]
  })
  return function (values) {
    // https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/#value-to-add-is-a-document
    entries.forEach(([keys, options]) => {
      pathCreate(values, keys, (oldValue, key, parent) => {
        if (!Object.hasOwn(parent, key)) {
          parent[key] = options.$each // todo: clone data
          return
        }
        if (!isArray(oldValue)) return
        options.$each.forEach(newValue => {
          if (parent[key].includes(newValue)) return // todo: Value to Add is a Document
          parent[key].push(newValue) // todo: clone data
        })
      })
    })
    return true
  }
}
