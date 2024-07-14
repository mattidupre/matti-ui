export type AlsoNumber<T extends string | number> =
  | T
  | (T extends `${infer N extends number}` ? N : never);

export type TuplePluck<
  TKey extends PropertyKey,
  TSource extends ReadonlyArray<Record<TKey, unknown>>,
  TResult extends ReadonlyArray<unknown> = [],
> = TSource extends readonly [
  Record<TKey, infer TValue>,
  ...infer TRest extends ReadonlyArray<Record<TKey, unknown>>,
]
  ? TuplePluck<TKey, TRest, [...TResult, TValue]>
  : TResult;
