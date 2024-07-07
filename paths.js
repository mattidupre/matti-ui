// @ts-check
import path from 'path';
import url from 'url';
import tsconfig from './tsconfig.json';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const TSCONFIG_PATH = './tsconfig.json';

/** @type { (path: string) => string } */
export const resolveFromRoot = (partialPath) => require.resolve(partialPath);

export const ROOT_DIR = path.dirname(url.fileURLToPath(import.meta.url));

/** @type { (path: string) => string } */
export const pathFromRoot = (partialPath) =>
  path.resolve(path.join(ROOT_DIR, partialPath));

export const PATHS = {
  node_modules: pathFromRoot('node_modules'),
  tsconfig: pathFromRoot(TSCONFIG_PATH),
  tsbase: path.resolve(
    path.dirname(pathFromRoot(TSCONFIG_PATH)),
    tsconfig.compilerOptions.baseUrl,
  ),
};

/** @type { (string: string) => string } */
const trimGlob = (string) => string.split(/\/\*.*/)[0];

export const PATH_ALIASES = Object.fromEntries(
  Object.entries(tsconfig.compilerOptions?.paths ?? {}).map(
    ([alias, paths]) => {
      if (paths.length !== 1 || typeof paths[0] !== 'string') {
        throw new TypeError(
          `tsconfig.json paths must be an array of one string: "${String(paths)}".`,
        );
      }
      return [trimGlob(alias), trimGlob(path.resolve(PATHS.tsbase, paths[0]))];
    },
  ),
);
