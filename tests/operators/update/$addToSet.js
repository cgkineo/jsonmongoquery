import { queryToPredicate, updateToPredicate } from 'json-mongo-query'

const data1 = [
  { _id: 1, item: 'polarizing_filter', tags: ['electronics', 'camera'] },
  { _id: 2, item: 'cable', tags: ['electronics', 'supplies'] }
]

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

test('$addToSet add to array', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({ $addToSet: { tags: 'accessories' } })
  const updated = result.filter(updater)
  expect(updated[0]?.tags).toHaveLength(3)
  expect(updated[0]?.tags[0]).toBe('electronics')
  expect(updated[0]?.tags[1]).toBe('camera')
  expect(updated[0]?.tags[2]).toBe('accessories')
})

test('$addToSet make new array', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({ $addToSet: { utags: 'accessories' } })
  const updated = result.filter(updater)
  expect(updated[0]?.utags).toHaveLength(1)
  expect(updated[0]?.utags[0]).toBe('accessories')
})

test('$addToSet on incorrect data type', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({ $addToSet: { item: 'accessories' } })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(0)
})

test('$addToSet value already exists', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({ $addToSet: { tags: 'camera' } })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(0)
})

test('$addToSet each modifier', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 2 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({ $addToSet: { tags: { $each: ['camera', 'electronics', 'accessories'] } } })
  const updated = result.filter(updater)
  expect(updated[0]?.tags).toHaveLength(4)
  expect(updated[0]?.tags[0]).toBe('electronics')
  expect(updated[0]?.tags[1]).toBe('supplies')
  expect(updated[0]?.tags[2]).toBe('camera')
  expect(updated[0]?.tags[3]).toBe('accessories')
})
