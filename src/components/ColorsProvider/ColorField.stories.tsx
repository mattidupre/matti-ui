import type { Meta, StoryObj } from '@storybook/react';
import { ColorsProvider } from './ColorsProvider';
import { ColorField } from './ColorField';
import { ColorPalette } from './ColorPalette';

export default {
  decorators: [
    (Story) => (
      <ColorsProvider defaultColors={{ primary: { base: { hue: 0.5 } } }}>
        <>
          <ColorField paletteId="accent" pick="hue" />
          <ColorsProvider defaultColors={{ primary: { base: { hue: 0.75 } } }}>
            <>
              <Story />
              <ColorPalette paletteId={'primary'} />
              <ColorPalette paletteId={'accent'} />
            </>
          </ColorsProvider>
        </>
      </ColorsProvider>
    ),
  ],
  component: ColorField,
  args: {},
} satisfies Meta<typeof ColorField>;

type Story = StoryObj<typeof ColorField>;

export const ColorFieldStory: Story = {
  args: {
    paletteId: 'primary',
    pick: ['hue'],
  },
  argTypes: {},
};
