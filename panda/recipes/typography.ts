import { defineRecipe } from '@pandacss/dev';
import {
  TYPOGRAPHY_CSS_VARIABLES_WRAPPED,
  TYPOGRAPHY_VARIANT_IDS,
} from '../../shared';

export const typography = defineRecipe({
  className: 'typography',
  base: {},
  variants: {
    variant: TYPOGRAPHY_CSS_VARIABLES_WRAPPED,
  },
  defaultVariants: {
    variant: TYPOGRAPHY_VARIANT_IDS[0],
  },
});
