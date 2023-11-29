import { queryToPredicate } from 'json-mongo-query'

const data = [
  {
    item: 'nuts',
    quantity: 30,
    carrier: { name: 'Shipit', fee: 3 }
  },
  {
    item: 'bolts',
    quantity: 50,
    carrier: { name: 'Shipit', fee: 4 }
  },
  {
    item: 'washers',
    quantity: 10,
    carrier: { name: 'Shipit', fee: 1 }
  }
]

test('$ne single depth', () => {
  const predicate = queryToPredicate({ quantity: { $ne: 20 } })
  const result = data.filter(predicate)
  expect(result).toHaveLength(3)
  expect(result[0]?.item).toBe('nuts')
  expect(result[1]?.item).toBe('bolts')
  expect(result[2]?.item).toBe('washers')
})

test('$ne dot notation', () => {
  const predicate = queryToPredicate({ 'carrier.fee': { $ne: 1 } })
  const result = data.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?.item).toBe('nuts')
  expect(result[1]?.item).toBe('bolts')
})

test('$ne missing dot notation', () => {
  const predicate = queryToPredicate({ 'carrier.fee.none': { $ne: 1 } })
  const result = data.filter(predicate)
  expect(result).toHaveLength(3)
  expect(result[0]?.item).toBe('nuts')
  expect(result[1]?.item).toBe('bolts')
  expect(result[2]?.item).toBe('washers')
})
