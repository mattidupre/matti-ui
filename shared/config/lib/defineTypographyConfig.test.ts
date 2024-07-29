import { expect, test } from 'vitest';
import { TYPOGRAPHY_CONFIG } from '../typography';
import { defineTypographyConfig } from './defineTypographyConfig';

test(defineTypographyConfig, () => {
  const {
    fontIds,
    fontsById,
    variantIds,
    variantKeys,
    variantsById,
    themeIds,
    themesById,
  } = TYPOGRAPHY_CONFIG;
  expect.soft(new Set(fontIds)).toEqual(new Set(Object.keys(fontsById)));
  expect.soft(new Set(variantIds)).toEqual(new Set(Object.keys(variantsById)));
  expect.soft(new Set(themeIds)).toEqual(new Set(Object.keys(themesById)));
  for (const [themeId, theme] of Object.entries(themesById)) {
    expect.soft(theme.themeId).toBeTypeOf('string');
    expect.soft(theme.themeName).toBeTypeOf('string');
    expect.soft(theme.themeClassName).toBeTypeOf('string');
    for (const [variantId, variant] of Object.entries(theme.variants)) {
      expect.soft(variantIds).toContain(variantId);
      expect.soft(variant).toEqual(
        expect.objectContaining({
          themeId,
          variantId,
          cssVariables: expect.objectContaining({}),
        }),
      );
      expect.soft(new Set(variantKeys)).toEqual(new Set(Object.keys(variant)));
    }
  }
  // TODO: Default value
});
