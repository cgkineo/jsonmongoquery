import { queryToPredicate } from 'json-mongo-query'

const data1 = [
  1,
  {
    code: 'abc',
    tags: ['appliance', 'school', 'book'],
    qty: [
      { size: '6', num: 100, color: 'green' },
      { size: '6', num: 50, color: 'blue' },
      { size: '8', num: 100, color: 'brown' }
    ]
  }
]

test('wrong parent type', () => {
  const predicate = queryToPredicate({ code: { test: 1 } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(0)
})
