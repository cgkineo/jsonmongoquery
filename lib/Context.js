import { pathsJoin } from './paths.js'
import queryPartToPredicate from './queryPartToPredicate.js'
import validateQuery from '../validations/validateQuery.js'
import validateUpdate from '../validations/validateUpdate.js'

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
    rootContext = null,
    validate = false
  } = {}) {
    this.path = path
    this.value = value
    this.parent = parent
    this.parentKey = parentKey
    this.rootContext = rootContext
    this.validate = validate
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

  /**
   * From a JSON object containing query operators, generate a predicate function
   * @param {JMQ.QueryOperatorField} queryPart
   * @param {Object} options
   * @param {boolean} [options.validate=false] Validate query according to schema
   * @param {Context} [options.context]
   * @throws "Schema validation error"
   * @returns {Function}
   */
  queryToPredicate (queryPart, { validate = this.validate, context = this } = {}) {
    if (validate) validateQuery(queryPart)
    return queryPartToPredicate(queryPart, { context })
  }

  /**
   * From a JSON object containing update operators, generate an update predicate function
   * @param {JMQ.UpdateOperator} queryPart
   * @param {Object} options
   * @param {boolean} [options.validate=false] Validate query according to schema
   * @param {Context} [options.context]
   * @throws "Schema validation error"
   * @returns {Function}
   */
  updateToPredicate (queryPart, { validate = this.validate, context = this } = {}) {
    if (validate) validateUpdate(queryPart)
    return queryPartToPredicate(queryPart, { context })
  }
}
