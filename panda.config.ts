import { defineConfig } from '@pandacss/dev';
import {
  mapSwatchesToIds,
  mapPalettesToIds,
  swatchDefaultValue,
} from './shared/entities';
import { UI_PREFIX } from './shared/constants';
import * as patterns from './panda/patterns';

const COLORS = mapSwatchesToIds(({ colorToken }) => {
  return {
    DEFAULT: { value: swatchDefaultValue(colorToken) },
    light: { value: swatchDefaultValue(colorToken, 'light') },
    dark: { value: swatchDefaultValue(colorToken, 'dark') },
  };
});

export default defineConfig({
  include: ['./components/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',

  presets: [],
  preflight: true,
  eject: false,

  // prefix: UI_PREFIX,
  patterns,
  theme: {
    // 👇🏻 Define your tokens here
    extend: {
      tokens: {
        colors: COLORS,
      },
      // semanticTokens: {
      //   colors: COLORS,
      // },
      // semanticTokens: {
      //   colors: COLORS,
      // },
    },
    //   semanticTokens: {
    //     colors: {
    //       extend: {
    //         accent: {
    //           '500': {
    //             value: 'red',
    //           },
    //         },
    //         // ...mapSwatchesToIds(
    //         //   ({
    //         //     cssVariableWrapped,
    //         //     cssVariableWrappedLight,
    //         //     cssVariableWrappedDark,
    //         //   }) => {
    //         //     return { value: cssVariableWrapped };
    //         //     // return {
    //         //     //   DEFAULT: { value: cssVariableWrapped },
    //         //     //   light: { value: cssVariableWrappedLight },
    //         //     //   dark: { value: cssVariableWrappedDark },
    //         //     // };
    //         //   },
    //         // ),
    //       },
    //     },
    //   },
  },
});
