import { atom, type Atom, type PrimitiveAtom } from 'jotai';
import { safeGet } from '../../utils';
import type {
  PaletteConfig,
  PaletteId,
  PaletteOptions,
  SwatchId,
  SwatchOptions,
} from './types';
import { PALETTE_CONFIGS_BASE } from './config';
import { PALETTE_IDS, SWATCH_IDS_BY_PALETTE_ID } from './constants';
import { extendColor } from './extendColor';
import { colorValue } from './colorValue';
import { createColorVariable } from './colorVariable';
import type { SwatchQueryWithScheme } from './colorQuery';

type SwatchValueAll = SwatchOptions & {
  lightValue: string;
  darkValue: string;
  lightDarkValue: string;
};

type SwatchesValueAll<TPaletteId extends PaletteId = PaletteId> = {
  [TSwatchId in SwatchId<TPaletteId>]: SwatchValueAll;
};

type SwatchesAtom<TPaletteId extends PaletteId = PaletteId> = Atom<
  SwatchesValueAll<TPaletteId>
>;

type SwatchesCssVariablesAtom = Atom<Record<string, string>>;

type BaseAtom = PrimitiveAtom<PaletteOptions['base']>;

type SwatchAtoms = {
  swatchAtom: Atom<SwatchValueAll>;
  swatchObjectAtom: Atom<SwatchOptions>;
  swatchLightValueAtom: Atom<string>;
  swatchDarkValueAtom: Atom<string>;
  swatchLightDarkValueAtom: Atom<string>;
};

export type PalettesAtoms = {
  [TPaletteId in PaletteId]: PaletteAtoms<TPaletteId>;
};

export type PaletteAtoms<TPaletteId extends PaletteId = PaletteId> = {
  baseAtom: BaseAtom;
  swatchAtoms: Record<string & SwatchId<TPaletteId>, SwatchAtoms>;
  swatchesAtom: SwatchesAtom<TPaletteId>;
  swatchesCssVariablesAtom: SwatchesCssVariablesAtom;
};

export const createPaletteAtoms = <TPaletteId extends PaletteId>(
  paletteId: TPaletteId,
  paletteOptions?: PaletteOptions<TPaletteId>,
): PaletteAtoms<TPaletteId> => {
  const baseOptions = PALETTE_CONFIGS_BASE[paletteId] as PaletteConfig;
  const baseAtom: PaletteAtoms<TPaletteId>['baseAtom'] = atom(
    paletteOptions?.base ?? baseOptions.base,
  );
  const swatchAtoms = Object.fromEntries(
    SWATCH_IDS_BY_PALETTE_ID[paletteId].map((swatchId) => {
      const swatchObjectAtom = atom((get) => {
        const dynamicBase = get(baseAtom);
        const staticBase = baseOptions.swatches[swatchId];
        return extendColor(dynamicBase, staticBase);
      });

      const swatchLightValueAtom = atom((get) => {
        return colorValue(get(swatchObjectAtom).light);
      });

      const swatchDarkValueAtom = atom((get) => {
        return colorValue(get(swatchObjectAtom).dark);
      });

      const swatchLightDarkValueAtom = atom((get) => {
        return `light-dark(${get(swatchLightValueAtom)}, ${get(swatchDarkValueAtom)})` as string;
      });

      const swatchAtom = atom((get) => ({
        ...get(swatchObjectAtom),
        lightValue: get(swatchLightValueAtom),
        darkValue: get(swatchDarkValueAtom),
        lightDarkValue: get(swatchLightDarkValueAtom),
      }));

      return [
        swatchId,
        {
          swatchAtom,
          swatchObjectAtom,
          swatchLightValueAtom,
          swatchDarkValueAtom,
          swatchLightDarkValueAtom,
        } satisfies SwatchAtoms,
      ] as const;
    }),
  );

  const swatchesAtom = atom((get) =>
    Object.fromEntries(
      SWATCH_IDS_BY_PALETTE_ID[paletteId].map((swatchId) => {
        return [swatchId, get(swatchAtoms[swatchId].swatchAtom)] as const;
      }),
    ),
  ) as SwatchesAtom<TPaletteId>;

  const swatchesCssVariablesAtom: SwatchesCssVariablesAtom = atom((get) =>
    SWATCH_IDS_BY_PALETTE_ID[paletteId].reduce(
      (result, swatchId) => {
        result[
          createColorVariable({
            paletteId,
            swatchId,
            colorScheme: 'light',
          } as SwatchQueryWithScheme)
        ] = get(swatchAtoms[swatchId].swatchLightValueAtom);
        result[
          createColorVariable({
            paletteId,
            swatchId,
            colorScheme: 'dark',
          } as SwatchQueryWithScheme)
        ] = get(swatchAtoms[swatchId].swatchDarkValueAtom);
        return result;
      },
      {} as Record<string, string>,
    ),
  );

  return {
    baseAtom,
    swatchAtoms,
    swatchesAtom,
    swatchesCssVariablesAtom,
  } as PaletteAtoms<TPaletteId>;
};

export const createColorCssVariablesAtom = (palettesAtoms: PalettesAtoms) =>
  atom((get) => {
    const cssVariables: Record<string, string> = {};
    for (const paletteId of PALETTE_IDS) {
      for (const swatchId of SWATCH_IDS_BY_PALETTE_ID[paletteId]) {
        const { swatchLightValueAtom, swatchDarkValueAtom } = safeGet(
          palettesAtoms[paletteId].swatchAtoms,
          swatchId,
        );
        cssVariables[
          createColorVariable({
            paletteId,
            swatchId,
            colorScheme: 'light',
          } as SwatchQueryWithScheme)
        ] = get(swatchLightValueAtom);
        cssVariables[
          createColorVariable({
            paletteId,
            swatchId,
            colorScheme: 'dark',
          } as SwatchQueryWithScheme)
        ] = get(swatchDarkValueAtom);
      }
    }
    return cssVariables;
  });
