import { test, expect } from 'vitest';
import { extendSwatches } from './extendSwatches';
import { BASE_PALETTES } from './config';

const SWATCHES = BASE_PALETTES['primary'].swatches;

const EXPECTED_RESULT = {
  '100': {
    light: {
      ...SWATCHES['100'].light,
      hue: 123,
      lightness: 0.123,
    },
    dark: {
      ...SWATCHES['100'].dark,
      hue: 321,
      lightness: 0.123,
    },
  },
  '200': {
    light: {
      ...SWATCHES['200'].light,
      lightness: 0.123,
    },
    dark: {
      ...SWATCHES['200'].dark,
      lightness: 0.123,
    },
  },
};

test(extendSwatches, () => {
  expect
    .soft(
      extendSwatches(SWATCHES, {
        lightness: 0.123,
        '100': { hue: 123, dark: { hue: 321 } },
      }),
    )
    .toMatchObject(EXPECTED_RESULT);
  expect
    .soft(
      extendSwatches(
        SWATCHES,
        undefined,
        {
          '100': { hue: 123, dark: { hue: 321 } },
        },
        {
          lightness: 0.123,
        },
      ),
    )
    .toMatchObject(EXPECTED_RESULT);
});
