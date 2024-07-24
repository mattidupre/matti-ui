import { atom, type Atom } from 'jotai';
import type { PrimitiveAtom, WritableAtom } from 'jotai/experimental';
import { useMemo } from 'react';
import type { JsonObject, JsonValue, SimplifyDeep } from 'type-fest';

export const isAtom = (value: any): value is Atom<unknown> => {
  if (typeof value !== 'object') {
    return false;
  }
  if (!('read' in value)) {
    return false;
  }
  if (!('toString' in value)) {
    return false;
  }
  return true;
};

export type AtomOrValue<TValue> =
  | TValue
  | PrimitiveAtom<TValue>
  | WritableAtom<TValue, [Partial<TValue>], any>;

export const asPrimitiveAtom = <TValue extends AtomOrValue<unknown>>(
  value: TValue,
): [TValue] extends [AtomOrValue<infer T>] ? PrimitiveAtom<T> : never => {
  if (isAtom(value)) {
    return value as any;
  }
  return atom(value) as any;
};

// export const useAsPrimitiveAtom = <
//   TValue extends AtomOrValue<unknown>,
//   TDefaultValue extends
//     | NoInfer<InferAtomOrValue<TValue>>
//     | { (): NoInfer<InferAtomOrValue<TValue>> } = never,
// >(
//   value: TValue,
//   defaultValue?: TDefaultValue,
// ): [TDefaultValue] extends [never]
//   ? PrimitiveAtom<InferAtomOrValue<TValue>>
//   : PrimitiveAtom<
//       | Exclude<InferAtomOrValue<TValue>, undefined>
//       | (undefined extends InferDefault<TDefaultValue> ? undefined : never)
//     > => {
//   const defaultValueCallback = useMemo((): undefined | { (): unknown } => {
//     if (value !== undefined && value !== null) {
//       return undefined;
//     }
//     if (defaultValue === undefined) {
//       return undefined;
//     }
//     if (typeof defaultValue === 'function') {
//       return defaultValue as () => unknown;
//     }
//     return () => defaultValue;
//   }, [defaultValue, value]);

//   return useMemo(
//     (): any => asPrimitiveAtom(value ?? defaultValueCallback?.()),
//     [defaultValueCallback, value],
//   );
// };
