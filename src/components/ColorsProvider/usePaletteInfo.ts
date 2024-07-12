import { useMemo } from 'react';
import { type PaletteId, PALETTES } from '../../entities';

export const usePaletteInfo = (paletteId: PaletteId) =>
  useMemo(() => globalThis.structuredClone(PALETTES[paletteId]), [paletteId]);
