import { useAtomValue } from 'jotai';
import { usePalettesAtoms } from './lib/ColorAtomsContext';

export const useCssVariables = () => {
  return Object.assign(
    {},
    ...Object.values(usePalettesAtoms()).map(({ cssVariablesAtom }) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useAtomValue(cssVariablesAtom),
    ),
  ) as Record<string, string>;
};
