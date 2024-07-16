import { expectTypeOf, test } from 'vitest';
import type { ColorToken } from './colorQuery';

test('ColorToken', () => {
  expectTypeOf<'_test'>().not.toMatchTypeOf<ColorToken>();
  expectTypeOf(undefined).not.toMatchTypeOf<ColorToken>();
  expectTypeOf<never>().not.toMatchTypeOf<ColorToken>();
  expectTypeOf<'primary.500'>().toMatchTypeOf<ColorToken>();
  expectTypeOf<'primary.500.light'>().toMatchTypeOf<ColorToken>();
  expectTypeOf<'primary.500.dark'>().toMatchTypeOf<ColorToken>();
});
