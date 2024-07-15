import { type SwatchQuery, parseSwatchQuery } from '../../shared';
import { getColorVariableWrapped } from './lib/pandaTokens';
import { useSwatch } from './useSwatch';

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
    <div style={{ backgroundColor: getColorVariableWrapped(colorToken) }}>
      <div
        style={{
          display: 'inline-block',
          width: 64,
          height: 64,
          backgroundColor: value,
        }}
      />
      {<pre>{colorToken}</pre>}
      <pre>{swatchValue}</pre>
    </div>
  );
}
