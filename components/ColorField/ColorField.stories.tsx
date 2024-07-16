import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ALL_PALETTE_IDS } from '../../shared';
import { ColorField } from './ColorField';

export default {
  component: ColorField,
  args: {
    label: 'ColorField',
    paletteId: 'primary',
    adjust: ['hue', 'chroma'],
    onChange: action('onChange'),
  },
  argTypes: {
    paletteId: {
      control: {
        type: 'radio',
      },
      options: ALL_PALETTE_IDS,
    },
    adjust: {
      control: {
        type: 'inline-check',
      },
      options: ['hue', 'chroma'],
    },
  },
} satisfies Meta<typeof ColorField>;

type Story = StoryObj<typeof ColorField>;

export const ColorFieldStory: Story = {};
