import { queryToPredicate } from 'json-mongo-query';

const data1 = [
  {
    _id: 100,
    quantity: 250,
    instock: true,
    reorder: false,
    details: { model: "14QQ", make: "Clothes Corp" },
    tags: [ "apparel", "clothing" ],
    ratings: [ { by: "Customer007", rating: 4 } ]
  }
]

test('$set top level fields', () => {
  const predicate = queryToPredicate({ _id: 100 });
  const result = data1.filter(predicate);
  const updater = queryToPredicate({
    $set: {
      quantity: 500,
      details: { model: "2600", make: "Fashionaires" },
      tags: [ "coats", "outerwear", "clothing" ]
    }
  });
  const updated = result.filter(updater);
  expect(updated).toHaveLength(1);
  expect(updated[0]?.quantity).toBe(500);
  expect(updated[0]?.details.model).toBe("2600");
  expect(updated[0]?.tags[0]).toBe("coats");
  expect(updated[0]?.tags).toHaveLength(3);
});

test('$set fields in embedded documents', () => {
  const predicate = queryToPredicate({ _id: 100 });
  const result = data1.filter(predicate);
  const updater = queryToPredicate({
    $set: { "details.make": "Kustom Kidz" }
  });
  const updated = result.filter(updater);
  expect(updated).toHaveLength(1);
  expect(updated[0]?.details.make).toBe("Kustom Kidz");
});

test('$set elements in arrays', () => {
  const predicate = queryToPredicate({ _id: 100 });
  const result = data1.filter(predicate);
  const updater = queryToPredicate({
    $set:
      {
        "tags.1": "rain gear",
        "ratings.0.rating": 2
      }
  });
  const updated = result.filter(updater);
  expect(updated).toHaveLength(1);
  expect(updated[0]?.tags[1]).toBe("rain gear");
  expect(updated[0]?.ratings[0].rating).toBe(2);
});