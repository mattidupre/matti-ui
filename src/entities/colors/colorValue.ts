import { SWATCH_CSS_VARIABLES_WRAPPED } from './constants';
import { parseSwatchQuery, type SwatchQuery } from './colorQuery';
import type { Color } from './types';

export const colorValue = ({ lightness, chroma, hue }: Color) =>
  `oklch(${lightness} ${chroma} ${hue})`;

export const colorVariable = (query: SwatchQuery): string => {
  const { paletteId, swatchId, colorScheme } = parseSwatchQuery(query);
  const variables = (
    SWATCH_CSS_VARIABLES_WRAPPED[paletteId] as Record<
      string,
      Record<string, string>
    >
  )[swatchId];
  if (colorScheme) {
    return variables[colorScheme];
  }
  return `light-dark(${variables.light}, ${variables.dark})`;
};
