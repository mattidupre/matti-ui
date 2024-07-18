import { expect, expectTypeOf, test } from 'vitest';
import { defineToken, type Token } from './token';

test('Token type', () => {
  expectTypeOf<Token<'test'>>().toMatchTypeOf<'test'>();
  expectTypeOf<Token<['test']>>().toMatchTypeOf<'test'>();
  expectTypeOf<Token<['foo', 'bar']>>().toMatchTypeOf('foo.bar');
  expectTypeOf<
    Token<[undefined, 'foo', undefined, 'bar', undefined]>
  >().toMatchTypeOf('foo.bar');
});

test(defineToken, () => {
  expect.soft(defineToken('test')).toBe('test');
  expect.soft(defineToken(['test'])).toBe('test');
  expect.soft(defineToken(['foo', 'bar'])).toBe('foo.bar');
  expect
    .soft(defineToken([undefined, 'foo', undefined, 'bar', undefined]))
    .toBe('foo.bar');
});
