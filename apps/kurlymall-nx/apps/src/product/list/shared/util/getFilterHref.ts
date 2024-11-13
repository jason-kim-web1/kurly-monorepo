import { cloneDeep } from 'lodash';

import { ParsedUrlQuery } from 'querystring';

import { getReplaceUrl } from '../../../../../util/window/getDevice';

import { createFilterQueryString } from './createFilterQueryString';
import type { UrlBasedFilter } from './parseFilterData';
import type { FilterTemplate } from '../../types';
import { FILTER_TEMPLATE } from '../../types';

interface Props {
  activeFilter: UrlBasedFilter;
  filterGroupKey: string;
  template: FilterTemplate;
  filterKey: string;
  isActive: boolean;
  query: ParsedUrlQuery;
  pathname: string;
}

export const getFilterHref = ({
  activeFilter,
  filterGroupKey,
  template,
  filterKey,
  isActive,
  query,
  pathname,
}: Props) => {
  const nextActiveFilter = cloneDeep(activeFilter);
  if (isActive) {
    const filterQuery = nextActiveFilter[filterGroupKey].filter((filterValue) => filterValue !== filterKey);
    nextActiveFilter[filterGroupKey] = filterQuery;
  } else {
    const filterQuery =
      template === FILTER_TEMPLATE.RADIO_BUTTON
        ? [filterKey]
        : [...(nextActiveFilter[filterGroupKey] || []), filterKey];
    nextActiveFilter[filterGroupKey] = filterQuery;
  }

  return {
    pathname: getReplaceUrl(pathname),
    query: {
      ...query,
      page: 1,
      filters: createFilterQueryString(nextActiveFilter),
    },
  };
};
