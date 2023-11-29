import { isArray } from '../../is.js'

export default function $size (queryPart) {
  return function (value) {
    return (isArray(value) && value?.length === queryPart)
  }
}
