import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type ContextType,
  useCallback,
} from 'react';
import {
  COLOR_SCHEME_CONFIG,
  DEFAULT_COLOR_SCHEME,
  useSystemColorScheme,
} from '../../../shared';
import { ColorSchemeRootContext } from '../entities';

const classNameStrings = COLOR_SCHEME_CONFIG.className;

type ColorSchemeRootProviderProps = {
  defaultColorScheme?: undefined | 'light' | 'dark';
  onColorSchemeChange?: (colorScheme: undefined | 'light' | 'dark') => void;
  children?: ReactNode;
};

export function ColorSchemeRootProvider({
  defaultColorScheme,
  onColorSchemeChange,
  children,
}: ColorSchemeRootProviderProps) {
  const systemColorScheme = useSystemColorScheme() ?? DEFAULT_COLOR_SCHEME;

  const [colorSchemeState, setColorSchemeState] = useState<
    undefined | 'light' | 'dark'
  >(undefined);

  const colorScheme =
    colorSchemeState ?? defaultColorScheme ?? systemColorScheme;

  const handleColorSchemeChange = useCallback(
    (newColorScheme: undefined | 'light' | 'dark') => {
      setColorSchemeState(newColorScheme);
      onColorSchemeChange?.(newColorScheme);
    },
    [onColorSchemeChange],
  );

  useEffect(() => {
    // const element = globalThis.document?.querySelector(':root');
    // if (!element) {
    //   return;
    // }
    // element.classList.add(classNameStrings[colorScheme]);
    // return () => {
    //   element.classList.remove(...Object.values(classNameStrings));
    // };
  }, [colorScheme]);

  const providerValue = useMemo(
    (): ContextType<typeof ColorSchemeRootContext> => ({
      colorScheme,
      setColorScheme: handleColorSchemeChange,
    }),
    [colorScheme, handleColorSchemeChange],
  );

  return (
    <ColorSchemeRootContext.Provider value={providerValue}>
      {children}
    </ColorSchemeRootContext.Provider>
  );
}
