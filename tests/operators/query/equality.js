import { queryToPredicate } from 'jsonmongoquery'

const data1 = [
  {
    code: 'xyz',
    tags: ['school', 'book', 'bag', 'headphone', 'appliance'],
    qty: [
      { size: 'S', num: 10, color: 'blue' },
      { size: 'M', num: 45, color: 'blue' },
      { size: 'L', num: 100, color: 'green' }
    ]
  },
  {
    code: 'abc',
    tags: ['appliance', 'school', 'book'],
    qty: [
      { size: '6', num: 100, color: 'green' },
      { size: '6', num: 50, color: 'blue' },
      { size: '8', num: 100, color: 'brown' }
    ]
  },
  {
    code: 'efg',
    tags: ['school', 'book'],
    qty: [
      { size: 'S', num: 10, color: 'blue' },
      { size: 'M', num: 100, color: 'blue' },
      { size: 'L', num: 100, color: 'green' }
    ]
  },
  {
    code: 'ijk',
    tags: ['electronics', 'school'],
    qty: [
      { size: 'M', num: 100, color: 'green' }
    ]
  },
  {
    code: 'lmn',
    tags: ['electronics', 'school'],
    qty: [
      1
    ]
  }
]

test('equality match array', () => {
  const predicate = queryToPredicate({ tags: ['school', 'book'] })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(1)
  expect(result[0]?.code).toBe('efg')
})

test('equality match objects', () => {
  const predicate = queryToPredicate({
    qty: [
      { size: '6', num: 100, color: 'green' },
      { size: '6', num: 50, color: 'blue' },
      { size: '8', num: 100, color: 'brown' }
    ]
  })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(1)
  expect(result[0]?.code).toBe('abc')
})

test('equality not match array', () => {
  const predicate = queryToPredicate({ tags: ['school'] })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(0)
})

test('equality not match objects', () => {
  const predicate = queryToPredicate({
    qty: [
      { size: '6', num: 100, color: 'green' },
      { size: '6', num: 50, color: 'blue' },
      { size: '8', num: 100, test: 'brown' }
    ]
  })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(0)
})

test('equality not match objects 2', () => {
  const predicate = queryToPredicate({
    qty: [
      { size: '6', num: 100, color: 'green' },
      { size: '6', num: 50, color: 'blue' },
      []
    ]
  })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(0)
})

test('equality not match objects 3', () => {
  const predicate = queryToPredicate({
    qty: { $eq: { test: 1 } }
  })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(0)
})

test('equality single element inside array', () => {
  const predicate = queryToPredicate({ tags: 'book' })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(3)
})

test('equality match string', () => {
  const predicate = queryToPredicate({ code: 'efg' })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(1)
})

test('equality not match type', () => {
  const predicate = queryToPredicate({ code: 1 })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(0)
})

test('equality dot notation array item', () => {
  const predicate = queryToPredicate({ 'tags.0': 'school' })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(2)
})

test('equality dot notation array item 2', () => {
  const predicate = queryToPredicate({ 'qty.$[].size': 'S' })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(2)
})
