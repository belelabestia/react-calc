import { useReducer } from "react";
import "./App.css";
import { Action, Actions, initialState, State } from "./AppState";
import { Display } from "./display/display";
import { Keys } from "./keys/keys";
import { Digit, Operator } from "./operator/operator";

function App(): JSX.Element {
  const [state, dispatch] = useReducer((state: State, action: Action) => action(state), initialState);

  const onDigit = (digit: Digit) => dispatch(Actions.AddDigit(digit));
  const onDecimalSeparator = () => dispatch(Actions.AddDecimalSeparator);
  const onOperator = (operator: Operator) => dispatch(Actions.AddOperator(operator));
  const onEquals = () => dispatch(Actions.Result);
  const onCancel = () => dispatch(Actions.Reset);

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
