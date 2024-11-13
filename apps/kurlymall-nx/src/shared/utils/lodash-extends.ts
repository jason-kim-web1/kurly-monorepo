import { concat, isEmpty, isUndefined, negate, isEqual, every, slice, eq, isFunction, isNull, isObject } from 'lodash';

export const isDefined = negate(isUndefined);

export const insertAt = <T, U>(array: Array<T>, value: U, at: number): Array<T | U> => {
  return at >= array.length
    ? concat<T | U>(array, value)
    : concat<T | U>(slice<T>(array, 0, at), value, slice<T>(array, at));
};

export const isNotEmpty = negate(isEmpty);
export const ne = negate(eq);
export const isNotEqual = negate(isEqual);

export const isNotNull = negate(isNull);

export const isNotUndefined = negate(isUndefined);

export const everyBy = (pred: Parameters<typeof every>[1]) => (collections: Parameters<typeof every>[0]) =>
  every(collections, pred);

export const everyTrue = everyBy((a) => isEqual(a, true));
export const everyFalse = everyBy((a) => isEqual(a, false));

export const isNotFunction = negate(isFunction);

export const isNotObject = negate(isObject);

export const checkEqualValueByBase =
  <T>(base: T) =>
  (value: T) =>
    eq(base, value);
