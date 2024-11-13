export interface UrlBasedFilter {
  [key: string]: string[];
}

export const parseFilterData = (filterStr: string): UrlBasedFilter => {
  return filterStr.split('|').reduce((acc: { [key: string]: string[] }, filterQuery) => {
    const [key, valueStr] = filterQuery.split(':');

    if (!key) {
      return acc;
    }

    if (!valueStr) {
      return { ...acc, [key]: [''] };
    }

    return { ...acc, [key]: valueStr.split(',') };
  }, {});
};
