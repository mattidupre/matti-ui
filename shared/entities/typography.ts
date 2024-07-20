import type { Simplify } from 'type-fest';
import { mapValues } from 'lodash-es';
import { TYPOGRAPHY_CONFIG } from '../config';
import { defineCssVariable } from '../utils';

const {
  fontIds,
  variantIds,
  defaultThemeId,
  variantsById,
  themeIds,
  themesById,
} = TYPOGRAPHY_CONFIG;

export type FontId = (typeof fontIds)[number];

export const TYPOGRAPHY_THEME_IDS = themeIds;

export type TypographyThemeId = (typeof themeIds)[number];

export type TypographyVariantId = (typeof variantIds)[number];

export const TYPOGRAPHY_VARIANTS = Object.values(variantsById);

export const TYPOGRAPHY_VARIANT_IDS = variantIds;

type TypographyVariantConfig = (typeof variantsById)[TypographyVariantId];

export type TypographyVariant<
  TThemeId extends TypographyThemeId = TypographyThemeId,
> = Simplify<
  (typeof variantsById)[TypographyVariantId] &
    (typeof themesById)[TThemeId]['variants'][TypographyVariantId]
>;

export const TYPOGRAPHY_THEME_DEFAULT_ID = defaultThemeId;

export const mapTypographyVariants = <T>(
  callback: (variant: TypographyVariantConfig) => T,
): Array<T> => {
  const result: Array<T> = [];
  for (const variant of TYPOGRAPHY_VARIANTS) {
    result.push(callback(variant as TypographyVariantConfig));
  }
  return result;
};

export const mapTypographyVariantsToIds = <T>(
  callback: (variant: TypographyVariantConfig) => T,
): Record<TypographyVariantId, T> => {
  const result = {} as Record<TypographyVariantId, T>;
  for (const variant of TYPOGRAPHY_VARIANTS) {
    result[variant.variantId] = callback(variant);
  }
  return result;
};

export const getTypographyVariant = (
  themeId: TypographyThemeId,
  variantId: TypographyVariantId,
) => themesById[themeId].variants[variantId];

export const getTypographyVariable = (
  themeId: TypographyThemeId,
  variantId: TypographyVariantId,
  property: keyof TypographyVariant['cssVariables'],
) => defineCssVariable([themeId, variantId, property]);

export const getTypographyVariableValues = (
  themeId: TypographyThemeId,
): Record<string, string> => {
  return Object.fromEntries(
    mapTypographyVariants(({ variantId, cssVariables }) => {
      const variant = getTypographyVariant(themeId, variantId);
      return Object.entries(cssVariables).map(
        ([cssProperty, { var: cssVariableName }]) => {
          return [
            cssVariableName,
            String((variant as Record<string, number | string>)[cssProperty]),
          ];
        },
      );
    }).flat(),
  );
};

export const TYPOGRAPHY_CSS_BY_VARIANT_ID = mapTypographyVariantsToIds(
  ({ cssVariables }) => mapValues(cssVariables, ({ ref }) => ref),
);
