import type { SimplifyDeep } from 'type-fest';
import { isObject } from 'lodash-es';
import type { Atom, WritableAtom } from 'jotai';
import type { LightOrDarkOrBase } from './utils';
import { PALETTES_CONFIG } from './config';
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

export type SwatchId<TPaletteId extends PaletteId = PaletteId> =
  ColorsEnvironment['palettes'][TPaletteId]['swatchIds'][number];

export type ColorToken<
  TPaletteId extends PaletteId = PaletteId,
  TSwatchId extends SwatchId<TPaletteId> = never,
> = TPaletteId extends unknown
  ? [TSwatchId] extends [never]
    ? `${TPaletteId}.${SwatchId<TPaletteId>}`
    : `${TPaletteId}.${TSwatchId}`
  : never;

export type PaletteSwatchId<
  TPaletteId extends PaletteId = PaletteId,
  TSwatchId extends SwatchId<TPaletteId> = SwatchId<TPaletteId>,
> = {
  [P in TPaletteId as string]: {
    paletteId: P;
    swatchId: TSwatchId & SwatchId<P>;
  };
}[string];

export const parseColorToken = <const TToken extends ColorToken>(
  token: TToken,
) => {
  const [paletteId, swatchId] = token.split('.');
  return { paletteId, swatchId } as TToken extends ColorToken<
    infer TPaletteId,
    infer TSwatchId
  >
    ? {
        paletteId: TPaletteId;
        swatchId: TSwatchId;
      }
    : never;
};

export type SwatchQuery<
  TPaletteId extends PaletteId = PaletteId,
  TSwatchId extends SwatchId<TPaletteId> = SwatchId,
> = ColorToken<TPaletteId, TSwatchId> | PaletteSwatchId<TPaletteId, TSwatchId>;

export type ParseSwatchQuery<TQuery extends SwatchQuery> =
  TQuery extends SwatchQuery<
    infer TPaletteId extends PaletteId,
    infer TSwatchId
  >
    ? PaletteSwatchId<TPaletteId, TSwatchId>
    : never;

export const parseSwatchQuery = <TQuery extends SwatchQuery>(query: TQuery) => {
  let paletteId: string;
  let swatchId: string;
  if (typeof query === 'string') {
    [paletteId, swatchId] = query.split('.');
  } else if (isObject(query)) {
    ({ paletteId, swatchId } = query);
  } else {
    throw new TypeError('Invalid color query.');
  }
  // TODO: Add assertion.
  return { paletteId, swatchId } as ParseSwatchQuery<TQuery>;
};

export type PaletteOptions<TPaletteId extends PaletteId = PaletteId> = {
  base?: LightOrDarkOrBase<{ hue?: number; chroma?: number }>;
  swatches?: {
    [TSwatchId in SwatchId<TPaletteId>]?: SwatchOptions;
  };
};

export type SwatchOptions = LightOrDarkOrBase<{
  lightness?: number;
  chroma?: number;
  hue?: number;
}>;

export type PalettesOptions = {
  [TPaletteId in PaletteId]?: PaletteOptions<TPaletteId>;
};

export type SwatchConfig<
  TPaletteId extends PaletteId = PaletteId,
  TSwatchId extends SwatchId<PaletteId> = SwatchId<PaletteId>,
> = SwatchOptions & {
  paletteId: TPaletteId;
  swatchId: TSwatchId;
  colorToken: ColorToken<TPaletteId, TSwatchId>;
  swatchOptionsAtom: Atom<SwatchOptions>;
  swatchColorAtom: Atom<ColorParsed>;
  swatchValueAtom: Atom<string>;
};

export type PaletteConfig<TPaletteId extends PaletteId = PaletteId> =
  (typeof COLORS_ENVIRONMENT)['palettes'][TPaletteId] & {
    baseAtom: WritableAtom<
      PaletteOptions<TPaletteId>['base'],
      [PaletteOptions<TPaletteId>['base']],
      void
    >;
    base: PaletteOptions<TPaletteId>['base'];
    swatchesById: {
      [TSwatchId in SwatchId<TPaletteId>]: SwatchConfig<TPaletteId, TSwatchId>;
    };
  };

export type PalettesConfig = SimplifyDeep<{
  [TPaletteId in PaletteId]: PaletteConfig<TPaletteId>;
}>;

export const getPaletteConfig = (paletteId: PaletteId) =>
  PALETTES_CONFIG[paletteId];

export const getSwatchConfig = <TQuery extends SwatchQuery>(query: TQuery) => {
  const { paletteId, swatchId } = parseSwatchQuery(query);
  return (
    PALETTES_CONFIG[paletteId].swatchesById as Record<string, SwatchConfig>
  )[swatchId] as SwatchConfig<
    ParseSwatchQuery<TQuery>['paletteId'],
    ParseSwatchQuery<TQuery>['swatchId']
  >;
};
