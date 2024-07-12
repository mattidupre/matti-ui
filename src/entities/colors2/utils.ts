export type LightOrDarkOrBase<T extends Record<PropertyKey, unknown>> = T & {
  light?: T;
  dark?: T;
};
