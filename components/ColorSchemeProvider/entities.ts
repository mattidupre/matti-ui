import { atom } from 'jotai';
import { createContext } from 'react';

export const colorSchemePreferenceAtom = atom<undefined | 'light' | 'dark'>(
  undefined,
);

type ColorSchemeContextValue = {
  colorScheme: 'light' | 'dark';
};

export const ColorSchemeContext = createContext<
  undefined | ColorSchemeContextValue
>(undefined);
