import type { Meta, StoryObj } from '@storybook/react';
import { ColorsProvider } from '../ColorsProvider';
import { ColorField } from './ColorField';

export default {
  component: ColorField,
  decorators: [
    (Story) => (
      <ColorsProvider>
        <Story />
      </ColorsProvider>
    ),
  ],
  args: {},
} satisfies Meta<typeof ColorField>;

type Story = StoryObj<typeof ColorField>;

export const ColorFieldStory: Story = {
  args: {
    paletteId: 'primary',
    adjust: ['hue', 'chroma'],
  },
  argTypes: {},
};
