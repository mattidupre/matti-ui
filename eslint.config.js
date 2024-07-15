// @ts-check
// @ts-ignore
import typescriptParser from '@typescript-eslint/parser';
import { resolveFromRoot, PATHS, EXTENSIONS } from './paths.js';
import { defineFlatConfig } from 'eslint-define-config';

const REACT_VERSION = '18.2';
const INCLUDES = [`{components,panda,shared}/**/*.{${EXTENSIONS.join(',')}}`];
const IGNORES = [];

/** @type { Record<string, string> } */
const PLUGINS = {
  '@pandacss': '@pandacss/eslint-plugin',
  '@stylistic': '@stylistic/eslint-plugin',
  '@typescript-eslint': '@typescript-eslint/eslint-plugin',
  import: 'eslint-plugin-import',
  js: '@eslint/js',
  jsdoc: 'eslint-plugin-jsdoc',
  'no-autofix': 'eslint-plugin-no-autofix',
  prettier: 'eslint-plugin-prettier',
  react: 'eslint-plugin-react',
  'react-hooks': 'eslint-plugin-react-hooks',
  storybook: 'eslint-plugin-storybook',
  unicorn: 'eslint-plugin-unicorn',
  'unused-imports': 'eslint-plugin-unused-imports',
};

/** @type { Record<string, any> } */
const ESLINT_PLUGINS = Object.fromEntries(
  await Promise.all(
    Object.entries(PLUGINS).map(async ([id, importPath]) => [
      id,
      (await import(importPath)).default,
    ]),
  ),
);

console.log(PATHS.panda);

