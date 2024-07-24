import { useChannel, useGlobals } from '@storybook/preview-api';
import { atom, useSetAtom } from 'jotai';
import type { PrimitiveAtom } from 'jotai/experimental';
import { useMemo, useState } from 'react';

// https://github.com/storybookjs/storybook/blob/2f7072b79a7d18f32effca6860690fe387fdea33/code/core/src/core-events/index.ts
const UPDATE_GLOBALS = 'updateGlobals';

export const useGlobalAtom = <TValue>(globalKey: string) => {
  const [globals, updateGlobals] = useGlobals();

  if (!(globalKey in globals)) {
    throw new Error(`Key "${globalKey}" not found in globals.`);
  }

  const [primitiveAtom] = useState(() => atom<unknown>(globals[globalKey]));
  const globalAtom = useMemo(
    (): PrimitiveAtom<unknown> =>
      atom(
        (get) => get(primitiveAtom),
        (get, set, value) => {
          updateGlobals({ [globalKey]: value });
          set(primitiveAtom, value);
        },
      ),
    [globalKey, primitiveAtom, updateGlobals],
  );

  const setAtom = useSetAtom(primitiveAtom);

  useChannel(
    {
      [UPDATE_GLOBALS]: ({ globals }) => {
        if (globalKey in globals) {
          setAtom(globals[globalKey]);
        }
      },
    },
    [setAtom, globalKey],
  );

  return globalAtom as PrimitiveAtom<TValue>;
};
