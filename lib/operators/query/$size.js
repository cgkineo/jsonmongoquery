import isEqualOrIsEmbeddedEqual from "./isEqualOrIsEmbeddedEqual.js";

export default function $size(queryPart) {
  return function(value) {
    return (value?.length === queryPart);
  };
}
