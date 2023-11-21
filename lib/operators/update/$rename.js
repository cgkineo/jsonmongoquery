import {
  pathParse,
  pathUpdate
} from "../../paths.js";

export default function $rename(queryPart) {
  const entries = Object.entries(queryPart).map(([path, name]) => {
    return [pathParse(path), name];
  });
  return function(values) {
    entries.forEach(([keys, name]) => pathUpdate(values, keys, (oldValue, key, parent) => {
      delete parent[key];
      delete parent[name];
      parent[name] = oldValue;
    }));
    return true;
  };
}
