import { Dispatch } from "react";
import { Digit, digits, Operator, Operators } from "../operator/operator";
import "./keys.css";

type KeysProps = {
  onDigit: Dispatch<Digit>;
  onDecimalSeparator: Dispatch<void>;
  onOperator: Dispatch<Operator>;
  onEquals: Dispatch<any>;
  onCancel: Dispatch<any>;
};

export function Keys(props: KeysProps): JSX.Element {
  return (
    <div id="keys">
      {digits.map((d) => (
        <DigitButton key={d} digit={d} onClick={props.onDigit} />
      ))}

      <SpecialButton
        type="decimal-separator"
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
      <SpecialButton type="equals" onClick={props.onEquals} />
      <SpecialButton type="cancel" onClick={props.onCancel} />
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
  type: "decimal-separator" | "equals" | "cancel";
} & HasOnClick<void>;

function SpecialButton(props: SpecialButtonProps): JSX.Element {
  const symbol = (() => {
    switch (props.type) {
      case "cancel":
        return "C";
      case "decimal-separator":
        return ".";
      case "equals":
        return "=";
    }
  })();
  return (
    <div className={`button ${props.type}`} onClick={() => props.onClick()}>
      {symbol}
    </div>
  );
}
