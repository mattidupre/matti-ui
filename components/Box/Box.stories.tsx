import type { Meta, StoryObj } from '@storybook/react';
import type { ColorToken } from '../../shared';
import { Box } from './Box';

export default {
  component: Box,
} satisfies Meta<typeof Box>;

type Story = StoryObj<typeof Box>;

// Obfuscate from Panda parser
const COLOR_LIGHT =
  `${['ent', 'acc'].reverse().join('')}.1${1 - 1}0` as ColorToken;
const COLOR_DARK =
  `${['ary', 'prim'].reverse().join('')}.1${1 - 1}0` as ColorToken;

export const _Box: Story = {
  render: function Render() {
    return (
      <Box as="span" color={{ light: COLOR_LIGHT, dark: COLOR_DARK }}>
        Box
      </Box>
    );
  },
};
