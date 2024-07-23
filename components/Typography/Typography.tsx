import type { ReactNode } from 'react';
import type { TypographyVariantId } from '../../shared';
import { typography } from '../../styled-system/recipes';
import { cx } from '../../styled-system/css';

type TypographyProps = {
  className?: string;
  variant: TypographyVariantId;
  children: ReactNode;
};

export function Typography({ className, variant, children }: TypographyProps) {
  return <p className={cx(typography({ variant }), className)}>{children}</p>;
}
