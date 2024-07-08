import {
  type ReactElement,
  useEffect,
  useMemo,
  useRef,
  useContext,
} from 'react';
import { DEFAULT_COLORS } from '../../entities';
import { ColorsContext, type ColorsContextValue } from './entities';

type ProviderProps = {
  children: ReactElement;
};

const DEFAULT_CONTEXT: ColorsContextValue = {
  options: DEFAULT_COLORS,
};

export function ColorsProvider({ children }: ProviderProps) {
  const ref = useRef<HTMLDivElement>(null);

  const parentColors = useContext(ColorsContext) ?? DEFAULT_COLORS;

  const colors = useMemo(
    () =>
      // TODO: Extend colors
      ({ ...parentColors }),
    [parentColors],
  );

  const colorsVariables = useMemo(() => ({}), []);

  useEffect(() => {
    // TODO: Apply css variables
  }, [colorsVariables]);

  return (
    <ColorsContext.Provider value={colors}>
      <div ref={ref}>{children}</div>
    </ColorsContext.Provider>
  );
  //
}
