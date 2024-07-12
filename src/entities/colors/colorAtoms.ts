import { atom, type Atom, type PrimitiveAtom } from 'jotai';
import type {
  PaletteConfig,
  PaletteId,
  PaletteOptions,
  SwatchId,
  SwatchOptions,
} from './types';
import { PALETTE_CONFIGS_BASE } from './config';
import { SWATCH_IDS_BY_PALETTE_ID } from './constants';
import { extendColor } from './extendColor';
import { colorValue } from './colorValue';

type BaseAtom = PrimitiveAtom<PaletteOptions['base']>;

type SwatchAtoms = {
  swatchObjectAtom: Atom<SwatchOptions>;
  swatchLightValueAtom: Atom<string>;
  swatchDarkValueAtom: Atom<string>;
  swatchLightDarkValueAtom: Atom<string>;
};

export type ColorAtoms = {
  [TPaletteId in PaletteId]: PaletteAtoms<TPaletteId>;
};

export type PaletteAtoms<TPaletteId extends PaletteId = PaletteId> = {
  baseAtom: BaseAtom;
  swatchAtoms: Record<string & SwatchId<TPaletteId>, SwatchAtoms>;
};

export const createPaletteAtoms = <TPaletteId extends PaletteId>(
  paletteId: TPaletteId,
  paletteOptions?: PaletteOptions<TPaletteId>,
): PaletteAtoms => {
  const baseOptions = PALETTE_CONFIGS_BASE[paletteId] as PaletteConfig;
  const baseAtom: PaletteAtoms<TPaletteId>['baseAtom'] = atom(
    paletteOptions?.base ?? baseOptions.base,
  );
  return {
    baseAtom,
    swatchAtoms: Object.fromEntries(
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

        return [
          swatchId,
          {
            swatchObjectAtom,
            swatchLightValueAtom,
            swatchDarkValueAtom,
            swatchLightDarkValueAtom,
          } satisfies SwatchAtoms,
        ] as const;
      }),
    ),
  } as PaletteAtoms<TPaletteId>;
};
