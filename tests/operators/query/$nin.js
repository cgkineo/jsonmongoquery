import { queryToPredicate } from 'json-mongo-query';

const data1 = [
  { "item": "Pens", "quantity": 350, "tags": [ "school", "office" ] },
  { "item": "Erasers", "quantity": 15, "tags": [ "school", "home" ] },
  { "item": "Maps", "tags": [ "office", "storage" ] },
  { "item": "Books", "quantity": 5, "tags": [ "school", "storage", "home" ] }
];

test('$nin match values', () => {
  const predicate = queryToPredicate({ quantity: { $nin: [ 5, 15 ] } });
  const result = data1.filter(predicate);
  expect(result).toHaveLength(2);
  expect(result[0]?.item).toBe('Pens');
  expect(result[1]?.item).toBe('Maps');
})

test('$nin match elements not in an array', () => {
  const predicate = queryToPredicate({ tags: { $nin: [ "school" ] } },);
  const result = data1.filter(predicate);
  expect(result).toHaveLength(1);
  expect(result[0]?.item).toBe('Maps');
})

test('$nin called without array', () => {
  expect(() => {
    queryToPredicate({ tags: { $nin: 1 } });
  }).toThrow('$nin must specify an array');
});