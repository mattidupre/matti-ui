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
  defaultThemeId: 'mixed',
  themes: [
    {
      themeName: 'Mixed Typography',
      themeId: 'mixed',
      variants: {
        heading1: {
          fontId: 'open-sans',
          fontWeight: 400,
          fontStyle: 'italic',
        },
        content: {
          fontId: 'merriweather',
          fontWeight: 400,
          fontStyle: 'normal',
        },
      },
    },
    {
      themeName: 'Serif Only',
      themeId: 'serif-only',
      variants: {
        heading1: {
          fontId: 'merriweather',
          fontWeight: 400,
          fontStyle: 'italic',
        },
        content: {
          fontId: 'merriweather',
          fontWeight: 400,
          fontStyle: 'normal',
        },
      },
    },
  ],
});
