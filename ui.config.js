// @ts-check

import { defineUiEnvironment } from './environment/defineUiEnvironment';

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
      id: 'site',
      name: 'Site',
      swatchIds: ['fill', 'background', 'browser'],
    },
    {
      id: 'fill',
      name: 'Fill',
      swatchIds: ['100', '200', '300', '400', '500'],
    },
    {
      id: 'background',
      name: 'Background',
      swatchIds: ['500', '600', '700', '800', '900'],
    },
    {
      id: 'primary',
      name: 'Primary',
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
      id: 'accent',
      name: 'Accent',
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
      id: 'form',
      name: 'Form',
      swatchIds: ['fill', 'background', 'disabled', 'outline', 'highlight'],
    },
  ],
});
