import type { Config } from '@pandacss/dev';
import {
  TYPOGRAPHY_VARIANT_DEFAULT_ID,
  getTypographyVariableValues,
} from '../shared';

export const globalVars: Config['globalVars'] = {
  ...getTypographyVariableValues(TYPOGRAPHY_VARIANT_DEFAULT_ID),
};
