import type { AlsoNumber, LightAndDark, LightOrDarkOrBase } from '../../utils';
import type { COLORS_ENVIRONMENT } from './constants';

export type Color = {
  lightness: number;
  chroma: number;
  hue: number;
};

export type ColorParsed = {
  light: Color;
  dark: Color;
};

type ColorsEnvironment = typeof COLORS_ENVIRONMENT;

export type PaletteId = keyof ColorsEnvironment['palettes'];

export type SwatchId<TPaletteId extends PaletteId = PaletteId> = AlsoNumber<
  ColorsEnvironment['palettes'][TPaletteId]['swatchIds'][number]
>;

// CONFIGS

export type SwatchConfig = LightAndDark<{
  lightness?: number;
  chroma?: undefined | number;
}>;

export type PaletteConfig<TPaletteId extends PaletteId = PaletteId> = {
  base: {
    hue?: number;
    chroma?: number;
  };
  swatches: Record<SwatchId<TPaletteId>, SwatchConfig>;
};

export type PalettesConfig = {
  [TPaletteId in PaletteId]: PaletteConfig<TPaletteId>;
};

// OPTIONS

export type SwatchOptions = LightOrDarkOrBase<{
  lightness?: number;
  chroma?: number;
  hue?: number;
}>;

// eslint-disable-next-line no-autofix/unused-imports/no-unused-vars
export type PaletteOptions<TPaletteId extends PaletteId = PaletteId> = {
  base: {
    hue?: number;
    chroma?: number;
  };
};

export type PalettesOptions = {
  [TPaletteId in PaletteId]?: PaletteOptions<TPaletteId>;
};
