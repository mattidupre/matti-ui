import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { type PaletteId, getPaletteConfig } from '../../shared';
import { usePaletteAtoms } from './lib/ColorAtomsContext';

export const usePalette = (paletteId: PaletteId) => {
  const paletteInfo = getPaletteConfig(paletteId);
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
