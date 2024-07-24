import { createContext } from 'react';

export const ColorSchemeScopeContext = createContext<{
  colorScheme: undefined | 'light' | 'dark';
}>({ colorScheme: undefined });
