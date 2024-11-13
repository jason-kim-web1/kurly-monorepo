import { ParsedUrlQuery } from 'querystring';

export const parseQueryString = (query: ParsedUrlQuery): { [key: string]: string } => {
  return Object.fromEntries(
    Object.keys(query).map((key) => {
      const targetQuery = query[key];
      const isArray = targetQuery instanceof Array;
      if (typeof targetQuery === 'undefined' || (isArray && targetQuery.length === 0)) {
        return [key, ''];
      }
      if (targetQuery instanceof Array) {
        return [key, targetQuery[0]];
      }
      return [key, targetQuery];
    }),
  );
};
