import type { Join } from 'type-fest';
import type { TupleNonNullable } from './types';

export type Token<
  TPath extends string | ReadonlyArray<undefined | string> = string,
> =
  TPath extends ReadonlyArray<undefined | string>
    ? Join<TupleNonNullable<TPath>, '.'>
    : TPath;

export const defineToken = <
  TPath extends string | ReadonlyArray<undefined | string>,
>(
  path: TPath,
) =>
  (Array.isArray(path)
    ? path.filter((p) => p !== undefined).join('.')
    : path) as Token<TPath>;
