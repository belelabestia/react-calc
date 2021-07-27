import { useState } from 'react';
import './App.css';
import { Display, DisplayProps } from './display/display';
import { Keys } from './keys/keys';
import { Digit, Operator, Operators } from './operators/operator';

type AppState = DisplayProps;
type StateMapper = (state: AppState) => AppState;
type StateMapperFactory<T> = (param: T) => StateMapper;

const initialState = {
  partial: '0',
  operator: Operators.Init,
  value: ''
};

const addDigit: StateMapperFactory<Digit> = digit => state => ({
  ...state,
  value: state.value + digit
} as AppState);

const addDecimalSeparator: StateMapper = state => ({
  ...state,
  value: state.value + '.'
} as AppState);

const throwIfNull: <T>(param: T | null) => T | never = param => {
  if (param == null) throw new Error('Null value not accepted.')
  return param;
}

const calc = (state: AppState) => String(throwIfNull(state.operator)(Number(state.partial), Number(state.value)))

const addOperator: StateMapperFactory<Operator> = operator => state => ({
  partial: state.value != '' ? calc(state) : state.partial,
  value: '',
  operator
} as AppState)

const result: StateMapper = state => ({
  partial: '0',
  operator: Operators.Init,
  value: calc(state)
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
