import { isString, toString } from 'lodash';

export const toLowerCase = (v?: any): string => {
  if (isString(v)) {
    return v.toLowerCase();
  }
  return toString(v).toLowerCase();
};
