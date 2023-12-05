import { queryToPredicate, updateToPredicate } from 'json-mongo-query'

const data1 = [
  { _id: 1, item: 'Hats', price: 10.99, quantity: 25 }
]

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

test('$mul top level fields', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $mul: {
      price: 1.25,
      quantity: 2
    }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.quantity).toBe(50)
  expect(updated[0]?.price).toBe(13.7375)
})

test('$mul non-numeric field', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $mul: { item: 2 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(0)
})

test('$mul missing field', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $mul: { test: 2 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.test).toBe(0)
})
