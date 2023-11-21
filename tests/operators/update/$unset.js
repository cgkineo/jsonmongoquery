import { queryToPredicate } from 'json-mongo-query';

const data1 = [
  { "item": "chisel", "sku": "C001", "quantity": 4, "instock": true },
  { "item": "hammer", "sku": "unknown", "quantity": 3, "instock": true },
  { "item": "nails", "sku": "unknown", "quantity": 100, "instock": true }
]

test('$unset top level fields', () => {
  const predicate = queryToPredicate({ sku: "unknown" });
  const result = data1.filter(predicate);
  const updater = queryToPredicate({
    $unset: { quantity: "", instock: "" }
  });
  const updated = result.filter(updater);
  expect(updated).toHaveLength(2);
  expect(updated[0]).not.toHaveProperty('quantity');
  expect(updated[0]).not.toHaveProperty('instock');
  expect(updated[1]).not.toHaveProperty('quantity');
  expect(updated[1]).not.toHaveProperty('instock');
});

// todo: $[]
// todo: nested array bits