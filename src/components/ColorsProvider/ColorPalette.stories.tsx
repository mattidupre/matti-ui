import type { Meta, StoryObj } from '@storybook/react';
import { ColorsProvider } from './ColorsProvider';
import { ColorPalette } from './ColorPalette';

export default {
  component: ColorPalette,
  decorators: [
    (Story) => (
      <ColorsProvider>
        <Story />
      </ColorsProvider>
    ),
  ],
  args: {},
} satisfies Meta<typeof ColorPalette>;

type Story = StoryObj<typeof ColorPalette>;

export const ColorPaletteStory: Story = {
  name: 'ColorPalette',
  args: {
    paletteId: 'primary',
    adjust: ['hue', 'chroma', 'lightness'],
  },
  argTypes: {},
};
