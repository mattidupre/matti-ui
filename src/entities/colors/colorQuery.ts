import { isObject } from 'lodash-es';
import type { Simplify } from 'type-fest';
import type { PaletteId, SwatchId } from './types';

type ColorScheme = 'light' | 'dark';

type _PaletteSwatchIdWithoutScheme<
  TPaletteId extends PaletteId = PaletteId,
  TSwatchId extends SwatchId<TPaletteId> = SwatchId<TPaletteId>,
> = {
  [P in TPaletteId as string]: {
    paletteId: P;
    swatchId: TSwatchId & SwatchId<P>;
  };
}[string];

type _PaletteSwatchIdWithScheme<
  TPaletteId extends PaletteId = PaletteId,
  TSwatchId extends SwatchId<TPaletteId> = SwatchId<TPaletteId>,
  TColorScheme extends ColorScheme = ColorScheme,
> = _PaletteSwatchIdWithoutScheme<TPaletteId, TSwatchId> & {
  colorScheme: TColorScheme;
};

type _ColorTokenWithoutScheme<
  TPaletteId extends PaletteId = PaletteId,
  TSwatchId extends SwatchId<TPaletteId> = SwatchId<TPaletteId>,
> = TPaletteId extends unknown
  ? `${TPaletteId}.${TSwatchId & SwatchId<TPaletteId>}`
  : never;

type _ColorTokenWithScheme<
  TPaletteId extends PaletteId = PaletteId,
  TSwatchId extends SwatchId<TPaletteId> = SwatchId<TPaletteId>,
  TColorScheme extends ColorScheme = ColorScheme,
> = `${_ColorTokenWithoutScheme<TPaletteId, TSwatchId>}.${TColorScheme}`;

type _SwatchQueryWithoutScheme<
  TPaletteId extends PaletteId = PaletteId,
  TSwatchId extends SwatchId<TPaletteId> = SwatchId<TPaletteId>,
> =
  | _ColorTokenWithoutScheme<TPaletteId, TSwatchId>
  | _PaletteSwatchIdWithoutScheme<TPaletteId, TSwatchId>;

type _SwatchQueryWithScheme<
  TPaletteId extends PaletteId = PaletteId,
  TSwatchId extends SwatchId<TPaletteId> = SwatchId<TPaletteId>,
  TColorScheme extends ColorScheme = ColorScheme,
> =
  | _PaletteSwatchIdWithScheme<TPaletteId, TSwatchId, TColorScheme>
  | _ColorTokenWithScheme<TPaletteId, TSwatchId, TColorScheme>;

export type InferPaletteId<T> =
  T extends _SwatchQueryWithoutScheme<infer TPaletteId extends PaletteId, any>
    ? TPaletteId
    : never;

export type InferSwatchId<T> =
  T extends _SwatchQueryWithoutScheme<
    PaletteId,
    infer TSwatchId extends SwatchId
  >
    ? `${TSwatchId}`
    : T extends _SwatchQueryWithScheme<
          PaletteId,
          infer TSwatchId extends SwatchId
        >
      ? `${TSwatchId}`
      : never;

export type InferColorScheme<T> =
  T extends _SwatchQueryWithScheme<any, any, infer TColorScheme>
    ? TColorScheme
    : never;

export type SwatchQuery = Simplify<
  _SwatchQueryWithScheme | _SwatchQueryWithoutScheme
>;

export type SwatchQueryWithScheme = _SwatchQueryWithScheme;

export type SwatchQueryWithoutScheme = _SwatchQueryWithoutScheme;

export type PaletteSwatchId = _PaletteSwatchIdWithoutScheme;

export type ColorToken<
  TQuery = PaletteId | `${PaletteId}-light` | `${PaletteId}-dark`,
> = TQuery extends PaletteId
  ? _ColorTokenWithoutScheme<TQuery>
  : TQuery extends `${infer TPaletteId extends PaletteId}-${infer TColorScheme extends ColorScheme}`
    ? _ColorTokenWithScheme<TPaletteId, SwatchId<TPaletteId>, TColorScheme>
    : TQuery extends _ColorTokenWithScheme
      ? TQuery
      : TQuery extends _ColorTokenWithoutScheme
        ? TQuery
        : TQuery extends _PaletteSwatchIdWithScheme<
              infer TPaletteId extends PaletteId,
              infer TSwatchId,
              infer TColorScheme
            >
          ? _ColorTokenWithScheme<TPaletteId, TSwatchId, TColorScheme>
          : TQuery extends _PaletteSwatchIdWithoutScheme<
                infer TPaletteId extends PaletteId,
                infer TSwatchId
              >
            ? _ColorTokenWithoutScheme<TPaletteId, TSwatchId>
            : never;

type ParseSearchQuery<TQuery extends SwatchQuery> = Record<string, string> &
  {
    [TPaletteId in InferPaletteId<TQuery> as string]: Simplify<
      {
        paletteId: TPaletteId;
        swatchId: SwatchId<TPaletteId> & InferSwatchId<TQuery>;
      } & ([InferColorScheme<TQuery>] extends [never]
        ? {
            colorScheme: undefined;
          }
        : {
            colorScheme: InferColorScheme<TQuery>;
          })
    >;
  }[string];

export const parseSwatchQuery = <const TQuery extends SwatchQuery>(
  query: TQuery,
) => {
  let paletteId: string;
  let swatchId: string;
  let colorScheme: string;
  if (typeof query === 'string') {
    [paletteId, swatchId, colorScheme] = query.split('.');
  } else if (isObject(query)) {
    ({ paletteId, swatchId, colorScheme } = query as {
      paletteId: string;
      swatchId: string;
      colorScheme: string;
    });
  } else {
    throw new TypeError('Invalid color query.');
  }

  // TODO: Add assertion.

  return {
    paletteId,
    swatchId,
    colorScheme,
  } as unknown as ParseSearchQuery<TQuery>;
};

export const createColorToken = <const TQuery extends SwatchQuery>(
  query: TQuery,
): ColorToken<TQuery> => {
  if (typeof query === 'string') {
    return query as ColorToken<TQuery>;
  }
  if (!isObject(query)) {
    throw new Error(`Invalid option "${String(query)}".`);
  }
  if ('colorScheme' in query) {
    const { paletteId, swatchId, colorScheme } = query;
    return `${paletteId}.${swatchId}.${colorScheme}` as ColorToken<TQuery>;
  }
  const { paletteId, swatchId } = query;
  return `${paletteId}.${swatchId}` as ColorToken<TQuery>;
};
