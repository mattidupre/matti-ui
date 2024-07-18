import { defineConfig } from '@pandacss/dev';
import {
  getTypographyVariant,
  TYPOGRAPHY_VARIANT_DEFAULT_ID,
  mapSwatches,
  mapTypographyVariants,
  swatchDefaultValue,
  TYPOGRAPHY_VARIANTS,
  TYPOGRAPHY_VARIANT_IDS,
  TYPOGRAPHY_CSS_BY_VARIANT_ID,
} from './shared/entities';
import { UI_PREFIX, COLOR_SCHEME_CONFIG } from './shared';
import { globalCss } from './panda/globalCss';
import { globalVars } from './panda/globalVars';
import { plugins } from './panda/plugins';
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
  // hash: true,
  // strictTokens: true,

  jsxFramework: 'react',
  jsxFactory: 'styled',

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
      {
        properties: TYPOGRAPHY_VARIANTS.reduce(
          (result, { cssVariables }) => {
            for (const [propertyKey, { ref: variableName }] of Object.entries(
              cssVariables,
            )) {
              result[propertyKey] ??= [];
              result[propertyKey].push(variableName);
            }
            return result;
          },
          {} as Record<string, Array<string>>,
        ),
      },
    ],
  },

  patterns,

  utilities: {
    extend: {
      typography: {
        values: TYPOGRAPHY_VARIANT_IDS,
        transform(variantId, { token }) {
          return TYPOGRAPHY_CSS_BY_VARIANT_ID[variantId];
        },
      },
    },
  },

  theme: {
    extend: {
      recipes,
      tokens: {
        fonts: Object.fromEntries(
          mapTypographyVariants(({ variantId }) => {
            const { fontFamily } = getTypographyVariant(
              TYPOGRAPHY_VARIANT_DEFAULT_ID,
              variantId,
            );
            return [
              variantId,
              {
                value: fontFamily,
              },
            ];
          }),
        ),
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

  plugins,
});
