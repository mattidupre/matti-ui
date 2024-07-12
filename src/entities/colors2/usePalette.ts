import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { getPaletteConfig } from './entities';
import { parseColor } from './lib/parseColor';
import { usePaletteInfo, type PaletteId } from '.';

export const usePalette = (paletteId: PaletteId) => {
  const paletteInfo = usePaletteInfo(paletteId);
  const { baseAtom } = getPaletteConfig(paletteId);
  const [color, setColor] = useAtom(baseAtom);
  return useMemo(
    () => ({
      color: parseColor(color),
      setColor,
      paletteInfo,
    }),
    [color, paletteInfo, setColor],
  );
};
