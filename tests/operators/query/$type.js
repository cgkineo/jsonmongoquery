import { queryToPredicate } from 'json-mongo-query'

const data1 = [
  { _id: 1, item: { name: 'ab', code: '123' }, qty: 15, tags: ['A', 'B', 'C'] },
  { _id: 2, item: { name: 'cd', code: '123' }, qty: 20, tags: ['B'] },
  { _id: 3, item: { name: 'ij', code: '456' }, qty: 25, tags: ['A', 'B'] },
  { _id: 4, item: { name: 'xy', code: '456' }, qty: 30, tags: ['B', 'A'] },
  { _id: 5, item: { name: 'mn', code: '000' }, qty: 20, tags: [['A', 'B'], 'C'] }
]

test('$type single', () => {
  const predicate = queryToPredicate({ qty: { $type: 'number' } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(5)
})

test('$type single array', () => {
  const predicate = queryToPredicate({ tags: { $type: 'array' } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(5)
})

test('$type single object', () => {
  const predicate = queryToPredicate({ item: { $type: 'object' } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(5)
})

test('$type single mismatch', () => {
  const predicate = queryToPredicate({ item: { $type: 'array' } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(0)
})

test('$type multiple', () => {
  const predicate = queryToPredicate({ qty: { $type: ['string', 'number'] } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(5)
})

test('$type embedded document', () => {
  const predicate = queryToPredicate({ tags: { $type: ['string'] } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(5)
})

test('$type unsupported', () => {
  expect(() => {
    queryToPredicate({ tags: { $type: 'date' } })
  }).toThrow('The date (9) data type is unsupported.')
})

test('$type unsupported 1', () => {
  expect(() => {
    queryToPredicate({ tags: { $type: ['date'] } })
  }).toThrow('The date (9) data type is unsupported.')
})

test('$type invalid', () => {
  expect(() => {
    queryToPredicate({ tags: { $type: 'car' } })
  }).toThrow('The car data type is unsupported.')
})

test('$type invalid 1', () => {
  expect(() => {
    queryToPredicate({ tags: { $type: ['car'] } })
  }).toThrow('The car data type is unsupported.')
})
