import { defineConfig } from '@pandacss/dev';
import { mapSwatchesToColorTokens } from './shared/entities';
import { UI_PREFIX } from './shared/constants';

export default defineConfig({
  presets: [],
  prefix: UI_PREFIX,
  preflight: true,
  eject: false,

  include: ['./components/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  outdir: 'styled-system',
  theme: {
    extend: {
      tokens: {
        colors: mapSwatchesToColorTokens(
          ({
            cssVariableWrapped,
            cssVariableWrappedLight,
            cssVariableWrappedDark,
          }) => ({
            DEFAULT: { value: cssVariableWrapped },
            light: { value: cssVariableWrappedLight },
            dark: { value: cssVariableWrappedDark },
          }),
        ),
      },
    },
  },
});
