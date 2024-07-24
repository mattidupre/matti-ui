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
  cssVars?: Record<string, string>;
  dataAttributes?: Record<string, string>;
  ref?: ForwardedRef<HTMLDivElement>;
  children?: ReactNode;
};

export const ProviderElement = forwardRef(function ProviderElement(
  {
    rootQuery,
    className,
    style: styleProp,
    cssVars,
    dataAttributes: dataAttributesProp,
    children,
  }: ProviderElementProps,
  forwardRef,
) {
  const defaultRef = useRef<HTMLDivElement>(null);
  const ref = forwardRef ?? defaultRef;

  // Element class name:

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

  // Element styles:

  const style = useMemo(() => {
    if (!styleProp) {
      return undefined;
    }

    return (
      styleProp &&
      (mapKeys(styleProp, (_, key) => kebabCase(key)) as Record<string, string>)
    );
  }, [styleProp]);

  useEffect(() => {
    if (!rootQuery || !style) {
      return;
    }
    const element = getRootElement(rootQuery);

    for (const [key, value] of Object.entries(style)) {
      element.style.setProperty(key, value);
    }

    return () => {
      for (const key of Object.keys(style)) {
        element.style.removeProperty(key);
      }
    };
  }, [style, rootQuery]);

  // Element CSS Variables:

  useEffect(() => {
    if (!rootQuery || !cssVars) {
      return;
    }
    const element = getRootElement(rootQuery);

    for (const [key, value] of Object.entries(cssVars)) {
      element.style.setProperty(key, value);
    }

    return () => {
      for (const key of Object.keys(cssVars)) {
        element.style.removeProperty(key);
      }
    };
  }, [cssVars, rootQuery]);

  // Element Data Attributes

  const dataAttributes = useMemo(() => {
    if (!dataAttributesProp) {
      return undefined;
    }
    return mapKeys(
      dataAttributesProp,
      (_, key) => `data-${kebabCase(key)}`,
    ) as Record<string, string>;
  }, [dataAttributesProp]);

  useEffect(() => {
    if (!rootQuery || !dataAttributes) {
      return;
    }
    const element = getRootElement(rootQuery);

    for (const [key, value] of Object.entries(dataAttributes)) {
      element.setAttribute(key, value);
    }

    return () => {
      for (const key of Object.keys(dataAttributes)) {
        element.removeAttribute(key);
      }
    };
  }, [rootQuery, dataAttributes]);

  // If targeting root, no need to wrap.

  if (rootQuery) {
    return children;
  }

  // Apply attributes to wrapped element.

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={className}
      style={{ ...style, ...cssVars }}
      {...dataAttributes}
    >
      {children}
    </div>
  );
});
