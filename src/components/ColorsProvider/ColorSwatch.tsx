import type { ColorToken, SwatchQuery } from '../../entities';
import {
  PALETTE_IDS,
  COLOR_TOKENS_ALL,
  createColorToken,
  colorVariable,
} from '../../entities';
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
    <pre className={style()} style={{ backgroundColor: colorVariable(color) }}>
      {swatchValue}
    </pre>
  );
}
