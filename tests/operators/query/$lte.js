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

test('$lte single depth', () => {
  const predicate = queryToPredicate({ quantity: { $lte: 20 } })
  const result = data.filter(predicate)
  expect(result).toHaveLength(1)
  expect(result[0]?.item).toBe('washers')
})

test('$lte dot notation', () => {
  const predicate = queryToPredicate({ 'carrier.fee': { $lte: 4 } })
  const result = data.filter(predicate)
  expect(result).toHaveLength(3)
  expect(result[0]?.item).toBe('nuts')
  expect(result[1]?.item).toBe('bolts')
  expect(result[2]?.item).toBe('washers')
})

test('$lte missing dot notation', () => {
  const predicate = queryToPredicate({ 'carrier.fee.none': { $lte: 4 } })
  const result = data.filter(predicate)
  expect(result).toHaveLength(0)
})
