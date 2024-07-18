import { defineConfig } from '@pandacss/dev';
import {
  TYPOGRAPHY_VARIANT_DEFAULTS,
  mapSwatches,
  mapTypographyVariants,
  swatchDefaultValue,
} from './shared/entities';
import { UI_PREFIX, COLOR_SCHEME_CONFIG } from './shared';
import { globalCss } from './panda/globalCss';
import { globalVars } from './panda/globalVars';
import * as patterns from './panda/patterns';
import * as recipes from './panda/recipes';

const COLOR_TOKENS_ALL = mapSwatches(
  ({ colorToken, colorTokenLight, colorTokenDark }) => [
    colorToken,
    colorTokenLight,
    colorTokenDark,
  ],
).flat();

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
  // strictTokens: true,

  globalCss,

  globalVars,

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
        // fonts: Object.fromEntries(
        //   mapTypographyVariants(({ variantId }) => {
        //     const variant = TYPOGRAPHY_VARIANT_DEFAULTS[variantId];
        //     return [
        //       variantId,
        //       {
        //         value: [variant.fontFamily, ...variant.fontFallback],
        //       },
        //     ];
        //   }),
        // ),
        colors: Object.fromEntries(
          mapSwatches(({ colorToken, colorTokenLight, colorTokenDark }) => [
            [
              colorTokenLight,
              { value: swatchDefaultValue(colorToken, 'light') },
            ],
            [colorTokenDark, { value: swatchDefaultValue(colorToken, 'dark') }],
          ]).flat(),
        ),
      },
      semanticTokens: {
        colors: {
          ...Object.fromEntries(
            mapSwatches(({ colorToken, colorTokenLight, colorTokenDark }) => {
              return [
                colorToken,
                {
                  value: `light-dark({colors.${colorTokenLight}}, {colors.${colorTokenDark}})`,
                },
              ];
            }),
          ),
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
