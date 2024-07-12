export type LightOrDarkOrBase<T extends Record<PropertyKey, unknown>> = T & {
  light?: T;
  dark?: T;
};

export type LightAndDark<T> = {
  light: T;
  dark: T;
};

export const parseLightOrDarkOrBase = <T extends Record<PropertyKey, unknown>>(
  value: undefined | LightOrDarkOrBase<T>,
) => {
  const { light, dark, ...rest } = value ?? {};
  return {
    light: {
      ...rest,
      ...light,
    },
    dark: {
      ...rest,
      ...dark,
    },
  } as LightAndDark<T>;
};
