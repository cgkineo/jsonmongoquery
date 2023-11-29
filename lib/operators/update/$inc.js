import {
  pathParse,
  pathCreate
} from '../../paths.js'

export default function $inc (queryPart) {
  const entries = Object.entries(queryPart).map(([path, value]) => {
    return [pathParse(path), value]
  })
  return function (values) {
    let didUpdate = false
    entries.forEach(([keys, value]) => {
      pathCreate(values, keys, (oldValue, key, parent) => {
        if (!Object.hasOwn(parent, key)) {
          parent[key] = value
          didUpdate = true
          return
        }
        if (oldValue === null) throw new Error('$inc cannot increment null value')
        if (isNaN(oldValue)) return
        parent[key] = oldValue + value
        didUpdate = true
      })
    })
    return didUpdate
  }
}
