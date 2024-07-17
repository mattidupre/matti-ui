import type { Simplify } from 'type-fest';

export type AlsoNumber<T extends string | number> =
  | T
  | (T extends `${infer N extends number}` ? N : never);

export type TuplePluck<
  TIdProperty extends string,
  TSource extends ReadonlyArray<Record<TIdProperty, unknown>>,
  TResult extends ReadonlyArray<unknown> = [],
> = TSource extends readonly [
  Record<TIdProperty, infer TValue>,
  ...infer TRest extends ReadonlyArray<Record<TIdProperty, unknown>>,
]
  ? TuplePluck<TIdProperty, TRest, [...TResult, TValue]>
  : TResult;

export type TupleRecord<
  TIdProperty extends string,
  TTuple extends ReadonlyArray<{ [T in TIdProperty]: string }>,
  TResult extends Record<string, unknown> = Record<never, never>,
> = TTuple extends readonly [
  infer TObject extends Record<string, unknown>,
  ...infer TRest extends ReadonlyArray<Record<TIdProperty, string>>,
]
  ? TObject extends Record<TIdProperty, infer TId extends string>
    ? Simplify<TupleRecord<TIdProperty, TRest, TResult & Record<TId, TObject>>>
    : TResult
  : TResult;
