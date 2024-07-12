import type { ReactNode } from 'react';
import { useCssVariables } from '../useCssVariables';

type ColorsElementProps = {
  children?: ReactNode;
};

export function ColorsElement({ children }: ColorsElementProps) {
  // Children will not re-render.
  return <div style={useCssVariables()}>{children}</div>;
}
