import { queryToPredicate } from 'jsonmongoquery'

const data1 = [
  { saffron: 5, cinnamon: 5, mustard: null },
  { saffron: 3, cinnamon: null, mustard: 8 },
  { saffron: null, cinnamon: 3, mustard: 9 },
  { saffron: 1, cinnamon: 2, mustard: 3 },
  { saffron: 2, mustard: 5 },
  { saffron: 3, cinnamon: 2 },
  { saffron: 4 },
  { cinnamon: 2, mustard: 4 },
  { cinnamon: 2 },
  { mustard: 6 }
]

test('$exists single', () => {
  const predicate = queryToPredicate({ saffron: { $exists: true } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(7)
})

test('$exists single 1', () => {
  const predicate = queryToPredicate({ cinnamon: { $exists: false } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(3)
})
