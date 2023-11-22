import { queryToPredicate } from 'json-mongo-query';

const data1 = [
  {
    _id: 1,
    fruits: [ "apples", "pears", "oranges", "grapes", "bananas" ],
    vegetables: [ "carrots", "celery", "squash", "carrots" ]
  },
  {
    _id: 2,
    fruits: [ "plums", "kiwis", "oranges", "bananas", "apples" ],
    vegetables: [ "broccoli", "zucchini", "carrots", "onions" ]
  }
];

function clone(json) {
  return JSON.parse(JSON.stringify(json));
}

test('$pull values', () => {
  const data = clone(data1);
  const updater = queryToPredicate({ $pull: { fruits: { $in: [ "apples", "oranges" ] }, vegetables: "carrots" } });
  const updated = data.filter(updater);
  expect(updated).toHaveLength(2);
  expect(updated[0].fruits).toHaveLength(3);
  expect(updated[0].vegetables).toHaveLength(2);
  expect(updated[1].fruits).toHaveLength(3);
  expect(updated[1].vegetables).toHaveLength(3);
});

test('$pull not array', () => {
  const data = clone(data1);
  const predicate = queryToPredicate({ _id: 1 });
  const result = data.filter(predicate);
  const updater = queryToPredicate({ $pull: { _id: { $in: [ "apples", "oranges" ] } } });
  result.filter(updater);
});
