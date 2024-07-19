import type { Config } from '@pandacss/dev';
import {
  TYPOGRAPHY_THEME_DEFAULT_ID,
  getTypographyVariableValues,
} from '../shared';

export const globalVars: Config['globalVars'] = {
  ...getTypographyVariableValues(TYPOGRAPHY_THEME_DEFAULT_ID),
};
