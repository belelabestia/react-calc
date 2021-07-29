import { DisplayProps } from "./display/display";
import { Digit, Operator, Operators } from "./operator/operator";

export type State = DisplayProps & { reset: boolean };
type Action =
  | { type: "addDecimalSeparator" }
  | { type: "addOperator"; payload: Operator }
  | { type: "addDigit"; payload: Digit }
  | { type: "result" }
  | { type: "reset" };

export const initialState: State = {
  partial: "0",
  operator: Operators.Init,
  value: "",
  reset: false,
};

const resetIfNeeded: (state: State) => State = (state) =>
  state.reset ? initialState : state;

const calc = (state: State) =>
  String(state.operator.fn(Number(state.partial), Number(state.value)));

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "addDecimalSeparator":
      return {
        ...resetIfNeeded(state),
        value: state.reset
          ? "0."
          : (state.value === "" ? "0" : state.value) + ".",
      };
    case "addOperator":
      return {
        partial:
          !state.reset && state.value !== "" ? calc(state) : state.partial,
        value: "",
        operator: action.payload,
        reset: false,
      };
    case "addDigit":
      return {
        ...resetIfNeeded(state),
        value: state.reset
          ? action.payload
          : (state.value === "0" ? "" : state.value) + action.payload,
      };
    case "result":
      return {
        ...state,
        partial: calc(state),
        reset: true,
      };
    case "reset":
      return initialState;
  }
}
