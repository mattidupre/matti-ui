import { type SwatchQuery, parseSwatchQuery } from '../../shared';
import { sva } from '../../styled-system/css';
import { getColorVariableWrapped } from '../entities/tokens';
import { useSwatch } from '../ColorsProvider';

const swatchRecipe = sva({
  slots: ['swatch', 'box'],
  base: {
    swatch: {
      width: '32rem',
    },
    box: {
      display: 'block',
      width: '2rem',
      height: '2rem',
    },
  },
});

type ColorSwatchProps = {
  color: SwatchQuery;
};

export function ColorSwatch({ color }: ColorSwatchProps) {
  const { colorToken, colorScheme } = parseSwatchQuery(color);
  const { lightValue, darkValue, value } = useSwatch(color);

  const swatchValue =
    colorScheme === 'light'
      ? lightValue
      : colorScheme === 'dark'
        ? darkValue
        : colorScheme === undefined
          ? value
          : undefined;

  return (
    <div className={swatchRecipe().swatch}>
      <div
        className={swatchRecipe().box}
        style={{
          backgroundColor: getColorVariableWrapped(colorToken),
        }}
      />
      {<pre>{colorToken}</pre>}
      <pre>{swatchValue}</pre>
    </div>
  );
}
