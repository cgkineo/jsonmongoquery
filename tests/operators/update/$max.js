import { queryToPredicate, updateToPredicate } from 'jsonmongoquery'

const data1 = [
  { _id: 1, item: 'Hats', highScore: 800, lowScore: 200, nullish: null }
]

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

test('$max top level fields', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $max: { highScore: 950 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.highScore).toBe(950)
})

test('$max top level fields mismatched type 1', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $max: { highScore: null }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.highScore).toBe(800)
})

test('$max top level fields mismatched type 2', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $max: { nullish: 12 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.nullish).toBe(12)
})

test('$max missing field', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $max: { test: 2 }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.test).toBe(2)
})
