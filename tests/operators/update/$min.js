import { queryToPredicate } from 'json-mongo-query'

const data1 = [
  { _id: 1, item: 'Hats', highScore: 800, lowScore: 200 }
]

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

test('$min top level fields', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({
    $min: { lowScore: 150 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.lowScore).toBe(150)
})

test('$mul non-numeric field', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({
    $min: { item: 2 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.item).toBe('Hats')
})

test('$min missing field', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({
    $min: { test: 2 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.test).toBe(2)
})
