import { isDocument, isArray, isNumber } from "./is.js";

/**
 * todo: is pathCreate a different use-case to pathUpdate?
 * where we add arrays and objects up until the final value
 */

/**
 * Set a property value
 * @param {Object|Array} object
 * @param {[string]|path} path
 * @param {*} value
 * @throws {Cannot locate intermediate key: ${keys}}
 */
export function pathUpdate (object, path, value) {
  const keys = pathParse(path);
  const lastKey = keys.pop();
  const firstPath = keys;
  const finalObjects = firstPath.reduce((objects, key) => {
    if (key === '$[]') return objects.flatMap(object => object);
    return objects.flatMap(object => {
      if ((!isDocument(object) && !isArray(object)) || !(key in object)) return [];
      return [object[key]]
    });
  }, [object])
  if (!finalObjects.length) return false;
  finalObjects.forEach(finalObject => {
    finalObject[lastKey] = value;
  });
  return true;
}

/**
 * Delete a property value
 * @param {Object|Array} object
 * @param {[string]|path} path
 * @param {*} value
 * @throws {Cannot locate intermediate key: ${keys}}
 */
export function pathDelete (object, path, value) {
  const keys = pathParse(path);
  const lastKey = keys.pop();
  const firstPath = keys;
  const finalObjects = firstPath.reduce((objects, key) => {
    if (key === '$[]') return objects.flatMap(object => object);
    return objects.flatMap(object => {
      if ((!isDocument(object) && !isArray(object)) || !(key in object)) return [];
      return [object[key]]
    });
  }, [object])
  if (!finalObjects.length) return false;
  finalObjects.forEach(finalObject => {
    if (!Object.hasOwn(finalObject, lastKey)) return
    delete finalObject[lastKey];
  });
  return true;
}

function flattenDown(objects) {
  let shouldContinue = true;
  while (shouldContinue) {
    shouldContinue = false;
    objects = objects.flatMap(object => {
      const isA = isArray(object);
      shouldContinue = shouldContinue || isA;
      return isA ? object : [object];
    });
  }
  return objects;
}

/**
 * Get a property value
 * @param {Object|Array} object
 * @param {[string]|path} path
 * @returns {*}
 * @throws {Cannot locate intermediate key: ${keys}}
 */
export function pathRead (object, path) {
  const keys = pathParse(path);
  const finalObjects = keys.reduce((objects, key) => {
    if (key === '$[]') return objects.flatMap(object => object);
    // if the key is not an integer, flatten nested arrays down until non arrays
    if (isNaN(key)) objects = flattenDown(objects);
    return objects.flatMap(object => {
      if ((!isDocument(object) && !isArray(object)) || !(key in object)) return [];
      return [object[key]]
    });
  }, [object])
  if (!finalObjects.length) return undefined;
  return finalObjects;
}

export function pathParse(path) {
  if (isArray(path)) return path;
  return String(path).split('.');
}

export function pathsJoin(...args) {
  if (!args[0]) args.shift();
  return args.join('.');
}

export function pathHas(value, path) {
  const keys = pathParse(path);
  const lastKey = keys.pop();
  const firstPath = keys;
  const parents = pathRead(value, firstPath);
  return parents.some(parent => {
    return Boolean(isDocument(parent) && Object.hasOwn(parent, lastKey));
  });
}
