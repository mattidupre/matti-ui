import '../index.css';
import type { Preview } from '@storybook/react';
import { UiProvider } from '../components';
import { createElement } from 'react';

// TODO: https://storybook.js.org/docs/addons/addon-types#toolbars
// TODO: context.globals.theme || 'light';

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      description: 'Global color scheme',
      defaultValue: 'auto',
      toolbar: {
        title: 'Color Scheme',
        icon: 'circlehollow',
        items: [
          { value: undefined, title: 'System' },
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      return createElement(UiProvider, {
        colorScheme: context.globals.colorScheme,
        children: createElement(Story),
      });
    },
  ],
};

export default preview;
