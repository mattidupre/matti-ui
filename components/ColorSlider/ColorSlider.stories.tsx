import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { COLOR_DEFAULTS } from '../../shared';
import { InputDecorator } from '../../helpers/storybook';
import { ColorSlider } from './ColorSlider';

export default {
  component: ColorSlider,
  decorators: [InputDecorator],
  args: {
    label: 'ColorSlider',
    adjust: ['hue', 'chroma'],
    onChange: action('onChange'),
  },
  argTypes: {
    adjust: {
      control: {
        type: 'inline-check',
      },
      options: ['hue', 'chroma'],
    },
  },
} satisfies Meta<typeof ColorSlider>;

type Story = StoryObj<typeof ColorSlider>;

export const Controlled: Story = {
  args: {
    value: COLOR_DEFAULTS,
  },
  argTypes: {
    defaultValue: { table: { disable: true } },
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultValue: COLOR_DEFAULTS,
  },
  argTypes: {
    value: { table: { disable: true } },
  },
};
