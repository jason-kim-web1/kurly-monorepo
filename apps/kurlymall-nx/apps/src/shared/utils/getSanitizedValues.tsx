import { chain, eq, isUndefined, keys } from 'lodash';

import type { MainSite } from '../../main/interfaces/MainSection.interface';
import { MAIN_SITE } from '../../main/constants';

export interface GetSanitizedValues<T> {
  value?: string;
  defaultValue: T;
  fn: (value: string, defaultValue: T) => T;
}

export const getSanitizedValue = <T,>({ value, defaultValue, fn }: GetSanitizedValues<T>) => {
  if (isUndefined(value)) {
    return defaultValue;
  }

  return fn(value, defaultValue) as T;
};

export const getSanitizedMainSite = (site: string, defaultValue: MainSite): MainSite => {
  const upperCaseSite = site.toUpperCase();

  const validMainSiteValue = chain(keys(MAIN_SITE))
    .map((ruleSite) => eq(ruleSite, upperCaseSite))
    .some(Boolean)
    .value();

  if (validMainSiteValue) {
    return upperCaseSite as MainSite;
  }

  return defaultValue;
};

export const getSanitizedBooleanValue = (value: string, defaultValue: boolean) => {
  const lowerCaseValue = value.toLowerCase();

  if (eq(lowerCaseValue, 'true')) {
    return true;
  }

  if (eq(lowerCaseValue, 'false')) {
    return false;
  }

  return defaultValue;
};

export const getSanitizedNumberValue = (value: string, defaultValue: number) => {
  const parsedValueWithNumber = value === '' ? defaultValue : Number(value);

  if (isNaN(parsedValueWithNumber)) {
    return defaultValue;
  }

  return parsedValueWithNumber;
};
