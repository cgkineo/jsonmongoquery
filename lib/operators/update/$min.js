import {
  pathParse,
  pathCreate
} from '../../paths.js'

export default function $min (queryPart) {
  const entries = Object.entries(queryPart).map(([path, value]) => {
    return [pathParse(path), value]
  })
  return function (values) {
    entries.forEach(([keys, value]) => {
      pathCreate(values, keys, (oldValue, key, parent) => {
        if (!Object.hasOwn(parent, key)) {
          parent[key] = value
          return
        }
        if (isNaN(oldValue)) return
        parent[key] = Math.min(oldValue, value)
      })
    })
    return true
  }
}
