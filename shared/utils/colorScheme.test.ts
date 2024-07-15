import { test, expect } from 'vitest';
import { parseLightOrDarkOrBase } from './colorScheme';

test(parseLightOrDarkOrBase, () => {
  expect(
    parseLightOrDarkOrBase({
      value: 'default',
      light: { value: 'light' },
      dark: { value: 'dark' },
    }),
  ).toStrictEqual({ light: { value: 'light' }, dark: { value: 'dark' } });

  expect(
    parseLightOrDarkOrBase({
      value: 'default',
      dark: { value: 'dark' },
    }),
  ).toStrictEqual({ light: { value: 'default' }, dark: { value: 'dark' } });

  expect(
    parseLightOrDarkOrBase({
      value: 'default',
      light: { value: 'light' },
    }),
  ).toStrictEqual({ light: { value: 'light' }, dark: { value: 'default' } });

  expect(
    parseLightOrDarkOrBase<Partial<{ value: string }>>({
      light: { value: 'light' },
    }),
  ).toStrictEqual({ light: { value: 'light' }, dark: {} });
});
