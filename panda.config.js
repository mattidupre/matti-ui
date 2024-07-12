// @ts-check

import { defineConfig } from '@pandacss/dev';
import { UI_ENVIRONMENT, UI_PREFIX } from './ui.config.js';
import { mapValues } from 'lodash-es';

export default defineConfig({
  presets: [],
  prefix: UI_PREFIX,
  preflight: true,
  eject: false,

  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
  theme: {
    extend: {
      breakpoints: UI_ENVIRONMENT.breakpoints.sizes,
      tokens: {
        colors: {
          ...mapValues(UI_ENVIRONMENT.colors.cssVariablesWrapped, (palette) =>
            mapValues(palette, (value) => ({ value })),
          ),
          inherit: { value: 'inherit' },
          initial: { value: 'initial' },
          auto: { value: 'auto' },
          currentColor: { value: 'currentColor' },
        },
      },
    },
  },
});
