import { getPaletteConfig, type PaletteId } from './entities';

export const usePaletteInfo = (paletteId: PaletteId) =>
  getPaletteConfig(paletteId);
