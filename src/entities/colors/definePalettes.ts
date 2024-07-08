import type {
  LightOrDarkOrBase,
  PaletteConfig,
  PaletteConfigById,
  PaletteId,
  SwatchConfig,
  SwatchId,
  SwatchOptions,
} from './entities';
import { extendSwatch } from './extendSwatch';
import { UI_ENVIRONMENT } from '@config';

const {
  colors: { paletteIds, palettes },
} = UI_ENVIRONMENT;

type DefineSwatchOptions = LightOrDarkOrBase<
  Partial<{ lightness: number; chroma: number; hue: number }>
>;

type DefinePaletteOptions = {
  [TPaletteId in PaletteId]: {
    base?: DefineSwatchOptions;
    swatches: {
      [X in SwatchId<TPaletteId>]: DefineSwatchOptions;
    };
  };
};

export const definePalettes = (
  options: DefinePaletteOptions,
): PaletteConfigById => {
  const paletteConfigById = {} as PaletteConfigById;
  for (const paletteId of paletteIds) {
    const { base, swatches: swatchesOptions } = options[paletteId];
    const paletteConfig = {
      ...palettes[paletteId],
      swatches: {},
    } as PaletteConfig;
    for (const swatchId of paletteConfig.swatchIds) {
      (paletteConfig.swatches as Record<SwatchId, SwatchConfig>)[swatchId] =
        extendSwatch(
          base,
          (swatchesOptions as Record<SwatchId, SwatchOptions>)[swatchId],
        );
    }
    (paletteConfigById as Record<PaletteId, PaletteConfig>)[paletteId] =
      paletteConfig;
  }
  return paletteConfigById;
};
