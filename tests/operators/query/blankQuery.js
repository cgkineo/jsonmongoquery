import { queryToPredicate } from 'jsonmongoquery'

const data1 = [
  { _id: 1, item: { name: 'ab', code: '123' }, qty: 15, tags: ['A', 'B', 'C'] },
  { _id: 2, item: { name: 'cd', code: '123' }, qty: 20, tags: ['B'] },
  { _id: 3, item: { name: 'ij', code: '456' }, qty: 25, tags: ['A', 'B'] },
  { _id: 4, item: { name: 'xy', code: '456' }, qty: 30, tags: ['B', 'A'] },
  { _id: 5, item: { name: 'mn', code: '000' }, qty: 20, tags: [['A', 'B'], 'C'] }
]

test('blank query', () => {
  const predicate = queryToPredicate({ })
  const results = data1.filter(predicate)
  expect(results).toHaveLength(0)
})
