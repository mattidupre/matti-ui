import {
  type RefObject,
  forwardRef,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react';
import { css, cx } from '../../styled-system/css';

type CardProps = {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export const Card = forwardRef(function Card(
  { style, children, className }: CardProps,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      style={style}
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
});
