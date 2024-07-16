import { useSetAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { type PaletteId, getPaletteConfig } from '../../shared';
import { usePaletteAtoms } from './lib/ColorAtomsContext';

export const usePaletteHandle = (paletteId: PaletteId) => {
  const paletteInfo = getPaletteConfig(paletteId);
  const { paletteBaseAtom } = usePaletteAtoms(paletteId);
  const setBaseColor = useSetAtom(paletteBaseAtom);

  const resetBaseColor = useCallback(
    () => setBaseColor(paletteInfo.base),
    [paletteInfo, setBaseColor],
  );

  return useMemo(
    () => ({
      ...paletteInfo,
      setBaseColor,
      resetBaseColor,
    }),
    [paletteInfo, resetBaseColor, setBaseColor],
  );
};
