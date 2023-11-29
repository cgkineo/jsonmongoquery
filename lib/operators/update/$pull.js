import { isArray } from '../../is.js'
import {
  pathParse,
  pathUpdate
} from '../../paths.js'
import queryToPredicate from '../../predicates/queryToPredicate.js'

export default function $pull (queryPart) {
  const entries = Object.entries(queryPart).map(([path, queryPart]) => {
    return [pathParse(path), queryToPredicate(queryPart)]
  })
  return function (values) {
    let didUpdate = false
    entries.forEach(([keys, predicate]) => pathUpdate(values, keys, (oldValue, key, parent) => {
      const values = parent[key]
      if (!isArray(values)) return
      parent[key] = values.filter((value, index) => !predicate(value, index, values))
      didUpdate = didUpdate || (values.length !== parent[key].length)
    }))
    return didUpdate
  }
}
