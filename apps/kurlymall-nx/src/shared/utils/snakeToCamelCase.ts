import {
  fromPairs,
  entries,
  map,
  camelCase,
  isString,
  isNumber,
  isBoolean,
  isArray,
  head,
  isNull,
  isUndefined,
  isEmpty,
} from 'lodash';

const checkValueIsPrimitiveType = (value: unknown) =>
  !!(isString(value) || isNumber(value) || isBoolean(value) || isNull(value) || isUndefined(value) || isEmpty(value));

export default function snakeToCamel<T>(data: unknown): T {
  return fromPairs(
    map(entries(data as object), (item) => {
      const [key, value] = item;
      const camelCasedKey = camelCase(key);
      if (checkValueIsPrimitiveType(value)) {
        return [camelCasedKey, value];
      }
      if (isArray(value)) {
        const firstElement = head(value);
        if (checkValueIsPrimitiveType(firstElement)) {
          return [camelCasedKey, value];
        }
        return [camelCasedKey, map(value, (valueItem) => snakeToCamel(valueItem))];
      }
      return [camelCasedKey, snakeToCamel(value)];
    }),
  ) as T;
}
