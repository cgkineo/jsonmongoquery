export namespace JMQ {
  export type AnyPrimitive = string | number | boolean | null | undefined;

  export type Document = {
    [keyof: string]: AnyValue
  }

  export type Array = [
    AnyValue
  ];

  export type AnyValue = Document | Array | AnyPrimitive;

  export type TypeValue = 1 | 'number' |
    2 | 'string' |
    3 | 'object' |
    4 | 'array' |
    6 | 'undefined' |
    8 | 'bool' |
    10 | 'null';
    export type TypeValueOrValues = TypeValue | [TypeValue];

    export type QueryOperator = {
    $eq: JMQ.AnyValue;
    $gt: JMQ.AnyValue;
    $gte: AnyValue;
    $in: Array;
    $lt: AnyValue;
    $lte: AnyValue;
    $ne: AnyValue;
    $nin: Array;
    $and: QueryOperatorFields;
    $not: QueryOperatorField;
    $nor: QueryOperatorFields;
    $or: QueryOperatorFields;
    $exists: Boolean;
    $type: TypeValueOrValues;
    $mod: [divisor: Number, remainder: Number];
    $regex: string;
    $options: string;
    $where: string;
    $all: [AnyValue];
    $elemMatch: QueryOperatorField;
    $size: Number;
  }

  export type QueryOperatorField = {
    [keyof: string]: QueryOperator | QueryOperatorField | Array | AnyPrimitive;
  }

  export type QueryOperatorFields = [
    QueryOperatorField
  ]

  export type AddToSetFieldModifiers = {
    $each: Array
  }

  export type AddToSetField = {
    [keyof: string]: AnyValue | AddToSetFieldModifiers;
  }

  export type CurrentDateField = {
    $type: "date" | "timestamp"
  }

  export type CurrentDateBooleanOrField = {
    [keyof: string]: Boolean | CurrentDateField
  }

  export type NumberField = {
    [keyof: string]: number;
  }

  export type PopField = {
    [keyof: string]: -1 | 1;
  }

  export type PullAllField = {
    [keyof: string]: [AnyValue];
  }

  export type SortValue = -1 | 1;

  export type SortField = {
    [keyof: string]: SortValue;
  }

  export type SortValueOrField = SortValue | SortField;

  export type PushFieldModifiers = {
    $each: Array,
    $slice: number,
    $sort: SortValueOrField,
    $position: number
  }

  export type PushField = {
    [keyof: string]: AnyValue | PushFieldModifiers;
  }

  export type StringField = {
    [keyof: string]: string;
  }

  export type UpdateOperator = {
    $addToSet: AddToSetField;
    $currentDate: CurrentDateBooleanOrField;
    $inc: NumberField;
    $max: AnyValue;
    $min: AnyValue;
    $mul: NumberField;
    $pop: PopField;
    $pull: QueryOperatorField;
    $pullAll: PullAllField;
    $push: PushField;
    $rename: StringField;
    $set: Document;
    $unset: StringField;
  }

  export type Root = QueryOperatorField | UpdateOperator;
}
