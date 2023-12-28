import * as React from 'react';
import { FormStore } from './FormStore';

export interface FieldContextValues {
  formStore: FormStore;
}

const Context = React.createContext<FieldContextValues>({
  formStore: new FormStore(),
});

Context.displayName = 'FieldContext';

export default Context;
