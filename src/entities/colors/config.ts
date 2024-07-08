import { definePalettes } from './definePalettes';

export const BASE_PALETTES = definePalettes({
  site: {
    fill: { light: { lightness: 0 }, dark: { lightness: 1 } },
    background: { light: { lightness: 1 }, dark: { lightness: 0 } },
    browser: {
      /* extends: 'primary.500' */
    },
  },
  fill: {
    '100': { light: { lightness: 1 } },
    '200': {},
    '300': {},
    '400': {},
    '500': {},
  },
  background: {
    '500': {},
    '600': {},
    '700': {},
    '800': {},
    '900': {},
  },
  primary: {
    _base: { hue: 0 },
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
  accent: {
    _base: { hue: 120 },
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
  form: {
    fill: {},
    background: {},
    disabled: {},
    outline: {},
    highlight: {},
  },
});
