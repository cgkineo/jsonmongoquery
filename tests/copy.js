import { copy } from 'json-mongo-query'

test('copy object, array, date and regexp', () => {
  const original = {
    nestedArray: [
      {
        nestedObject: {
          date: new Date(),
          regexp: /.*/g
        }
      }
    ]
  }
  const cloned = copy(original)
  expect(cloned.nestedArray[0].nestedObject.date).toBeInstanceOf(Date)
  expect(cloned.nestedArray[0].nestedObject.date).not.toBe(original.nestedArray[0].nestedObject.date)
  expect(cloned.nestedArray[0].nestedObject.date.getTime()).toBe(original.nestedArray[0].nestedObject.date.getTime())
  expect(cloned.nestedArray[0].nestedObject.regexp).toBeInstanceOf(RegExp)
  expect(cloned.nestedArray[0].nestedObject.regexp).not.toBe(original.nestedArray[0].nestedObject.regexp)
  expect(cloned.nestedArray[0].nestedObject.regexp.source).toBe(original.nestedArray[0].nestedObject.regexp.source)
  expect(cloned.nestedArray[0].nestedObject.regexp.flags).toBe(original.nestedArray[0].nestedObject.regexp.flags)
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
