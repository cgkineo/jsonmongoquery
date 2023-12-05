import queryPartToPredicate from './queryPartToPredicate'
import Context from '../Context'
import Ajv from 'ajv'
import querySchema from '../../schema/query.schema.json'
const ajv = new Ajv({ allowUnionTypes: true })
const compiledQuerySchema = ajv.compile(querySchema)

/**
 * From a JSON object containing query operators, generate a predicate function
 * @param {JMQQueryOperatorFields} queryPart
 * @param {Object} options
 * @param {boolean} [options.validate=false] Validate query according to schema
 * @param {Context} [options.context]
 * @returns {Function}
 */
export default function queryToPredicate (queryPart, { validate = false, context = new Context() } = {}) {
  if (validate) {
    const valid = compiledQuerySchema(queryPart)
    if (!valid) throw new Error(`${compiledQuerySchema.errors[0].instancePath.split('/').filter(Boolean).join('.')}: ${compiledQuerySchema.errors[0].message}`)
  }
  return queryPartToPredicate(queryPart, { context })
}
