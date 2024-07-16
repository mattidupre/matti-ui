import { UI_PREFIX } from '../constants';
import { defineColorSchemeConfig } from './lib/defineColorSchemeConfig';

export const COLOR_SCHEME_CONFIG = defineColorSchemeConfig({
  defaultColorScheme: 'dark',
  className: {
    light: `${UI_PREFIX}-color-scheme-light`,
    dark: `${UI_PREFIX}-color-scheme-dark`,
  },
});
