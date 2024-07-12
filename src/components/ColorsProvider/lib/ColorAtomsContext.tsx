import { createContext } from 'react';
import { useRequiredContext } from '../../../utils';
import type { ColorAtoms } from './paletteAtoms';

export const ColorAtomsContext = createContext<undefined | ColorAtoms>(
  undefined,
);

export const useColorAtomsContext = () =>
  useRequiredContext(ColorAtomsContext, 'ColorAtomsContext');
