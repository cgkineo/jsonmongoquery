import { queryToPredicate } from 'jsonmongoquery'

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

test('$or different fields', () => {
  const predicate = queryToPredicate({ $or: [{ quantity: { $lt: 20 } }, { price: 10 }] })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(5)
  expect(result[0]?.item).toBe('Eraser')
  expect(result[1]?.item).toBe('Chair')
  expect(result[2]?.item).toBe('Book')
  expect(result[3]?.item).toBe('Pencil')
  expect(result[4]?.item).toBe('Desk')
})

test('$or called without array', () => {
  expect(() => {
    queryToPredicate({ quantity: { $or: 1 } }, { validate: true })
  }).toThrow('quantity.$or: must be array')
  expect(() => {
    queryToPredicate({ quantity: { $or: 1 } })
  }).toThrow('$or must specify an array')
})
