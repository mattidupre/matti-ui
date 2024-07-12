import { mapValues } from 'lodash-es';
import { UI_ENVIRONMENT } from '@config';

export const COLORS_ENVIRONMENT = UI_ENVIRONMENT['colors'];

export const PALETTES = COLORS_ENVIRONMENT.palettes;

export const PALETTE_IDS = COLORS_ENVIRONMENT.paletteIds;

export const SWATCH_IDS_BY_PALETTE_ID = mapValues(
  COLORS_ENVIRONMENT.palettes,
  ({ swatchIds }) => swatchIds,
) as {
  [TPaletteId in keyof typeof PALETTES]: (typeof PALETTES)[TPaletteId]['swatchIds'];
};

export const COLOR_TOKENS = COLORS_ENVIRONMENT.tokenNames;
