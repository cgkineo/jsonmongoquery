# jsonmongoquery

Mongodb query and update operators for json object arrays.

### Supported operators
#### [Comparison query operators](https://www.mongodb.com/docs/manual/reference/operator/query-comparison/)
* [$eq](https://www.mongodb.com/docs/manual/reference/operator/query/eq/) `{ field: { $eq: value } }`, `{ field: value }` Matches documents where the value of a field equals the specified value
* [$gt](https://www.mongodb.com/docs/manual/reference/operator/query/gt/) `{ field: { $gt: value } }` Selects those documents where the value of the specified field is greater than (i.e. >) the specified value
* [$gte](https://www.mongodb.com/docs/manual/reference/operator/query/gte/) `{ field: { $gte: value } }` Selects the documents where the value of the specified field is greater than or equal to (i.e. >=) a specified value
* [$in](https://www.mongodb.com/docs/manual/reference/operator/query/in/) `{ field: { $in: [value1, ...] } }` Selects the documents where the value of a field equals any value in the specified array
* [$lt](https://www.mongodb.com/docs/manual/reference/operator/query/lt/) `{ field: { $lt: value } }` Selects the documents where the value of the field is less than (i.e. <) the specified value
* [$lte](https://www.mongodb.com/docs/manual/reference/operator/query/lte/) `{ field: { $lte: value } }` Selects the documents where the value of the field is less than or equal to (i.e. <=) the specified value
* [$ne](https://www.mongodb.com/docs/manual/reference/operator/query/ne/) `{ field: { $ne: value } }` Selects the documents where the value of the specified field is not equal to the specified value. This includes documents that do not contain the specified field
* [$nin](https://www.mongodb.com/docs/manual/reference/operator/query/nin/) `{ field: { $nin: [value1, ...] } }` Selects the documents where the specified field value is not in the specified array or the specified field does not exist
#### [Logical query operators](https://www.mongodb.com/docs/manual/reference/operator/query-logical/)
* [$and](https://www.mongodb.com/docs/manual/reference/operator/query/and/) `{ $and: [{ expression1 }, ...] }` Performs a logical AND operation on an array of one or more expressions. Selects the documents that satisfy all the expressions.
* [$not](https://www.mongodb.com/docs/manual/reference/operator/query/not/) `{ field: { $not: { operator-expression } } }` Performs a logical NOT operation on the specified operator-expression and selects the documents that do not match the operator-expression. This includes documents that do not contain the field.
* [$nor](https://www.mongodb.com/docs/manual/reference/operator/query/nor/) `{ $nor: [{ expression1 }, ...] }` Performs a logical NOR operation on an array of one or more query expression and selects the documents that fail all the query expressions in the array.
* [$or](https://www.mongodb.com/docs/manual/reference/operator/query/or/) `{ $or: [{ expression1 }, ...] }` Performs a logical OR operation on an array of one or more expressions and selects the documents that satisfy at least one of the expressions.
#### [Element query operators](https://www.mongodb.com/docs/manual/reference/operator/query-element/)
* [$exists](https://www.mongodb.com/docs/manual/reference/operator/query/exists/) `{ field: { $exists: boolean } }` Matches documents that contain or do not contain a specified field, including documents where the field value is null
* [$type](https://www.mongodb.com/docs/manual/reference/operator/query/type/) `{ field: { $type: JSONType } }` Selects documents where the value of the field is an instance of the specified JSON type(s)
#### [Evaluation query operators](https://www.mongodb.com/docs/manual/reference/operator/query-evaluation/)
* [$mod](https://www.mongodb.com/docs/manual/reference/operator/query/mod/) `{ field: { $mod: [divisor, remainder] } }` Select documents where the value of a field divided by a divisor has the specified remainder
* [$regex](https://www.mongodb.com/docs/manual/reference/operator/query/regex/) `{ field: { "$regex": "pattern", "$options": "options" } }` Provides regular expression capabilities for pattern matching strings in queries
* [$where](https://www.mongodb.com/docs/manual/reference/operator/query/where/) `{ $where: "return true" }` Pass a string containing a JavaScript expression
#### [Array query operators](https://www.mongodb.com/docs/manual/reference/operator/query-array/)
* [$all](https://www.mongodb.com/docs/manual/reference/operator/query/all/) `{ field: { $all: [ value1, ... valueN ] } }` Selects the documents where the value of a field is an array that contains all the specified elements
* [$elemMatch](https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/) `{ field: { $elemMatch: { query1, ... queryN } } }` Matches documents that contain an array field with at least one element that matches all the specified query criteria
* [$size](https://www.mongodb.com/docs/manual/reference/operator/query/size/) `{ field: { $size: number } }` Matches any array with the number of elements specified by the argument 
#### [Field update operators](https://www.mongodb.com/docs/manual/reference/operator/update-field/)
* [$currentDate](https://www.mongodb.com/docs/manual/reference/operator/update/currentDate/) `{ $currentDate: { field1: true, field2: { $type: "date" }, field3: { $type: "timestamp" } }, ... }` Sets the value of a field to the current date, either as a Date or a timestamp
* [$inc](https://www.mongodb.com/docs/manual/reference/operator/update/inc/) `{ $inc: { field1: amount1, ... } }` Increments a field by a specified value
* [$min](https://www.mongodb.com/docs/manual/reference/operator/update/min/) `{ $min: { field1: value1, ... } }` Updates the value of the field to a specified value if the specified value is less than the current value of the field
* [$max](https://www.mongodb.com/docs/manual/reference/operator/update/max/) `{ $max: { field1: value1, ... } }` Updates the value of the field to a specified value if the specified value is greater than the current value of the field
* [$mul](https://www.mongodb.com/docs/manual/reference/operator/update/mul/) `{ $mul: { field1: number1, ... } }` Multiply the value of a field by a number
* [$rename](https://www.mongodb.com/docs/manual/reference/operator/update/rename/) `{$rename: { field1: newName1, ... } }` Updates the name of a field
* [$set](https://www.mongodb.com/docs/manual/reference/operator/update/set/) `{ $set: { field1: value1, ... } }` Replaces the value of a field with the specified value 
* [$unset](https://www.mongodb.com/docs/manual/reference/operator/update/unset/) `{ $unset: { field1: "", ... } }` Deletes a particular field
#### [Array update operators](https://www.mongodb.com/docs/manual/reference/operator/update-array/)
* [$[]](https://www.mongodb.com/docs/manual/reference/operator/update/positional-all/)
* [$addToSet](https://www.mongodb.com/docs/manual/reference/operator/update/addToSet/)
* [$pop](https://www.mongodb.com/docs/manual/reference/operator/update/pop/)
* [$pull](https://www.mongodb.com/docs/manual/reference/operator/update/pull/)
* [$push](https://www.mongodb.com/docs/manual/reference/operator/update/push/)
* [$pushAll](https://www.mongodb.com/docs/manual/reference/operator/update/pushAll/)
* [$each](https://www.mongodb.com/docs/manual/reference/operator/update/each/)
* [$position](https://www.mongodb.com/docs/manual/reference/operator/update/position/)
* [$slice](https://www.mongodb.com/docs/manual/reference/operator/update/slice/)
* [$sort](https://www.mongodb.com/docs/manual/reference/operator/update/sort/)


### Not implemented
1. Lexicographic vs numeric order is not currently supported https://www.mongodb.com/docs/manual/reference/operator/update/#behavior

### Upsupported operators
#### [Evaluation query operators](https://www.mongodb.com/docs/manual/reference/operator/query-evaluation/)
* [$expr](https://www.mongodb.com/docs/manual/reference/operator/query/expr/)
* [$jsonSchema](https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/)
* [$text](https://www.mongodb.com/docs/manual/reference/operator/query/text/)
#### [Geospatial query operators](https://www.mongodb.com/docs/manual/reference/operator/query-geospatial/)
* [$geoIntersects](https://www.mongodb.com/docs/manual/reference/operator/query/geoIntersects/)
* [$geoWithin](https://www.mongodb.com/docs/manual/reference/operator/query/geoWithin/)
* [$near](https://www.mongodb.com/docs/manual/reference/operator/query/near/)
* [$nearShere](https://www.mongodb.com/docs/manual/reference/operator/query/nearShere/)
* [$box](https://www.mongodb.com/docs/manual/reference/operator/query/box/)
* [$center](https://www.mongodb.com/docs/manual/reference/operator/query/center/)
* [$centerSphere](https://www.mongodb.com/docs/manual/reference/operator/query/centerSphere/)
* [$geometry](https://www.mongodb.com/docs/manual/reference/operator/query/geometry/)
* [$maxDistance](https://www.mongodb.com/docs/manual/reference/operator/query/maxDistance/)
* [$minDistance](https://www.mongodb.com/docs/manual/reference/operator/query/minDistance/)
* [$polygon](https://www.mongodb.com/docs/manual/reference/operator/query/polygon/)
#### [Bitwise query operators](https://www.mongodb.com/docs/manual/reference/operator/query-bitwise/)
* [$bitsAllClear](https://www.mongodb.com/docs/manual/reference/operator/query/bitsAllClear/)
* [$bitsAllSet](https://www.mongodb.com/docs/manual/reference/operator/query/bitsAllSet/)
* [$bitsAnyClear](https://www.mongodb.com/docs/manual/reference/operator/query/bitsAnyClear/)
* [$bitsAnySet](https://www.mongodb.com/docs/manual/reference/operator/query/bitsAnySet/)
#### [Projection operators](https://www.mongodb.com/docs/manual/reference/operator/projection/)
* [$](https://www.mongodb.com/docs/manual/reference/operator/projection/positional/)
* [$elemMatch](https://www.mongodb.com/docs/manual/reference/operator/projection/elemMatch/)
* [$slice](https://www.mongodb.com/docs/manual/reference/operator/projection/slice/)
#### [Miscellaneous query operators](https://www.mongodb.com/docs/manual/reference/operator/query-miscellaneous/)
* [$comment](https://www.mongodb.com/docs/manual/reference/operator/query/comment/)
* [$rand](https://www.mongodb.com/docs/manual/reference/operator/query/rand/)
* [$natural](https://www.mongodb.com/docs/manual/reference/operator/query/natural/)
#### [Field update operators](https://www.mongodb.com/docs/manual/reference/operator/update-field/)
* [$setOnInsert](https://www.mongodb.com/docs/manual/reference/operator/update/setOnInsert/)
#### [Array update operators](https://www.mongodb.com/docs/manual/reference/operator/update-array/)
* [$](https://www.mongodb.com/docs/manual/reference/operator/update/positional/)
* [$[<identifier>]](https://www.mongodb.com/docs/manual/reference/operator/update/positional-filtered/)
#### [Bitwise update operators](https://www.mongodb.com/docs/manual/reference/operator/update-bitwise/)
* [$bit](https://www.mongodb.com/docs/manual/reference/operator/update/bit/)
