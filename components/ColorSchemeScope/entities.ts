import { createContext, useContext } from 'react';
import { useSystemColorScheme } from '../../shared';

export const ColorSchemeScopeContext = createContext<
  undefined | 'light' | 'dark'
>(undefined);

export const useValueAtom = () => {
  const systemColorScheme = useSystemColorScheme();
  return useContext(ColorSchemeScopeContext) ?? systemColorScheme;
};
