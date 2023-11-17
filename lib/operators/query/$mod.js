import { isArray } from "../../is.js";

export default function $mod(queryPart) {
  if (!isArray(queryPart)) throw new Error('$mod must specify an array');
  if (queryPart.length < 2) throw new Error('malformed mod, not enough elements');
  if (queryPart.length > 2) throw new Error('malformed mod, too many elements');
  let [ divisor, remainder ] = queryPart;
  if (isNaN(divisor) || divisor === Infinity) throw new Error('invalid $mod divisor');
  if (isNaN(remainder) || remainder === Infinity) throw new Error('invalid $mod remainder');
  divisor = Math.floor(divisor);
  return function(value, path, parent) {
    if (isNaN(value) || value === Infinity) return false;
    return (value % divisor === remainder);
  };
}
