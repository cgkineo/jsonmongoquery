import { isDocument, isArray, isDocumentOrArray } from "./is.js";

/**
 * Create and update a property value.
 * @param {Object|Array} object
 * @param {[string]|path} path dot notation string or keys array
 * @param {Function} modifier (value, key, parent) => {}
 * @throws {Cannot locate intermediate key: ${keys}}
 */
export function pathCreate(object, path, modifier) {
  return pathUpdate(object, path, modifier, { create: true });
}

/**
 * Update a property value or optionally create one.
 * @param {Object|Array} object
 * @param {[string]|path} path dot notation string or keys array
 * @param {Function} modifier (value, key, parent) => {}
 * @param {Object} [options={}]
 * @param {boolean} [options.create=false] Allow nested object creation
 */
export function pathUpdate (object, path, modifier, { create = false } = {}) {
  const keys = pathParse(path);
  const lastKey = keys.pop();
  const firstPath = keys;
  const finalObjects = firstPath.reduce((objects, key) => {
    if (!objects.length) return objects;
    if (key === '$[]') {
      return objects.flatMap(object => {
        if (!isArray(object)) return [];
        return object;
      });
    }
    // if the key is not an integer, flatten nested arrays down until non arrays
    if (isNaN(key)) objects = objects.flat(Infinity);
    return objects.flatMap(object => {
      if ((!isDocumentOrArray(object))) return [];
      if (create) {
        if (isDocument(object) && !(key in object)) {
          object[key] = {};
        }
        if (isArray(object) && !(key in object) && !isNaN(key)) {
          object[key] = {};
        }
      }
      const next = object[key];
      if ((!isDocumentOrArray(next))) return [];
      return [next];
    });
  }, [object])
  if (!finalObjects.length) return false;
  finalObjects.forEach(finalObject => {
    const value = finalObject[lastKey];
    modifier(value, lastKey, finalObject);
  });
  return true;
}

/**
 * Get a property value
 * @param {Object|Array} object
 * @param {[string]|path} path
 * @returns {[any]}
 */
export function pathRead (object, path) {
  const keys = pathParse(path);
  const finalObjects = keys.reduce((objects, key) => {
    if (key === '$[]') {
      return objects.flatMap(object => {
        if (!isArray(object)) return [];
        return object;
      });
    }
    // if the key is not an integer, flatten nested arrays down until non arrays
    if (isNaN(key)) objects = objects.flat(Infinity);
    return objects.flatMap(object => {
      if ((!isDocumentOrArray(object)) || !(key in object)) return [];
      return [object[key]]
    });
  }, [object])
  if (!finalObjects.length) return undefined;
  return finalObjects;
}

/**
 * Splits string dot notation path into an array of keys.
 * @param {string} path
 * @returns {[string]}
 */
export function pathParse(path) {
  if (isArray(path)) return path.slice(0);
  return String(path).split('.');
}

/**
 * Join dot notation paths 'name.0', 'test' = 'name.0.test'.
 * @param  {...string} args Paths to join
 * @returns {string}
 */
export function pathsJoin(...args) {
  if (!args[0]) args.shift();
  return args.join('.');
}

/**
 * Returns true/false if the value has the specific path.
 * @param {any} value
 * @param {string} path dot notation path
 * @returns {boolean}
 */
export function pathHas(value, path) {
  const keys = pathParse(path);
  const lastKey = keys.pop();
  const firstPath = keys;
  const parents = pathRead(value, firstPath);
  return parents.some(parent => {
    return Boolean(isDocumentOrArray(parent) && Object.hasOwn(parent, lastKey));
  });
}
