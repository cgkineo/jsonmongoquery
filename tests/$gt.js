import { queryToPredicate } from 'json-mongodb-query';

const data = [
  {
     "item": "nuts", "quantity": 30,
     "carrier": { "name": "Shipit", "fee": 3 }
  },
  {
     "item": "bolts", "quantity": 50,
     "carrier": { "name": "Shipit", "fee": 4 }
  },
  {
     "item": "washers", "quantity": 10,
     "carrier": { "name": "Shipit", "fee": 1 }
  }
];

test('$gt single depth', () => {
  const predicate = queryToPredicate({ quantity: { $gt: 20 } });
  const result = data.filter(predicate);
  expect(result).toHaveLength(2);
  expect(result[0]?.item).toBe('nuts');
  expect(result[1]?.item).toBe('bolts');
});

test('$gt dot notation', () => {
  const predicate = queryToPredicate({ 'carrier.fee': { $gt: 3 } });
  const result = data.filter(predicate);
  expect(result).toHaveLength(1);
  expect(result[0]?.item).toBe('bolts');
})

test('$gt missing dot notation', () => {
  const predicate = queryToPredicate({ 'carrier.fee.none': { $gt: 4 } });
  const result = data.filter(predicate);
  expect(result).toHaveLength(0);
})
