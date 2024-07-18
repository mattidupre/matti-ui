import { defineRecipe } from '@pandacss/dev';
import { mapTypographyVariantsToIds } from '../../shared';

export const typography = defineRecipe({
  className: 'typography',
  variants: {
    variant: {
      ...mapTypographyVariantsToIds(({ variantId }) => ({
        typography: variantId,
      })),
    },
  },
  staticCss: [{ variant: ['*'] }],
} as const);
