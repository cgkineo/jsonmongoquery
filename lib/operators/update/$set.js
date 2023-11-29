import copy from '../../copy.js'
import {
  pathParse,
  pathCreate
} from '../../paths.js'

export default function $set (queryPart) {
  const entries = Object.entries(queryPart).map(([path, value]) => {
    return [pathParse(path), value]
  })
  return function (values) {
    let didUpdate = false
    entries.forEach(([keys, value]) => pathCreate(values, keys, (oldValue, key, parent) => {
      parent[key] = copy(value)
      didUpdate = true
    }))
    return didUpdate
  }
}
