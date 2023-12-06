import { queryToPredicate, updateToPredicate } from 'jsonmongoquery'

const data1 = [
  {
    _id: 1,
    alias: ['The American Cincinnatus', 'The American Fabius'],
    mobile: '555-555-5555',
    nmae: { first: 'george', last: 'washington' }
  },
  {
    _id: 2,
    alias: ['My dearest friend'],
    mobile: '222-222-2222',
    nmae: { first: 'abigail', last: 'adams' }
  },
  {
    _id: 3,
    alias: ['Amazing grace'],
    mobile: '111-111-1111',
    nmae: { first: 'grace', last: 'hopper' },
    names: [{ first: 'grace', last: 'hopper' }]
  }
]

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

test('$rename a field', () => {
  const data = clone(data1)
  const updater = updateToPredicate({ $rename: { nmae: 'name' } })
  const updated = data.filter(updater)
  expect(updated).toHaveLength(3)
  expect(updated[0]?.name).toBeInstanceOf(Object)
  expect(updated[1]?.name).toBeInstanceOf(Object)
  expect(updated[2]?.name).toBeInstanceOf(Object)
  expect(updated[0]?.nmae).toBeUndefined()
  expect(updated[1]?.nmae).toBeUndefined()
  expect(updated[2]?.nmae).toBeUndefined()
})

test('$rename a field in an embedded document', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({ $rename: { 'nmae.first': 'nmae.fname' } })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.nmae.fname).toBe('george')
  expect(updated[0]?.nmae.first).toBeUndefined()
})

test('$rename to move a field from an embedded document', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({ $rename: { 'nmae.first': 'firstname' } })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.firstname).toBe('george')
  expect(updated[0]?.nmae.first).toBeUndefined()
})

test('$rename a field that does not exist', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({ $rename: { wife: 'spouse' } })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.spouse).toBeUndefined()
})

test('$rename to move a field to created a missing nested document', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $rename: {
      'nmae.first': 'details.name.first',
      'nmae.last': 'details.name.last',
      mobile: 'details.mobile'
    }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.details).toBeInstanceOf(Object)
  expect(updated[0]?.details.name).toBeInstanceOf(Object)
})
