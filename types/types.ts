type JMQPrimitive = string | number | boolean | null | undefined;

type JMQDocument = {
  [keyof: string]: JMQValue
}

type JMQArray = [
  JMQValue
];

type JMQValue = JMQDocument | JMQArray | JMQPrimitive;
