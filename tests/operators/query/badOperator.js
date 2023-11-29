import { queryToPredicate } from 'json-mongo-query'

test('bad operator', () => {
  expect(() => {
    queryToPredicate({ $missing: 1 })
  }).toThrow('Operator $missing is not supported')
})
