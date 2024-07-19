import type { ReactNode } from 'react';
import { useAtomValue } from 'jotai';
import { mapSwatches, getSwatchVariable } from '../../../shared';
import { useSwatchAtom } from './ColorAtomsContext';

type ColorsElementProps = {
  children?: ReactNode;
};

export function ColorsElement({ children }: ColorsElementProps) {
  const cssVariables = Object.fromEntries(
    mapSwatches(({ colorToken, colorTokenLight, colorTokenDark }) => {
      // Because these are static values, hook order is preserved.
      // eslint-disable-next-line react-hooks/rules-of-hooks, no-undef
      const { lightValue, darkValue } = useAtomValue(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSwatchAtom(colorToken),
      );
      const baseValue = `light-dark(${[
        getSwatchVariable(colorTokenLight).ref,
        getSwatchVariable(colorTokenDark).ref,
      ].join(', ')})`;

      return [
        [getSwatchVariable(colorToken).var, baseValue],
        [getSwatchVariable(colorTokenLight).var, lightValue],
        [getSwatchVariable(colorTokenDark).var, darkValue],
      ];
    }).flat(),
  );

  // Children will not re-render.
  return <div style={cssVariables}>{children}</div>;
}
