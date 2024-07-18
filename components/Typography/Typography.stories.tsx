import type { Meta, StoryObj } from '@storybook/react';
import { TYPOGRAPHY_VARIANT_IDS } from '../../shared';
import { Typography } from './Typography';

export default {
  component: Typography,
  args: {
    variant: TYPOGRAPHY_VARIANT_IDS[0],
    children: "The quick brown fox jumped over the lazy dog's head.",
  },
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: TYPOGRAPHY_VARIANT_IDS,
    },
    children: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof Typography>;

type Story = StoryObj<typeof Typography>;

export const TypographyStory: Story = {};
