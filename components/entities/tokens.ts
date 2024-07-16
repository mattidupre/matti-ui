// TODO: Create function for coercing color tokens as default / light / dark.

import {
  type ColorToken,
  type CssVariable,
  type CssVariableWrapped,
  mapSwatches,
  parseSwatchQuery,
  type SwatchQuery,
  unescapeCssVariable,
  unwrapCssVariable,
} from '../../shared';
import { type Token, token } from '../../styled-system/tokens';

// Because CSS variable names are generated by Panda,
// these functions should not be in /shared.

const CSS_VARIABLES_WRAPPED = Object.fromEntries(
  mapSwatches(({ colorToken, colorTokenLight, colorTokenDark }) => [
    [
      `${colorToken}`,
      token.var(`colors.${colorToken}` as Token) as CssVariableWrapped,
    ],
    [
      `${colorToken}.light`,
      token.var(`colors.${colorTokenLight}` as Token) as CssVariableWrapped,
    ],
    [
      `${colorToken}.dark`,
      token.var(`colors.${colorTokenDark}` as Token) as CssVariableWrapped,
    ],
  ]).flat(),
) as Record<ColorToken, CssVariableWrapped>;

const CSS_VARIABLES_UNWRAPPED = Object.fromEntries(
  mapSwatches(({ colorToken }) => [
    [
      `${colorToken}`,
      unescapeCssVariable(
        unwrapCssVariable(
          token.var(`colors.${colorToken}` as Token) as CssVariableWrapped,
        ) as CssVariable,
      ),
    ],
    [
      `${colorToken}.light`,
      unescapeCssVariable(
        unwrapCssVariable(
          token.var(
            `colors.${colorToken}.light` as Token,
          ) as CssVariableWrapped,
        ) as CssVariable,
      ),
    ],
    [
      `${colorToken}.dark`,
      unescapeCssVariable(
        unwrapCssVariable(
          token.var(`colors.${colorToken}.dark` as Token) as CssVariableWrapped,
        ) as CssVariable,
      ),
    ],
  ]).flat(),
) as Record<ColorToken, CssVariable>;

export const getColorVariable = (query: SwatchQuery) =>
  CSS_VARIABLES_UNWRAPPED[parseSwatchQuery(query).colorToken];

export const getColorVariableWrapped = (query: SwatchQuery) =>
  CSS_VARIABLES_WRAPPED[parseSwatchQuery(query).colorToken];
