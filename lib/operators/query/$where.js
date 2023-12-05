import { isString } from '../../is.js'

export default function $where (queryPart) {
  if (!isString(queryPart)) throw new Error('$where must specify a string')
  // eslint-disable-next-line no-new-func
  const predicate = new Function(queryPart)
  return function (value, path, parent, context) {
    return predicate.call(value, path, parent, context)
  }
}
