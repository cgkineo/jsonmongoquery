import {
  pathParse,
  pathUpdate
} from "../../paths.js";

export default function $set(queryPart) {
  const entries = Object.entries(queryPart).map(([path, value]) => {
    return [pathParse(path), value];
  });
  return function(values) {
    entries.forEach(([keys, value]) => pathUpdate(values, keys, value));
    return true;
  };
}
