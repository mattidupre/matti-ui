import { defineColorsConfig } from './lib/defineColorsConfig';

// https://leonardocolor.io/
// https://uxdesign.cc/creating-contrast-based-themes-with-leonardo-32b6219a090f

const COLOR_SWATCHES = [
  {
    id: '50',
    color: {
      dark: { lightness: 0.03 },
      light: { lightness: 0.97 },
    },
  },
  {
    id: '100',
    color: {
      dark: { lightness: 0.1 },
      light: { lightness: 0.9 },
    },
  },
  {
    id: '200',
    color: {
      dark: { lightness: 0.2 },
      light: { lightness: 0.8 },
    },
  },
  {
    id: '300',
    color: {
      dark: { lightness: 0.3 },
      light: { lightness: 0.7 },
    },
  },
  {
    id: '400',
    color: {
      dark: { lightness: 0.4 },
      light: { lightness: 0.6 },
    },
  },
  {
    id: '500',
    color: {
      dark: { lightness: 0.5 },
      light: { lightness: 0.5 },
    },
  },
  {
    id: '600',
    color: {
      dark: { lightness: 0.6 },
      light: { lightness: 0.4 },
    },
  },
  {
    id: '700',
    color: {
      dark: { lightness: 0.7 },
      light: { lightness: 0.3 },
    },
  },
  {
    id: '800',
    color: {
      dark: { lightness: 0.8 },
      light: { lightness: 0.2 },
    },
  },
  {
    id: '900',
    color: {
      dark: { lightness: 0.9 },
      light: { lightness: 0.1 },
    },
  },
] as const satisfies ReadonlyArray<{
  id: string;
  color: { light: { lightness: number }; dark: { lightness: number } };
}>;

export const COLORS_CONFIG = defineColorsConfig([
  {
    id: 'primary',
    name: 'Primary',
    isAdjustable: true,
    base: { hue: 0, chroma: 0.5 },
    swatches: COLOR_SWATCHES,
  },
  {
    id: 'accent',
    name: 'Accent',
    isAdjustable: true,
    base: { hue: 120, chroma: 0.5 },
    swatches: COLOR_SWATCHES,
  },
  {
    id: 'site',
    name: 'Site',
    isAdjustable: false,
    base: { hue: 0 },
    swatches: [
      {
        id: 'fill',
        color: {
          light: { lightness: 0 },
          dark: { lightness: 1 },
        },
      },
      {
        id: 'background',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
    ],
  },
  {
    id: 'fill',
    name: 'Fill',
    isAdjustable: false,
    base: { chroma: 0 },
    swatches: [
      {
        id: '100',
        color: {
          light: { lightness: 0.1 },
          dark: { lightness: 0.5 },
        },
      },
      {
        id: '200',
        color: {
          light: { lightness: 0.2 },
          dark: { lightness: 0.4 },
        },
      },
      {
        id: '300',
        color: {
          light: { lightness: 0.3 },
          dark: { lightness: 0.3 },
        },
      },
      {
        id: '400',
        color: {
          light: { lightness: 0.4 },
          dark: { lightness: 0.2 },
        },
      },
      {
        id: '500',
        color: {
          light: { lightness: 0.5 },
          dark: { lightness: 0.1 },
        },
      },
    ],
  },
  {
    id: 'background',
    name: 'Background',
    isAdjustable: false,
    base: { chroma: 0 },
    swatches: [
      {
        id: '500',
        color: {
          light: { lightness: 0.5 },
          dark: { lightness: 0.5 },
        },
      },
      {
        id: '600',
        color: {
          light: { lightness: 0.6 },
          dark: { lightness: 0.6 },
        },
      },
      {
        id: '700',
        color: {
          light: { lightness: 0.7 },
          dark: { lightness: 0.7 },
        },
      },
      {
        id: '800',
        color: {
          light: { lightness: 0.8 },
          dark: { lightness: 0.2 },
        },
      },
      {
        id: '900',
        color: {
          light: { lightness: 0.9 },
          dark: { lightness: 0.1 },
        },
      },
    ],
  },
  {
    id: 'form',
    name: 'Form',
    isAdjustable: false,
    base: { chroma: 0 },
    swatches: [
      {
        id: 'fill',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: 'background',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: 'disabled',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: 'outline',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: 'highlight',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
    ],
  },
]);
