import type { ReactNode } from 'react';
import { css, cx } from '../../styled-system/css';

type CardProps = {
  className?: string;
  children: ReactNode;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cx(
        css({
          padding: 'sm',
          borderRadius: 'md',
          backgroundColor: 'grey.300',
        }),
        className,
      )}
    >
      {children}
    </div>
  );
}
