import type { PalettesOptions } from './entities';
import { defineColorsConfig } from './lib/defineColorsConfig';

export const PALETTES_OPTIONS_DEFAULT: PalettesOptions = {
  site: {
    base: { hue: 0 },
    swatches: {
      fill: { light: { lightness: 0 }, dark: { lightness: 1 } },
      background: { light: { lightness: 1 }, dark: { lightness: 0 } },
      browser: {
        /* extends: 'primary.500' */
      },
    },
  },
  fill: {
    base: { chroma: 0 },
    swatches: {
      '100': { light: { lightness: 1 } },
      '200': {},
      '300': {},
      '400': {},
      '500': {},
    },
  },
  background: {
    base: { chroma: 0 },
    swatches: {
      '500': {},
      '600': {},
      '700': {},
      '800': {},
      '900': {},
    },
  },
  primary: {
    base: { hue: 0 },
    swatches: {
      '100': {},
      '200': {},
      '300': {},
      '400': {},
      '500': {},
      '600': {},
      '700': {},
      '800': {},
      '900': {},
    },
  },
  accent: {
    base: { hue: 120 },
    swatches: {
      '100': {},
      '200': {},
      '300': {},
      '400': {},
      '500': {},
      '600': {},
      '700': {},
      '800': {},
      '900': {},
    },
  },
  form: {
    base: { hue: 0, chroma: 0 },
    swatches: {
      fill: {},
      background: {},
      disabled: {},
      outline: {},
      highlight: {},
    },
  },
};

export const PALETTES_CONFIG = defineColorsConfig(PALETTES_OPTIONS_DEFAULT);
