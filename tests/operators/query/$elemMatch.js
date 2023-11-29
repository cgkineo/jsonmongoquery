import { queryToPredicate } from 'json-mongo-query'

const data1 = [
  { _id: 1, results: [82, 85, 88] },
  { _id: 2, results: [75, 88, 89] }
]

test('$elemMatch basic values', () => {
  const predicate = queryToPredicate({ results: { $elemMatch: { $gte: 80, $lt: 85 } } })
  const results = data1.filter(predicate)
  expect(results).toHaveLength(1)
  expect(results[0]?._id).toBe(1)
})

const data2 = [
  {
    _id: 1,
    results: [{ product: 'abc', score: 10 },
      { product: 'xyz', score: 5 }]
  },
  {
    _id: 2,
    results: [{ product: 'abc', score: 8 },
      { product: 'xyz', score: 7 }]
  },
  {
    _id: 3,
    results: [{ product: 'abc', score: 7 },
      { product: 'xyz', score: 8 }]
  },
  {
    _id: 4,
    results: [{ product: 'abc', score: 7 },
      { product: 'def', score: 8 }]
  }
]

test('$elemMatch embedded documents', () => {
  const predicate = queryToPredicate({ results: { $elemMatch: { product: 'xyz', score: { $gte: 8 } } } })
  const results = data2.filter(predicate)
  expect(results).toHaveLength(1)
  expect(results[0]?._id).toBe(3)
})

test('$elemMatch single query condition explicit', () => {
  const predicate = queryToPredicate({ results: { $elemMatch: { product: 'xyz' } } })
  const results = data2.filter(predicate)
  expect(results).toHaveLength(3)
  expect(results[0]?._id).toBe(1)
  expect(results[1]?._id).toBe(2)
  expect(results[2]?._id).toBe(3)
})

test('$elemMatch single query condition implicit', () => {
  const predicate = queryToPredicate({ 'results.product': 'xyz' })
  const results = data2.filter(predicate)
  expect(results).toHaveLength(3)
  expect(results[0]?._id).toBe(1)
  expect(results[1]?._id).toBe(2)
  expect(results[2]?._id).toBe(3)
})

test('$elemMatch without object', () => {
  expect(() => {
    queryToPredicate({ results: { $elemMatch: 1 } })
  }).toThrow('$elemMatch must specify an object')
})

test('$elemMatch invalid', () => {
  const predicate = queryToPredicate({ _id: { $elemMatch: { $eq: 1 } } })
  const results = data2.filter(predicate)
  expect(results).toHaveLength(0)
})
