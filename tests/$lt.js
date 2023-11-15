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

test('$lt single depth', () => {
  const predicate = queryToPredicate({ quantity: { $lt: 20 } });
  const result = data.filter(predicate);
  expect(result).toHaveLength(1);
  expect(result[0]?.item).toBe('washers');
});

test('$lt dot notation', () => {
  const predicate = queryToPredicate({ 'carrier.fee': { $lt: 4 } });
  const result = data.filter(predicate);
  expect(result).toHaveLength(2);
  expect(result[0]?.item).toBe('nuts');
  expect(result[1]?.item).toBe('washers');
})

test('$lt missing dot notation', () => {
  const predicate = queryToPredicate({ 'carrier.fee.none': { $lt: 4 } });
  const result = data.filter(predicate);
  expect(result).toHaveLength(0);
})
