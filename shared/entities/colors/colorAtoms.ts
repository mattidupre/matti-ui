import { atom, type Atom } from 'jotai';
import type { Simplify } from 'type-fest';
import {
  getPaletteConfig,
  getSwatchConfig,
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
          lightValue: colorValue(colorObject.light),
          darkValue: colorValue(colorObject.dark),
        } satisfies SwatchAtomValue;
      }) satisfies SwatchAtom,
  );
  const swatchAtomsArray: ReadonlyArray<SwatchAtom> =
    Object.values(swatchAtoms);
  const cssVariablesAtom = atom<Record<string, string>>((get) =>
    swatchAtomsArray.reduce(
      (result, swatchAtom) => {
        const { value, lightValue, darkValue, colorToken } = get(swatchAtom);
        const { cssVariable, cssVariableLight, cssVariableDark } =
          getSwatchConfig(colorToken);
        result[cssVariable] = value;
        result[cssVariableLight] = lightValue;
        result[cssVariableDark] = darkValue;
        return result;
      },
      {} as Record<string, string>,
    ),
  );

  return { paletteBaseAtom, swatchAtoms, cssVariablesAtom };
};

export type PaletteAtoms<TPaletteId extends PaletteId = PaletteId> =
  TPaletteId extends unknown
    ? Simplify<ReturnType<typeof createPaletteAtoms<TPaletteId>>>
    : never;
