import Ajv from 'ajv/dist/2020.js'
import fs from 'fs'
const schemaPath = new URL('../../schema/query.schema.json', import.meta.url)
const querySchema = JSON.parse(fs.readFileSync(schemaPath))
const ajv = new Ajv({ allowUnionTypes: true })
const compiledQuerySchema = ajv.compile(querySchema)

/** @typedef {import('../../types/types.js').JMQ.QueryOperatorField} JMQ.QueryOperatorField */

/**
 * Validate a query against the query schema
 * @param {JMQ.QueryOperatorField} queryPart
 * @throws "Schema validation error"
 * @returns {boolean}
 */
export default function validateQuery (queryPart) {
  const valid = compiledQuerySchema(queryPart)
  if (!valid) {
    const header = [
      compiledQuerySchema.errors[0].instancePath.split('/').filter(Boolean).join('.'),
      compiledQuerySchema.errors[0].propertyName
    ].filter(Boolean)
    throw new Error(`${header.join(', ')}: ${compiledQuerySchema.errors[0].message}`)
  }
  return true
}
