import { defineGlobalStyles } from '@pandacss/dev';
import { COLOR_SCHEME_CONFIG } from '../shared';

export const globalCss = defineGlobalStyles({
  [':root']: {
    colorScheme: 'light dark',
    color: 'light-dark(black, white)',
    backgroundColor: 'light-dark(white, black)',
  },
  [`.${COLOR_SCHEME_CONFIG.className.light}`]: {
    colorScheme: 'light',
  },
  [`.${COLOR_SCHEME_CONFIG.className.dark}`]: {
    colorScheme: 'dark',
  },
});
