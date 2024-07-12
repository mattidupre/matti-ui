import { createContext } from 'react';
import { useRequiredContext } from '../../../utils';
import {
  type PaletteAtoms,
  type PaletteId,
  parseSwatchQuery,
  type ColorAtoms,
  type SwatchQuery,
} from '../../../entities';

export const ColorAtomsContext = createContext<undefined | ColorAtoms>(
  undefined,
);

export const useColorAtomsContext = () =>
  useRequiredContext(ColorAtomsContext, 'ColorAtomsContext');

export const usePaletteAtoms = <TPaletteId extends PaletteId>(
  paletteId: TPaletteId,
): PaletteAtoms<TPaletteId> => useColorAtomsContext()[paletteId];

export const useSwatchAtoms = (query: SwatchQuery) => {
  const { paletteId, swatchId } = parseSwatchQuery(query);
  return usePaletteAtoms(paletteId).swatchAtoms[swatchId];
};
