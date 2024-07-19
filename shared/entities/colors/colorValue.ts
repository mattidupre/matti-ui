import {
  extendOklchLightDark,
  oklchToString,
  type PartialOkclhLightDark,
} from '../../utils';
import type { SwatchQuery } from './colorQuery';
import { getPaletteConfig, getSwatchConfig } from './entities';

export const colorValue = (
  color: PartialOkclhLightDark,
  colorScheme?: 'light' | 'dark',
) => {
  const parsedColor = extendOklchLightDark(color);
  switch (colorScheme) {
    case 'light': {
      return oklchToString(parsedColor.light);
    }
    case 'dark': {
      return oklchToString(parsedColor.dark);
    }
    case undefined: {
      return oklchToString(color);
    }
  }
};

export const swatchDefaultValue = (
  swatch: SwatchQuery,
  colorScheme?: 'light' | 'dark',
) => {
  const { base } = getPaletteConfig(swatch);
  const { color } = getSwatchConfig(swatch);
  return colorValue(extendOklchLightDark(base, color), colorScheme);
};
