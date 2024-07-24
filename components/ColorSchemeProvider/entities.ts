import { createContext } from 'react';

export const ColorSchemeRootContext = createContext<
  | undefined
  | {
      colorScheme: 'light' | 'dark';
      setColorScheme: (colorScheme: undefined | 'light' | 'dark') => void;
    }
>(undefined);

export const ColorSchemeScopedContext = createContext<
  undefined | { colorScheme: 'light' | 'dark' }
>(undefined);
