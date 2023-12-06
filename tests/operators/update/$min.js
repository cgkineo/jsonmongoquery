import { queryToPredicate, updateToPredicate } from 'jsonmongoquery'

const data1 = [
  { _id: 1, item: 'Hats', highScore: 800, lowScore: 200, nullish: null }
]

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

test('$min top level fields', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $min: { lowScore: 150 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.lowScore).toBe(150)
})

test('$min top level fields mismatched type 1', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $min: { highScore: 'tester' }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.highScore).toBe(800)
})

test('$min top level fields mismatched type 2', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $min: { highScore: null }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.highScore).toBe(null)
})

test('$min missing field', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $min: { test: 2 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.test).toBe(2)
})
