import { queryToPredicate, updateToPredicate } from 'jsonmongoquery'

const data1 = [
  { item: 'chisel', sku: 'C001', quantity: 4, instock: true, ratings: [{ by: 'Customer007', rating: 4 }] },
  { item: 'hammer', sku: 'unknown', quantity: 3, instock: true, ratings: [{ by: 'Customer007', rating: 4 }] },
  { item: 'nails', sku: 'unknown', quantity: 100, instock: true, ratings: [{ by: 'Customer007', rating: 4 }] }
]

test('$unset top level fields', () => {
  const predicate = queryToPredicate({ sku: 'unknown' })
  const result = data1.filter(predicate)
  const updater = updateToPredicate({
    $unset: { quantity: '', instock: '' }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(2)
  expect(updated[0]).not.toHaveProperty('quantity')
  expect(updated[0]).not.toHaveProperty('instock')
  expect(updated[1]).not.toHaveProperty('quantity')
  expect(updated[1]).not.toHaveProperty('instock')
})

test('$unset dot notation update embedded documents', () => {
  const updater = updateToPredicate({
    $unset:
      {
        'ratings.$[].by': ''
      }
  })
  const updated = data1.filter(updater)
  expect(updated).toHaveLength(3)
  expect(updated[0]?.ratings[0].by).toBeUndefined()
})

test('$unset dot notation missing field', () => {
  const updater = updateToPredicate({
    $unset:
      {
        'ratings.$[].none': ''
      }
  })
  const updated = data1.filter(updater)
  expect(updated).toHaveLength(0)
})
