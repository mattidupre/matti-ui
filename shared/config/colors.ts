import { defineColors } from './lib/defineColors';

// https://leonardocolor.io/
// https://uxdesign.cc/creating-contrast-based-themes-with-leonardo-32b6219a090f

export const COLORS_CONFIG = defineColors([
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
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '200',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '300',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '400',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '500',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
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
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '600',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '700',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '800',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '900',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
    ],
  },
  {
    id: 'primary',
    name: 'Primary',
    isAdjustable: true,
    base: { hue: 0 },
    swatches: [
      {
        id: '100',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '200',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '300',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '400',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '500',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '600',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '700',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '800',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '900',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
    ],
  },
  {
    id: 'accent',
    name: 'Accent',
    isAdjustable: true,
    base: { hue: 120 },
    swatches: [
      {
        id: '100',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '200',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '300',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '400',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '500',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '600',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '700',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '800',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
        },
      },
      {
        id: '900',
        color: {
          light: { lightness: 1 },
          dark: { lightness: 0 },
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
