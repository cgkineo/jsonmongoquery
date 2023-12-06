import { queryToPredicate, updateToPredicate } from 'jsonmongoquery'

const data1 = [
  {
    _id: 1,
    sku: 'abc123',
    quantity: 10,
    metrics: { orders: 2, ratings: 3.5 },
    nullish: null
  }
]

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

test('$inc top level fields', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ sku: 'abc123' })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $inc: { quantity: -2, 'metrics.orders': 1 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.quantity).toBe(8)
  expect(updated[0]?.metrics.orders).toBe(3)
})

test('$inc non-numeric field', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ sku: 'abc123' })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $inc: { sku: 2 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(0)
})

test('$inc missing field', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ sku: 'abc123' })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $inc: { test: 2 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.test).toBe(2)
})

test('$inc null value', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ sku: 'abc123' })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $inc: { nullish: 2 }
  })
  expect(() => {
    result.filter(updater)
  }).toThrow('$inc cannot increment null value')
})
