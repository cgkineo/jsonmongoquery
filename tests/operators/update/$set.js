import { queryToPredicate } from 'json-mongo-query'

const data1 = [
  {
    _id: 100,
    quantity: 250,
    instock: true,
    reorder: false,
    details: { model: '14QQ', make: 'Clothes Corp' },
    tags: ['apparel', 'clothing'],
    ratings: [{ by: 'Customer007', rating: 4 }]
  }
]

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

test('$set top level fields', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 100 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({
    $set: {
      quantity: 500,
      details: { model: '2600', make: 'Fashionaires' },
      tags: ['coats', 'outerwear', 'clothing']
    }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.quantity).toBe(500)
  expect(updated[0]?.details.model).toBe('2600')
  expect(updated[0]?.tags[0]).toBe('coats')
  expect(updated[0]?.tags).toHaveLength(3)
})

test('$set fields in embedded documents', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 100 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({
    $set: { 'details.make': 'Kustom Kidz' }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.details.make).toBe('Kustom Kidz')
})

test('$set elements in arrays', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 100 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({
    $set:
      {
        'tags.1': 'rain gear',
        'ratings.0.rating': 2
      }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.tags[1]).toBe('rain gear')
  expect(updated[0]?.ratings[0].rating).toBe(2)
})

test('$set create dot notation', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 100 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({
    $set:
      {
        'missing.0.newfield': 'test'
      }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.missing).toBeInstanceOf(Object)
  expect(updated[0]?.missing[0]).toBeInstanceOf(Object)
  expect(updated[0]?.missing[0].newfield).toBe('test')
})

test('$set create dot notation 2', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 100 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({
    $set:
      {
        'tags.2.name': 'test'
      }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.tags).toBeInstanceOf(Array)
  expect(updated[0]?.tags[2].name).toBe('test')
})

test('$set create dot notation update embedded documents', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 100 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({
    $set:
      {
        'ratings.$[].name': 'test'
      }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.ratings[0].name).toBe('test')
})

test('$set create dot notation missed array', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 100 })
  const result = data.filter(predicate)
  const updater = queryToPredicate({
    $set:
      {
        'details.$[].name': 'test'
      }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
})

const data2 = [
  {
    _id: 100,
    quantity: 250,
    instock: true,
    reorder: false,
    details: { model: '14QQ', make: 'Clothes Corp' },
    tags: ['apparel', 'clothing'],
    ratings: [{ by: 'Customer007', rating: 4 }]
  },
  {
    _id: 200,
    quantity: 250,
    instock: true,
    reorder: false,
    details: { model: { part: '14QQ' }, make: 'Clothes Corp' },
    tags: ['apparel', 'clothing'],
    ratings: [{ by: 'Customer007', rating: 4 }]
  },
  {
    _id: 200,
    quantity: 250,
    instock: true,
    reorder: false,
    details: { model: { part: '14QQ' }, make: 'Clothes Corp' },
    tags: ['apparel', 'clothing'],
    ratings: ['a', 'b']
  }
]

test('$set create dot notation missed deep property', () => {
  const data = clone(data2)
  const updater = queryToPredicate({
    $set:
      {
        'details.make.part.test': 'test'
      }
  })
  const updated = data.filter(updater)
  expect(updated).toHaveLength(3)
})

test('$set create dot notation missed shallow property', () => {
  const data = clone(data2)
  const updater = queryToPredicate({
    $set:
      {
        'ratings.part.test': 'test'
      }
  })
  const updated = data.filter(updater)
  expect(updated).toHaveLength(3)
})
