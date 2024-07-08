import { test, expect } from 'vitest';
import { merge } from 'lodash-es';
import { extendPalette } from './extendPalette';
import { BASE_PALETTES } from './config';

const PALETTE = BASE_PALETTES.fill;

test(extendPalette, () => {
  expect.soft(extendPalette(PALETTE, {})).toStrictEqual(PALETTE);
  expect
    .soft(
      extendPalette(PALETTE, {
        hue: 321,
        '100': {
          hue: 123,
        },
      }),
    )
    .toMatchObject({
      ...PALETTE,
      swatches: expect.objectContaining({
        '100': merge({}, PALETTE.swatches['100'], {
          light: {
            hue: 123,
          },
          dark: {
            hue: 123,
          },
        }),
        '200': merge({}, PALETTE.swatches['200'], {
          light: {
            hue: 321,
          },
          dark: {
            hue: 321,
          },
        }),
      }),
    });
});
