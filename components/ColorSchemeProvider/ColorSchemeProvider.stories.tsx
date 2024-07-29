import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { css } from '../../styled-system/css';
import { ColorSchemeProvider } from './ColorSchemeProvider';
import { useColorScheme } from './useColorScheme';

export default {
  component: ColorSchemeProvider,
  argTypes: {
    // colorScheme: {
    //   control: 'radio',
    //   options: [undefined, 'light', 'dark', 'invert'],
    // },
  },
} satisfies Meta<typeof ColorSchemeProvider>;

type Story = StoryObj<typeof ColorSchemeProvider>;

const style = css({
  padding: '[0.5rem]',
  margin: '[0.5rem]',
  outline: '1px solid {colors.neutral.500}',
  color: 'grey.900',
  backgroundColor: 'neutral.100',
});

function Scheme({
  colorScheme,
  children,
}: ComponentProps<typeof ColorSchemeProvider>) {
  return (
    <ColorSchemeProvider colorScheme={colorScheme}>
      <div className={style}>
        <pre>Color Scheme: {colorScheme ?? 'undefined'}</pre>
        {children}
      </div>
    </ColorSchemeProvider>
  );
}

export const _ColorSchemeProvider: Story = {
  render: function Render(props) {
    const { colorSchemeCurrent } = useColorScheme();
    return (
      <div className={style}>
        <pre>System: {colorSchemeCurrent}</pre>
        <Scheme {...props}>
          {
            <>
              <Scheme colorScheme="invert" />
              <Scheme colorScheme="light" />
              <Scheme colorScheme="dark" />
            </>
          }
        </Scheme>
      </div>
    );
  },
};
