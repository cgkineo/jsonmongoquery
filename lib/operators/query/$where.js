import { isString } from '../../is.js'

export default function $where (queryPart) {
  if (!isString(queryPart) && typeof queryPart !== 'function') throw new Error('$where must specify a string or function')
  const predicate = isString(queryPart)
    // eslint-disable-next-line no-new-func
    ? new Function(queryPart)
    : queryPart
  return function (value, path, parent, context) {
    return predicate.call(value, path, parent, context)
  }
}
