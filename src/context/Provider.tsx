import React, { createContext } from 'react';
import useCalculations from '../hook/useCalculations';

export const Context = createContext<any>([]);

function Provider({ children }: any): any {
  const context = useCalculations();

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
