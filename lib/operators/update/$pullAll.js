import { isArray } from '../../is.js'
import {
  pathParse,
  pathUpdate
} from '../../paths.js'
import documentToPredicate from '../../predicates/documentToPredicate.js'

export default function $pullAll (queryPart) {
  const entries = Object.entries(queryPart).map(([path, documentParts]) => {
    if (!isArray(documentParts)) {
      throw new Error('$pullAll must specify an array')
    }
    return [pathParse(path), documentParts.map(documentPart => documentToPredicate(documentPart))]
  })
  return function (values) {
    entries.forEach(([keys, predicates]) => pathUpdate(values, keys, (oldValue, key, parent) => {
      const values = parent[key]
      if (!isArray(values)) return
      parent[key] = values.filter(value => !predicates.some(predicate => predicate(value)))
    }))
    return true
  }
}
