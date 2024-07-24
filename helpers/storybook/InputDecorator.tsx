import { useArgs } from '@storybook/preview-api';
import type { Decorator } from '@storybook/react';

export const InputDecorator: Decorator = function InputDecorator(Story, ctx) {
  const [, setArgs] = useArgs<typeof ctx.args>();
  const onChange = (value: unknown) => {
    (ctx.args as any).onChange?.(value);
    if (ctx.args.value !== undefined) {
      setArgs({ value });
    }
  };
  return <Story args={{ ...ctx.args, onChange }} />;
};
