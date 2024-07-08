// @ts-check
import path from 'path';
import url from 'url';
import { createRequire } from 'node:module';

/** @type { NodeRequire } */
const require = createRequire(import.meta.url);

const TSCONFIG_PATH = './tsconfig.json';
const TSCONFIG_JSON = require(TSCONFIG_PATH);

export const EXTENSIONS = ['js', 'cjs', 'mjs', 'jsx', 'ts', 'tsx'];
export const ROOT_DIRECTORY = path.dirname(url.fileURLToPath(import.meta.url));

/** @type { (path: string) => string } */
export const resolveFromRoot = (partialPath) => require.resolve(partialPath);

/** @type { (path: string) => string } */
export const pathFromRoot = (partialPath) =>
  path.resolve(path.join(ROOT_DIRECTORY, partialPath));

/** @type { Record<string, string> } */
export const PATHS = {
  node_modules: pathFromRoot('node_modules'),
  tsconfig: pathFromRoot(TSCONFIG_PATH),
  panda: pathFromRoot('panda.config.js'),
  tsbase: path.resolve(
    path.dirname(pathFromRoot(TSCONFIG_PATH)),
    TSCONFIG_JSON.compilerOptions.baseUrl,
  ),
};

/** @type { (string: string) => string } */
const trimGlob = (string) => string.split(/\/\*.*/)[0];

/** @type { Record<string, string> } */
export const PATH_ALIASES = Object.fromEntries(
  Object.entries(TSCONFIG_JSON.compilerOptions?.paths ?? {}).map(
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
