import { defineGlobalStyles } from '@pandacss/dev';
import {
  COLOR_SCHEME_CONFIG,
  TYPOGRAPHY_CONFIG,
  getTypographyVariableValues,
} from '../shared';

export const globalCss = defineGlobalStyles({
  [':root']: {
    colorScheme: 'light dark',
    color: 'light-dark(black, white)',
    backgroundColor: 'light-dark(white, black)',
  },
  [`.${COLOR_SCHEME_CONFIG.className.light}`]: {
    colorScheme: 'only light',
  },
  [`.${COLOR_SCHEME_CONFIG.className.dark}`]: {
    colorScheme: 'only dark',
  },
  ...Object.fromEntries(
    TYPOGRAPHY_CONFIG.themeIds.map((themeId) => {
      const { themeClassName } = TYPOGRAPHY_CONFIG.themesById[themeId];
      return [
        `.${themeClassName}`,
        getTypographyVariableValues(themeId) as Record<string, any>,
      ] as const;
    }),
  ),
});
