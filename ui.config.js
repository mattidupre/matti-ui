// @ts-check

import { defineUiEnvironment } from './environment/defineUiEnvironment';

export { PREFIX as UI_PREFIX } from './environment/constants';

export const UI_ENVIRONMENT = defineUiEnvironment({
  breakpoints: [
    {
      id: 'sm',
      value: 640,
    },
    {
      id: 'md',
      value: 768,
    },
    {
      id: 'lg',
      value: 1024,
    },
    {
      id: 'xl',
      value: 1280,
    },
    {
      id: '2xl',
      value: 1536,
    },
  ],
  colors: [
    {
      paletteId: 'site',
      paletteName: 'Site',
      swatchIds: ['fill', 'background'],
    },
    {
      paletteId: 'fill',
      paletteName: 'Fill',
      swatchIds: ['100', '200', '300', '400', '500'],
    },
    {
      paletteId: 'background',
      paletteName: 'Background',
      swatchIds: ['500', '600', '700', '800', '900'],
    },
    {
      paletteId: 'primary',
      paletteName: 'Primary',
      swatchIds: [
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
      ],
    },
    {
      paletteId: 'accent',
      paletteName: 'Accent',
      swatchIds: [
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
      ],
    },
    {
      paletteId: 'form',
      paletteName: 'Form',
      swatchIds: ['fill', 'background', 'disabled', 'outline', 'highlight'],
    },
  ],
});
