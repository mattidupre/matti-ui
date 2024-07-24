import { useAtom, useSetAtom, type PrimitiveAtom } from 'jotai';
import { createContext } from 'react';
import { useRequiredContext } from '../../shared';

export const ColorSchemeAtomContext = createContext<
  undefined | PrimitiveAtom<undefined | 'light' | 'dark'>
>(undefined);

export const useUiColorScheme = () =>
  useAtom(useRequiredContext(ColorSchemeAtomContext, 'ColorSchemeAtomContext'));

export const useSetUiColorScheme = () =>
  useSetAtom(useRequiredContext(ColorSchemeAtomContext));
