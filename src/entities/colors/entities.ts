import type { Simplify, SimplifyDeep } from 'type-fest';
import type { UI_ENVIRONMENT } from '@config';

export type LightOrDarkOrBase<T extends Record<PropertyKey, any>> = Simplify<
  T & {
    light?: T;
    dark?: T;
  }
>;

export type ColorConfig = {
  lightness: number;
  chroma: number;
  hue: number;
};

export type ColorOptions = Partial<Pick<ColorConfig, 'chroma' | 'hue'>>;

type PalettesStatic = typeof UI_ENVIRONMENT.colors.palettes;

export type PaletteId = keyof PalettesStatic;

export type SwatchId<TPaletteId extends PaletteId = PaletteId> =
  PalettesStatic[TPaletteId]['swatchIds'][number];

export type SwatchConfig = {
  light: ColorConfig;
  dark: ColorConfig;
};

export type SwatchConfigById<TPaletteId extends PaletteId = PaletteId> =
  TPaletteId extends unknown
    ? {
        [TSwatchId in SwatchId<TPaletteId>]: SwatchConfig;
      }
    : never;

export type PaletteConfig<TPaletteId extends PaletteId = PaletteId> =
  TPaletteId extends unknown
    ? PalettesStatic[TPaletteId] & {
        swatches: SwatchConfigById<TPaletteId>;
      }
    : never;

export type PaletteConfigById = {
  [TPaletteId in PaletteId]: PaletteConfig<TPaletteId>;
};

export const PALETTE_IDS_CONFIGURABLE = [
  'primary',
  'accent',
] as const satisfies ReadonlyArray<PaletteId>;

export type PaletteIdConfigurable = (typeof PALETTE_IDS_CONFIGURABLE)[number];

export type SwatchOptions = LightOrDarkOrBase<ColorOptions>;

export type SwatchPartial = SimplifyDeep<
  LightOrDarkOrBase<{
    [K in keyof ColorOptions | keyof ColorConfig]?:
      | (K extends keyof ColorOptions ? ColorOptions[K] : never)
      | (K extends keyof ColorConfig ? ColorConfig[K] : never);
  }>
>;

// TODO: Assert it includes all keyofs
export const SWATCH_PARTIAL_KEYS: ReadonlyArray<keyof SwatchPartial> = [
  'light',
  'dark',
  'lightness',
  'chroma',
  'hue',
];

export type SwatchesPartial<TPaletteId extends PaletteId = PaletteId> =
  SwatchPartial & Partial<Record<SwatchId<TPaletteId>, SwatchPartial>>;

export type SwatchOptionsById<TPaletteId extends PaletteId = PaletteId> =
  TPaletteId extends unknown
    ? {
        [TSwatchId in SwatchId<TPaletteId>]: SwatchOptions;
      }
    : never;

export type PaletteOptionsById = {
  [TPaletteId in PaletteIdConfigurable]?: SwatchOptionsById<TPaletteId>;
};

export type ColorToken =
  (typeof UI_ENVIRONMENT)['colors']['tokenNames'][number];
