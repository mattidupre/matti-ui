import {
  parseSwatchQuery,
  type SwatchQueryWithScheme,
  type InferPaletteId,
  type InferSwatchId,
  type InferColorScheme,
} from './colorQuery';
import { createColorTokenVariable } from '@environment/colors';

export type ColorVariable<TQuery extends SwatchQueryWithScheme> = ReturnType<
  typeof createColorTokenVariable<
    InferPaletteId<TQuery>,
    InferSwatchId<TQuery>,
    InferColorScheme<TQuery>
  >
>;

export const createColorVariable = <TQuery extends SwatchQueryWithScheme>(
  query: TQuery,
) => {
  const { paletteId, swatchId, colorScheme } = parseSwatchQuery(query);
  return createColorTokenVariable(
    paletteId,
    swatchId,
    colorScheme as 'light' | 'dark',
  ) as ColorVariable<TQuery>;
};
