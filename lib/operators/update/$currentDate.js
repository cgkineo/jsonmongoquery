import {
  pathParse,
  pathCreate
} from '../../paths.js'

const TYPE = {
  TIMESTAMP: 1,
  DATE: 2
}

export default function $currentDate (queryPart) {
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
    const timestamp = Date.now()
    const isoString = (new Date(timestamp)).toISOString()
    entries.forEach(([keys, type]) => {
      const value = (type === TYPE.DATE)
        ? isoString
        : timestamp
      pathCreate(values, keys, (oldValue, key, parent) => {
        parent[key] = value
      })
    })
    return true
  }
}
