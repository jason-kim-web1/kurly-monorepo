import { addComma } from '../services';

export const equalsIgnoreCase = (a: string, b: string): boolean => {
  return a.toLowerCase() === b.toLowerCase();
};

export const compareCountWithLimit = (count: number, limit: number) => {
  if (limit >= count) {
    return `${addComma(count)}`;
  }
  return `${addComma(limit)}+`;
};
