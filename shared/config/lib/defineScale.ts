import type { SimplifyDeep } from 'type-fest';
import type { TuplePluck } from '../../utils';

type IdKey<TName extends string> = `${TName}Id`;

const idKey = <TName extends string>(name: TName) => `${name}Id` as const;

type Scale<
  TName extends string,
  TId extends string = string,
  TValue extends string | number = string | number,
> = Record<IdKey<TName>, TId> & {
  value: TValue;
};

export const defineScale = <
  TName extends string,
  const TOptions extends ReadonlyArray<Scale<TName>>,
>(
  name: TName,
  options: TOptions,
) =>
  ({
    [`${name}Ids`]: options.map(({ [idKey(name)]: id }) => id),
    [`${name}ById`]: Object.fromEntries(
      options.map(({ [idKey(name)]: id, value }) => [
        id,
        {
          [options[idKey(name) as keyof typeof options] as PropertyKey]: id,
          value,
        },
      ]),
    ),
  }) as SimplifyDeep<
    Record<`${TName}Ids`, TuplePluck<IdKey<TName>, TOptions>> &
      Record<
        `${TName}ById`,
        {
          [TKey in TOptions[number] extends Record<
            IdKey<TName>,
            infer T extends string
          >
            ? T
            : never]: Scale<TName, TKey, TOptions[number]['value']>;
        }
      >
  >;
