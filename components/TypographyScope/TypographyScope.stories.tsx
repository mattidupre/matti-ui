import type { Meta, StoryObj } from '@storybook/react';
import { TYPOGRAPHY_CONFIG, mapTypographyVariants } from '../../shared';
import { Typography } from '../Typography';
import { TypographyScope, useScopedTypography } from '.';

const { themeIds } = TYPOGRAPHY_CONFIG;

export default {
  component: TypographyScope,
  argTypes: {
    isRoot: {
      table: {
        disable: true,
      },
    },
    theme: {
      control: 'radio',
      options: [undefined, ...themeIds],
    },
  },
} satisfies Meta<typeof TypographyScope>;

type Story = StoryObj<typeof TypographyScope>;

export const _TypographyScope: Story = {
  render: function Render({ theme }) {
    const { typographyThemeId } = useScopedTypography();
    return (
      <>
        <pre>Typography Theme: {typographyThemeId}</pre>
        <TypographyScope theme={theme}>
          {mapTypographyVariants(({ variantId, variantName }) => (
            <Typography key={variantId} variant={variantId}>
              {variantName}: The quick brown fox jumped over the lazy dog&apos;s
              head.
            </Typography>
          ))}
        </TypographyScope>
      </>
    );
  },
};
