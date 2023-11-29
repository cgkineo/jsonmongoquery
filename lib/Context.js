import { pathsJoin } from './paths'

export default class Context {
  constructor ({
    date = new Date(),
    path = '',
    value = null,
    parent = null,
    parentKey = ''
  } = {}) {
    this.date = date
    this.path = path
    this.value = value
    this.parent = parent
    this.parentKey = parentKey
  }

  up (key) {
    return new Context({
      ...this,
      parent: this.value,
      path: pathsJoin(this.path, key),
      value: this.value[key],
      parentKey: key
    })
  }
}
