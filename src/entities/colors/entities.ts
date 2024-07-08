import type { Simplify, SimplifyDeep } from 'type-fest';
import { UI_ENVIRONMENT } from '@config';

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

export const PALETTE_IDS = Object.freeze(
  Object.keys(typeof UI_ENVIRONMENT.colors.palettes),
) as ReadonlyArray<PaletteId>;

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

export const COLOR_TOKENS = Object.freeze(
  UI_ENVIRONMENT.colors.tokenNamesTuple,
);

export type ColorToken<
  TPaletteId extends PaletteId = PaletteId,
  TSwatchId extends SwatchId<TPaletteId> = SwatchId<TPaletteId>,
> = (typeof COLOR_TOKENS)[number] & `${TPaletteId}.${TSwatchId}`;

export const colorToken = <
  TPaletteId extends PaletteId,
  TSwatchId extends SwatchId<TPaletteId>,
>(
  paletteId: TPaletteId,
  swatchId: TSwatchId,
) =>
  (UI_ENVIRONMENT.colors.tokenNames[paletteId] as Record<SwatchId, unknown>)[
    swatchId
  ] as ColorToken<TPaletteId, TSwatchId>;

export const isColorToken = (value: any): value is ColorToken =>
  COLOR_TOKENS.includes(value);

export function assertColorToken(value: any): asserts value is ColorToken {
  if (!isColorToken(value)) {
    throw new TypeError(`Invalid color token "${value}".`);
  }
}

export type ParseColorToken<TToken extends ColorToken> =
  TToken extends `${infer TPaletteId extends PaletteId}.${infer TSwatchId extends SwatchId}`
    ? TSwatchId extends SwatchId<TPaletteId>
      ? {
          paletteId: TPaletteId;
          swatchId: TSwatchId;
        }
      : never
    : never;

export const parseColorToken = <TToken extends ColorToken>(token: TToken) => {
  assertColorToken(token);
  const [paletteId, swatchId] = token.split('.');
  return { paletteId, swatchId } as ParseColorToken<TToken>;
};
