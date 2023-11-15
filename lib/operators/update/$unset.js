import {
  pathParse,
  pathDelete
} from "../../paths.js";

export default function $unset(queryPart) {
  const entries = Object.entries(queryPart).map(([path, value]) => {
    return [pathParse(path), value];
  });
  return function(values) {
    entries.forEach(([keys, value]) => pathDelete(values, keys, value));
    return true;
  };
}
