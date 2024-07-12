import type { StorybookConfig } from '@storybook/react-vite';
import { pathFromRoot } from '../paths';

export default {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    // 'storybook-addon-jotai',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: pathFromRoot('vite.config.js'),
      },
    },
  },
} satisfies StorybookConfig;
