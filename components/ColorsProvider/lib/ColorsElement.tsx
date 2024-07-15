import type { ReactNode } from 'react';
import { useAtomValue } from 'jotai';
import { mapSwatches } from '../../../shared';
import { getColorVariable } from '../../entities';
import { useSwatchAtom } from './ColorAtomsContext';

type ColorsElementProps = {
  children?: ReactNode;
};

export function ColorsElement({ children }: ColorsElementProps) {
  const cssVariables = Object.fromEntries(
    mapSwatches(({ colorToken }) => {
      // Because these are static values, hook order is preserved.
      // eslint-disable-next-line react-hooks/rules-of-hooks, no-undef
      const { value, lightValue, darkValue } = useAtomValue(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSwatchAtom(colorToken),
      );
      return [
        [getColorVariable(colorToken), value],
        [getColorVariable(`${colorToken}.light`), lightValue],
        [getColorVariable(`${colorToken}.dark`), darkValue],
      ];
    }).flat(),
  );

  // Children will not re-render.
  return <div style={cssVariables}>{children}</div>;
}
