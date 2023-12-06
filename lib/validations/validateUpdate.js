import Ajv from 'ajv'
import fs from 'fs'
const schemaPath = new URL('../../schema/update.schema.json', import.meta.url)
const updateSchema = JSON.parse(fs.readFileSync(schemaPath))
const ajv = new Ajv({ allowUnionTypes: true })
const compiledUpdateSchema = ajv.compile(updateSchema)

/** @typedef {import('../../types/types.js').JMQ.UpdateOperator} JMQ.UpdateOperator */

/**
 * Validate a query against the query schema
 * @param {JMQ.UpdateOperator} queryPart
 * @throws "Schema validation error"
 * @returns {boolean}
 */
export default function validateUpdate (queryPart) {
  const valid = compiledUpdateSchema(queryPart)
  if (!valid) throw new Error(`${compiledUpdateSchema.errors[0].instancePath.split('/').filter(Boolean).join('.')}: ${compiledUpdateSchema.errors[0].message}`)
  return true
}
