import { queryToPredicate } from 'jsonmongoquery'

test('bad operator $missing', () => {
  expect(() => {
    queryToPredicate({ $missing: 1 }, { validate: true })
  }).toThrow('$missing: must match pattern "(^[$](where|and|nor|or)+)|(^[^$].*)"')
  expect(() => {
    queryToPredicate({ $missing: 1 })
  }).toThrow('Operator $missing is not supported')
})

test('bad operator $', () => {
  expect(() => {
    queryToPredicate({ $: 1 }, { validate: true })
  }).toThrow('$: must match pattern "(^[$](where|and|nor|or)+)|(^[^$].*)"')
  expect(() => {
    queryToPredicate({ $: 1 })
  }).toThrow('Operator $ is not supported')
})

test('bad operator $[element]', () => {
  expect(() => {
    queryToPredicate({ '$[element]': 1 }, { validate: true })
  }).toThrow('$[element]: must match pattern "(^[$](where|and|nor|or)+)|(^[^$].*)"')
  expect(() => {
    queryToPredicate({ '$[element]': 1 })
  }).toThrow('Operator $[element] is not supported')
})
