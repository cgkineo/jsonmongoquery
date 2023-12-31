import {
  pathParse,
  pathCreate
} from '../../paths.js'

export default function $rename (queryPart) {
  const entries = Object.entries(queryPart).map(([path, value]) => {
    return [pathParse(path), value]
  })
  return function (values) {
    let didUpdate = false
    entries.forEach(([keys, value]) => {
      pathCreate(values, keys, (oldValue, key, parent) => {
        if (!Object.hasOwn(parent, key)) {
          parent[key] = 0
          didUpdate = true
          return
        }
        if (isNaN(oldValue)) return
        parent[key] = oldValue * value
        didUpdate = true
      })
    })
    return didUpdate
  }
}
