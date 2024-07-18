import type { Config } from '@pandacss/dev';
import {
  TYPOGRAPHY_CSS_VARIABLES,
  TYPOGRAPHY_VARIANT_DEFAULTS,
} from '../shared';

export const globalVars: Config['globalVars'] = Object.fromEntries(
  Object.entries(TYPOGRAPHY_CSS_VARIABLES).flatMap(([variantId, variant]) => {
    return Object.entries(variant).map(([cssPropertyKey, cssVariableName]) => {
      const defaultValue = (
        TYPOGRAPHY_VARIANT_DEFAULTS as Record<string, Record<string, unknown>>
      )[variantId][cssPropertyKey] as string;
      return [cssVariableName, String(defaultValue)];
    });
  }),
);
