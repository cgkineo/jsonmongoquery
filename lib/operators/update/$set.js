import {
  pathParse,
  pathCreate
} from "../../paths.js";

export default function $set(queryPart) {
  const entries = Object.entries(queryPart).map(([path, value]) => {
    return [pathParse(path), value];
  });
  return function(values) {
    entries.forEach(([keys, value]) => pathCreate(values, keys, (oldValue, key, parent) => {
      parent[key] = value;
    }));
    return true;
  };
}
