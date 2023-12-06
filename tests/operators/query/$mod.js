import { queryToPredicate } from 'jsonmongoquery'

const data1 = [
  { _id: 1, item: 'abc123', qty: 0 },
  { _id: 2, item: 'xyz123', qty: 5 },
  { _id: 3, item: 'ijk123', qty: 12 },
  { _id: 4, item: 'lmn123', qty: Infinity }
]

test('$mod to select documents', () => {
  const predicate = queryToPredicate({ qty: { $mod: [4, 0] } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?._id).toBe(1)
  expect(result[1]?._id).toBe(3)
})

test('$mod floating point 1', () => {
  const predicate = queryToPredicate({ qty: { $mod: [4.0, 0] } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?._id).toBe(1)
  expect(result[1]?._id).toBe(3)
})

test('$mod floating point 2', () => {
  const predicate = queryToPredicate({ qty: { $mod: [4.5, 0] } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?._id).toBe(1)
  expect(result[1]?._id).toBe(3)
})

test('$mod floating point 3', () => {
  const predicate = queryToPredicate({ qty: { $mod: [4.99, 0] } })
  const result = data1.filter(predicate)
  expect(result).toHaveLength(2)
  expect(result[0]?._id).toBe(1)
  expect(result[1]?._id).toBe(3)
})

test('$mod not array', () => {
  expect(() => {
    queryToPredicate({ qty: { $mod: 1 } }, { validate: true })
  }).toThrow('qty.$mod: must be array')
  expect(() => {
    queryToPredicate({ qty: { $mod: 1 } })
  }).toThrow('$mod must specify an array')
})

test('$mod invalid divisor', () => {
  expect(() => {
    queryToPredicate({ qty: { $mod: [Infinity, 1] } }, { validate: true })
  }).toThrow('qty.$mod.0: must be number')
  expect(() => {
    queryToPredicate({ qty: { $mod: [Infinity, 1] } })
  }).toThrow('invalid $mod divisor')
})

test('$mod invalid remainder', () => {
  expect(() => {
    queryToPredicate({ qty: { $mod: [1, Infinity] } }, { validate: true })
  }).toThrow('qty.$mod.1: must be number')
  expect(() => {
    queryToPredicate({ qty: { $mod: [1, Infinity] } })
  }).toThrow('invalid $mod remainder')
})

test('$mod malformed not enough elements', () => {
  expect(() => {
    queryToPredicate({ qty: { $mod: [4] } }, { validate: true })
  }).toThrow('qty.$mod: must NOT have fewer than 2 items')
  expect(() => {
    queryToPredicate({ qty: { $mod: [4] } })
  }).toThrow('malformed mod, not enough elements')
})

test('$mod malformed too many elements', () => {
  expect(() => {
    queryToPredicate({ qty: { $mod: [4, 0, 0] } }, { validate: true })
  }).toThrow('qty.$mod: must NOT have more than 2 items')
  expect(() => {
    queryToPredicate({ qty: { $mod: [4, 0, 0] } })
  }).toThrow('malformed mod, too many elements')
})
