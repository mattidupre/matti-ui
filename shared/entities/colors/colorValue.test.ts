import { expect, test } from 'vitest';
import { colorVariable } from './colorValue';

test(colorVariable, () => {
  expect
    .soft(colorVariable('primary.500'))
    .toEqual(
      'light-dark(var(--matti-ui-primary.500.light), var(--matti-ui-primary.500.dark))',
    );
  expect
    .soft(colorVariable('primary.500.light'))
    .toEqual('var(--matti-ui-primary.500.light)');
  expect
    .soft(colorVariable('primary.500.dark'))
    .toEqual('var(--matti-ui-primary.500.dark)');
});
