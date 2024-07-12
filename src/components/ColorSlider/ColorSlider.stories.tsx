import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { InputDecorator } from '../../helpers/storybook';
import { COLOR_DEFAULT } from '../../entities';
import { ColorSlider } from './ColorSlider';

export default {
  component: ColorSlider,
  decorators: [InputDecorator],
  args: {
    onChange: action('onChange'),
    label: 'ColorSlider',
  },
} satisfies Meta<typeof ColorSlider>;

type Story = StoryObj<typeof ColorSlider>;

export const Controlled: Story = {
  args: {
    value: COLOR_DEFAULT,
  },
  argTypes: {
    defaultValue: { table: { disable: true } },
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultValue: COLOR_DEFAULT,
  },
  argTypes: {
    value: { table: { disable: true } },
  },
};
