import type { UI_ENVIRONMENT } from '@config';

export type ColorOptions<T extends Record<PropertyKey, any>> = T & {
  light?: T;
  dark?: T;
};

export type Palettes = typeof UI_ENVIRONMENT.colors.palettes;

export type Palette<TPaletteId extends PaletteId = PaletteId> =
  Palettes[TPaletteId];

export type PaletteId = keyof Palettes;

export type SwatchId<TPaletteId extends PaletteId> =
  Palette<TPaletteId>['swatchIds'][number];

export const CONFIGURABLE_PALETTE_IDS = [
  'primary',
  'accent',
] as const satisfies ReadonlyArray<PaletteId>;

export type ColorToken =
  (typeof UI_ENVIRONMENT)['colors']['tokenNames'][number];

export type ColorObject = {
  lightness: number;
  chroma: number;
  hue: number;
};

export type ColorsOptions = {
  [X in (typeof CONFIGURABLE_PALETTE_IDS)[number]]?: ColorOptions<
    Partial<Pick<ColorObject, 'chroma' | 'hue'>>
  >;
};
