type JMQTypeValue = 'number' |
  1 | 'double' |
  2 | 'string' |
  3 | 'object' |
  4 | 'array' |
  6 | 'undefined' |
  8 | 'boolean' | 'bool' |
  10 | 'null' |
  16 | 'int' |
  18 | 'long' |
  19 | 'decimal';
type JMQTypeValueOrValues = JMQTypeValue | Array<JMQTypeValue>;

type JMQQueryOperatorField = {
  [keyof: string]: JMQQueryOperator | JMQQueryOperatorField | JMQArray | JMQPrimitive;
}

type JMQQueryOperatorFields = [
  JMQQueryOperatorField
]

type JMQQueryOperator = {
  $eq: JMQValue;
  $gt: JMQValue;
  $gte: JMQValue;
  $in: JMQArray;
  $lt: JMQValue;
  $lte: JMQValue;
  $ne: JMQValue;
  $nin: JMQArray;
  $and: JMQQueryOperatorFields;
  $not: JMQQueryOperatorField;
  $nor: JMQQueryOperatorFields;
  $or: JMQQueryOperatorFields;
  $exists: Boolean;
  $type: JMQTypeValueOrValues;
  $mod: [divisor: Number, remainder: Number];
  $regex: string;
  $options: string;
  $where: string;
  $all: [JMQValue];
  $elemMatch: JMQQueryOperatorField;
  $size: Number;
}


