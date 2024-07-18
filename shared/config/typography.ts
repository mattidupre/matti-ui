import { defineTypographyConfig } from './lib/defineTypographyConfig';
// TODO: Only import styles and weights used.
// import '@fontsource/merriweather';
// import '@fontsource/open-sans';

// TODO: https://panda-css.com/docs/guides/fonts
// TODO: https://fontsource.org/docs/getting-started
// TODO: Preload vital fonts https://fontsource.org/docs/getting-started/preload

export const TYPOGRAPHY_CONFIG = defineTypographyConfig({
  fonts: [
    {
      fontFamily: 'Open Sans',
      fontId: 'open-sans',
    },
    {
      fontFamily: 'Merriweather',
      fontId: 'merriweather',
    },
  ],
  variants: [
    {
      variantId: 'heading1',
      variantName: 'Heading 1',
    },
    {
      variantId: 'content',
      variantName: 'Content',
    },
  ],
  themes: [
    {
      themeName: 'Mixed Typography',
      themeId: 'mixed',
      variants: {
        heading1: {
          fontId: 'open-sans',
          fontFamily: 'Open Sans',
          fontFallback: ['sans-serif'],
          fontWeight: 400,
          fontStyle: 'normal',
        },
        content: {
          fontId: 'merriweather',
          fontFamily: 'Merriweather',
          fontFallback: ['serif'],
          fontWeight: 400,
          fontStyle: 'normal',
        },
      },
    },
  ],
});
