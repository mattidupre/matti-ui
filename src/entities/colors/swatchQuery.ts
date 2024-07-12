import { isObject } from 'lodash-es';
import type { PaletteId, SwatchId } from './types';

type _PaletteSwatchId<
  TPaletteId extends PaletteId = PaletteId,
  TSwatchId extends SwatchId<TPaletteId> = SwatchId<TPaletteId>,
> = {
  [P in TPaletteId as string]: {
    paletteId: P;
    swatchId: TSwatchId & SwatchId<P>;
  };
}[string];

type _ColorToken<
  TPaletteId extends PaletteId = PaletteId,
  TSwatchId extends SwatchId<TPaletteId> = SwatchId<TPaletteId>,
> = TPaletteId extends unknown
  ? `${TPaletteId}.${TSwatchId & SwatchId<TPaletteId>}`
  : never;

export type SwatchQuery<
  TPaletteId extends PaletteId = PaletteId,
  TSwatchId extends SwatchId<TPaletteId> = SwatchId<TPaletteId>,
> =
  | _ColorToken<TPaletteId, TSwatchId>
  | _PaletteSwatchId<TPaletteId, TSwatchId>;

export type PaletteSwatchId<TQuery extends SwatchQuery = _PaletteSwatchId> =
  TQuery extends _PaletteSwatchId
    ? TQuery
    : TQuery extends _ColorToken<infer TPaletteId, infer TSwatchId>
      ? _PaletteSwatchId<TPaletteId, TSwatchId>
      : never;

export type ColorToken<TQuery extends SwatchQuery = _PaletteSwatchId> =
  TQuery extends _ColorToken
    ? TQuery
    : TQuery extends _PaletteSwatchId<
          infer TPaletteId extends PaletteId,
          infer TSwatchId
        >
      ? _ColorToken<TPaletteId, TSwatchId>
      : never;

export const createColorToken = <const TQuery extends SwatchQuery>(
  query: TQuery,
): ColorToken<TQuery> => {
  if (typeof query === 'string') {
    return query as ColorToken<TQuery>;
  }
  const { paletteId, swatchId } = query;
  return `${paletteId}.${swatchId}` as ColorToken<TQuery>;
};

export const parseColorToken = <const TToken extends ColorToken>(
  token: TToken,
) => {
  const [paletteId, swatchId] = token.split('.');
  return { paletteId, swatchId } as TToken extends _ColorToken<
    infer TPaletteId extends PaletteId,
    infer TSwatchId extends string & SwatchId
  >
    ? {
        paletteId: TPaletteId;
        swatchId: TSwatchId;
      }
    : never;
};

export const parseSwatchQuery = <const TQuery extends SwatchQuery>(
  query: TQuery,
) => {
  let paletteId: string;
  let swatchId: string;
  if (typeof query === 'string') {
    [paletteId, swatchId] = query.split('.');
  } else if (isObject(query)) {
    ({ paletteId, swatchId } = query as {
      paletteId: string;
      swatchId: string;
    });
  } else {
    throw new TypeError('Invalid color query.');
  }
  // TODO: Add assertion.
  return { paletteId, swatchId } as PaletteSwatchId<TQuery>;
};
