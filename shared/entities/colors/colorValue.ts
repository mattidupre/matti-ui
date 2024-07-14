import type { LightAndDark } from '../../utils';
import {
  parseSwatchQuery,
  type SwatchQuery,
  getSwatchConfig,
  type Color,
} from '.';

export const colorValue = (value: Color | LightAndDark<Color>): string => {
  if ('light' in value && 'dark' in value) {
    return `light-dark(${colorValue(value.light)}, ${colorValue(value.dark)})`;
  }
  const { lightness, chroma, hue } = value;
  return `oklch(${lightness} ${chroma} ${hue})` as const;
};

export const colorVariable = (query: SwatchQuery) => {
  const { colorScheme } = parseSwatchQuery(query);
  const {
    cssVariableWrapped,
    cssVariableWrappedLight,
    cssVariableWrappedDark,
  } = getSwatchConfig(query);
  switch (colorScheme) {
    case 'light': {
      return cssVariableWrappedLight;
    }
    case 'dark': {
      return cssVariableWrappedDark;
    }
    case undefined: {
      return cssVariableWrapped;
    }
  }
};
