import { Operator } from "../operator/operator";
import "./display.css";

export type DisplayProps = {
  partial: string;
  operator: Operator;
  value: string;
};

export function Display(props: DisplayProps): JSX.Element {
  return (
    <div id="display">
      <div id="partial">{props.partial}</div>
      <div id="operator">{props.operator.symbol}</div>
      <div id="value">{props.value}</div>
    </div>
  );
}
