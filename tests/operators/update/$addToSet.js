import { queryToPredicate } from 'json-mongo-query';

const data1 = [
  { _id: 1, item: "polarizing_filter", tags: [ "electronics", "camera" ] },
  { _id: 2, item: "cable", tags: [ "electronics", "supplies" ] }
];

function clone(json) {
  return JSON.parse(JSON.stringify(json));
}

test('$addToSet add to array', () => {
  const data = clone(data1);
  const predicate = queryToPredicate({ _id: 1 });
  const result = data.filter(predicate);
  const updater = queryToPredicate({ $addToSet: { tags: "accessories" } });
  const updated = result.filter(updater);
  expect(updated[0]?.tags).toHaveLength(3);
  expect(updated[0]?.tags[0]).toBe("electronics");
  expect(updated[0]?.tags[1]).toBe("camera");
  expect(updated[0]?.tags[2]).toBe("accessories");
});

test('$addToSet value already exists', () => {
  const data = clone(data1);
  const predicate = queryToPredicate({ _id: 1 });
  const result = data.filter(predicate);
  const updater = queryToPredicate({ $addToSet: { tags: "camera" } });
  const updated = result.filter(updater);
  expect(updated[0]?.tags).toHaveLength(2);
  expect(updated[0]?.tags[0]).toBe("electronics");
  expect(updated[0]?.tags[1]).toBe("camera");
});

test('$addToSet each modifier', () => {
  const data = clone(data1);
  const predicate = queryToPredicate({ _id: 2 });
  const result = data.filter(predicate);
  const updater = queryToPredicate({ $addToSet: { tags: { $each: [ "camera", "electronics", "accessories" ] } } });
  const updated = result.filter(updater);
  expect(updated[0]?.tags).toHaveLength(4);
  expect(updated[0]?.tags[0]).toBe("electronics");
  expect(updated[0]?.tags[1]).toBe("supplies");
  expect(updated[0]?.tags[2]).toBe("camera");
  expect(updated[0]?.tags[3]).toBe("accessories");
});
