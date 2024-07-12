import { useAtom } from 'jotai';
import { useMemo } from 'react';
import type { PaletteId } from '../../entities';
import { usePaletteAtoms } from './lib/ColorAtomsContext';
import { usePaletteInfo } from '.';

export const usePalette = (paletteId: PaletteId) => {
  const paletteInfo = usePaletteInfo(paletteId);
  const { baseAtom } = usePaletteAtoms(paletteId);
  const [color, setColor] = useAtom(baseAtom);
  return useMemo(
    () => ({
      color,
      setColor,
      paletteInfo,
    }),
    [color, paletteInfo, setColor],
  );
};
