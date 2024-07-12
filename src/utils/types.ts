export type AlsoNumber<T extends string | number> =
  | T
  | (T extends `${infer N extends number}` ? N : never);
