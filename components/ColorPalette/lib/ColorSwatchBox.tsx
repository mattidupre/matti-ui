import { type ColorToken, getSwatchVariable } from '../../../shared';
import { css } from '../../../styled-system/css';

const styles = css({
  display: 'block',
  width: '5rem',
  height: '5rem',
});

type ColorSwatchBoxProps = {
  colorToken: ColorToken;
};

export function ColorSwatchBox({ colorToken }: ColorSwatchBoxProps) {
  return (
    <div
      className={styles}
      style={{ backgroundColor: getSwatchVariable(colorToken).var }}
    />
  );
}
