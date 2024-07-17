import { defineTypogragraphyConfig } from './lib/defineTypographyConfig';
import '';

// TODO: https://panda-css.com/docs/guides/fonts
// TODO: https://fontsource.org/docs/getting-started

export const TYPOGRAPHY_CONFIG = defineTypogragraphyConfig({
  fonts: [
    { fontId: 'font1', fontPath: '/' },
    { fontId: 'font2', fontPath: '/asdf' },
  ],
  variants: [
    { variantId: 'variant1', variantName: 'Variant 1' },
    { variantId: 'variant2', variantName: 'Variant 2' },
  ],
  themes: [
    {
      themeName: 'Theme 1',
      themeId: 'theme1',
      variants: {
        variant1: {
          fontId: 'font1',
        },
        variant2: {
          fontId: 'font1',
        },
      },
    },
  ],
});
