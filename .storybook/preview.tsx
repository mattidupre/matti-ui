import '../index.css';
import type { Preview, ArgTypes } from '@storybook/react';
import { UiProvider2 } from '../components';
import { useGlobalAtom } from '../helpers/storybook';

export const argTypes: ArgTypes = {
  children: { control: { disable: true } },
  className: { control: { disable: true } },
  ref: { control: { disable: true } },
  style: { control: { disable: true } },
};

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      description: 'Global color scheme',
      defaultValue: 'system',
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
    (Story) => {
      const colorSchemeAtom = useGlobalAtom<undefined | 'light' | 'dark'>(
        ({ colorScheme }) =>
          colorScheme === 'system' ? undefined : colorScheme,
        (colorScheme = 'system') => ({ colorScheme }),
      );

      return (
        <UiProvider2 colorScheme={colorSchemeAtom}>
          <Story />
        </UiProvider2>
      );
    },
  ],
};

export default preview;
