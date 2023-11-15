import { pathRead } from './lib/paths.js';
import queryToPredicate from './lib/predicates/queryToPredicate.js';

export {
  pathRead,
  queryToPredicate
}

export default {
  pathRead,
  queryToPredicate
}

// import { pathRead } from './lib/paths.js';
// import queryToPredicate from './lib/predicates/queryToPredicate.js';


// import fs from 'fs'
// const data = JSON.parse(fs.readFileSync('./test/data/data.json'));
// const components = JSON.parse(fs.readFileSync('./test/data/components.json'));

// const query = {
//   // _component: { $in: ['mcq','gmcq'] },
//   // "_feedback._partlyCorrect": { $exists: true }
//   // _items: {
//   //   $type: 'array',
//   //   $elemMatch: {
//   //       $type: 'object',
//   //       _shouldBeSelected: false
//   //   }
//   // }
//   "_items.$[]._shouldBeSelected": false
// }

// const update = {
//   $set: {
//     "_items.0._1shouldBeSelected": true
//   }
// }

// const _items = pathRead(components, '$[]._items.$[]') ?? [];
// console.log(_items);
// const _items2 = pathRead(components, '$[]._items.$[]._shouldBeSelected') ?? []; // components.flatMap(item => pathRead(item, '_items.$[]._shouldBeSelected') ?? []);
// console.log(_items2);
// const queryFunc = queryToPredicate(query);
// const result = components.filter(queryFunc);
// const updateFunc = queryToPredicate(update);
// const updated = result.filter(updateFunc);
// console.log(updated);

// debugger
