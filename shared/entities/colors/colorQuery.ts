import { isObject } from 'lodash-es';
import type { Simplify } from 'type-fest';
import {
  isPaletteId,
  isPaletteSwatchId,
  type PaletteId,
  type SwatchId,
} from '.';

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

type InferPaletteId<T> =
  T extends _SwatchQueryWithoutScheme<infer TPaletteId extends PaletteId, any>
    ? TPaletteId
    : never;

type InferSwatchId<T> =
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

type InferColorScheme<T> =
  T extends _SwatchQueryWithScheme<any, any, infer TColorScheme>
    ? TColorScheme
    : never;

export type SwatchQuery = Simplify<
  _SwatchQueryWithScheme | _SwatchQueryWithoutScheme
>;

export type SwatchQueryWithScheme = _SwatchQueryWithScheme;

export type SwatchQueryWithoutScheme = _SwatchQueryWithoutScheme;

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

const objectToColorToken = <
  TObject extends {
    paletteId: string;
    swatchId: string;
    colorScheme?: 'light' | 'dark';
  },
>({
  paletteId,
  swatchId,
  colorScheme,
}: TObject) => {
  if (colorScheme) {
    return `${paletteId}.${swatchId}.${colorScheme}`;
  }
  return `${paletteId}.${swatchId}`;
};

type SwatchQueryToObject<TQuery extends SwatchQuery> = Simplify<
  {
    paletteId: string;
    swatchId: string;
    colorScheme: 'light' | 'dark' | undefined;
  } & {
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
  }[string]
>;

const swatchQueryToObject = <const TQuery extends SwatchQuery>(
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
  } as unknown as SwatchQueryToObject<TQuery>;
};

export type ParseSwatchQuery<TQuery extends SwatchQuery> =
  SwatchQueryToObject<TQuery> & {
    colorToken: ColorToken<TQuery>;
  };

export const parseSwatchQuery = <const TQuery extends SwatchQuery>(
  query: TQuery,
) => {
  const object = swatchQueryToObject(query);

  return {
    ...object,
    colorToken: objectToColorToken(object),
  } as unknown as ParseSwatchQuery<TQuery>;
};

export const isSwatchQuery = (value: any): value is SwatchQuery => {
  const { paletteId, swatchId } = swatchQueryToObject(value as ColorToken);
  return isPaletteId(paletteId) && isPaletteSwatchId(paletteId, swatchId);
};

export const isColorToken = (value: any): value is ColorToken => {
  if (typeof value !== 'string') {
    return false;
  }
  return isSwatchQuery(value);
};
