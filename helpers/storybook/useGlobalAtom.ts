import { useChannel, useGlobals } from '@storybook/preview-api';
import { atom, useSetAtom } from 'jotai';
import type { PrimitiveAtom } from 'jotai/experimental';
import { useMemo, useState } from 'react';

// https://github.com/storybookjs/storybook/blob/2f7072b79a7d18f32effca6860690fe387fdea33/code/core/src/core-events/index.ts
const UPDATE_GLOBALS = 'updateGlobals';

type Callbacks = [
  fromGlobals: (globals: Record<string, any>) => any,
  toGlobals: (value: any) => Record<string, any>,
];

export const useGlobalAtom: {
  <TValue = unknown>(globalKey: string): PrimitiveAtom<TValue>;
  <TValue = unknown>(...args: Callbacks): PrimitiveAtom<TValue>;
} = (...args) => {
  const [[fromGlobals, toGlobals]] = useState<Callbacks>(() =>
    typeof args[0] === 'string'
      ? [
          (globals) => globals[args[0] as string],
          (value) => ({ [args[0] as string]: value }),
        ]
      : (args as Callbacks),
  );

  const [globals, updateGlobals] = useGlobals();

  const [primitiveAtom] = useState(() => atom<unknown>(fromGlobals(globals)));
  const globalAtom = useMemo(
    (): PrimitiveAtom<unknown> =>
      atom(
        (get) => get(primitiveAtom),
        (get, set, value) => {
          updateGlobals(toGlobals(value));
          set(primitiveAtom, value);
        },
      ),
    [toGlobals, primitiveAtom, updateGlobals],
  );

  const setAtom = useSetAtom(primitiveAtom);

  useChannel(
    {
      [UPDATE_GLOBALS]: ({ globals }) => {
        setAtom(fromGlobals(globals));
      },
    },
    [setAtom, fromGlobals],
  );

  return globalAtom;
};
