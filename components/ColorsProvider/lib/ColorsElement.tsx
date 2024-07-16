import type { ReactNode } from 'react';
import { useAtomValue } from 'jotai';
import { mapSwatches } from '../../../shared';
import { getColorVariable, getColorVariableWrapped } from '../../entities';
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

      const baseVariable = getColorVariable(colorToken);
      const lightVariable = getColorVariable(colorTokenLight);
      const darkVariable = getColorVariable(colorTokenDark);

      // console.log({ baseVariable, lightVariable, darkVariable });

      const baseValue = `light-dark(${[
        getColorVariableWrapped(colorTokenLight),
        getColorVariableWrapped(colorTokenDark),
      ].join(', ')})`;

      return [
        [baseVariable, baseValue],
        [lightVariable, lightValue],
        [darkVariable, darkValue],
      ];
    }).flat(),
  );

  // Children will not re-render.
  return <div style={cssVariables}>{children}</div>;
}
