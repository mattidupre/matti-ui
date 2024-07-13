import type { SwatchQuery } from '../../entities';
import { useSwatch } from './useSwatch';
import { cva } from '@styled-system/css';

const style = cva({
  base: {},
  variants: {},
});

type ColorSwatchProps = {
  color: SwatchQuery;
  colorScheme?: 'all' | 'light' | 'dark' | 'auto';
};

export function ColorSwatch({ color, colorScheme }: ColorSwatchProps) {
  const { swatchLightValue, swatchDarkValue, swatchLightDarkValue } =
    useSwatch(color);

  if (colorScheme === 'all') {
    throw new Error('TODO');
  }

  const swatchValue =
    colorScheme === 'light'
      ? swatchLightValue
      : colorScheme === 'dark'
        ? swatchDarkValue
        : colorScheme === 'auto'
          ? swatchLightDarkValue
          : undefined;

  return (
    <div
      style={{
        backgroundColor: 'var(--matti-ui-primary\\.500\\.dark)',
      }}
    >
      <pre>{swatchValue}</pre>
    </div>
  );
}
