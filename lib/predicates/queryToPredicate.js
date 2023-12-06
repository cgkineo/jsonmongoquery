import queryPartToPredicate from './queryPartToPredicate.js'
import Context from '../Context.js'
import validateQuery from '../validations/validateQuery.js'

/** @typedef {import('../../types/types.js').JMQ.QueryOperatorField} JMQ.QueryOperatorField */

/**
 * From a JSON object containing query operators, generate a predicate function
 * @param {JMQ.QueryOperatorField} queryPart
 * @param {Object} options
 * @param {boolean} [options.validate=false] Validate query according to schema
 * @param {Context} [options.context]
 * @throws "Schema validation error"
 * @returns {Function}
 */
export default function queryToPredicate (queryPart, { validate = false, context = new Context() } = {}) {
  if (validate) validateQuery(queryPart)
  return queryPartToPredicate(queryPart, { context })
}
