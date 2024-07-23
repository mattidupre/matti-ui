import '../index.css';
import type { Preview, ArgTypes } from '@storybook/react';
import { UiProvider } from '../components';
import { createElement } from 'react';

export const argTypes: ArgTypes = {};

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      description: 'Global color scheme',
      defaultValue: 'auto',
      toolbar: {
        title: 'Color Scheme',
        icon: 'circlehollow',
        items: [
          { value: 'system', title: 'System' },
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { colorScheme } = context.globals;

      return createElement(UiProvider, {
        colorScheme: colorScheme === 'system' ? undefined : colorScheme,
        children: createElement(Story),
      });
    },
  ],
};

export default preview;
