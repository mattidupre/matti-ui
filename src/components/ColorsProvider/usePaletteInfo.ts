import { useMemo } from 'react';
import { type PaletteId, getPaletteConfig } from '../../../shared';

export const usePaletteInfo = (paletteId: PaletteId) =>
  useMemo(
    () => globalThis.structuredClone(getPaletteConfig(paletteId)),
    [paletteId],
  );
