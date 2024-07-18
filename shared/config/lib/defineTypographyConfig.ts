import type { SimplifyDeep } from 'type-fest';
import { mapValues } from 'lodash-es';
import type { TupleRecord, TuplePluck } from '../../utils';

type FontConfig = {
  fontId: string;
  fontFamily: string;
};

type VariantConfig = {
  variantId: string;
  variantName: string;
};

const TYPOGRAPHY_VARIANT_KEYS = [
  'themeId',
  'variantId',
  'variantName',
  'fontId',
  'fontWeight',
  'fontStyle',
  'fontFamily',
  'fontFallback',
] as const;

type VariantThemeOptions<TFontId extends string> = {
  fontId: TFontId;
  fontFamily: string;
  fontFallback: ReadonlyArray<string>;
  fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  fontStyle: 'normal' | 'italic';
};

type VariantThemeConfig<
  TFontId extends string,
  TVariantId extends string,
  TThemeId extends string,
> = VariantThemeOptions<TFontId> & {
  variantId: TVariantId;
  themeId: TThemeId;
};

type ThemeOptions<
  TFontId extends string,
  TVariantId extends string = string,
> = {
  themeId: string;
  themeName: string;
  variants: {
    [V in TVariantId]: VariantThemeOptions<TFontId>;
  };
};

type ThemeConfig<
  TFontId extends string,
  TVariantId extends string = string,
  TThemeId extends string = string,
> = Omit<ThemeOptions<TFontId, TVariantId>, 'variants'> & {
  variants: {
    [V in TVariantId]: VariantThemeConfig<TFontId, TVariantId, TThemeId>;
  };
};

export const defineTypographyConfig = <
  const TFonts extends ReadonlyArray<{ fontId: string }>,
  const TVariants extends ReadonlyArray<{ variantId: string }>,
  const TThemes extends ReadonlyArray<{ themeId: string }>,
>({
  fonts,
  variants,
  themes,
}: {
  // Define more narrow types here instead of in generics prevents inference.
  fonts: TFonts & ReadonlyArray<FontConfig>;
  variants: TVariants & ReadonlyArray<VariantConfig>;
  themes: TThemes &
    NoInfer<
      ReadonlyArray<
        ThemeOptions<TFonts[number]['fontId'], TVariants[number]['variantId']>
      >
    >;
}) => {
  const fontIds: Array<string> = [];
  const fontsById: Record<string, (typeof fonts)[number]> = {};
  for (const fontOptions of fonts) {
    const { fontId } = fontOptions;
    fontIds.push(fontId);
    fontsById[fontId] = fontOptions;
  }

  const variantIds: Array<string> = [];
  const variantsById: Record<string, (typeof variants)[number]> = {};
  for (const variantOptions of variants) {
    const { variantId } = variantOptions;
    variantIds.push(variantId);
    variantsById[variantId] = variantOptions;
  }

  const themeIds: Array<string> = [];
  const themesById: Record<string, ThemeConfig<string, string>> = {};
  for (const themeOptions of themes) {
    const { themeId, variants, ...themeRest } = themeOptions;
    themeIds.push(themeId);
    themesById[themeId] = {
      ...themeRest,
      themeId,
      variants: mapValues(variants, (variantTheme, variantId) => ({
        themeId,
        ...variantsById[variantId],
        ...variantTheme,
        ...fontsById[variantTheme.fontId],
        fontStyle: variantTheme.fontStyle ?? 'normal',
      })),
    } satisfies ThemeConfig<string, string, string>;
  }

  return {
    fontIds,
    fontsById,
    variantIds,
    variantsById,
    variantKeys: TYPOGRAPHY_VARIANT_KEYS,
    themeIds,
    themesById,
  } as SimplifyDeep<{
    fontIds: TuplePluck<'fontId', TFonts>;
    fontsById: TupleRecord<'fontId', TFonts>;
    variantIds: TuplePluck<'variantId', TVariants>;
    variantsById: TupleRecord<'variantId', TVariants>;
    variantKeys: typeof TYPOGRAPHY_VARIANT_KEYS;
    themeIds: TuplePluck<'themeId', TThemes>;
    themesById: Record<
      TThemes[number]['themeId'],
      ThemeConfig<TFonts[number]['fontId'], TVariants[number]['variantId']>
    >;
  }>;
};
