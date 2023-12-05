import { queryToPredicate } from 'json-mongo-query'

test('bad operator $missing', () => {
  expect(() => {
    queryToPredicate({ $missing: 1 }, { validate: true })
  }).toThrow('$missing: boolean schema is false')
  expect(() => {
    queryToPredicate({ $missing: 1 })
  }).toThrow('Operator $missing is not supported')
})

test('bad operator $', () => {
  expect(() => {
    queryToPredicate({ $: 1 }, { validate: true })
  }).toThrow('$: boolean schema is false')
  expect(() => {
    queryToPredicate({ $: 1 })
  }).toThrow('Operator $ is not supported')
})

test('bad operator $[element]', () => {
  expect(() => {
    queryToPredicate({ '$[element]': 1 }, { validate: true })
  }).toThrow('$[element]: boolean schema is false')
  expect(() => {
    queryToPredicate({ '$[element]': 1 })
  }).toThrow('Operator $[element] is not supported')
})
