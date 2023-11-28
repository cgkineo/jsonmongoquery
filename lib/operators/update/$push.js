import { TYPE_ORDER, getType, isArray, isDocument } from "../../is.js";
import {
  pathParse,
  pathCreate,
  pathRead
} from "../../paths.js";
import { sortToCompare } from "../../sort.js";

export default function $push(queryPart) {
  const entries = Object.entries(queryPart).map(([path, value]) => {
    const options = (isDocument(value) && value.$each)
      ? value
      : { $each: [value] };
    if (!Object.hasOwn(options, '$position')) {
      options.$position = Number.MAX_SAFE_INTEGER;
    }
    if (Object.hasOwn(options, '$sort')) {
      options.$sort = sortToCompare(options.$sort);
    }
    return [
      pathParse(path),
      options
    ];
  });
  function doModifiers(parent, key, options) {
    if (options.$sort) {
      // https://www.mongodb.com/docs/manual/reference/operator/update/sort/#mongodb-update-up.-sort
      parent[key].sort(options.$sort);
    }
    if (options.$slice) {
      if (options.$slice === 0) parent[key].length = 0;
      else if (options.$slice < 0) parent[key] = parent[key].slice(options.$slice);
      else if (options.$slice > 0) parent[key] = parent[key].slice(0, options.$slice);
    }
  }
  return function(values) {
    entries.forEach(([keys, options]) => {
      pathCreate(values, keys, (oldValue, key, parent) => {
        if (!Object.hasOwn(parent, key)) {
          parent[key] = options.$each; // todo: clone data
          doModifiers(parent, key, options) ;
          return;
        }
        if (!isArray(oldValue)) return;
        parent[key].splice(options.$position, 0, ...options.$each); // todo: clone data
        doModifiers(parent, key, options);
      });
    });
    return true;
  };
}
