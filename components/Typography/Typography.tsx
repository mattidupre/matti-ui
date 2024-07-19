import type { ReactNode } from 'react';
import type { TypographyVariantId } from '../../shared';
import { typography } from '../../styled-system/recipes';

type TypographyProps = {
  variant: TypographyVariantId;
  children: ReactNode;
};

export function Typography({ variant, children }: TypographyProps) {
  return <p className={typography({ variant })}>{children}</p>;
}
