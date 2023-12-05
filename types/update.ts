type JMQAddToSetFieldModifiers = {
  $each: JMQArray
}
type JMQAddToSetField = {
  [keyof: string]: JMQValue | JMQAddToSetFieldModifiers;
}

type JMQCurrentDateField = {
  $type: "date" | "timestamp"
}
type JMQCurrentDateBooleanOrField = {
  [keyof: string]: Boolean | JMQCurrentDateField
}

type JMQNumberField = {
  [keyof: string]: number;
}

type JMQPopField = {
  [keyof: string]: -1 | 1;
}

type JMQPullAllField = {
  [keyof: string]: [JMQValue];
}

type JMQSortValue = -1 | 1;
type JMQSortField = {
  [keyof: string]: JMQSortValue;
}
type JMQSortValueOrField = JMQSortValue | JMQSortField;
type JMQPushFieldModifiers = {
  $each: JMQArray,
  $slice: number,
  $sort: JMQSortValueOrField,
  $position: number
}
type JMQPushField = {
  [keyof: string]: JMQValue | JMQPushFieldModifiers;
}

type JMQStringField = {
  [keyof: string]: string;
}

type JMQUpdateOperator = {
  $addToSet: JMQAddToSetField;
  $currentDate: JMQCurrentDateBooleanOrField;
  $inc: JMQNumberField;
  $max: JMQValue;
  $min: JMQValue;
  $mul: JMQNumberField;
  $pop: JMQPopField;
  $pull: JMQQueryOperatorField;
  $pullAll: JMQPullAllField;
  $push: JMQPushField;
  $rename: JMQStringField;
  $set: JMQDocument;
  $unset: JMQStringField;
}
