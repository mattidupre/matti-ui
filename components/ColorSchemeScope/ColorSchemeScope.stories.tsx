import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { css } from '../../styled-system/css';
import { useAtomOrValue, useSystemColorScheme } from '../../shared';
import { ColorSchemeScope, useScopedColorScheme } from '.';

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
      options: [undefined, 'system', 'light', 'dark', 'invert'],
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
  colorScheme: colorSchemeProp,
  children,
}: ComponentProps<typeof ColorSchemeScope>) {
  const colorScheme = useAtomOrValue(colorSchemeProp);
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
    const colorSchemeSystem = useSystemColorScheme();

    return (
      <div className={style}>
        <pre>System Color Scheme: {colorSchemeSystem}</pre>
        <pre>Storybook Color Scheme: {colorSchemeCurrent}</pre>
        <Scheme {...props}>
          {
            <>
              <Scheme colorScheme="light" />
              <Scheme colorScheme="dark" />
              <Scheme colorScheme="invert" />
              <Scheme colorScheme={undefined} />
              <Scheme colorScheme="system" />
            </>
          }
        </Scheme>
      </div>
    );
  },
};
