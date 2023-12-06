import { queryToPredicate } from 'jsonmongoquery'

const data = [
  { _id: 1, company: 'MongoDB' },
  { _id: 2, company: 'MongoDB2' }
]

test('$regex matches string', () => {
  const predicate = queryToPredicate({ company: { $regex: 'MongoDB' } })
  const result = data.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?.company).toBe('MongoDB')
  expect(result[1]?.company).toBe('MongoDB2')
})

test('$regex matches instance options', () => {
  const predicate = queryToPredicate({ company: { $regex: 'mongodb', $options: 'i' } })
  const result = data.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?.company).toBe('MongoDB')
  expect(result[1]?.company).toBe('MongoDB2')
})
