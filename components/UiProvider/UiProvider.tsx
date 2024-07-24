import type { ComponentProps, ReactNode } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import type { Simplify, UnionToIntersection } from 'type-fest';
import { ColorsProvider } from '../ColorsProvider';
import { ColorSchemeProvider } from '../ColorSchemeProvider';
import { TypographyProvider } from '../TypographyProvider';

// const channel = addons.getChannel();
// function GlobalsProvider({ children }: { children: ReactNode }) {
//   useEffect(() => {
//     const callback = ({ globals }) => {
//       console.log('HERE', globals);
//     };
//     channel.addListener(UPDATE_GLOBALS, callback);
//     return () => {
//       channel.removeListener(UPDATE_GLOBALS, callback);
//     };
//   }, []);
//   return children;
// }

type UiProviderProps = Omit<
  Simplify<
    UnionToIntersection<
      ComponentProps<
        | typeof ColorSchemeProvider
        | typeof ColorsProvider
        | typeof TypographyProvider
      >
    >
  >,
  'children' | 'className' | 'style'
> & { children?: ReactNode };

// TODO: Verify Jotai is working in isolation.

export function UiProvider({
  colorScheme,
  defaultColors,
  defaultTypographyThemeId,
  children,
}: UiProviderProps) {
  return (
    <JotaiProvider>
      <ColorSchemeProvider colorScheme={colorScheme}>
        <ColorsProvider defaultColors={defaultColors}>
          <TypographyProvider
            defaultTypographyThemeId={defaultTypographyThemeId}
          >
            {children}
          </TypographyProvider>
        </ColorsProvider>
      </ColorSchemeProvider>
    </JotaiProvider>
  );
}
