import { queryToPredicate } from 'jsonmongoquery'

const data1 = [
  { _id: 1, item: { name: 'ab', code: '123' }, qty: 15, tags: ['A', 'B', 'C'] },
  { _id: 2, item: { name: 'cd', code: '123' }, qty: 20, tags: ['B'] },
  { _id: 3, item: { name: 'ij', code: '456' }, qty: 25, tags: ['A', 'B'] },
  { _id: 4, item: { name: 'xy', code: '456' }, qty: 30, tags: ['B', 'A'] },
  { _id: 5, item: { name: 'mn', code: '000' }, qty: 20, tags: [['A', 'B'], 'C'] }
]

test('$eq explicit', () => {
  const predicate = queryToPredicate({ qty: { $eq: 20 } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?._id).toBe(2)
  expect(result[1]?._id).toBe(5)
})

test('$eq implicit', () => {
  const predicate = queryToPredicate({ qty: 20 })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?._id).toBe(2)
  expect(result[1]?._id).toBe(5)
})

test('$eq embedded documents explicit', () => {
  const predicate = queryToPredicate({ 'item.name': { $eq: 'ab' } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(1)
  expect(result[0]?._id).toBe(1)
})

test('$eq embedded dot notation', () => {
  const predicate = queryToPredicate({ 'item.name': 'ab' })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(1)
  expect(result[0]?._id).toBe(1)
})

test('$eq array element explicit', () => {
  const predicate = queryToPredicate({ tags: { $eq: 'B' } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(4)
  expect(result[0]?._id).toBe(1)
  expect(result[1]?._id).toBe(2)
  expect(result[2]?._id).toBe(3)
  expect(result[3]?._id).toBe(4)
})

test('$eq array element implicit', () => {
  const predicate = queryToPredicate({ tags: 'B' })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(4)
  expect(result[0]?._id).toBe(1)
  expect(result[1]?._id).toBe(2)
  expect(result[2]?._id).toBe(3)
  expect(result[3]?._id).toBe(4)
})

test('$eq array value explicit', () => {
  const predicate = queryToPredicate({ tags: { $eq: ['A', 'B'] } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?._id).toBe(3)
  expect(result[1]?._id).toBe(5)
})

test('$eq array value implicit', () => {
  const predicate = queryToPredicate({ tags: ['A', 'B'] })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?._id).toBe(3)
  expect(result[1]?._id).toBe(5)
})

const data2 = [
  { _id: 1, company: 'MongoDB' },
  { _id: 2, company: 'MongoDB2' }
]

test('$eq match a string explicit', () => {
  const predicate = queryToPredicate({ company: { $eq: 'MongoDB' } })
  const result = data2.filter(predicate)
  expect(result).toHaveLength(1)
  expect(result[0]?.company).toBe('MongoDB')
})

test('$eq match a string implicit', () => {
  const predicate = queryToPredicate({ company: 'MongoDB' })
  const result = data2.filter(predicate)
  expect(result).toHaveLength(1)
  expect(result[0]?.company).toBe('MongoDB')
})

test('$eq regular expression matches explicit', () => {
  const predicate = queryToPredicate({ company: { $regex: 'mongodb', $options: 'i' } })
  const result = data2.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?.company).toBe('MongoDB')
  expect(result[1]?.company).toBe('MongoDB2')
})

const data3 = [
  { _id: 1, item: { name: 'ab', code: '123' }, qty: 15, tags: 1 },
  { _id: 2, item: { name: 'cd', code: '123' }, qty: 20, tags: ['B'] },
  { _id: 3, item: { name: 'ij', code: '456' }, qty: 25, tags: ['A', 'B'] },
  { _id: 4, item: { name: 'xy', code: '456' }, qty: 30, tags: ['B', 'A'] },
  { _id: 5, item: { name: 'mn', code: '000' }, qty: 20, tags: [['A', 'B'], 'C'] }
]

test('$eq missing array $[]', () => {
  const predicate = queryToPredicate({ 'tags.$[].name': 'ab' })
  const result = data3.filter(predicate)
  expect(result).toHaveLength(0)
})