export default defineFlatConfig([
  {
    files: INCLUDES,
    plugins: ESLINT_PLUGINS,
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: PATHS.tsconfig,
        ecmaFeatures: { modules: true },
      },
      globals: {
        JSX: true,
      },
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    settings: {
      '@pandacss/configPath': PATHS.panda,
      'import/parsers': {
        [resolveFromRoot('@typescript-eslint/parser')]: EXTENSIONS,
      },
      'import/resolver': {
        typescript: {
          project: PATHS.tsconfig,
        },
        node: {
          extensions: EXTENSIONS,
        },
      },
      'import/external-module-folders': [PATHS.node_modules],
      react: {
        version: REACT_VERSION,
      },
    },
  },
  { ignores: IGNORES },
  {
    files: INCLUDES,
    rules: {
      '@pandacss/file-not-included': 'error',
      '@pandacss/no-config-function-in-source': 'error',
      '@pandacss/no-debug': 'error',
      '@pandacss/no-dynamic-styling': 'error',
      '@pandacss/no-escape-hatch': 'off',
      '@pandacss/no-hardcoded-color': 'error',
      '@pandacss/no-important': 'off',
      '@pandacss/no-invalid-token-paths': 'error',
      '@pandacss/no-invalid-nesting': 'error',
      '@pandacss/no-margin-properties': 'off',
      '@pandacss/no-physical-properties': 'off',
      '@pandacss/no-property-renaming': 'error',
      '@pandacss/no-unsafe-token-fn-usage': 'error',
      '@pandacss/prefer-longhand-properties': 'off',
      '@pandacss/prefer-shorthand-properties': 'off',
      '@pandacss/prefer-atomic-properties': 'off',
      '@pandacss/prefer-composite-properties': 'off',
      '@pandacss/prefer-unified-property-style': 'off',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/ban-types': 'error',
      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      'no-loss-of-precision': 'error',
      '@typescript-eslint/no-loss-of-precision': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/triple-slash-reference': 'error',
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'error',
      'import/export': 'error',
      'import/no-named-as-default': 'warn',
      'import/no-named-as-default-member': 'warn',
      'import/no-duplicates': 'warn',
      'constructor-super': 'error',
      'for-direction': 'error',
      'getter-return': 'error',
      'no-async-promise-executor': 'error',
      'no-case-declarations': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-const-assign': 'error',
      'no-constant-condition': 'error',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-delete-var': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-empty-character-class': 'error',
      'no-empty-pattern': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-import-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-misleading-character-class': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-new-symbol': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-obj-calls': 'error',
      'no-octal': 'error',
      'no-prototype-builtins': 'error',
      'no-redeclare': 'error',
      'no-regex-spaces': 'error',
      'no-self-assign': 'error',
      'no-setter-return': 'error',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-this-before-super': 'error',
      'no-undef': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-unused-labels': 'error',
      'no-useless-backreference': 'error',
      'no-useless-catch': 'error',
      'no-useless-escape': 'error',
      'no-with': 'error',
      'require-yield': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',
      'jsdoc/check-access': 'warn',
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-examples': 'off',
      'jsdoc/check-indentation': 'off',
      'jsdoc/check-line-alignment': 'off',
      'jsdoc/check-param-names': 'warn',
      'jsdoc/check-property-names': 'warn',
      'jsdoc/check-syntax': 'off',
      'jsdoc/check-tag-names': 'warn',
      'jsdoc/check-types': 'warn',
      'jsdoc/check-values': 'warn',
      'jsdoc/empty-tags': 'warn',
      'jsdoc/implements-on-classes': 'warn',
      'jsdoc/imports-as-dependencies': 'off',
      'jsdoc/informative-docs': 'off',
      'jsdoc/match-description': 'off',
      'jsdoc/match-name': 'off',
      'jsdoc/multiline-blocks': 'warn',
      'jsdoc/no-bad-blocks': 'off',
      'jsdoc/no-blank-block-descriptions': 'off',
      'jsdoc/no-blank-blocks': 'off',
      'jsdoc/no-defaults': 'warn',
      'jsdoc/no-missing-syntax': 'off',
      'jsdoc/no-multi-asterisks': 'warn',
      'jsdoc/no-restricted-syntax': 'off',
      'jsdoc/no-types': 'off',
      'jsdoc/no-undefined-types': 'warn',
      'jsdoc/require-asterisk-prefix': 'off',
      'jsdoc/require-description': 'off',
      'jsdoc/require-description-complete-sentence': 'off',
      'jsdoc/require-example': 'off',
      'jsdoc/require-file-overview': 'off',
      'jsdoc/require-hyphen-before-param-description': 'off',
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-param-name': 'warn',
      'jsdoc/require-param-type': 'warn',
      'jsdoc/require-property': 'warn',
      'jsdoc/require-property-description': 'warn',
      'jsdoc/require-property-name': 'warn',
      'jsdoc/require-property-type': 'warn',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-returns-check': 'warn',
      'jsdoc/require-returns-description': 'warn',
      'jsdoc/require-returns-type': 'warn',
      'jsdoc/require-throws': 'off',
      'jsdoc/require-yields': 'warn',
      'jsdoc/require-yields-check': 'warn',
      'jsdoc/sort-tags': 'off',
      'jsdoc/tag-lines': 'warn',
      'jsdoc/text-escaping': 'off',
      'jsdoc/valid-types': 'warn',
      'unicorn/better-regex': 'error',
      'unicorn/catch-error-name': 'error',
      'unicorn/consistent-destructuring': 'error',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/custom-error-definition': 'off',
      'unicorn/empty-brace-spaces': 'error',
      'unicorn/error-message': 'error',
      'unicorn/escape-case': 'error',
      'unicorn/expiring-todo-comments': 'error',
      'unicorn/explicit-length-check': 'error',
      'unicorn/filename-case': [
        'error',
        { cases: { camelCase: true, pascalCase: true } },
      ],
      'unicorn/import-style': 'error',
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-abusive-eslint-disable': 'off',
      'unicorn/no-array-callback-reference': 'error',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-method-this-argument': 'error',
      'unicorn/no-array-push-push': 'error',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-await-expression-member': 'off',
      'unicorn/no-console-spaces': 'error',
      'unicorn/no-document-cookie': 'error',
      'unicorn/no-empty-file': 'off',
      'unicorn/no-for-loop': 'error',
      'unicorn/no-hex-escape': 'error',
      'unicorn/no-instanceof-array': 'error',
      'unicorn/no-invalid-remove-event-listener': 'error',
      'unicorn/no-keyword-prefix': 'off',
      'unicorn/no-lonely-if': 'error',
      'no-negated-condition': 'off',
      'unicorn/no-negated-condition': 'error',
      'no-nested-ternary': 'off',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/no-new-array': 'error',
      'unicorn/no-new-buffer': 'error',
      'unicorn/no-null': 'off',
      'unicorn/no-object-as-default-parameter': 'error',
      'unicorn/no-process-exit': 'error',
      'unicorn/no-static-only-class': 'error',
      'unicorn/no-thenable': 'error',
      'unicorn/no-this-assignment': 'error',
      'unicorn/no-typeof-undefined': 'error',
      'unicorn/no-unnecessary-await': 'error',
      'unicorn/no-unreadable-array-destructuring': 'error',
      'unicorn/no-unreadable-iife': 'error',
      'unicorn/no-unused-properties': 'off',
      'unicorn/no-useless-fallback-in-spread': 'error',
      'unicorn/no-useless-length-check': 'error',
      'unicorn/no-useless-promise-resolve-reject': 'error',
      'unicorn/no-useless-spread': 'error',
      'unicorn/no-useless-switch-case': 'error',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/no-zero-fractions': 'error',
      'unicorn/number-literal-case': 'error',
      'unicorn/numeric-separators-style': 'error',
      'unicorn/prefer-add-event-listener': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-array-flat': 'error',
      'unicorn/prefer-array-flat-map': 'error',
      'unicorn/prefer-array-index-of': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-at': 'error',
      'unicorn/prefer-blob-reading-methods': 'error',
      'unicorn/prefer-code-point': 'error',
      'unicorn/prefer-date-now': 'error',
      'unicorn/prefer-default-parameters': 'error',
      'unicorn/prefer-dom-node-append': 'error',
      'unicorn/prefer-dom-node-dataset': 'error',
      'unicorn/prefer-dom-node-remove': 'error',
      'unicorn/prefer-dom-node-text-content': 'error',
      'unicorn/prefer-event-target': 'error',
      'unicorn/prefer-export-from': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-json-parse-buffer': 'off',
      'unicorn/prefer-keyboard-event-key': 'error',
      'unicorn/prefer-logical-operator-over-ternary': 'error',
      'unicorn/prefer-math-trunc': 'error',
      'unicorn/prefer-modern-dom-apis': 'error',
      'unicorn/prefer-modern-math-apis': 'error',
      'unicorn/prefer-module': 'error',
      'unicorn/prefer-native-coercion-functions': 'error',
      'unicorn/prefer-negative-index': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/prefer-number-properties': 'error',
      'unicorn/prefer-object-from-entries': 'error',
      'unicorn/prefer-optional-catch-binding': 'error',
      'unicorn/prefer-prototype-methods': 'error',
      'unicorn/prefer-query-selector': 'error',
      'unicorn/prefer-reflect-apply': 'error',
      'unicorn/prefer-regexp-test': 'error',
      'unicorn/prefer-set-has': 'error',
      'unicorn/prefer-set-size': 'error',
      'unicorn/prefer-spread': 'error',
      'unicorn/prefer-string-replace-all': 'error',
      'unicorn/prefer-string-slice': 'error',
      'unicorn/prefer-string-starts-ends-with': 'error',
      'unicorn/prefer-string-trim-start-end': 'error',
      'unicorn/prefer-switch': 'error',
      'unicorn/prefer-ternary': 'error',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prefer-type-error': 'error',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/relative-url-style': 'error',
      'unicorn/require-array-join-separator': 'error',
      'unicorn/require-number-to-fixed-digits-argument': 'error',
      'unicorn/require-post-message-target-origin': 'off',
      'unicorn/string-content': 'off',
      'unicorn/switch-case-braces': 'error',
      'unicorn/template-indent': 'error',
      'unicorn/text-encoding-identifier-case': 'error',
      'unicorn/throw-new-error': 'error',
      '@stylistic/spaced-comment': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      'import/first': 'error',
      'import/extensions': [
        'error',
        'ignorePackages',
        // https://github.com/import-js/eslint-plugin-import/issues/1615
        Object.fromEntries(EXTENSIONS.map((ext) => [ext, 'never'])),
      ],
      'import/order': 'error',
      'import/no-absolute-path': 'off',
      'import/no-self-import': 'error',
      'import/no-relative-packages': 'error',
      'import/no-default-export': 'error',
      'import/newline-after-import': 'error',
      'import/no-useless-path-segments': 'error',
      'no-autofix/unused-imports/no-unused-imports': 'warn',
      'no-autofix/unused-imports/no-unused-vars': 'warn',
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': [
        'off',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'react/display-name': 2,
      'react/jsx-key': 2,
      'react/jsx-no-comment-textnodes': 2,
      'react/jsx-no-duplicate-props': 2,
      'react/jsx-no-target-blank': 2,
      'react/jsx-no-undef': 2,
      'react/jsx-uses-react': 2,
      'react/jsx-uses-vars': 2,
      'react/no-children-prop': 2,
      'react/no-danger-with-children': 2,
      'react/no-deprecated': 2,
      'react/no-direct-mutation-state': 2,
      'react/no-find-dom-node': 2,
      'react/no-is-mounted': 2,
      'react/no-render-return-value': 2,
      'react/no-string-refs': 2,
      'react/no-unescaped-entities': 2,
      'react/no-unknown-property': 2,
      'react/no-unsafe': 0,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-render-return': 2,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['**/*.stories.{js,cjs,mjs,jsx,ts,tsx}'],
    rules: {
      'storybook/await-interactions': 'error',
      'storybook/context-in-play-function': 'error',
      'storybook/csf-component': 'error',
      'storybook/default-exports': 'error',
      'storybook/hierarchy-separator': 'error',
      'storybook/no-redundant-story-name': 'off',
      'storybook/no-stories-of': 'error',
      'storybook/prefer-pascal-case': 'error',
      'storybook/story-exports': 'error',
      'storybook/use-storybook-expect': 'error',
      'storybook/use-storybook-testing-library': 'error',
    },
  },
]);
