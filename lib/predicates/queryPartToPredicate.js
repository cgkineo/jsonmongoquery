import {
  isAbsoluteValue,
  isArray,
  isDocument,
  isDocumentOrArray
} from '../is.js'
import {
  pathRead
} from '../paths.js'
import isEqualOrIsEmbeddedEqual from '../operators/query/isEqualOrIsEmbeddedEqual.js'
import UPDATE_OPERATORS from '../operators/UPDATE_OPERATORS.js'
import QUERY_OPERATORS from '../operators/QUERY_OPERATORS.js'
import Context from '../Context.js'

const queryOperatorNames = Object.keys(QUERY_OPERATORS)
const updateOperatorNames = Object.keys(UPDATE_OPERATORS)

/**
 * From a JSON object containing query or update operators, generate a predicate function
 * @param {JMQ.Root} queryPart
 * @param {Context} context
 * @returns {Function}
 */
export default function queryPartToPredicate (queryPart, { context = new Context() } = {}) {
  context.value = queryPart
  if (!isDocument(queryPart)) {
    return isEqualOrIsEmbeddedEqual(queryPart)
  }
  const attributes = Object.entries(queryPart)
  const badOperators = attributes.filter(([name]) => {
    return name[0] === '$' && !QUERY_OPERATORS[name] && !UPDATE_OPERATORS[name]
  })
  if (badOperators.length) {
    throw new Error(`Operator ${badOperators[0][0]} is not supported`)
  }
  const queryOperators = attributes
    .filter(([path]) => {
      return queryOperatorNames.includes(path)
    })
    .map(([name, queryPart1]) => {
      if (typeof QUERY_OPERATORS[name] !== 'function') return null
      return [name, QUERY_OPERATORS[name](queryPart1, context.up(name))]
    })
    .filter(Boolean)
  const nonOperators = attributes
    .filter(([path]) => {
      return !queryOperatorNames.includes(path) && !updateOperatorNames.includes(path)
    })
  const absolutes = nonOperators
    .filter(([, queryPart1]) => {
      return isAbsoluteValue(queryPart1) || isArray(queryPart1)
    })
    .map(([path, queryPart1]) => {
      return [path, isEqualOrIsEmbeddedEqual(queryPart1)]
    })
  const descendants = nonOperators
    .filter(([, queryPart1]) => {
      return isDocument(queryPart1)
    })
    .map(([path, queryPart1]) => {
      return [path, queryPartToPredicate(queryPart1, context.up(path))]
    })
  const updateOperators = attributes
    .filter(([path]) => {
      return updateOperatorNames.includes(path)
    })
    .map(([name, queryPart1]) => {
      return [name, UPDATE_OPERATORS[name](queryPart1, context.up(name))]
    })
  const parentContext = context
  return function query (value, path = '', parent = null, context = parentContext.start(value)) {
    if (!attributes.length) return false
    const haveAbsolutesPassed = absolutes.every(([path, predicate]) => {
      const pathEntries = pathRead(value, path)
      return pathEntries?.some(item => predicate(item, path, value, context.up(path)))
    })
    if (!haveAbsolutesPassed) return false
    // use parent as in operator
    const haveQueryOperatorsPassed = queryOperators.every(([, predicate]) => {
      const pathEntries = pathRead(parent, path)
      if (!pathEntries?.length) return predicate(undefined, path, parent, context)
      return pathEntries?.some(item => predicate(item, path, parent, context))
    })
    if (!haveQueryOperatorsPassed) return false
    if (descendants.length && !isDocumentOrArray(value)) return false
    const haveDescendantsPassed = descendants.every(([path, predicate]) => {
      const pathEntries = pathRead(value, path)
      if (!pathEntries?.length) return predicate(undefined, path, value, context.up(path))
      return pathEntries?.some(item => predicate(item, path, value, context.up(path)))
    })
    if (!haveDescendantsPassed) return false
    let didUpdate = !updateOperators.length
    updateOperators.forEach(([, updater]) => {
      const returnValue = updater(value, path, parent, context)
      didUpdate = didUpdate || returnValue
    })
    return didUpdate
  }
}
