import { useReducer } from "react";
import "./App.css";
import { initialState, reducer } from "./AppState";
import { Display } from "./display/display";
import { Keys } from "./keys/keys";
import { Digit, Operator } from "./operator/operator";

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onDigit = (digit: Digit) =>
    dispatch({ type: "addDigit", payload: digit });
  const onDecimalSeparator = () => dispatch({ type: "addDecimalSeparator" });
  const onOperator = (operator: Operator) =>
    dispatch({ type: "addOperator", payload: operator });
  const onEquals = () => dispatch({ type: "result" });
  const onCancel = () => dispatch({ type: "reset" });

  return (
    <div id="app">
      <Display
        partial={state.partial}
        operator={state.operator}
        value={state.value}
      ></Display>
      <Keys
        onDigit={onDigit}
        onDecimalSeparator={onDecimalSeparator}
        onOperator={onOperator}
        onEquals={onEquals}
        onCancel={onCancel}
      ></Keys>
    </div>
  );
}

export default App;
