import { test, expect } from 'vitest';
import {
  parseLightOrDarkOrBase,
  parseLightOrDarkOrString,
} from './colorScheme';

test(parseLightOrDarkOrBase, () => {
  expect
    .soft(
      parseLightOrDarkOrBase({
        value: 'default',
        light: { value: 'light' },
        dark: { value: 'dark' },
      }),
    )
    .toStrictEqual({ light: { value: 'light' }, dark: { value: 'dark' } });

  expect
    .soft(
      parseLightOrDarkOrBase({
        value: 'default',
        dark: { value: 'dark' },
      }),
    )
    .toStrictEqual({ light: { value: 'default' }, dark: { value: 'dark' } });

  expect
    .soft(
      parseLightOrDarkOrBase({
        value: 'default',
        light: { value: 'light' },
      }),
    )
    .toStrictEqual({ light: { value: 'light' }, dark: { value: 'default' } });

  expect
    .soft(
      parseLightOrDarkOrBase<Partial<{ value: string }>>({
        light: { value: 'light' },
      }),
    )
    .toStrictEqual({ light: { value: 'light' }, dark: {} });
});

test(parseLightOrDarkOrString, () => {
  expect
    .soft(parseLightOrDarkOrString('default'))
    .toStrictEqual({ light: 'default', dark: 'default' });

  expect
    .soft(parseLightOrDarkOrString({ light: 'light' }))
    .toStrictEqual({ light: 'light', dark: undefined });

  expect
    .soft(parseLightOrDarkOrString({ dark: 'dark' }))
    .toStrictEqual({ light: undefined, dark: 'dark' });

  expect
    .soft(parseLightOrDarkOrString(undefined))
    .toStrictEqual({ light: undefined, dark: undefined });
});
