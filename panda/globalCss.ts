import { defineGlobalStyles } from '@pandacss/dev';
import { COLOR_SCHEME_CONFIG } from '../shared';

export const globalCss = defineGlobalStyles({
  [':root']: {
    colorScheme: 'light dark',
  },
  [`.${COLOR_SCHEME_CONFIG.className.light}`]: {
    colorScheme: 'light',
  },
  [`.${COLOR_SCHEME_CONFIG.className.dark}`]: {
    colorScheme: 'dark',
  },
});
