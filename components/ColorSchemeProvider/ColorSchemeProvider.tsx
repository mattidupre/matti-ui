import {
  type CSSProperties,
  useContext,
  useMemo,
  type ReactNode,
  useEffect,
  useRef,
} from 'react';
import { useAtomValue } from 'jotai';
import { COLOR_SCHEME_CONFIG, useSystemColorScheme } from '../../shared';
import { cx } from '../../styled-system/css';
import { ColorSchemeContext, colorSchemePreferenceAtom } from './entities';

const classNameStrings = COLOR_SCHEME_CONFIG.className;

type ColorSchemeProviderProps = {
  colorScheme?: 'light' | 'dark' | 'invert';
  children?: ReactNode;
};

export function ColorSchemeProvider({
  colorScheme: colorSchemeProp,
  children,
}: ColorSchemeProviderProps) {
  const parentContextValue = useContext(ColorSchemeContext);
  const isRoot = !parentContextValue;

  const { colorScheme: colorSchemeParent } = parentContextValue ?? {};

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

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = isRoot
      ? globalThis.document?.querySelector(':root')
      : divRef.current!;

    if (!element) {
      return;
    }

    element.classList.add(classNameStrings[colorScheme]);
    return () => {
      element.classList.remove(...Object.values(classNameStrings));
    };
  }, [colorScheme, isRoot]);

  const wrappedChildren = isRoot ? (
    children
  ) : (
    <div ref={divRef}>{children}</div>
  );

  return (
    <ColorSchemeContext.Provider value={contextValue}>
      {wrappedChildren}
    </ColorSchemeContext.Provider>
  );
}
