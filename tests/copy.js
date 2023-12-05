import copy from 'json-mongo-query/lib/copy.js'

test('copy object, array', () => {
  const original = {
    nestedArray: [
      {
        nestedObject: {
          number: 1,
          string: 'string'
        }
      }
    ]
  }
  const cloned = copy(original)
  expect(cloned.nestedArray[0].nestedObject.number).toBe(1)
  expect(cloned.nestedArray[0].nestedObject.string).toBe('string')
  expect(cloned.nestedArray).not.toBe(original.nestedArray)
  expect(cloned.nestedArray[0].nestedObject).not.toBe(original.nestedArray[0].nestedObject)
})

test('copy symbol', () => {
  const original = {
    nestedArray: [
      {
        nestedObject: {
          symbol: Symbol('test')
        }
      }
    ]
  }
  expect(() => {
    copy(original)
  }).toThrow('Unsupported data type symbol')
})
