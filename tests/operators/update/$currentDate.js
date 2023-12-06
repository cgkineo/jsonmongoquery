import { queryToPredicate, updateToPredicate, Context } from 'jsonmongoquery'

const data1 = [
  { _id: 1, status: 'a', lastModified: '2013-10-02T01:11:18.965Z' }
]

function clone (json) {
  return JSON.parse(JSON.stringify(json))
}

test('$currentDate top level fields', () => {
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $currentDate: {
      lastModified: true,
      'cancellation.date': { $type: 'timestamp' }
    },
    $set: {
      'cancellation.reason': 'user request',
      status: 'D'
    }
  })
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.cancellation.date).toBe((new Date(updated[0]?.lastModified)).valueOf())
  expect(updated[0]?.lastModified).toBe((new Date(updated[0]?.cancellation.date)).toISOString())
})

test('$currentDate specified', () => {
  const date1 = new Date('2011-10-04')
  const context = new Context({ date: date1 })
  const data = clone(data1)
  const predicate = queryToPredicate({ _id: 1 })
  const result = data.filter(predicate)
  const updater = updateToPredicate({
    $currentDate: {
      lastModified: true,
      'cancellation.date': { $type: 'timestamp' }
    },
    $set: {
      'cancellation.reason': 'user request',
      status: 'D'
    }
  }, { context })
  const date2 = new Date('2012-10-04')
  context.date = date2
  const updated = result.filter(updater)
  expect(updated).toHaveLength(1)
  expect(updated[0]?.cancellation.date).toBe(date2.valueOf())
  expect(updated[0]?.lastModified).toBe(date2.toISOString())
})

test('$currentDate invalid type definition', () => {
  expect(() => {
    updateToPredicate({
      $currentDate: {
        lastModified: false,
        'cancellation.date': { $type: 'error' }
      }
    }, { validate: true })
  }).toThrow('$currentDate.cancellation.date.$type: must be equal to one of the allowed values')
  expect(() => {
    updateToPredicate({
      $currentDate: {
        lastModified: false,
        'cancellation.date': { $type: 'error' }
      }
    })
  }).toThrow('$currentDate has invalid type definiton')
})
