import { queryToPredicate } from 'json-mongo-query'

const data1 = [
  { _id: 1, item: 'Hats', highScore: 800, lowScore: 200 }
]

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

test('$max top level fields', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({
    $max: { highScore: 950 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.highScore).toBe(950)
})

test('$max non-numeric field', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({
    $max: { item: 2 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.item).toBe('Hats')
})

test('$max missing field', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({
    $max: { test: 2 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.test).toBe(2)
})
