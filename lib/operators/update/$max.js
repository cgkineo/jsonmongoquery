import { TYPE_ORDER, getType } from '../../is.js'
import {
  pathParse,
  pathCreate
} from '../../paths.js'

export default function $max (queryPart) {
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
        const oldValueType = TYPE_ORDER[getType(oldValue)]
        const valueType = TYPE_ORDER[getType(value)]
        if (oldValueType !== valueType) {
          parent[key] = (oldValueType > valueType)
            ? oldValue
            : value
        } else {
          parent[key] = Math.max(oldValue, value)
        }
        didUpdate = true
      })
    })
    return didUpdate
  }
}
