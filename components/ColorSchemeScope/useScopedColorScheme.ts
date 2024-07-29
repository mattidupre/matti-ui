import { useContext } from 'react';
import { useSystemColorScheme } from '../../shared';
import { ColorSchemeScopeContext } from './entities';

export const useScopedColorScheme = () => {
  const colorSchemeSystem = useSystemColorScheme();
  return useContext(ColorSchemeScopeContext) ?? colorSchemeSystem;
};
