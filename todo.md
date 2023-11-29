### Tests
paths
sort
addToSet
push

### Other
1. check predicate factory parameters queryPart, parentPath, path, parentQueryPart
2. lexicographic vs numeric order is not currently supported https://www.mongodb.com/docs/manual/reference/operator/update/#behavior
3. fix $currentTime now value for length of query
4. implement $ and $[identifier] or throw error
5. predicate for update operators should return true for edited documents and false for unedited documents

