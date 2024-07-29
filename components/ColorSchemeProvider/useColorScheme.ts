import { useContext, useMemo } from 'react';
import { useRequiredContext } from '../../shared';
import { ColorSchemeRootContext, ColorSchemeScopedContext } from './entities';

export const useColorScheme = () => {
  const { colorScheme, setColorScheme } = useRequiredContext(
    ColorSchemeRootContext,
    'ColorSchemeRootContext',
  );
  const { colorScheme: colorSchemeScoped } = useContext(
    ColorSchemeScopedContext,
  ) ?? { colorScheme: undefined };

  return useMemo(
    () => ({
      colorScheme,
      setColorScheme,
      // colorSchemeScoped,
      colorSchemeCurrent: colorSchemeScoped ?? colorScheme,
    }),
    [colorScheme, colorSchemeScoped, setColorScheme],
  );
};
