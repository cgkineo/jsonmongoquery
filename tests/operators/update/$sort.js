import { queryToPredicate } from 'json-mongo-query'

const data1 = [
  {
    _id: 1,
    quizzes: [
      { id: 1, score: 6 },
      { id: 2, score: 9 }
    ]
  }
]

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

test('$sort array of documents by a field in the documents', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({
    $push: {
      quizzes: {
        $each: [{ id: 3, score: 8 }, { id: 4, score: 7 }, { id: 5, score: 6 }],
        $sort: { score: 1 }
      }
    }
  })
  const updated = result.filter(updater)
  expect(updated[0]?.quizzes).toHaveLength(5)
  expect(updated[0]?.quizzes[0].id).toBe(1)
  expect(updated[0]?.quizzes[1].id).toBe(5)
  expect(updated[0]?.quizzes[2].id).toBe(4)
  expect(updated[0]?.quizzes[3].id).toBe(3)
  expect(updated[0]?.quizzes[4].id).toBe(2)
})

const data2 = [
  { _id: 2, tests: [89, 70, 89, 50] }
]

test('$sort array that are not documents', () => {
  const data = clone(data2)
  const predicate = queryToPredicate({ _id: 2 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({
    $push: { tests: { $each: [40, 60], $sort: 1 } }
  })
  const updated = result.filter(updater)
  expect(updated[0]?.tests).toHaveLength(6)
  expect(updated[0]?.tests[0]).toBe(40)
  expect(updated[0]?.tests[1]).toBe(50)
  expect(updated[0]?.tests[2]).toBe(60)
  expect(updated[0]?.tests[3]).toBe(70)
  expect(updated[0]?.tests[4]).toBe(89)
  expect(updated[0]?.tests[5]).toBe(89)
})

const data3 = [
  { _id: 2, tests: [89, 70, 89, 50, "a", 91] }
]

test('$sort array that are not documents with type mismatch', () => {
  const data = clone(data3)
  const updater = queryToPredicate({
    $push: { tests: { $each: [], $sort: 1 } }
  })
  const updated = data.filter(updater)
  expect(updated[0].tests[5]).toBe('a');
})


const data4 = [
  {
    _id: 2,
    tests: [
      { number: 5, number2: 2, number3: 2 },
      { number: 4, number2: 2, number3: 2 },
      { number: 3, number2: 2, number3: 2 },
      { number: 2, number2: 2, number3: 2 },
      { number: 1, number2: 2, number3: 2 }
    ]
  }
]

test('$sort array of documents that are second order identical', () => {
  const data = clone(data4)
  const updater = queryToPredicate({
    $push: { tests: { $each: [], $sort: { number: 1, number2: 1, number3: 1 } } }
  })
  data.filter(updater)
})
