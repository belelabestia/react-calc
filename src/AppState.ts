import { DisplayProps } from "./display/display";
import { Digit, Operator, Operators } from "./operator/operator";

export type State = DisplayProps & { reset: boolean };
export type Action = (state: State) => State;
type ActionFactory<T> = (payload: T) => Action;

type ActionEnumObject = {
  AddDecimalSeparator: Action;
  AddOperator: ActionFactory<Operator>;
  AddDigit: ActionFactory<Digit>;
  Result: Action;
  Reset: Action;
};

export const initialState: State = {
  partial: "0",
  operator: Operators.Init,
  value: "",
  reset: false,
};

export const Actions: ActionEnumObject = {
  AddDecimalSeparator: state => ({
    ...resetIfNeeded(state),
    value: state.reset
      ? "0."
      : (state.value === "" ? "0" : state.value) + (state.value.includes(".") ? "" : "."),
  }),
  AddOperator: payload => state => ({
    partial:
      !state.reset && state.value !== "" ? calc(state) : state.partial,
    value: "",
    operator: payload,
    reset: false,
  }),
  AddDigit: digit => state => ({
    ...resetIfNeeded(state),
    value: state.reset
      ? digit
      : (state.value === "0" ? "" : state.value) + digit,
  }),
  Result: state => ({
    ...state,
    partial: calc(state),
    reset: true,
  }),
  Reset: _ => initialState
};

const resetIfNeeded: (state: State) => State = (state) =>
  state.reset ? initialState : state;

const calc = (state: State) =>
  String(state.operator.fn(Number(state.partial), Number(state.value)));