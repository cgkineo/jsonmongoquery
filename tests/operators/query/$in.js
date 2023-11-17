import { queryToPredicate } from 'json-mongo-query';

const data1 = [
  { "item": "Pens", "quantity": 350, "tags": [ "school", "office" ] },
  { "item": "Erasers", "quantity": 15, "tags": [ "school", "home" ] },
  { "item": "Maps", "tags": [ "office", "storage" ] },
  { "item": "Books", "quantity": 5, "tags": [ "school", "storage", "home" ] }
];

test('$in match values', () => {
  const predicate = queryToPredicate({ quantity: { $in: [ 5, 15 ] } });
  const result = data1.filter(predicate);
  expect(result).toHaveLength(2);
  expect(result[0]?.item).toBe('Erasers');
  expect(result[1]?.item).toBe('Books');
});

test('$in match values in an array', () => {
  const predicate = queryToPredicate({ tags: { $in: [ "home", "school" ] } });
  const result = data1.filter(predicate);
  expect(result).toHaveLength(3);
  expect(result[0]?.item).toBe('Pens');
  expect(result[1]?.item).toBe('Erasers');
  expect(result[2]?.item).toBe('Books');
});

test('$in match regex in an array', () => {
  const predicate = queryToPredicate({ tags: { $in: [ /^be/, /^st/ ] } });
  const result = data1.filter(predicate);
  expect(result).toHaveLength(2);
  expect(result[0]?.item).toBe('Maps');
  expect(result[1]?.item).toBe('Books');
});

test('$in called without array', () => {
  expect(() => {
    queryToPredicate({ tags: { $in: 1 } });
  }).toThrow('$in must specify an array');
});