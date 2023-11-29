import {
  pathParse,
  pathUpdate
} from '../../paths.js'

export default function $unset (queryPart) {
  const entries = Object.entries(queryPart).map(([path, value]) => {
    return [pathParse(path), value]
  })
  return function (values) {
    let didUpdate = false
    entries.forEach(([keys, value]) => pathUpdate(values, keys, (oldValue, key, parent) => {
      if (!Object.hasOwn(parent, key)) return
      delete parent[key]
      didUpdate = true
    }))
    return didUpdate
  }
}
