import { useContext } from 'react';
import { COLOR_SCHEME_CONFIG, useSystemColorScheme } from '../../shared';
import { ColorSchemeScopeContext } from './entities';

export const useScopedColorScheme = () => {
  const colorSchemeSystem = useSystemColorScheme();
  return (
    useContext(ColorSchemeScopeContext).colorScheme ??
    colorSchemeSystem ??
    COLOR_SCHEME_CONFIG.colorSchemeSsr
  );
};
