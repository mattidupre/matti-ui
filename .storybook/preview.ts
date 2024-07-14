import '../index.css';
import type { Preview } from '@storybook/react';
import { UiProvider } from '../components';
import { createElement } from 'react';

// TODO: https://storybook.js.org/docs/addons/addon-types#toolbars
// TODO: context.globals.theme || 'light';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      return createElement(UiProvider, { children: createElement(Story) });
    },
  ],
};

export default preview;
