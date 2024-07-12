import { expect, test } from 'vitest';
import { createColorVariable } from './colorVariable';

test(createColorVariable, () => {
  expect
    .soft(createColorVariable('primary.500.light'))
    .toEqual('--matti-ui-primary.500.light');
  expect
    .soft(createColorVariable('primary.500.dark'))
    .toEqual('--matti-ui-primary.500.dark');
});
