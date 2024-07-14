import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { InputDecorator } from '../../../shared';
import { Slider } from './Slider';

export default {
  component: Slider,
  decorators: [InputDecorator],
  args: {
    label: 'Slider',
    onChange: action('onChange'),
  },
} satisfies Meta<typeof Slider>;

type Story = StoryObj<typeof Slider>;

export const Controlled: Story = {
  args: {
    value: 0,
  },
  argTypes: {
    defaultValue: { table: { disable: true } },
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultValue: 0.2,
  },
  argTypes: {
    value: { table: { disable: true } },
  },
};
