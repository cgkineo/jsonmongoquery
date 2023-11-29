import { pathHas } from '../../paths.js'

export default function $exists (queryPart = true) {
  return function (value, path, parent, context) {
    const result = pathHas(parent, path)
    return queryPart
      ? result
      : !result
  }
}
