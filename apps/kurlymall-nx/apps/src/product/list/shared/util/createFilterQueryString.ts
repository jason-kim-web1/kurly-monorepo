interface Props {
  [key: string]: string[];
}

export const createFilterQueryString = (nextActiveFilter: Props) => {
  return Object.entries(nextActiveFilter)
    .filter(([, values]) => values.length > 0)
    .map(([key, values]) => `${key}:${[...values].sort().join(',')}`)
    .join('|');
};
