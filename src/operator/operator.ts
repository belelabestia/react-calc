export const digits = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
] as const;
export type Digit = typeof digits[number];
export type Operator = { symbol: string; fn: (a: number, b: number) => number };

export type OperatorEnumObject = {
  Init: Operator;
  Add: Operator;
  Subtract: Operator;
  Multiply: Operator;
  Divide: Operator;
};

export const Operators: OperatorEnumObject = {
  Init: { symbol: "", fn: (_, b) => b },
  Add: { symbol: "+", fn: (a, b) => a + b },
  Subtract: { symbol: "-", fn: (a, b) => a - b },
  Multiply: { symbol: "*", fn: (a, b) => a * b },
  Divide: { symbol: "/", fn: (a, b) => a / b },
};
