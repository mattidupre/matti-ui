import { defineConfig } from '@pandacss/dev';
import {
  mapSwatches,
  mapSwatchesToPaletteIds,
  mapPalettesToIds,
  swatchDefaultValue,
} from './shared/entities';
import { UI_PREFIX, COLOR_SCHEME_CONFIG } from './shared';
import { globalCss } from './panda/globalCss';
import * as patterns from './panda/patterns';
import * as recipes from './panda/recipes';

const COLOR_TOKENS_ALL = mapSwatches(
  ({ colorToken, colorTokenLight, colorTokenDark }) => [
    colorToken,
    colorTokenLight,
    colorTokenDark,
  ],
).flat();

const COLORS = mapSwatchesToPaletteIds(({ colorToken }) => {
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
  prefix: UI_PREFIX,

  presets: [],
  eject: false,

  preflight: true,
  jsxFramework: 'react',
  jsxFactory: 'styled',

  globalCss,

  staticCss: {
    css: [
      {
        properties: {
          color: COLOR_TOKENS_ALL,
          backgroundColor: COLOR_TOKENS_ALL,
        },
        conditions: ['light', 'dark'],
        responsive: true,
      },
    ],
  },

  patterns,

  theme: {
    extend: {
      recipes,
      tokens: {
        colors: COLORS,
      },
      semanticTokens: {
        colors: {
          currentColor: { value: 'currentColor' },
        },
      },
    },
  },

  conditions: {
    extend: {
      light: `&.${COLOR_SCHEME_CONFIG.className.light}, .${COLOR_SCHEME_CONFIG.className.light} &`,
      dark: `&.${COLOR_SCHEME_CONFIG.className.dark}, .${COLOR_SCHEME_CONFIG.className.dark} &`,
    },
  },
});
