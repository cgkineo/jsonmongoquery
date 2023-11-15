import {
  isAbsoluteValue,
  isArray,
  isDocument
} from '../is.js';
import {
  pathRead,
  pathsJoin
} from '../paths.js';
import isEqualOrIsEmbeddedEqual from "../operators/query/isEqualOrIsEmbeddedEqual.js";
import UPDATE_OPERATORS from '../operators/UPDATE_OPERATORS.js';
import QUERY_OPERATORS from '../operators/QUERY_OPERATORS.js';

const queryOperatorNames = Object.keys(QUERY_OPERATORS);
const updateOperatorNames = Object.keys(UPDATE_OPERATORS);

export default function queryToPredicate(queryPart, parentPath = '', path = '') {
  if (!isDocument(queryPart)) {
    return isEqualOrIsEmbeddedEqual(queryPart, { isExplicitRegExp: false });
  }
  const attributes = Object.entries(queryPart);
  const badOperators = attributes.filter(([name]) => {
    return name[0] === '$' && !QUERY_OPERATORS[name] && !UPDATE_OPERATORS[name];
  });
  if (badOperators.length) {
    throw new Error(`Operator ${badOperators[0][0]} is not supported`);
  }
  const queryOperators = attributes
    .filter(([path]) => {
      return queryOperatorNames.includes(path);
    })
    .map(([name, queryPart]) => {
      return [name, QUERY_OPERATORS[name](queryPart, pathsJoin(parentPath, name), name)];
    });
  const nonOperators = attributes
    .filter(([path]) => {
      return !queryOperatorNames.includes(path) && !updateOperatorNames.includes(path);
    });
  const absolutes = nonOperators
    .filter(([,queryPart]) => {
      return isAbsoluteValue(queryPart);
    });
  const descendants = nonOperators
    .filter(([,queryPart]) => {
      return isDocument(queryPart);
    })
    .map(([path, queryPart]) => {
      return [path, queryToPredicate(queryPart, pathsJoin(parentPath, path), path)];
    });
  const updateOperators = attributes
    .filter(([path]) => {
      return updateOperatorNames.includes(path);
    })
    .map(([name, queryPart]) => {
      return [name, UPDATE_OPERATORS[name](queryPart, pathsJoin(parentPath, name), name)];
    });
  return function(value, path, parent) {
    if (!attributes.length) return false;
    const haveQueryOperatorsPassed = queryOperators.every(([, predicate]) => {
      return predicate(value, path, parent);
    });
    if (!haveQueryOperatorsPassed) return false;
    const haveAbsolutesPassed = absolutes.every(([path, value2]) => {
      const pathEntries = pathRead(value, path);
      return pathEntries?.some(item => (item === value2));
    });
    if (!haveAbsolutesPassed) return false;
    if (descendants.length && !isDocument(value) && !isArray(value)) return false;
    const haveDescendantsPassed = descendants.every(([path, predicate]) => {
      const pathEntries = pathRead(value, path);
      return pathEntries?.some(item => predicate(item, path, value))
    });
    if (!haveDescendantsPassed) return false;
    updateOperators.forEach(([, updater]) => {
      updater(value, path, parent);
    });
    return true;
  };
}
