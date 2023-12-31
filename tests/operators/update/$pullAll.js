import { queryToPredicate, updateToPredicate } from 'jsonmongoquery'

const data1 = [
  { _id: 1, scores: [0, 2, 5, 5, 1, 0] }
]

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

test('$pullAll values', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({ $pullAll: { scores: [0, 5] } })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.scores).toHaveLength(2)
  expect(updated[0]?.scores[0]).toBe(2)
  expect(updated[0]?.scores[1]).toBe(1)
})

test('$pullAll invalid', () => {
  expect(() => {
    updateToPredicate({ $pullAll: { scores: 1 } }, { validate: true })
  }).toThrow('$pullAll.scores: must be array')
  expect(() => {
    updateToPredicate({ $pullAll: { scores: 1 } })
  }).toThrow('$pullAll must specify an array')
})

test('$pullAll not array', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({ $pullAll: { _id: [0, 5] } })
  result.filter(updater)
})
