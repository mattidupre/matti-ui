import {
  type ReactElement,
  useEffect,
  useMemo,
  useRef,
  useContext,
} from 'react';
import { mapValues } from 'lodash-es';
import { DEFAULT_COLORS } from '../../entities';
import { ColorsContext, type ColorsContextValue } from './entities';

type ProviderProps = {
  children: ReactElement;
};

const BASE_SWATCHES = mapValues(DEFAULT_COLORS, ({ swatches }) => swatches);

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
