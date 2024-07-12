import { isObject } from 'lodash-es';
import type { PaletteId, SwatchId, PaletteSwatchId } from './types';
import type { ColorToken } from './colorToken';

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
