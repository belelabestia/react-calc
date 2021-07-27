import { Dispatch } from 'react';
import { Digit, Operator, Operators } from '../operator/operator';
import './Keys.css';

type KeysProps = {
  onDigit: Dispatch<Digit>;
  onDecimalSeparator: Dispatch<void>;
  onOperator: Dispatch<Operator>;
  onEquals: Dispatch<any>;
  onCancel: Dispatch<any>;
}

export function Keys(props: KeysProps): JSX.Element {
  return (
    <div id="keys">
      <DigitButton digit="1" onClick={props.onDigit}></DigitButton>
      <DigitButton digit="2" onClick={props.onDigit}></DigitButton>
      <DigitButton digit="3" onClick={props.onDigit}></DigitButton>
      <DigitButton digit="4" onClick={props.onDigit}></DigitButton>
      <DigitButton digit="5" onClick={props.onDigit}></DigitButton>
      <DigitButton digit="6" onClick={props.onDigit}></DigitButton>
      <DigitButton digit="7" onClick={props.onDigit}></DigitButton>
      <DigitButton digit="8" onClick={props.onDigit}></DigitButton>
      <DigitButton digit="9" onClick={props.onDigit}></DigitButton>
      <DigitButton digit="0" onClick={props.onDigit}></DigitButton>
      <DecimalSeparatorButton onClick={props.onDecimalSeparator}></DecimalSeparatorButton>
      <OperatorButton symbol="+" operator={Operators.Add} onClick={props.onOperator}></OperatorButton>
      <OperatorButton symbol="-" operator={Operators.Subtract} onClick={props.onOperator}></OperatorButton>
      <OperatorButton symbol="*" operator={Operators.Multiply} onClick={props.onOperator}></OperatorButton>
      <OperatorButton symbol="/" operator={Operators.Divide} onClick={props.onOperator}></OperatorButton>
      <EqualsButton onClick={props.onEquals}></EqualsButton>
      <CancelButton onClick={props.onCancel}></CancelButton>
    </div>
  );
}

type Emitter = () => void;

function emitter<T>(event: Dispatch<T> | Dispatch<void>, arg?: T): Emitter {
  return arg === undefined ? () => (event as Dispatch<void>)() : () => (event as Dispatch<T>)(arg);
}

type DigitButtonProps = {
  digit: string;
  onClick: Dispatch<Digit>;
};

function digit(data: string | number): Digit {
  const digits = '0123456789';
  const str = String(data);

  if (!digits.includes(str)) throw new Error('Not a valid digit.');
  return str as Digit;
}

function DigitButton(props: DigitButtonProps): JSX.Element {
  return (
    <div className="button digit" data-digit={props.digit} onClick={emitter(props.onClick, digit(props.digit))}>
      {props.digit}
    </div>
  );
}

type HasOnClick<T> = {
  onClick: Dispatch<T>;
};

type OperatorButtonProps = {
  symbol: string;
  operator: Operator;
} & HasOnClick<Operator>;

function OperatorButton(props: OperatorButtonProps): JSX.Element {
  return (
    <div className="button operator" data-symbol={props.symbol} onClick={emitter(props.onClick, props.operator)}>
      {props.symbol}
    </div>
  );
}

type DecimalSeparatorProps = HasOnClick<void>;

function DecimalSeparatorButton(props: DecimalSeparatorProps): JSX.Element {
  return (
    <div className="button decimal-separator" onClick={emitter(props.onClick)}>.</div>
  );
}

type EqualsProps = HasOnClick<void>;

function EqualsButton(props: EqualsProps): JSX.Element {
  return (
    <div className="button equals" onClick={emitter(props.onClick)}>=</div>
  );
}

type CancelProps = HasOnClick<void>;

function CancelButton(props: CancelProps): JSX.Element {
  return (
    <div className="button cancel" onClick={emitter(props.onClick)}>C</div>
  );
}
