import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import {
  TYPOGRAPHY_THEME_IDS,
  TYPOGRAPHY_THEME_DEFAULT_ID,
  mapTypographyVariants,
} from '../../shared';
import { Typography } from '../Typography';
import { TypographyProvider } from '.';

function Variants() {
  return (
    <>
      {mapTypographyVariants(({ variantId }) => {
        return (
          <Typography key={variantId} variant={variantId}>
            {variantId}: The quick brown fox jumped over the lazy dog&apos;s
            head
          </Typography>
        );
      })}
    </>
  );
}

export default {
  component: TypographyProvider,
  decorators: [
    (Story, ctx) => {
      const [props] = useArgs<typeof ctx.args>();
      return (
        // Re-mount provider if default changes.
        <TypographyProvider key={props.defaultTypographyThemeId} {...props}>
          <Story />
        </TypographyProvider>
      );
    },
  ],
  args: {
    defaultTypographyThemeId: TYPOGRAPHY_THEME_DEFAULT_ID,
  },
  argTypes: {
    defaultTypographyThemeId: {
      control: {
        type: 'radio',
      },
      options: TYPOGRAPHY_THEME_IDS,
    },
  },
} satisfies Meta<typeof TypographyProvider>;

type Story = StoryObj<typeof TypographyProvider>;

export const _TypographyProvider: Story = {
  render: function Story({ defaultTypographyThemeId }) {
    return (
      <TypographyProvider key={defaultTypographyThemeId}>
        <Variants />
      </TypographyProvider>
    );
  },
};
