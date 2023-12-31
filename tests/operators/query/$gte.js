import { queryToPredicate } from 'jsonmongoquery'

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

test('$gte single depth', () => {
  const predicate = queryToPredicate({ quantity: { $gte: 20 } })
  const result = data.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?.item).toBe('nuts')
  expect(result[1]?.item).toBe('bolts')
})

test('$gte dot notation', () => {
  const predicate = queryToPredicate({ 'carrier.fee': { $gte: 3 } })
  const result = data.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?.item).toBe('nuts')
  expect(result[1]?.item).toBe('bolts')
})

test('$gte missing dot notation', () => {
  const predicate = queryToPredicate({ 'carrier.fee.none': { $gte: 4 } })
  const result = data.filter(predicate)
  expect(result).toHaveLength(0)
})
