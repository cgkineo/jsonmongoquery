import queryPartToPredicate from './queryPartToPredicate'
import Context from '../Context'
import Ajv from 'ajv'
import updateSchema from '../../schema/update.schema.json'
const ajv = new Ajv({ allowUnionTypes: true })
const compiledUpdateSchema = ajv.compile(updateSchema)

/**
 * From a JSON object containing update operators, generate an update predicate function
 * @param {JMQUpdateOperator} queryPart
 * @param {Object} options
 * @param {boolean} [options.validate=false] Validate query according to schema
 * @param {Context} [options.context]
 * @returns {Function}
 */
export default function updateToPredicate (queryPart, { validate = false, context = new Context() } = {}) {
  if (validate) {
    const valid = compiledUpdateSchema(queryPart)
    if (!valid) throw new Error(`${compiledUpdateSchema.errors[0].instancePath.split('/').filter(Boolean).join('.')}: ${compiledUpdateSchema.errors[0].message}`)
  }
  return queryPartToPredicate(queryPart, { context })
}
