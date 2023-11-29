import copy from '../../copy.js'
import { isArray, isDocument } from '../../is.js'
import {
  pathParse,
  pathCreate
} from '../../paths.js'
import documentToPredicate from '../../predicates/documentToPredicate.js'

export default function $addToSet (queryPart) {
  const entries = Object.entries(queryPart).map(([path, value]) => {
    const options = (isDocument(value) && value.$each)
      ? value
      : { $each: [value] }
    options.predicates = options.$each.map(value => documentToPredicate(value))
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
          parent[key] = copy(options.$each)
          return
        }
        if (!isArray(oldValue)) return
        options.predicates.forEach((predicate, index) => {
          if (parent[key].some(value => predicate(value))) return
          parent[key].push(copy(options.$each[index]))
        })
      })
    })
    return true
  }
}
