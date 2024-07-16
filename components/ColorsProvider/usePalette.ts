import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import type { PaletteId } from '../../shared';
import { usePaletteAtoms } from './lib/ColorAtomsContext';
import { usePaletteHandle } from './usePaletteHandle';

export const usePalette = (paletteId: PaletteId) => {
  const paletteHandle = usePaletteHandle(paletteId);
  const baseColor = useAtomValue(usePaletteAtoms(paletteId).paletteBaseAtom);

  return useMemo(
    () => ({
      ...paletteHandle,
      baseColor,
    }),
    [baseColor, paletteHandle],
  );
};
