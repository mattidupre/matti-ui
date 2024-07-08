import { describe, test, expect } from 'vitest';
import { extendSwatches } from './extendSwatches';
import { BASE_PALETTES } from './config';

describe(extendSwatches, () => {
  test('empty swatches', () => {
    expect(extendSwatches(BASE_PALETTES, {})).toStrictEqual({});
  });

  test('single swatch', () => {
    const RESULT = extendSwatches(BASE_PALETTES, {
      primary: {
        hue: 123,
      },
    });

    expect(RESULT).toMatchSnapshot();
    expect(RESULT.primary[500].light.hue).toBe(123);
    expect(RESULT.primary[500].dark.hue).toBe(123);
  });

  test('multiple swatches', () => {
    const RESULT = extendSwatches(BASE_PALETTES, {
      primary: {
        hue: 123,
      },
      accent: {
        hue: 321,
      },
    });

    expect(RESULT).toMatchSnapshot();
    expect(RESULT.primary[500].light.hue).toBe(123);
    expect(RESULT.primary[500].dark.hue).toBe(123);
    expect(RESULT.accent[500].light.hue).toBe(321);
    expect(RESULT.accent[500].dark.hue).toBe(321);
  });
});
