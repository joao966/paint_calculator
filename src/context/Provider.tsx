import React, { createContext, FC } from 'react';
import useCalculations from '../hook/useCalculations';
import { CANS_MODEL, ERROR_MODEL, WALL_MODEL } from '../models';


interface AppContextInterface {
  onChange?: (e: HTMLInputElement) => void;
  validateHeight?: (currentWall: string, fildError?: string | any) => void;
  validateWidth: (currentWall: string, fildError?: string | any) => void;
  error: ERROR_MODEL;
  setError: () => void;
  inputValues: WALL_MODEL;
  currentWall: string;
  currentProperty: string;
  onClickResult: () => void;
  cansPaint: CANS_MODEL;
  reset: boolean;
}

export const Context = createContext<AppContextInterface | any>(null);

const Provider = ({ children }: React.PropsWithChildren) => {
  const context = useCalculations();

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
