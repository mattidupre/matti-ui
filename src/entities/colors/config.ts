import { definePalettes } from './definePalettes';

export const PALETTE_DEFAULTS = definePalettes({
  site: {
    swatches: {
      fill: { light: { lightness: 0 }, dark: { lightness: 1 } },
      background: { light: { lightness: 1 }, dark: { lightness: 0 } },
      browser: {
        /* extends: 'primary.500' */
      },
    },
  },
  fill: {
    swatches: {
      '100': { light: { lightness: 1 } },
      '200': {},
      '300': {},
      '400': {},
      '500': {},
    },
  },
  background: {
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
  form: {
    swatches: {
      fill: {},
      background: {},
      disabled: {},
      outline: {},
      highlight: {},
    },
  },
});
