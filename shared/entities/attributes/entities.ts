import type { Simplify } from 'type-fest';

export type DataAttributeKey = `data-${string}`;

export type DataAttributes = Record<DataAttributeKey, string>;

export type ParseDataAttributes<T extends Partial<DataAttributes>> = Simplify<
  {
    [K in keyof T as T[K] extends undefined ? never : K]?: T[K];
  } & {
    [K in keyof T as undefined extends T[K] ? never : K]: T[K];
  }
>;
