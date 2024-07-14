import type { SwatchQuery } from '../../../shared';
import { useSwatch } from './useSwatch';

type ColorSwatchProps = {
  color: SwatchQuery;
  colorScheme?: 'all' | 'light' | 'dark' | 'auto';
};

export function ColorSwatch({ color, colorScheme }: ColorSwatchProps) {
  const { lightValue, darkValue, value } = useSwatch(color);

  if (colorScheme === 'all') {
    throw new Error('TODO');
  }

  const swatchValue =
    colorScheme === 'light'
      ? lightValue
      : colorScheme === 'dark'
        ? darkValue
        : colorScheme === 'auto'
          ? value
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
