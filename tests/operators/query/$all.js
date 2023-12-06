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
  }
]

test('$all match values', () => {
  const predicate = queryToPredicate({ tags: { $all: ['appliance', 'school', 'book'] } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?.code).toBe('xyz')
  expect(result[1]?.code).toBe('abc')
})

test('$all with $elemMatch', () => {
  const predicate = queryToPredicate({
    qty: {
      $all: [
        { $elemMatch: { size: 'M', num: { $gt: 50 } } },
        { $elemMatch: { num: 100, color: 'green' } }
      ]
    }
  })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?.code).toBe('efg')
  expect(result[1]?.code).toBe('ijk')
})

test('$all non array fields', () => {
  const predicate = queryToPredicate({ 'qty.num': { $all: [50] } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(1)
  expect(result[0]?.code).toBe('abc')
})

test('$all called without array', () => {
  expect(() => {
    queryToPredicate({ tags: { $all: 1 } }, { validate: true })
  }).toThrow('tags.$all: must be array')
  expect(() => {
    queryToPredicate({ tags: { $all: 1 } })
  }).toThrow('$all must specify an array')
})
