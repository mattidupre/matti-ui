import { createContext } from 'react';
import { useRequiredContext } from '../../../utils';
import {
  type PaletteAtoms,
  type PaletteId,
  parseSwatchQuery,
  type PalettesAtoms,
  type SwatchQuery,
} from '../../../entities';

export const ColorAtomsContext = createContext<
  undefined | { palettes: PalettesAtoms }
>(undefined);

export const useColorAtomsContext = () =>
  useRequiredContext(ColorAtomsContext, 'ColorAtomsContext');

export const usePalettesAtoms = () => useColorAtomsContext().palettes;

export const usePaletteAtoms = <TPaletteId extends PaletteId>(
  paletteId: TPaletteId,
): PaletteAtoms<TPaletteId> => useColorAtomsContext().palettes[paletteId];

export const useSwatchAtoms = (query: SwatchQuery) => {
  const { paletteId, swatchId } = parseSwatchQuery(query);
  return usePaletteAtoms(paletteId).swatchAtoms[swatchId];
};
