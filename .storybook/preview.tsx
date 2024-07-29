import '../index.css';
import type { Preview, ArgTypes } from '@storybook/react';
import { UiProvider } from '../components';
import { useGlobalAtom } from '../helpers/storybook';
import { TYPOGRAPHY_CONFIG, TypographyThemeId } from '../shared';
import { ComponentProps } from 'react';

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
    typographyTheme: {
      description: 'Global typography theme',
      defaultValue: TYPOGRAPHY_CONFIG.defaultThemeId,
      toolbar: {
        title: 'Typography',
        icon: 'circlehollow',
        items: [
          ...Object.values(TYPOGRAPHY_CONFIG.themesById).map(
            ({ themeId, themeName }) => ({
              value: themeId,
              title: themeName,
            }),
          ),
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story) => {
      const colorSchemeAtom = useGlobalAtom('colorScheme') as ComponentProps<
        typeof UiProvider
      >['colorScheme'];

      const typographyAtom = useGlobalAtom<TypographyThemeId>(
        'typographyTheme',
      ) as ComponentProps<typeof UiProvider>['typographyTheme'];

      return (
        <UiProvider
          colorScheme={colorSchemeAtom}
          typographyTheme={typographyAtom}
        >
          <Story />
        </UiProvider>
      );
    },
  ],
};

export default preview;
