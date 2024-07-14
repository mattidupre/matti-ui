import {
  type SwatchQuery,
  colorVariable,
  parseSwatchQuery,
} from '../../shared';
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
    <div
      style={
        {
          // backgroundColor: colorVariable(color),
        }
      }
    >
      <div
        style={{
          display: 'inline-block',
          width: 64,
          height: 64,
          backgroundColor: colorVariable(color),
        }}
      />
      {<pre>{colorToken}</pre>}
      <pre>{swatchValue}</pre>
    </div>
  );
}
