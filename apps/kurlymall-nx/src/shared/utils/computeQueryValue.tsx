import { get, head, isArray } from 'lodash';

import { ParsedUrlQuery } from 'querystring';

export const computeQueryValue =
  (query: ParsedUrlQuery) =>
  (key: string, defaultValue?: string): string | undefined => {
    const value = get(query, key, defaultValue);

    if (isArray(value)) {
      return computeQueryValue({ [key]: head(value) })(key, defaultValue);
    }

    return value;
  };
