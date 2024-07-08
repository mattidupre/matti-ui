import type { Meta, StoryObj } from '@storybook/react';
import { ColorsProvider } from '../ColorsProvider';
import { Box } from '.';

const meta: Meta<typeof Box> = {
  component: Box,
};

export default meta;

type Story = StoryObj<typeof Box>;

export const BoxStory: Story = {
  name: 'Box',
  render: function Render() {
    return (
      <ColorsProvider>
        <Box />
      </ColorsProvider>
    );
  },
};
