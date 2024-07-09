// @ts-check

import { defineConfig } from '@pandacss/dev';
import { UI_ENVIRONMENT } from './ui.config.js';
import { mapValues } from 'lodash-es';

export default defineConfig({
  presets: [],

  // Whether to use css reset
  preflight: true,

  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
  theme: {
    breakpoints: UI_ENVIRONMENT.breakpoints.sizes,
    tokens: {
      colors: mapValues(UI_ENVIRONMENT.colors.cssVariablesWrapped, (palette) =>
        mapValues(palette, (value) => ({ value })),
      ),
    },
  },
});
