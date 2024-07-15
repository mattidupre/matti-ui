import type { PatternConfig } from '@pandacss/dev';

export const backgroundColor = {
  defaultValues: {},
  properties: {
    color: { type: 'token', value: 'colors' },
  },
  transform(props) {
    const { color, ...rest } = props;
    return { backgroundColor: color, ...rest };
  },
} as const satisfies PatternConfig;
