import { defineScale } from './lib/defineScale';

export const SPACING_CONFIG = defineScale('spacing', [
  { spacingId: 'xs', value: '0.25rem' },
  { spacingId: 'sm', value: '0.5rem' },
  { spacingId: 'md', value: '1rem' },
  { spacingId: 'lg', value: '1.5rem' },
]);
