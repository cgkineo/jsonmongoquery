import { queryToPredicate } from 'json-mongo-query';

const data1 = [
  { "item": "Pen", "quantity": 350, "price": 1.99 },
  { "item": "Eraser", "quantity": 15, "price": 10.00 },
  { "item": "Ruler", "quantity": 50, "price": 0.99, "sale": false },
  { "item": "Map", "quantity": 50, "price": 0.99, "sale": true },
  { "item": "Chair", "quantity": 5, "price": 1.99, "sale": false },
  { "item": "Book", "quantity": 5, "price": 1.99, "sale": true },
  { "item": "Pencil", "quantity": 325, "price": 10.00, "sale": true },
  { "item": "Desk", "quantity": 5 }
];

test('$and with multiple expressions specifying the same field explicit', () => {
  const predicate = queryToPredicate( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] });
  const result = data1.filter(predicate);
  expect(result).toHaveLength(4);
  expect(result[0]?.item).toBe('Eraser');
  expect(result[1]?.item).toBe('Ruler');
  expect(result[2]?.item).toBe('Map');
  expect(result[3]?.item).toBe('Pencil');
});

test('$and with multiple expressions specifying the same field implicit', () => {
  const predicate = queryToPredicate({ price: { $ne: 1.99, $exists: true } });
  const result = data1.filter(predicate);
  expect(result).toHaveLength(4);
  expect(result[0]?.item).toBe('Eraser');
  expect(result[1]?.item).toBe('Ruler');
  expect(result[2]?.item).toBe('Map');
  expect(result[3]?.item).toBe('Pencil');
});

test('$and with multiple expressions specifying the same operator', () => {
  const predicate = queryToPredicate({
    $and: [
      { $or: [ { quantity: { $lt : 10 } }, { quantity : { $gt: 50 } } ] },
      { $or: [ { sale: true }, { price : { $lt : 5 } } ] }
  ]
  });
  const result = data1.filter(predicate);
  expect(result).toHaveLength(4);
  expect(result[0]?.item).toBe('Pen');
  expect(result[1]?.item).toBe('Chair');
  expect(result[2]?.item).toBe('Book');
  expect(result[3]?.item).toBe('Pencil');
});

test('$and called without array', () => {
  expect(() => {
    queryToPredicate({ quantity: { $and: 1 } });
  }).toThrow('$and must specify an array');
});