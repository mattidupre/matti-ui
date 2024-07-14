import { createContext } from 'react';
import {
  useRequiredContext,
  type PaletteAtoms,
  type PaletteId,
  parseSwatchQuery,
  type SwatchQuery,
  type SwatchAtom,
} from '../../../../shared';

export const ColorAtomsContext = createContext<
  | undefined
  | { palettes: { [TPaletteId in PaletteId]: PaletteAtoms<TPaletteId> } }
>(undefined);

export const useColorAtomsContext = () =>
  useRequiredContext(ColorAtomsContext, 'ColorAtomsContext');

export const usePalettesAtoms = () => useColorAtomsContext().palettes;

export const usePaletteAtoms = <TPaletteId extends PaletteId>(
  paletteId: TPaletteId,
): PaletteAtoms<TPaletteId> => useColorAtomsContext().palettes[paletteId];

export const useSwatchAtom = (query: SwatchQuery) => {
  const { paletteId, colorToken } = parseSwatchQuery(query);
  return (usePaletteAtoms(paletteId).swatchAtoms as Record<string, SwatchAtom>)[
    colorToken
  ] as SwatchAtom;
};
