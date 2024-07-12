import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { createColorCssVariablesAtom } from '../../entities';
import { usePalettesAtoms } from './lib/ColorAtomsContext';

export const useCssVariables = () => {
  const palettesAtoms = usePalettesAtoms();
  const [cssVariablesAtom] = useState(() =>
    createColorCssVariablesAtom(palettesAtoms),
  );
  return useAtomValue(cssVariablesAtom);
};
