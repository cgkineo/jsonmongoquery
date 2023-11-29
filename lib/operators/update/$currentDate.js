import {
  pathParse,
  pathCreate
} from '../../paths.js'
/** @typedef {import("../../Context").default} Context */

const TYPE = {
  TIMESTAMP: 1,
  DATE: 2
}

/**
 *
 * @param {*} queryPart
 * @param {Context} context
 * @returns
 */
export default function $currentDate (queryPart, context) {
  const entries = Object.entries(queryPart).map(([path, typeDefinition]) => {
    const type = (typeDefinition === true || typeDefinition?.$type === 'date')
      ? TYPE.DATE
      : (typeDefinition === false || typeDefinition?.$type === 'timestamp')
          ? TYPE.TIMESTAMP
          : null
    if (type === null) throw new Error('$currentDate has invalid type definiton')
    return [pathParse(path), type]
  })
  return function (values) {
    let didUpdate = false
    const timestamp = context.date.getTime()
    const isoString = context.date.toISOString()
    entries.forEach(([keys, type]) => {
      const value = (type === TYPE.DATE)
        ? isoString
        : timestamp
      pathCreate(values, keys, (oldValue, key, parent) => {
        parent[key] = value
        didUpdate = true
      })
    })
    return didUpdate
  }
}
