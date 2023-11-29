# jsonmongoquery

Mongodb query and update operators for json object arrays.

### Supported operators
#### [Comparison query operators](https://www.mongodb.com/docs/manual/reference/operator/query-comparison/)
* [$eq](https://www.mongodb.com/docs/manual/reference/operator/query/eq/) Matches documents where the value of a field equals the specified value
* [$gt](https://www.mongodb.com/docs/manual/reference/operator/query/gt/) Selects those documents where the value of the specified field is greater than (i.e. >) the specified value
* [$gte](https://www.mongodb.com/docs/manual/reference/operator/query/gte/) Selects the documents where the value of the specified field is greater than or equal to (i.e. >=) a specified value
* [$in](https://www.mongodb.com/docs/manual/reference/operator/query/in/) Selects the documents where the value of a field equals any value in the specified array
* [$lt](https://www.mongodb.com/docs/manual/reference/operator/query/lt/) Selects the documents where the value of the field is less than (i.e. <) the specified value
* [$lte](https://www.mongodb.com/docs/manual/reference/operator/query/lte/) Selects the documents where the value of the field is less than or equal to (i.e. <=) the specified value
* [$ne](https://www.mongodb.com/docs/manual/reference/operator/query/ne/) Selects the documents where the value of the specified field is not equal to the specified value. This includes documents that do not contain the specified field
* [$nin](https://www.mongodb.com/docs/manual/reference/operator/query/nin/) selects the documents where the specified field value is not in the specified array or the specified field does not exist
#### [Logical query operators](https://www.mongodb.com/docs/manual/reference/operator/query-logical/)
* [$and](https://www.mongodb.com/docs/manual/reference/operator/query/and/)
* [$not](https://www.mongodb.com/docs/manual/reference/operator/query/not/)
* [$nor](https://www.mongodb.com/docs/manual/reference/operator/query/nor/)
* [$or](https://www.mongodb.com/docs/manual/reference/operator/query/or/)
#### [Element query operators](https://www.mongodb.com/docs/manual/reference/operator/query-element/)
* [$exists](https://www.mongodb.com/docs/manual/reference/operator/query/exists/)
* [$type](https://www.mongodb.com/docs/manual/reference/operator/query/type/)
#### [Evaluation query operators](https://www.mongodb.com/docs/manual/reference/operator/query-evaluation/)
* [$mod](https://www.mongodb.com/docs/manual/reference/operator/query/mod/)
* [$regex](https://www.mongodb.com/docs/manual/reference/operator/query/regex/)
* [$where](https://www.mongodb.com/docs/manual/reference/operator/query/where/)
#### [Array query operators](https://www.mongodb.com/docs/manual/reference/operator/query-array/)
* [$all](https://www.mongodb.com/docs/manual/reference/operator/query/all/)
* [$elemMatch](https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/)
* [$size](https://www.mongodb.com/docs/manual/reference/operator/query/size/)
#### [Field update operators](https://www.mongodb.com/docs/manual/reference/operator/update-field/)
* [$currentDate](https://www.mongodb.com/docs/manual/reference/operator/update/currentDate/)
* [$inc](https://www.mongodb.com/docs/manual/reference/operator/update/inc/)
* [$min](https://www.mongodb.com/docs/manual/reference/operator/update/min/)
* [$max](https://www.mongodb.com/docs/manual/reference/operator/update/max/)
* [$mul](https://www.mongodb.com/docs/manual/reference/operator/update/mul/)
* [$rename](https://www.mongodb.com/docs/manual/reference/operator/update/rename/)
* [$set](https://www.mongodb.com/docs/manual/reference/operator/update/set/)
* [$unset](https://www.mongodb.com/docs/manual/reference/operator/update/unset/)
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
