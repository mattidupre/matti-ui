import { atom, type PrimitiveAtom, type Atom } from 'jotai';
import {
  SWATCH_IDS_BY_PALETTE_ID,
  type PaletteId,
  type PaletteOptions,
  type SwatchId,
  type SwatchOptions,
  PALETTE_CONFIGS_BASE,
  extendColor,
  type SwatchQuery,
  parseSwatchQuery,
  type PaletteConfig,
} from '../../../entities';
import { useColorAtomsContext } from './ColorAtomsContext';

type BaseAtom = PrimitiveAtom<PaletteOptions['base']>;

type SwatchAtoms = { swatchObjectAtom: Atom<SwatchOptions> };

export type PaletteAtoms<TPaletteId extends PaletteId = PaletteId> = {
  baseAtom: BaseAtom;
  swatchAtoms: Record<SwatchId<TPaletteId>, SwatchAtoms>;
};

export type ColorAtoms = {
  [TPaletteId in PaletteId]: PaletteAtoms<TPaletteId>;
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
        return [
          swatchId,
          {
            swatchObjectAtom: atom((get) => {
              const dynamicBase = get(baseAtom);
              const staticBase = baseOptions.swatches[swatchId];
              return extendColor(dynamicBase, staticBase);
            }),
          },
        ] as const;
      }),
    ),
  } as PaletteAtoms<TPaletteId>;
};

export const usePaletteAtoms = <TPaletteId extends PaletteId>(
  paletteId: TPaletteId,
): PaletteAtoms<TPaletteId> => useColorAtomsContext()[paletteId];

export const useSwatchAtoms = (query: SwatchQuery) => {
  const { paletteId, swatchId } = parseSwatchQuery(query);
  return usePaletteAtoms(paletteId).swatchAtoms[swatchId];
};
