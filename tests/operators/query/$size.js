import { queryToPredicate } from 'jsonmongoquery'

const data1 = [
  { item: 0, field: ['red', 'green'] },
  { item: 1, field: ['apple', 'lime'] },
  { item: 2, field: 'fruit' },
  { item: 3, field: ['orange', 'lemon', 'grapefruit'] }
]

test('$size two', () => {
  const predicate = queryToPredicate({ field: { $size: 2 } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?.item).toBe(0)
  expect(result[1]?.item).toBe(1)
})

test('$size one', () => {
  const predicate = queryToPredicate({ field: { $size: 1 } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(0)
})
