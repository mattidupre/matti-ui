import { expect, test } from 'vitest';
import { unwrapCssVariable } from './cssVariables';

test(unwrapCssVariable, () => {
  expect
    .soft(unwrapCssVariable('var(--matti-docs-foo)'))
    .toBe('--matti-docs-foo');
  expect
    .soft(unwrapCssVariable('var(var(--matti-docs-foo))' as any))
    .toBe('var(--matti-docs-foo)');
  expect
    .soft(unwrapCssVariable('--matti-docs-foo' as any))
    .toBe('--matti-docs-foo');
  expect.soft(unwrapCssVariable('any' as any)).toBe('any');
});
