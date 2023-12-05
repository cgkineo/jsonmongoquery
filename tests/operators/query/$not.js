import { queryToPredicate } from 'json-mongo-query'

const data1 = [
  { item: 'Pen', quantity: 350, price: 1.99 },
  { item: 'Eraser', quantity: 15, price: 10.00 },
  { item: 'Ruler', quantity: 50, price: 0.99, sale: false },
  { item: 'Map', quantity: 50, price: 0.99, sale: true },
  { item: 'Chair', quantity: 5, price: 1.99, sale: false },
  { item: 'Book', quantity: 5, price: 1.99, sale: true },
  { item: 'Pencil', quantity: 325, price: 10.00, sale: true },
  { item: 'Desk', quantity: 5 }
]

test('$not example', () => {
  const predicate = queryToPredicate({ price: { $not: { $gt: 1.99 } } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(6)
  expect(result[0]?.item).toBe('Pen')
  expect(result[1]?.item).toBe('Ruler')
  expect(result[2]?.item).toBe('Map')
  expect(result[3]?.item).toBe('Chair')
  expect(result[4]?.item).toBe('Book')
  expect(result[5]?.item).toBe('Desk')
})

test('$not called without object', () => {
  expect(() => {
    queryToPredicate({ quantity: { $not: 1 } }, { validate: true })
  }).toThrow('quantity.$not: must be object')
  expect(() => {
    queryToPredicate({ quantity: { $not: 1 } })
  }).toThrow('$not must specify an object')
})
