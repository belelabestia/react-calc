import { Dispatch } from "react";
import { Digit, digits, Operator, Operators } from "../operator/operator";
import "./keys.css";

type KeysProps = {
  onDigit: Dispatch<Digit>;
  onDecimalSeparator: Dispatch<void>;
  onOperator: Dispatch<Operator>;
  onEquals: Dispatch<void>;
  onCancel: Dispatch<void>;
};

type SpecialButtonType = { name: string, symbol: string };

type SpecialButtonTypeEnumObject = {
  DecimalSeparator: SpecialButtonType;
  Equals: SpecialButtonType;
  Cancel: SpecialButtonType;
};

const SpecialButtons: SpecialButtonTypeEnumObject = {
  DecimalSeparator: { name: "decimal-separator", symbol: "." },
  Equals: { name: "equals", symbol: "=" },
  Cancel: { name: "cancel", symbol: "C" }
};

export function Keys(props: KeysProps): JSX.Element {
  return (
    <div id="keys">
      {digits.map((d) => (
        <DigitButton key={d} digit={d} onClick={props.onDigit} />
      ))}

      <SpecialButton
        type={SpecialButtons.DecimalSeparator}
        onClick={props.onDecimalSeparator}
      />
      <OperatorButton operator={Operators.Add} onClick={props.onOperator} />
      <OperatorButton
        operator={Operators.Subtract}
        onClick={props.onOperator}
      />
      <OperatorButton
        operator={Operators.Multiply}
        onClick={props.onOperator}
      />
      <OperatorButton operator={Operators.Divide} onClick={props.onOperator} />
      <SpecialButton type={SpecialButtons.Equals} onClick={props.onEquals} />
      <SpecialButton type={SpecialButtons.Cancel} onClick={props.onCancel} />
    </div>
  );
}

type HasOnClick<T> = {
  onClick: Dispatch<T>;
};

type DigitButtonProps = {
  digit: Digit;
} & HasOnClick<Digit>;

function DigitButton(props: DigitButtonProps): JSX.Element {
  return (
    <div
      className="button digit"
      data-digit={props.digit}
      onClick={() => props.onClick(props.digit)}
    >
      {props.digit}
    </div>
  );
}

type OperatorButtonProps = {
  operator: Operator;
} & HasOnClick<Operator>;

function OperatorButton(props: OperatorButtonProps): JSX.Element {
  return (
    <div
      className="button operator"
      data-symbol={props.operator.symbol}
      onClick={() => props.onClick(props.operator)}
    >
      {props.operator.symbol}
    </div>
  );
}

type SpecialButtonProps = {
  type: SpecialButtonType;
} & HasOnClick<void>;

function SpecialButton(props: SpecialButtonProps): JSX.Element {
  return (
    <div className={`button ${props.type.name}`} onClick={() => props.onClick()}>
      {props.type.symbol}
    </div>
  );
}
