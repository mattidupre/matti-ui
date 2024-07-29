import { atom, useAtomValue, type Atom } from 'jotai';
import type { PrimitiveAtom, WritableAtom } from 'jotai/experimental';

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

export type InferAtomOrValue<TAtomOrValue extends AtomOrValue<unknown>> =
  TAtomOrValue extends AtomOrValue<infer T> ? T : never;

const noopAtom = atom(() => undefined);

export const useAtomOrValue = <TValue extends AtomOrValue<unknown>>(
  value: TValue,
) => {
  const valueIsAtom = isAtom(value);
  const atomValue = useAtomValue(valueIsAtom ? value : noopAtom);
  return (valueIsAtom ? atomValue : value) as InferAtomOrValue<TValue>;
};

export const asPrimitiveAtom = <TValue extends AtomOrValue<unknown>>(
  value: TValue,
): PrimitiveAtom<InferAtomOrValue<TValue>> => {
  if (isAtom(value)) {
    return value as any;
  }
  return atom(value) as any;
};
