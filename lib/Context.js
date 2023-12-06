import { pathsJoin } from './paths.js'

/**
 * Holds the compile and runtime position and date value for query and data traversal
 */
export default class Context {
  constructor ({
    date = new Date(),
    path = '',
    value = null,
    parent = null,
    parentKey = '',
    rootContext = null
  } = {}) {
    this.path = path
    this.value = value
    this.parent = parent
    this.parentKey = parentKey
    this.rootContext = rootContext
    if (!rootContext) this.date = date
  }

  /**
   * Set $currentDate value for context
   * @type {Date}
   */
  set date (value) {
    this._date = value
  }

  /**
   * Get $currentDate value for context
   * @type {Date}
   */
  get date () {
    return this.rootContext?.date ?? this._date
  }

  /**
   * Creates a traversal context by descending into a key of the current value
   * @param {string} key
   * @returns {Context}
   */
  up (key) {
    return new Context({
      ...this,
      parent: this.value,
      path: pathsJoin(this.path, key),
      value: this.value[key],
      parentKey: key,
      rootContext: this
    })
  }

  /**
   * Creates a predicate context from a starting value
   * @param {any} value
   * @returns {Context}
   */
  start (value) {
    return new Context({
      ...this,
      parent: null,
      path: '',
      value,
      parentKey: '',
      rootContext: this
    })
  }
}
