import { atom, type Atom } from 'jotai';
import type { Simplify } from 'type-fest';
import {
  getPaletteConfig,
  colorValue,
  extendColorConfig,
  type ColorConfig,
  mapPaletteSwatchesToColorTokens,
  type PaletteConfig,
  type PaletteId,
  type SwatchConfig,
} from '.';

export type SwatchAtomValue = ColorConfig & {
  colorToken: SwatchConfig['colorToken'];
  value: string;
  lightValue: string;
  darkValue: string;
};

export type SwatchAtom = Atom<SwatchAtomValue>;

export const createPaletteAtoms = <TPaletteId extends PaletteId>(
  paletteId: TPaletteId,
  paletteOptions: PaletteConfig['base'] = getPaletteConfig(paletteId).base,
) => {
  const paletteBaseAtom = atom<PaletteConfig['base']>(paletteOptions);
  const swatchAtoms = mapPaletteSwatchesToColorTokens(
    paletteId,
    ({ colorToken, color }) =>
      atom((get) => {
        const colorObject = extendColorConfig(get(paletteBaseAtom), color);
        return {
          ...colorObject,
          colorToken,
          value: colorValue(colorObject),
          lightValue: colorValue(colorObject, 'light'),
          darkValue: colorValue(colorObject, 'dark'),
        } satisfies SwatchAtomValue;
      }) satisfies SwatchAtom,
  );

  return { paletteBaseAtom, swatchAtoms };
};

export type PaletteAtoms<TPaletteId extends PaletteId = PaletteId> =
  TPaletteId extends unknown
    ? Simplify<ReturnType<typeof createPaletteAtoms<TPaletteId>>>
    : never;
