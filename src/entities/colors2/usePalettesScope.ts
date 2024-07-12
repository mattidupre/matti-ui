import { useState } from 'react';
import type { WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import {
  getPaletteConfig,
  type PaletteId,
  type PaletteOptions,
} from './entities';
import { PALETTE_IDS } from './constants';

export const usePalettesScope = (
  defaultPaletteOptions: Partial<
    Record<PaletteId, PaletteOptions['base']>
  > = {},
) => {
  const [atomValues] = useState(() => {
    const atomEntries: Array<[WritableAtom<any, any, any>, any]> = [];
    for (const paletteId of PALETTE_IDS) {
      const { baseAtom } = getPaletteConfig(paletteId);
      const base = defaultPaletteOptions[paletteId];
      if (base) {
        atomEntries.push([baseAtom, base]);
      }
    }
    return atomEntries;
  });

  console.log(atomValues);

  useHydrateAtoms(atomValues);
};
