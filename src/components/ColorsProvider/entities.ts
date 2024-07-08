import { atom, type PrimitiveAtom } from 'jotai';
import { mapValues } from 'lodash-es';
import { createContext, useContext } from 'react';
import {
  PALETTE_DEFAULTS,
  type PaletteId,
  type ColorToken,
  type SwatchId,
  type SwatchConfig,
  type PaletteOptionsById,
  extendSwatches,
  parseColorToken,
} from '../../entities';

type SwatchAtom = PrimitiveAtom<SwatchConfig>;

export type SwatchAtoms = {
  [TPaletteId in PaletteId]: {
    [TSwatchId in SwatchId<TPaletteId>]: SwatchAtom;
  };
};

export const createSwatchAtoms = (options?: PaletteOptionsById) =>
  mapValues(PALETTE_DEFAULTS, (palette, paletteId) =>
    mapValues(
      extendSwatches(
        palette.swatches,
        options?.[paletteId as keyof typeof options],
      ),
      (swatch) => atom(swatch),
    ),
  ) as SwatchAtoms;

export const getSwatchAtom = (
  swatchAtoms: SwatchAtoms,
  token: ColorToken,
): SwatchAtom => {
  const { paletteId, swatchId } = parseColorToken(token);
  return (swatchAtoms[paletteId] as Record<string, SwatchAtom>)[swatchId];
};

export type ColorsContextValue = {
  swatchAtoms: SwatchAtoms;
};

export const ColorsContext = createContext<undefined | ColorsContextValue>(
  undefined,
);

export const useColorsContext = () => {
  const context = useContext(ColorsContext);
  if (!context) {
    throw new TypeError('ColorsContext must be set.');
  }
  return context;
};

export const useSwatchAtom = (token: ColorToken) =>
  getSwatchAtom(useColorsContext().swatchAtoms, token);
