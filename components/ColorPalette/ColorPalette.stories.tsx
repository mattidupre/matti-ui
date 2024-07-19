import type { Meta, StoryObj } from '@storybook/react';
import { ColorsProvider } from '../ColorsProvider';
import { ALL_PALETTE_IDS } from '../../shared';
import { ColorPalette } from '.';

export default {
  component: ColorPalette,
  decorators: [
    (Story) => (
      <ColorsProvider>
        <Story />
      </ColorsProvider>
    ),
  ],
  args: {
    paletteId: 'primary',
  },
  argTypes: {
    paletteId: {
      control: {
        type: 'radio',
      },
      options: ALL_PALETTE_IDS,
    },
  },
} satisfies Meta<typeof ColorPalette>;

type Story = StoryObj<typeof ColorPalette>;

export const _ColorPalette: Story = {};
