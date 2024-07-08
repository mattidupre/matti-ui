import type { Simplify } from 'type-fest';
import type {
  ColorObject,
  PaletteId,
  SwatchId,
  ColorOptions,
  Palette,
} from './types';
import { UI_ENVIRONMENT } from '@config';

const {
  colors: { paletteIds, palettes },
} = UI_ENVIRONMENT;

const DEFAULT_COLOR_OBJECT: ColorObject = {
  lightness: 0,
  chroma: 0,
  hue: 0,
};

type BaseOptions = ColorOptions<Partial<ColorObject>>;

type SwatchOptions = ColorOptions<Partial<ColorObject>>;

type PaletteOptions<TPaletteId extends PaletteId = PaletteId> = {
  _base?: BaseOptions;
} & {
  [X in SwatchId<TPaletteId>]: SwatchOptions;
};

type PaletteConfig<TPaletteId extends PaletteId = PaletteId> =
  Palette<TPaletteId> & {
    swatches: {
      [TSwatchId in SwatchId<TPaletteId>]: {
        light: ColorObject;
        dark: ColorObject;
      };
    };
  };

export type PalettesConfig = {
  [TPaletteId in PaletteId]: PaletteConfig<TPaletteId>;
};

export const definePalettes = (
  colors: Simplify<{
    [TPaletteId in PaletteId]: PaletteOptions<TPaletteId>;
  }>,
): PalettesConfig => {
  const colorsConfig = {} as Record<string, unknown>;
  for (const paletteId of paletteIds) {
    const palette = palettes[paletteId];
    const { _base = {}, ...swatchesOptions } = colors[paletteId];
    const paletteConfig = {
      ...palette,
      swatches: {},
    } as PaletteConfig;
    for (const swatchId of palette.swatchIds) {
      const {
        light: lightOptions,
        dark: darkOptions,
        ...baseOptions
      } = swatchesOptions[
        swatchId as keyof typeof swatchesOptions
      ] as SwatchOptions;
      paletteConfig.swatches[swatchId] = {
        light: {
          ...DEFAULT_COLOR_OBJECT,
          ..._base,
          ...baseOptions,
          ...lightOptions,
        },
        dark: {
          ...DEFAULT_COLOR_OBJECT,
          ..._base,
          ...baseOptions,
          ...darkOptions,
        },
      };
    }
    colorsConfig[paletteId] = paletteConfig;
  }
  return colorsConfig as PalettesConfig;
};
