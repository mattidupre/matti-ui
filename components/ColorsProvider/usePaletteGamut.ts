import { useMemo } from 'react';
import {
  getPaletteConfig,
  type PaletteSwatchIdObject,
  type PaletteId,
} from '../../shared';
import { useSwatchGamut } from './useSwatchGamut';

export const usePaletteGamut = (paletteId: PaletteId) => {
  const { swatchIds } = getPaletteConfig(paletteId);
  const isPaletteInGamut = swatchIds.reduce((result, swatchId) => {
    // Hook order is preserved.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isInGamut } = useSwatchGamut({
      paletteId,
      swatchId,
    } as PaletteSwatchIdObject);
    return result === false ? false : isInGamut;
  }, true);
  return useMemo(
    () => ({
      isInGamut: isPaletteInGamut,
    }),
    [isPaletteInGamut],
  );
};
