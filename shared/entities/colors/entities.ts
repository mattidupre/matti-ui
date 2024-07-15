import { COLORS_CONFIG } from '../../config';
import type { LightAndDark, LightOrDarkOrBase, Oklch } from '../../utils';
import {
  type ColorToken,
  type ParseSwatchQuery,
  parseSwatchQuery,
  type SwatchQuery,
} from '.';

export {
  OKLCH_BOUNDS as COLOR_BOUNDS,
  OKLCH_DEFAULTS as COLOR_DEFAULTS,
  OKLCH_LABELS as COLOR_LABELS,
} from '../../utils';

export type Color = Oklch;

export type ColorOption = LightOrDarkOrBase<Oklch>;

export type ColorConfig = LightAndDark<Oklch>;

const {
  paletteIds,
  colorTokens,
  palettesById,
  swatchesByPaletteId,
  swatchIdsByPaletteId,
} = COLORS_CONFIG;

const ALL_PALETTES = Object.values(palettesById) as ReadonlyArray<PaletteAny>;

const ALL_SWATCHES = ALL_PALETTES.flatMap(({ swatches }) =>
  Object.values(swatches),
) as ReadonlyArray<SwatchAny>;

export type PaletteId = keyof typeof swatchesByPaletteId;

export const isPaletteId = (value: any): value is PaletteId =>
  paletteIds.includes(value);

export type SwatchId<TPaletteId extends PaletteId = PaletteId> =
  TPaletteId extends unknown
    ? keyof (typeof swatchesByPaletteId)[TPaletteId]
    : never;

export const isPaletteSwatchId = <TPaletteId extends PaletteId>(
  paletteId: TPaletteId,
  value: any,
): value is SwatchId<TPaletteId> =>
  (swatchIdsByPaletteId[paletteId] as Array<string>).includes(value);

export type PaletteSwatchIdObject = {
  [TPaletteId in PaletteId as string]: {
    paletteId: TPaletteId;
    swatchId: SwatchId<TPaletteId>;
  };
}[string];

export const isPaletteSwatchIdObject = (
  value: any,
): value is PaletteSwatchIdObject => {
  if (value === null || typeof value !== 'object') {
    return false;
  }
  const { paletteId, swatchId } = value;
  return isPaletteId(paletteId) && isPaletteSwatchId(paletteId, swatchId);
};

type _SwatchAny = {
  [TPaletteId in keyof typeof swatchesByPaletteId as string]: {
    [TSwatchId in keyof (typeof swatchesByPaletteId)[TPaletteId] as string]: (typeof swatchesByPaletteId)[TPaletteId][TSwatchId];
  }[string];
}[string];

type SwatchAny = {
  [TKey in keyof _SwatchAny]: _SwatchAny[TKey];
};

type _PaletteAny = {
  [TPaletteId in keyof typeof palettesById as string]: (typeof palettesById)[TPaletteId];
}[string];

type PaletteAny = {
  [TKey in keyof _PaletteAny]: TKey extends 'swatches'
    ? Record<string, SwatchAny>
    : TKey extends 'base'
      ? Pick<Partial<Color>, 'hue' | 'chroma'>
      : _PaletteAny[TKey];
};

export type PaletteConfig<TPaletteId extends PaletteId = never> = [
  TPaletteId,
] extends [never]
  ? PaletteAny
  : (typeof palettesById)[TPaletteId];

export type SwatchConfig<
  TPaletteId extends PaletteId = never,
  TSwatchId extends SwatchId<TPaletteId> = never,
> = [TSwatchId] extends [never]
  ? SwatchAny
  : TSwatchId extends keyof (typeof palettesById)[TPaletteId]
    ? (typeof palettesById)[TPaletteId][TSwatchId]
    : never;

export type RecordPaletteSwatchIds<T> = {
  [TPaletteId in PaletteId]: {
    [TSwatchId in SwatchId<TPaletteId>]: T;
  };
};

export type RecordPartialPaletteSwatchIds<T> = {
  [TPaletteId in PaletteId]?: {
    [TSwatchId in SwatchId<TPaletteId>]?: T;
  };
};

export type InferPaletteSwatchIds<
  T extends RecordPartialPaletteSwatchIds<unknown>,
> = T extends RecordPartialPaletteSwatchIds<infer TResult> ? TResult : never;

export type GetPalette<TQuery extends PaletteId | SwatchQuery> =
  (typeof palettesById)[TQuery extends PaletteId
    ? TQuery
    : TQuery extends SwatchQuery
      ? ParseSwatchQuery<TQuery>['paletteId']
      : never];

export const getPaletteConfig = <const TQuery extends PaletteId | SwatchQuery>(
  query: TQuery,
): GetPalette<TQuery> => {
  if (isPaletteId(query)) {
    return palettesById[query] as GetPalette<TQuery>;
  }
  const { paletteId } = parseSwatchQuery(query);
  return palettesById[paletteId] as GetPalette<TQuery>;
};

type _GetSwatch<
  TPaletteId extends PaletteId,
  TSwatchId extends string,
