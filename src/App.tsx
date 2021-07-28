import { useState } from 'react';
import './App.css';
import { Display, DisplayProps } from './display/Display';
import { Keys } from './keys/Keys';
import { Digit, Operator, Operators } from './operator/operator';

type AppState = DisplayProps & { reset: boolean };
type StateMapper = (state: AppState) => AppState;
type StateMapperFactory<T> = (param: T) => StateMapper;

const initialState: AppState = {
  partial: '0',
  operator: Operators.Init,
  value: '',
  reset: false
};

const resetIfNeeded: StateMapper = state => state.reset ? initialState : state;

const addDigit: StateMapperFactory<Digit> = digit => state => ({
  ...resetIfNeeded(state),
  value: state.reset ? digit : (state.value === '0' ? '' : state.value) + digit
} as AppState);

const addDecimalSeparator: StateMapper = state => ({
  ...resetIfNeeded(state),
  value: state.reset ? '0.' : (state.value === '' ? '0' : state.value) + '.',
} as AppState);

const calc = (state: AppState) => String(state.operator(Number(state.partial), Number(state.value)));

const addOperator: StateMapperFactory<Operator> = operator => state => ({
  partial: (!state.reset && state.value !== '') ? calc(state) : state.partial,
  value: '',
  operator,
  reset: false
} as AppState)

const result: StateMapper = state => ({
  ...state,
  partial: calc(state),
  reset: true
} as AppState);

function App(): JSX.Element {
  const [state, setState] = useState<AppState>(initialState);

  return (
    <div id="app">
      <Display
        partial={state.partial}
        operator={state.operator}
        value={state.value}
      ></Display>
      <Keys
        onDigit={(digit: Digit) => setState(addDigit(digit))}
        onDecimalSeparator={() => setState(addDecimalSeparator)}
        onOperator={(operator: Operator) => setState(addOperator(operator))}
        onEquals={() => setState(result)}
        onCancel={() => setState(initialState)}
      ></Keys>
    </div>
  );
}

export default App;
