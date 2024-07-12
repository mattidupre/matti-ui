import { mapValues } from 'lodash-es';
import type { Color } from './types';
import type { ColorToken } from './swatchQuery';
import { UI_ENVIRONMENT } from '@config';

export const COLORS_ENVIRONMENT = UI_ENVIRONMENT['colors'];

export const PALETTES = COLORS_ENVIRONMENT.palettes;

export const PALETTE_IDS = COLORS_ENVIRONMENT.paletteIds;

export const SWATCH_CSS_VARIABLES = COLORS_ENVIRONMENT.cssVariables;

export const SWATCH_CSS_VARIABLES_WRAPPED =
  COLORS_ENVIRONMENT.cssVariablesWrapped;

export const SWATCH_IDS_BY_PALETTE_ID = mapValues(
  COLORS_ENVIRONMENT.palettes,
  ({ swatchIds }) => swatchIds,
) as {
  [TPaletteId in keyof typeof PALETTES]: (typeof PALETTES)[TPaletteId]['swatchIds'];
};

export const COLOR_TOKENS = COLORS_ENVIRONMENT.tokenNames;

export const COLOR_TOKENS_ALL = Object.keys(
  COLORS_ENVIRONMENT.tokenNames,
) as ReadonlyArray<ColorToken>;

export const COLOR_DEFAULT: Color = { lightness: 0, chroma: 0, hue: 0 };

export const COLOR_LABELS = {
  lightness: 'Lightness',
  chroma: 'Chroma',
  hue: 'Hue',
} as const satisfies Record<keyof Color, string>;
