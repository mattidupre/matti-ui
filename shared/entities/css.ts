export {};

// import { defineRecipe } from '@pandacss/dev';
// import { COLOR_TOKENS_ALL, type ColorToken } from '.';
// import type { SystemStyleObject } from '@styled-system/types';
// import { cva } from '@styled-system/css';

// const createColorVariants = (
//   callback: (colorToken: ColorToken) => SystemStyleObject,
// ) =>
//   Object.fromEntries(
//     COLOR_TOKENS_ALL.map(
//       (colorToken) => [colorToken, callback(colorToken)] as const,
//     ),
//   ) as Record<ColorToken, SystemStyleObject>;

// export const colorStyle = defineRecipe({
//   // eslint-disable-next-line @pandacss/no-dynamic-styling, @pandacss/no-property-renaming
//   color: createColorVariants((colorToken) => ({ color: colorToken })),
// });
