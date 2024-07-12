import type { ParseDataAttributes } from './entities';
import { DATA_ATTRIBUTE_FLAGS } from './config';

type FlagValueTruthy = true | 1;

const isFlagValueTruthy = (value: any): value is FlagValueTruthy =>
  value === true || value === 1;

type FlagValueFalsey = false | null | undefined | 0;

type FlagValue = FlagValueTruthy | FlagValueFalsey;

type ParseFlagValue<T extends FlagValue> = T extends unknown
  ? T extends FlagValueTruthy
    ? ''
    : T extends FlagValueFalsey
      ? undefined
      : never
  : never;

type FlagOptionsKey = keyof typeof DATA_ATTRIBUTE_FLAGS;

type FlagAttributesKey<T extends FlagOptionsKey> =
  (typeof DATA_ATTRIBUTE_FLAGS)[T];

const isFlagOptionsKey = (value: any): value is FlagOptionsKey =>
  value in DATA_ATTRIBUTE_FLAGS;

function assertFlagOptionsKey(value: any): asserts value is FlagOptionsKey {
  if (!isFlagOptionsKey(value)) {
    throw new TypeError(`Invalid flag "${value}".`);
  }
}

type FlagOptions = {
  [F in FlagOptionsKey]?: FlagValue;
};

type FlagsToDataAttributes<TFlags extends FlagOptions> = ParseDataAttributes<{
  [F in FlagOptionsKey & keyof TFlags as FlagAttributesKey<F>]: ParseFlagValue<
    TFlags[F]
  >;
}>;

export const flagsToDataAttributes = <TFlags extends FlagOptions>(
  flags: TFlags,
): FlagsToDataAttributes<TFlags> =>
  Object.entries(flags).reduce(
    (obj, [flagKey, flagValue]) => {
      if (isFlagOptionsKey(flagKey) && isFlagValueTruthy(flagValue)) {
        obj[DATA_ATTRIBUTE_FLAGS[flagKey]] = '';
      }
      return obj;
    },
    {} as Record<string, ''>,
  ) as FlagsToDataAttributes<TFlags>;

export const flag = <TFlag extends FlagOptionsKey>(flagKey: TFlag) => {
  assertFlagOptionsKey(flagKey);
  return DATA_ATTRIBUTE_FLAGS[flagKey];
};
