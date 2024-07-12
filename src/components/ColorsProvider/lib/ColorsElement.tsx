import type { ReactNode } from 'react';

type ColorsElementProps = {
  children?: ReactNode;
};

export function ColorsElement({ children }: ColorsElementProps) {
  return <div>{children}</div>;
}