> = TSwatchId extends keyof (typeof swatchesByPaletteId)[TPaletteId]
  ? (typeof swatchesByPaletteId)[TPaletteId][TSwatchId]
  : never;

export type GetSwatch<TQuery extends SwatchQuery> = SwatchQuery extends TQuery
  ? SwatchConfig
  : ColorToken extends TQuery
    ? SwatchConfig
    : _GetSwatch<
        PaletteId & ParseSwatchQuery<TQuery>['paletteId'],
        ParseSwatchQuery<TQuery>['swatchId']
      >;

export const getSwatchConfig = <const TQuery extends SwatchQuery>(
  query: TQuery,
) => {
  const { paletteId, swatchId } = parseSwatchQuery(query);
  return (swatchesByPaletteId as Record<string, Record<string, unknown>>)[
    paletteId
  ][swatchId] as [GetSwatch<TQuery>] extends [never]
    ? SwatchConfig
    : GetSwatch<TQuery>;
};

type _GetSwatchFrom<
  TFrom extends Record<string, Record<string, unknown>>,
  TPaletteId extends string,
  TSwatchId extends string,
> = TPaletteId extends keyof TFrom
  ? TSwatchId extends keyof TFrom[TPaletteId]
    ? TFrom[TPaletteId][TSwatchId]
    : never
  : never;

export type GetSwatchFrom<
  TFrom extends RecordPartialPaletteSwatchIds<unknown>,
  TQuery extends SwatchQuery,
> = _GetSwatchFrom<
  TFrom,
  ParseSwatchQuery<TQuery>['paletteId'],
  ParseSwatchQuery<TQuery>['swatchId']
>;

export const getSwatchFrom = <
  const TFrom extends RecordPartialPaletteSwatchIds<T>,
  T,
  const TQuery extends SwatchQuery,
>(
  from: TFrom,
  query: TQuery,
) => {
  const { paletteId, swatchId } = parseSwatchQuery(query);
  return (from as Record<string, Record<string, unknown>>)?.[paletteId]?.[
    swatchId
  ] as GetSwatchFrom<TFrom, TQuery>;
};

export const forEachPalette = (callback: (palette: PaletteAny) => unknown) => {
  for (const palette of Object.values(palettesById)) {
    callback(palette);
  }
};

export const mapPalettes = <T>(callback: (palette: PaletteAny) => T) => {
  const result: Array<T> = [];
  for (const palette of ALL_PALETTES) {
    result.push(callback(palette));
  }
  return result;
};

export const mapPalettesToIds = <T>(callback: (palette: PaletteAny) => T) => {
  const result: Record<string, unknown> = {};
  for (const palette of Object.values(palettesById)) {
    result[palette.paletteId] = callback(palette);
  }
  return result as Record<PaletteId, T>;
};

export const forEachSwatch = (callback: (swatch: SwatchAny) => unknown) => {
  for (const swatch of ALL_SWATCHES) {
    callback(swatch);
  }
};

export const mapSwatches = <T>(callback: (swatch: SwatchAny) => T) => {
  const result: Array<T> = [];
  for (const swatch of ALL_SWATCHES) {
    result.push(callback(swatch));
  }
  return result;
};

export const mapSwatchesToIds = <T>(callback: (swatch: SwatchAny) => T) => {
  const result: Record<string, Record<string, unknown>> = {};
  for (const swatch of ALL_SWATCHES) {
    result[swatch.paletteId] ??= {};
    result[swatch.paletteId][swatch.swatchId] = callback(swatch);
  }
  return result as RecordPaletteSwatchIds<T>;
};

export const mapSwatchesToColorTokens = <T>(
  callback: (swatch: SwatchAny) => T,
) => {
  const result: Record<string, unknown> = {};
  for (const swatch of ALL_SWATCHES) {
    result[swatch.colorToken] = callback(swatch);
  }
  return result as Record<(typeof colorTokens)[number], T>;
};

export const forEachPaletteSwatch = (
  paletteId: PaletteId,
  callback: (swatch: SwatchAny) => unknown,
) => {
  for (const swatch of Object.values(swatchesByPaletteId[paletteId])) {
    callback(swatch);
  }
};

export const mapPaletteSwatchesToIds = <const TPaletteId extends PaletteId, T>(
  paletteId: TPaletteId,
  callback: (swatch: SwatchAny) => T,
) => {
  const result: Record<string, unknown> = {};
  for (const swatch of Object.values(swatchesByPaletteId[paletteId])) {
    result[swatch.swatchId] = callback(swatch);
  }
  return result as Record<SwatchId<TPaletteId>, T>;
};

export const mapPaletteSwatchesToColorTokens = <
  const TPaletteId extends PaletteId,
  const T,
>(
  paletteId: TPaletteId,
  callback: (swatch: SwatchAny) => T,
) => {
  const result: Record<string, unknown> = {};
  for (const swatch of Object.values(swatchesByPaletteId[paletteId])) {
    result[swatch.colorToken] = callback(swatch);
  }
  return result as Record<
    ColorToken<{ paletteId: TPaletteId; swatchId: SwatchId<TPaletteId> }>,
    T
  >;
};
