// @ts-check

import { PATH_ALIASES } from './paths';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: PATH_ALIASES,
  },
});
