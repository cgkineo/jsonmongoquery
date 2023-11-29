import { queryToPredicate } from 'json-mongo-query'

const data1 = [
  { _id: 1, scores: [8, 9, 10] }
]

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

test('$pop remove first item', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({ $pop: { scores: -1 } })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.scores).toHaveLength(2)
  expect(updated[0]?.scores[0]).toBe(9)
  expect(updated[0]?.scores[1]).toBe(10)
})

test('$pop remove last item', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({ $pop: { scores: 1 } })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.scores).toHaveLength(2)
  expect(updated[0]?.scores[0]).toBe(8)
  expect(updated[0]?.scores[1]).toBe(9)
})

test('$pop invalid', () => {
  expect(() => {
    queryToPredicate({ $pop: { scores: 2 } })
  }).toThrow('$pop has invalid value')
})

test('$pop not array', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({ $pop: { _id: -1 } })
  result.filter(updater)
})
