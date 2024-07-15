import {
  type SwatchQuery,
  oklchInGamut,
  parseSwatchQuery,
} from '../../../shared';
import { css } from '../../../styled-system/css';
import { useSwatch } from '../../ColorsProvider';
import { ColorSwatchBox } from './ColorSwatchBox';

const styles = css({
  width: '32rem',
});

type ColorSwatchProps = {
  color: SwatchQuery;
};

export function ColorSwatch({ color }: ColorSwatchProps) {
  const { colorToken, colorScheme = 'light' } = parseSwatchQuery(color);
  const { lightValue, darkValue, light, dark } = useSwatch(color);

  const stringValue = {
    light: lightValue,
    dark: darkValue,
  };

  const swatchValue = {
    light,
    dark,
  };

  const inGamut = {
    light: oklchInGamut(swatchValue.light),
    dark: oklchInGamut(swatchValue.dark),
  };

  return (
    <div className={styles}>
      <ColorSwatchBox colorToken={colorToken} />
      <pre>{colorToken}</pre>
      <pre>{colorScheme}</pre>
      <pre>{inGamut[colorScheme] ? 'gamut okay' : 'gamut invalid'}</pre>
      <pre>{stringValue[colorScheme]}</pre>
    </div>
  );
}
