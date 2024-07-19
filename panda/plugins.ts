import type { Config } from '@pandacss/dev';
import { defineCssVariable, defineToken } from '../shared';

export const plugins: Config['plugins'] = [
  {
    name: 'token-variables',
    hooks: {
      'tokens:created': ({ configure }) => {
        configure({
          formatTokenName: defineToken,
          formatCssVar: defineCssVariable,
        });
      },
    },
  },
];
