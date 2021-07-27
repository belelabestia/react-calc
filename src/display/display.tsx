import { Operator, Operators } from '../operator/operator';
import './Display.css'

type OperatorString = '' | '+' | '-' | '*' | '/';

const OperatorStrings = {
  Init: '' as OperatorString,
  Add: '+' as OperatorString,
  Subtract: '-' as OperatorString,
  Multiply: '*' as OperatorString,
  Divide: '/' as OperatorString
};

export type DisplayProps = {
  partial: string;
  operator: Operator;
  value: string;
};

export function Display(props: DisplayProps): JSX.Element {
  return (
    <div id="display">
      <div id="partial">{props.partial}</div>
      <div id="operator">{displayOperator(props.operator)}</div>
      <div id="value">{props.value}</div>
    </div>
  );
}

function displayOperator(operator: Operator): OperatorString | never {
  switch (operator) {
    case Operators.Init: return OperatorStrings.Init;
    case Operators.Add: return OperatorStrings.Add;
    case Operators.Subtract: return OperatorStrings.Subtract;
    case Operators.Multiply: return OperatorStrings.Multiply;
    case Operators.Divide: return OperatorStrings.Divide;
    default: throw new Error('Invalid operator.');
  }
}