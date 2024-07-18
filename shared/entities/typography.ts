import type { Simplify } from 'type-fest';
import { mapValues } from 'lodash-es';
import { TYPOGRAPHY_CONFIG } from '../config';
import { createCssVariable, wrapCssVariable } from '../utils';

const { fontIds, variantIds, variantKeys, variantsById, themeIds, themesById } =
  TYPOGRAPHY_CONFIG;

export type FontId = (typeof fontIds)[number];

export type TypographyThemeId = (typeof themeIds)[number];

export type TypographyVariantId = (typeof variantIds)[number];

export const TYPOGRAPHY_VARIANT_IDS = variantIds;

type TypographyVariantConfig = (typeof variantsById)[TypographyVariantId];

export type TypographyVariant<
  TThemeId extends TypographyThemeId = TypographyThemeId,
> = Simplify<
  (typeof variantsById)[TypographyVariantId] &
    (typeof themesById)[TThemeId]['variants'][TypographyVariantId]
>;

const TYPOGRAPHY_VARIANT_CSS_PROPERTIES = [
  'fontFamily',
  'fontWeight',
  'fontStyle',
] as const;

export type TypographyVariantCssProperty =
  (typeof TYPOGRAPHY_VARIANT_CSS_PROPERTIES)[number];

export const TYPOGRAPHY_VARIANT_DEFAULTS = themesById[themeIds[0]].variants;

export const mapTypographyVariants = <T>(
  callback: (variant: TypographyVariantConfig) => T,
): Array<T> => {
  const result: Array<T> = [];
  for (const variant of Object.values(variantsById)) {
    result.push(callback(variant as TypographyVariantConfig));
  }
  return result;
};

export const TYPOGRAPHY_CSS_VARIABLES = mapValues(
  variantsById,
  ({ variantId }) =>
    Object.fromEntries(
      TYPOGRAPHY_VARIANT_CSS_PROPERTIES.map((variantKey) => [
        variantKey,
        createCssVariable(`${variantId}-${variantKey}`),
      ]),
    ),
) as {
  [TVariantId in TypographyVariantId]: {
    [TVariantKey in TypographyVariantCssProperty]: ReturnType<
      typeof createCssVariable<`${TVariantId}-${TVariantKey}`>
    >;
  };
};

export const TYPOGRAPHY_CSS_VARIABLES_WRAPPED = mapValues(
  TYPOGRAPHY_CSS_VARIABLES,
  (variant) =>
    mapValues(variant, (variableName) => wrapCssVariable(variableName)),
);

export const getTypographyCssVariables = (variantId: TypographyVariantId) =>
  TYPOGRAPHY_CSS_VARIABLES[variantId];

export const getTypographyVariant = (
  themeId: TypographyThemeId,
  variantId: TypographyVariantId,
) => themesById[themeId].variants[variantId];
