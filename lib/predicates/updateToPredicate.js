import queryPartToPredicate from './queryPartToPredicate.js'
import Context from '../Context.js'
import validateUpdate from '../validations/validateUpdate.js'

/** @typedef {import('../../types/types.js').JMQ.UpdateOperator} JMQ.UpdateOperator */

/**
 * From a JSON object containing update operators, generate an update predicate function
 * @param {JMQ.UpdateOperator} queryPart
 * @param {Object} options
 * @param {boolean} [options.validate=false] Validate query according to schema
 * @param {Context} [options.context]
 * @throws "Schema validation error"
 * @returns {Function}
 */
export default function updateToPredicate (queryPart, { validate = false, context = new Context() } = {}) {
  if (validate) validateUpdate(queryPart)
  return queryPartToPredicate(queryPart, { context })
}
