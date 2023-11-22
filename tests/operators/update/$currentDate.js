import { queryToPredicate } from 'json-mongo-query';

const data1 = [
  { _id: 1, status: "a", lastModified: "2013-10-02T01:11:18.965Z" }
]

function clone(json) {
  return JSON.parse(JSON.stringify(json));
}

test('$currentDate top level fields', () => {
  const data = clone(data1);
  const predicate = queryToPredicate({ _id: 1 });
  const result = data.filter(predicate);
  const updater = queryToPredicate({
    $currentDate: {
       lastModified: true,
       "cancellation.date": { $type: "timestamp" }
    },
    $set: {
       "cancellation.reason": "user request",
       status: "D"
    }
  });
  const updated = result.filter(updater);
  expect(updated).toHaveLength(1);
  expect(updated[0]?.cancellation.date).toBe((new Date(updated[0]?.lastModified)).valueOf());
  expect(updated[0]?.lastModified).toBe((new Date(updated[0]?.cancellation.date)).toISOString());
});

test('$currentDate invalid type definition', () => {
  expect(() => {
    queryToPredicate({
      $currentDate: {
         lastModified: false,
         "cancellation.date": { $type: "error" }
      }
    });
  }).toThrow('$currentDate has invalid type definiton');
});
