import { queryToPredicate, updateToPredicate } from 'json-mongo-query'

const data1 = [
  { _id: 1, scores: [44, 78, 38, 80] },
  { _id: 2, scores: [45, 78, 38, 80, 89] },
  { _id: 3, scores: [46, 78, 38, 80, 89] },
  { _id: 4, scores: [47, 78, 38, 80, 89] }
]

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

test('$push append a value to an array', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({ $push: { scores: 89 } })
  const updated = result.filter(updater)
  expect(updated[0]?.scores).toHaveLength(5)
  expect(updated[0]?.scores[0]).toBe(44)
  expect(updated[0]?.scores[1]).toBe(78)
  expect(updated[0]?.scores[2]).toBe(38)
  expect(updated[0]?.scores[3]).toBe(80)
  expect(updated[0]?.scores[4]).toBe(89)
})

test('$push make new array', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({ $push: { uscores: 'accessories' } })
  const updated = result.filter(updater)
  expect(updated[0]?.uscores).toHaveLength(1)
  expect(updated[0]?.uscores[0]).toBe('accessories')
})

test('$push on incorrect data type', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({ $push: { _id: 'accessories' } })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(0)
})

test('$push append a value to arrays in multiple documents', () => {
  const data = clone(data1)
  const updater = updateToPredicate({ $push: { scores: 95 } })
  const updated = data.filter(updater)
  updated.forEach((row, index) => {
    expect(row?.scores.length).toBe(data1[index].scores.length + 1)
    expect(row?.scores[row?.scores.length - 1]).toBe(95)
  })
})

test('$push append multiple values to an array', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({ $push: { scores: { $each: [90, 92, 85] } } })
  const updated = result.filter(updater)
  expect(updated[0]?.scores).toHaveLength(7)
  expect(updated[0]?.scores[0]).toBe(44)
  expect(updated[0]?.scores[1]).toBe(78)
  expect(updated[0]?.scores[2]).toBe(38)
  expect(updated[0]?.scores[3]).toBe(80)
  expect(updated[0]?.scores[4]).toBe(90)
  expect(updated[0]?.scores[5]).toBe(92)
  expect(updated[0]?.scores[6]).toBe(85)
})

const data2 = [
  {
    _id: 5,
    quizzes: [
      { wk: 1, score: 10 },
      { wk: 2, score: 8 },
      { wk: 3, score: 5 },
      { wk: 4, score: 6 }
    ]
  }
]

test('$push operator with multiple modifiers', () => {
  const data = clone(data2)
  const predicate = queryToPredicate({ _id: 5 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $push: {
      quizzes: {
        $each: [{ wk: 5, score: 8 }, { wk: 6, score: 7 }, { wk: 7, score: 6 }],
        $sort: { score: -1 },
        $slice: 3
      }
    }
  })
  const updated = result.filter(updater)
  expect(updated[0]?.quizzes).toHaveLength(3)
  expect(updated[0]?.quizzes[0].wk).toBe(1)
  expect(updated[0]?.quizzes[1].wk).toBe(2)
  expect(updated[0]?.quizzes[2].wk).toBe(5)
})

test('$push operator with multiple modifiers 2', () => {
  const data = clone(data2)
  const predicate = queryToPredicate({ _id: 5 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $push: {
      quizzes: {
        $each: [
          { wk: 5, score: 8 },
          { wk: 6, score: 7 },
          { wk: 7, score: 6 }],
        $sort: { score: -1 },
        $slice: -3
      }
    }
  })
  const updated = result.filter(updater)
  expect(updated[0]?.quizzes).toHaveLength(3)
  expect(updated[0]?.quizzes[0].wk).toBe(4)
  expect(updated[0]?.quizzes[1].wk).toBe(7)
  expect(updated[0]?.quizzes[2].wk).toBe(3)
})

test('$push operator with multiple modifiers 3', () => {
  const data = clone(data2)
  const predicate = queryToPredicate({ _id: 5 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $push: {
      quizzes: {
        $each: [
          { wk: 5, score: 8 },
          { wk: 6, score: 7 },
          { wk: 7, score: 6 }],
        $sort: { score: -1 },
        $slice: 0
      }
    }
  })
  const updated = result.filter(updater)
  expect(updated[0]?.quizzes).toHaveLength(0)
})
