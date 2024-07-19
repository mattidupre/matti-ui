import { test, expect } from 'vitest';
import { extendOklch, extendOklchLightDark, oklchToString } from './entities';

test(extendOklch, () => {
  expect(
    extendOklch({ lightness: 0.5, hue: 120 }, undefined, {
      hue: 123,
      chroma: 0.5,
    }),
  ).toStrictEqual({ chroma: 0.5, hue: 123, lightness: 0.5 });
});

test(extendOklchLightDark, () => {
  expect(
    extendOklchLightDark(
      { lightness: 0.5, hue: 120 },
      undefined,
      {
        hue: 123,
        chroma: 0.5,
      },
      { dark: { hue: 321 } },
    ),
  ).toStrictEqual({
    light: { chroma: 0.5, hue: 123, lightness: 0.5 },
    dark: { chroma: 0.5, hue: 321, lightness: 0.5 },
  });
});

test(oklchToString, () => {
  expect(oklchToString({ lightness: 0.1, chroma: 0.2, hue: 123 })).toBe(
    'oklch(0.1 0.2 123)',
  );

  expect(
    oklchToString({
      light: { lightness: 0.1, chroma: 0.2, hue: 123 },
      dark: { lightness: 0.1, chroma: 0.2, hue: 123 },
    }),
  ).toBe('oklch(0.1 0.2 123)');

  expect(
    oklchToString({
      light: { lightness: 0.9, chroma: 0.8, hue: 321 },
      dark: { lightness: 0.1, chroma: 0.2, hue: 123 },
    }),
  ).toBe('light-dark(oklch(0.9 0.8 321), oklch(0.1 0.2 123))');

  expect(oklchToString({})).toBe('oklch(0 0 0)');

  expect(
    oklchToString({ light: { lightness: 0.1, chroma: 0.2, hue: 123 } }),
  ).toBe('light-dark(oklch(0.1 0.2 123), oklch(0 0 0))');
});
