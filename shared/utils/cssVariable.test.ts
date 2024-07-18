import { expect, test } from 'vitest';
import { defineCssVariable } from './cssVariable';

test(defineCssVariable, () => {
  expect
    .soft(defineCssVariable('test'))
    .toStrictEqual({ var: '--matti-docs-test', ref: `var(--matti-docs-test)` });
  expect
    .soft(defineCssVariable(['test']))
    .toStrictEqual({ var: '--matti-docs-test', ref: `var(--matti-docs-test)` });
  expect.soft(defineCssVariable(['foo', 'bar'])).toStrictEqual({
    var: '--matti-docs-foo-bar',
    ref: `var(--matti-docs-foo-bar)`,
  });
  expect
    .soft(defineCssVariable([undefined, 'foo', undefined, 'bar', undefined]))
    .toStrictEqual({
      var: '--matti-docs-foo-bar',
      ref: `var(--matti-docs-foo-bar)`,
    });
  expect.soft(defineCssVariable(['foo', 'bar!@#$%^&*()'])).toStrictEqual({
    var: '--matti-docs-foo-bar',
    ref: `var(--matti-docs-foo-bar)`,
  });
  expect.soft(() => defineCssVariable('test', { hash: true })).toThrow();
});
