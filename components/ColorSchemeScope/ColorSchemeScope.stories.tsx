import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { css } from '../../styled-system/css';
import { ColorSchemeScope } from './ColorSchemeScope';
import { useScopedColorScheme } from './useScopedColorScheme';

export default {
  component: ColorSchemeScope,
  argTypes: {
    isRoot: {
      table: {
        disable: true,
      },
    },
    colorScheme: {
      control: 'radio',
      options: [undefined, 'light', 'dark', 'invert'],
    },
  },
} satisfies Meta<typeof ColorSchemeScope>;

type Story = StoryObj<typeof ColorSchemeScope>;

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
}: ComponentProps<typeof ColorSchemeScope>) {
  return (
    <ColorSchemeScope colorScheme={colorScheme}>
      <div className={style}>
        <pre>Scoped Color Scheme: {colorScheme ?? 'undefined'}</pre>
        {children}
      </div>
    </ColorSchemeScope>
  );
}

export const _ColorSchemeScope: Story = {
  render: function Render(props) {
    const colorSchemeCurrent = useScopedColorScheme();
    return (
      <div className={style}>
        <pre>System Color Scheme: {colorSchemeCurrent}</pre>
        <Scheme colorScheme="invert" />
        <Scheme colorScheme="light" />
        <Scheme colorScheme="dark" />
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
