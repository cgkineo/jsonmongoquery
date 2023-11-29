import {
  pathParse,
  pathUpdate,
  pathCreate
} from '../../paths.js'

export default function $rename (queryPart) {
  const entries = Object.entries(queryPart).map(([fromPath, toPath]) => {
    return [pathParse(fromPath), pathParse(toPath)]
  })
  return function (values) {
    let didUpdate = false
    entries.forEach(([fromKeys, toKeys]) => {
      pathUpdate(values, fromKeys, (oldValue, key, parent) => {
        delete parent[key]
        didUpdate = true
        pathCreate(values, toKeys, (discardValue, key, parent) => {
          delete parent[key]
          parent[key] = oldValue
        })
      })
    })
    return didUpdate
  }
}
