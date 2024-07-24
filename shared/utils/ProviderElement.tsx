import { kebabCase, mapKeys } from 'lodash-es';
import {
  type ForwardedRef,
  forwardRef,
  type CSSProperties,
  useRef,
  useEffect,
  type ReactNode,
  type Ref,
  useMemo,
} from 'react';

const getRootElement = (rootQuery: string) => {
  const element = globalThis?.document.querySelector(rootQuery) as
    | undefined
    | HTMLElement
    | SVGElement;
  if (!element) {
    throw new Error(
      `Root element not found using DOM selector "${rootQuery}".`,
    );
  }
  return element;
};

type ProviderElementProps = {
  rootQuery?: string;
  className?: string;
  style?: CSSProperties;
  dataAttributes?: Record<string, string>;
  ref?: ForwardedRef<HTMLDivElement>;
  children?: ReactNode;
};

export const ProviderElement = forwardRef(function ProviderElement(
  {
    rootQuery,
    className,
    style: styleProp,
    dataAttributes: dataAttributesProp,
    children,
  }: ProviderElementProps,
  forwardRef,
) {
  const defaultRef = useRef<HTMLDivElement>(null);
  const ref = forwardRef ?? defaultRef;

  const dataAttributes = useMemo(
    () =>
      dataAttributesProp &&
      (mapKeys(
        dataAttributesProp,
        (_, key) => `data-${kebabCase(key)}`,
      ) as Record<string, string>),
    [dataAttributesProp],
  );

  const style = useMemo(
    () =>
      styleProp &&
      (mapKeys(styleProp, (_, key) => kebabCase(key)) as Record<
        string,
        string
      >),
    [styleProp],
  );

  useEffect(() => {
    if (!rootQuery || !className) {
      return;
    }
    const element = getRootElement(rootQuery);
    element.classList.add(className);
    return () => {
      element.classList.remove(className);
    };
  }, [className, rootQuery]);

  useEffect(() => {
    if (!rootQuery || !style) {
      return;
    }
    const element = getRootElement(rootQuery);

    // TODO: Does js handle backgroundColor vs background-color okay?

    for (const [key, value] of Object.entries(style)) {
      element.style.setProperty(key, value);
    }
    return () => {
      for (const key of Object.keys(style)) {
        element.style.removeProperty(key);
      }
    };
  }, [style, rootQuery]);

  useEffect(() => {
    if (!rootQuery || !dataAttributes) {
      return;
    }
    const element = getRootElement(rootQuery);

    // TODO: Does js handle backgroundColor vs background-color okay?

    for (const [key, value] of Object.entries(dataAttributes)) {
      element.setAttribute(key, value);
    }
    return () => {
      for (const key of Object.keys(dataAttributes)) {
        element.removeAttribute(key);
      }
    };
  }, [rootQuery, dataAttributes]);

  if (rootQuery) {
    return children;
  }

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={className}
      style={style}
      {...dataAttributes}
    >
      {children}
    </div>
  );
});
