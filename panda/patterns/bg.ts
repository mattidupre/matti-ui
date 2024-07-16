import type { PatternConfig } from '@pandacss/dev';

export const bg = {
  defaultValues: {},
  properties: {
    color: { type: 'token', value: 'colors' },
  },
  transform(props) {
    return props;
  },
} as const satisfies PatternConfig;
