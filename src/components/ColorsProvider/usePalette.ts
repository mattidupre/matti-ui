import { useAtom } from 'jotai';
import { useMemo } from 'react';
import type { PaletteId } from '../../entities';
import { useColorAtomsContext } from './lib/ColorAtomsContext';
import { usePaletteInfo } from '.';

export const usePalette = (paletteId: PaletteId) => {
  const paletteInfo = usePaletteInfo(paletteId);
  const { baseAtom } = useColorAtomsContext()[paletteId];
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
