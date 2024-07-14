import { useAtom } from 'jotai';
import { useMemo } from 'react';
import type { PaletteId } from '../../shared';
import { usePaletteAtoms } from './lib/ColorAtomsContext';
import { usePaletteInfo } from '.';

export const usePalette = (paletteId: PaletteId) => {
  const paletteInfo = usePaletteInfo(paletteId);
  const { paletteBaseAtom } = usePaletteAtoms(paletteId);
  const [color, setColor] = useAtom(paletteBaseAtom);
  return useMemo(
    () => ({
      color,
      setColor,
      paletteInfo,
    }),
    [color, paletteInfo, setColor],
  );
};
