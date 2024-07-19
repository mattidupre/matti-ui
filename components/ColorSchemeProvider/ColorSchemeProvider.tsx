import { type CSSProperties, useContext, useMemo, type ReactNode } from 'react';
import { useAtomValue } from 'jotai';
import { COLOR_SCHEME_CONFIG, useSystemColorScheme } from '../../shared';
import { cx } from '../../styled-system/css';
import { ColorSchemeContext, colorSchemePreferenceAtom } from './entities';

type ColorSchemeProviderProps = {
  className?: string;
  style?: CSSProperties;
  colorScheme?: 'light' | 'dark' | 'invert';
  children?: ReactNode;
};

export function ColorSchemeProvider({
  className,
  style,
  colorScheme: colorSchemeProp,
  children,
}: ColorSchemeProviderProps) {
  const { colorScheme: colorSchemeParent } =
    useContext(ColorSchemeContext) ?? {};

  const colorSchemePreference = useAtomValue(colorSchemePreferenceAtom);

  const colorSchemeSystem = useSystemColorScheme();

  const colorSchemeInherited =
    colorSchemeParent ??
    colorSchemePreference ??
    colorSchemeSystem ??
    COLOR_SCHEME_CONFIG.colorSchemeSsr;

  const colorScheme =
    colorSchemeProp === 'invert'
      ? colorSchemeInherited === 'light'
        ? 'dark'
        : 'light'
      : colorSchemeProp ?? colorSchemeInherited;

  const contextValue = useMemo(() => ({ colorScheme }), [colorScheme]);

  return (
    <ColorSchemeContext.Provider value={contextValue}>
      <div
        className={cx(COLOR_SCHEME_CONFIG.className[colorScheme], className)}
        style={style}
      >
        {children}
      </div>
    </ColorSchemeContext.Provider>
  );
}
