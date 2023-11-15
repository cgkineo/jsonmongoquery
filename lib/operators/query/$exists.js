import { pathHas } from "../../paths.js";

export default function $exists(queryPart = true) {
  return function(value, path, parent) {
    const result = pathHas(parent, path);
    return Boolean(queryPart)
      ? result
      : !result;
  };
}
