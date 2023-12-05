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

test('$nor with two expressions', () => {
  const predicate = queryToPredicate({ $nor: [{ price: 1.99 }, { sale: true }] })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(3)
  expect(result[0]?.item).toBe('Eraser')
  expect(result[1]?.item).toBe('Ruler')
  expect(result[2]?.item).toBe('Desk')
})

test('$nor and additional comparisons', () => {
  const predicate = queryToPredicate({ $nor: [{ price: 1.99 }, { qty: { $lt: 20 } }, { sale: true }] })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(3)
  expect(result[0]?.item).toBe('Eraser')
  expect(result[1]?.item).toBe('Ruler')
  expect(result[2]?.item).toBe('Desk')
})

test('$nor and $exists', () => {
  const predicate = queryToPredicate({
    $nor: [
      { price: 1.99 }, { price: { $exists: false } },
      { sale: true }, { sale: { $exists: false } }
    ]
  })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(1)
  expect(result[0]?.item).toBe('Ruler')
})

test('$nor called without array', () => {
  expect(() => {
    queryToPredicate({ quantity: { $nor: 1 } }, { validate: true })
  }).toThrow('quantity.$nor: must be array')
  expect(() => {
    queryToPredicate({ quantity: { $nor: 1 } })
  }).toThrow('$nor must specify an array')
})
