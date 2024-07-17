import type { SimplifyDeep } from 'type-fest';
import { mapValues } from 'lodash-es';
import type { TupleRecord, TuplePluck } from '../../utils';

type FontConfig = {
  fontId: string;
  fontPath: string;
};

type VariantConfig = {
  variantId: string;
  variantName: string;
};

type ThemeOptions<
  TFontId extends string,
  TVariantId extends string = string,
> = {
  themeId: string;
  themeName: string;
  variants: {
    [V in TVariantId]: {
      fontId: TFontId;
    };
  };
};

type ThemeConfig<
  TFontId extends string,
  TVariantId extends string = string,
> = Omit<ThemeOptions<TFontId, TVariantId>, 'variants'> & {
  variants: {
    [V in TVariantId]: VariantConfig & {
      fontId: TFontId;
      font: FontConfig & { fontId: string };
    };
  };
};

export const defineTypogragraphyConfig = <
  const TFonts extends ReadonlyArray<{ fontId: string }>,
  const TVariants extends ReadonlyArray<{ variantId: string }>,
  const TThemes extends ReadonlyArray<{ themeId: string }>,
>({
  fonts,
  variants,
  themes,
}: {
  // Define more narrow types here instead of in generics prevents inference.
  fonts: TFonts & ReadonlyArray<{ fontId: string; fontPath: string }>;
  variants: TVariants &
    ReadonlyArray<{ variantId: string; variantName: string }>;
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
      variants: mapValues(variants, ({ fontId }, variantId) => ({
        ...variantsById[variantId],
        fontId,
        font: fontsById[fontId],
      })),
    };
  }

  return {
    fontIds,
    fontsById,
    variantIds,
    variantsById,
    themeIds,
    themesById,
  } as SimplifyDeep<{
    fontIds: TuplePluck<'fontId', TFonts>;
    fontsById: TupleRecord<'fontId', TFonts>;
    variantIds: TuplePluck<'variantId', TVariants>;
    variantsById: TupleRecord<'variantId', TVariants>;
    themeIds: TuplePluck<'themeId', TThemes>;
    themesById: Record<
      TThemes[number]['themeId'],
      ThemeConfig<TFonts[number]['fontId'], TVariants[number]['variantId']>
    >;
  }>;
};
