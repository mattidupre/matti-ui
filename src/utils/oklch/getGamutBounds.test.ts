import { test, expect } from 'vitest';
import { getMaxChroma } from './getGamutBounds';

test(getMaxChroma, () => {
  expect(getMaxChroma({ lightness: 0.5, hue: 120 })).toBe({});
});
