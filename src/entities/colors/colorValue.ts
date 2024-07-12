import { SWATCH_CSS_VARIABLES_WRAPPED } from './constants';
import { parseSwatchQuery, type SwatchQuery } from './swatchQuery';
import type { Color } from './types';

export const colorValue = ({ lightness, chroma, hue }: Color) =>
  `oklch(${lightness} ${chroma} ${hue})`;

export const colorVariable = (query: SwatchQuery): string => {
  const { paletteId, swatchId } = parseSwatchQuery(query);
  return (SWATCH_CSS_VARIABLES_WRAPPED[paletteId] as Record<string, string>)[
    swatchId
  ];
};
