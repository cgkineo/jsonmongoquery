import { TYPE_ORDER, getType, isDocument } from './is.js'
import { pathRead } from './paths.js'

export function sortDirectionToCompare (direction, path = '') {
  return function (itemA, itemB) {
    let comparisonDirection = 0
    const valuesA = pathRead(itemA, path)
    const valuesB = pathRead(itemB, path)
    const valueA = valuesA[0]
    const valueB = valuesB[0]
    const typeA = getType(valueA)
    const typeB = getType(valueB)
    const typeOrderA = TYPE_ORDER[typeA]
    const typeOrderB = TYPE_ORDER[typeB]
    comparisonDirection = (typeOrderA > typeOrderB)
      ? 1
      : (typeOrderA < typeOrderB)
          ? -1
          : (valueA > valueB)
              ? 1
              : (valueA < valueB)
                  ? -1
                  : 0
    return (comparisonDirection * direction)
  }
}

export function sortSpecificationToCompare (sortSpecification) {
  const predicates = Object.entries(sortSpecification).map(([path, direction]) => sortDirectionToCompare(direction, path))
  return function (itemA, itemB) {
    return predicates.reduce((result, predicate) => {
      const outcome = predicate(itemA, itemB)
      if (!result) return outcome
      return result
    }, 0)
  }
}

export function sortToCompare (queryPart) {
  const isSortSpecification = isDocument(queryPart)
  return isSortSpecification
    ? sortSpecificationToCompare(queryPart)
    : sortDirectionToCompare(queryPart)
}
