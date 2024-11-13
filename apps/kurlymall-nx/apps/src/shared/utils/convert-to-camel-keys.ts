import { mapKeys, camelCase, isObject } from 'lodash';

export function convertToCamelKeys<CamelType, SnakeType extends object>(data: SnakeType) {
  return mapKeys(data, (_, key: string) => camelCase(key)) as unknown as CamelType;
}

export function convertNestedKeysToCamelCase<CamelType, SnakeType extends object>(data: SnakeType): CamelType {
  if (Array.isArray(data)) {
    return data.map((item) => convertNestedKeysToCamelCase(item)) as unknown as CamelType;
  }

  if (isObject(data)) {
    return mapKeys(
      Object.entries(data).reduce((result: { [key: string]: any }, [key, value]) => {
        result[key] = convertNestedKeysToCamelCase(value);
        return result;
      }, {} as SnakeType),
      (_, key: string) => camelCase(key),
    ) as unknown as CamelType;
  }

  return data as unknown as CamelType;
}
