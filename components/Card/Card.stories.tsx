import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

export default {
  component: Card,
  args: {},
  argTypes: {},
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

export const _Card: Story = {
  render: function Render() {
    return <Card>Card</Card>;
  },
};