import { UI_PREFIX } from '../constants';

const parseCssString = (token: string) =>
  token
    .toString()
    .replaceAll(/[^\dA-Za-z]+/g, '-')
    .replaceAll(/^-+|-+$/g, '');

export const defineCssVariable = (
  path: string | ReadonlyArray<undefined | string>,
  { hash }: { hash?: boolean } = {},
): {
  var: `--${string}`;
  ref: string;
} => {
  if (hash) {
    throw new Error(`Hashes not yet implemented.`);
  }
  const variable = `${UI_PREFIX}-${parseCssString(
    (Array.isArray(path)
      ? path.filter((v) => v !== undefined).join('-')
      : path) as string,
  )}`;
  return {
    var: `--${variable}`,
    ref: `var(--${variable})`,
  };
};
