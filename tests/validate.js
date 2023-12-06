import validateQuery from 'jsonmongoquery/lib/validations/validateQuery.js'
import validateUpdate from 'jsonmongoquery/lib/validations/validateUpdate.js'

test('validate query', () => {
  expect(validateQuery({}, { validate: true })).toBe(true)
})

test('validate update', () => {
  expect(validateUpdate({}, { validate: true })).toBe(true)
})
