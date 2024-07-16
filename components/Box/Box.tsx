import { createElement, type ReactNode } from 'react';
import { css } from '../../styled-system/css';
import {
  type ColorToken,
  parseLightOrDarkOrString,
  type LightOrDarkOrString,
} from '../../shared';

type AsComponent = 'div' | 'span';

type BoxProps = {
  as?: AsComponent;
  children?: ReactNode;
  color?: LightOrDarkOrString<ColorToken>;
};

export function Box({ as = 'div', color, children }: BoxProps) {
  const { light: colorLight, dark: colorDark } =
    parseLightOrDarkOrString(color);

  return createElement(
    as,
    {
      className: css({
        // eslint-disable-next-line @pandacss/no-dynamic-styling, @pandacss/no-property-renaming
        _light: { backgroundColor: colorLight },
        // eslint-disable-next-line @pandacss/no-dynamic-styling, @pandacss/no-property-renaming
        _dark: { backgroundColor: colorDark },
      }),
    },
    children,
  );
}
