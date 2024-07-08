import type { PaletteId, PaletteConfig, SwatchesPartial } from './entities';
import { extendSwatches } from './extendSwatches';

export const extendPalette = <TPaletteId extends PaletteId>(
  paletteConfig: PaletteConfig<TPaletteId>,
  ...options: ReadonlyArray<undefined | SwatchesPartial<TPaletteId>>
): PaletteConfig<TPaletteId> => ({
  ...globalThis.structuredClone(paletteConfig),
  swatches: extendSwatches(paletteConfig.swatches, ...options),
});
