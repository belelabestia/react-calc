export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type Operator = (a: number, b: number) => number;

export type OperatorEnumObject = {
  Init: Operator;
  Add: Operator;
  Subtract: Operator;
  Multiply: Operator;
  Divide: Operator;
}

export const Operators: OperatorEnumObject = {
  Init: (_, b) => b,
  Add: (a, b) => a + b,
  Subtract: (a, b) => a - b,
  Multiply: (a, b) => a * b,
  Divide: (a, b) => a / b
};
