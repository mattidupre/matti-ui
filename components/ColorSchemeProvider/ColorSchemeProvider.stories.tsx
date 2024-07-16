import type { Meta, StoryObj } from '@storybook/react';
import { getColorVariableWrapped } from '../entities';
import { ColorSchemeProvider } from './ColorSchemeProvider';

export default {
  component: ColorSchemeProvider,
  argTypes: {
    colorScheme: {
      control: 'radio',
      options: [undefined, 'light', 'dark'],
    },
  },
} satisfies Meta<typeof ColorSchemeProvider>;

type Story = StoryObj<typeof ColorSchemeProvider>;

function Element({ children }: { children: string }) {
  return (
    <div
      style={{
        color: getColorVariableWrapped('primary.900'),
        backgroundColor: getColorVariableWrapped('background.900'),
      }}
    >
      {children}
    </div>
  );
}

export const ColorSchemeProviderStory: Story = {
  render: function Render(props) {
    return (
      <ColorSchemeProvider {...props}>
        <Element>Dynamic</Element>
        <ColorSchemeProvider colorScheme="light">
          <Element>Nested Light</Element>
        </ColorSchemeProvider>
        <ColorSchemeProvider colorScheme="dark">
          <Element>Nested Dark</Element>
        </ColorSchemeProvider>
      </ColorSchemeProvider>
    );
  },
};
