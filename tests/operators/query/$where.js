import { queryToPredicate } from 'jsonmongoquery'

const data1 = [
  { _id: 12378, name: 'Steve', username: 'steveisawesome', first_login: '2017-01-01' },
  { _id: 2, name: 'Anya', username: 'anya', first_login: '2001-02-02' }
]

test('$where string', () => {
  const predicate = queryToPredicate({
    $where: 'return (this.name === "Anya");'
  })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(1)
  expect(result[0]?._id).toBe(2)
})

test('$where not spring', () => {
  expect(() => {
    queryToPredicate({ $where: 1 }, { validate: true })
  }).toThrow('$where: must be string')
  expect(() => {
    queryToPredicate({ $where: 1 })
  }).toThrow('$where must specify a string')
})
