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

// TODO tutte le altre con resetIfNeeded
const addDigit: StateMapperFactory<Digit> = digit => state => ({
  ...resetIfNeeded(state),
  value: state.reset ? digit : (state.value === '0' ? '' : state.value) + digit
} as AppState);

const addDecimalSeparator: StateMapper = state => ({
  partial: state.reset ? initialState.partial : state.partial,
  value: state.reset ? '0.' : (state.value === '' ? '0' : state.value) + '.',
  operator: state.reset ? initialState.operator : state.operator,
  reset: false
} as AppState);

const throwIfNull: <T>(param: T | null) => T | never = param => {
  if (param === null) throw new Error('Null value not accepted.')
  return param;
}

const calc = (state: AppState) => String(throwIfNull(state.operator)(Number(state.partial), Number(state.value)))

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
