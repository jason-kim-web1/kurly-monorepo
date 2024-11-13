import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useRouter } from 'next/router';

import { isUndefined } from 'lodash';

import type { MainSite } from '../../main/interfaces/MainSection.interface';
import { MAIN_SITE } from '../../main/constants';
import { parseFilterData, UrlBasedFilter } from '../../product/list/shared/util/parseFilterData';
import { computeQueryValue } from '../../shared/utils/computeQueryValue';
import {
  getSanitizedBooleanValue,
  getSanitizedMainSite,
  getSanitizedNumberValue,
  getSanitizedValue,
} from '../../shared/utils/getSanitizedValues';
import { getDefaultPerPage } from '../../product/list/shared/util/getDefaultPerPage';
import { DEFAULT_SORT_TYPE } from '../shared/constants';

interface State {
  site: MainSite;
  searchKeyword: string;
  filters: UrlBasedFilter;
  page: number;
  perPage: number;
  sortedType: string;
  beautyOnly?: boolean;
  fallback?: boolean;
}

const defaultPerPage = getDefaultPerPage('search');

const initialState: State = {
  site: MAIN_SITE.MARKET,
  searchKeyword: '',
  filters: {},
  page: 1,
  perPage: defaultPerPage,
  sortedType: DEFAULT_SORT_TYPE,
  beautyOnly: false,
  fallback: false,
};

const SearchDataContext = createContext(initialState);

export const SearchDataProvider = ({ children }: { children: ReactNode }) => {
  const { query } = useRouter();
  const getTargetQuery = computeQueryValue(query);
  const siteQuery = getTargetQuery('site', MAIN_SITE.MARKET) as MainSite;
  const swordQuery = getTargetQuery('sword', '') as string;
  const filtersQuery = getTargetQuery('filters', '') as string;
  const pageQuery = getTargetQuery('page', '1');
  const perPageQuery = getTargetQuery('per_page', String(defaultPerPage));
  const sortedTypeQuery = getTargetQuery('sorted_type', DEFAULT_SORT_TYPE) as string;
  const beautyOnlyQuery = getTargetQuery('beauty_only');
  const fallbackQuery = getTargetQuery('fallback');

  const value = useMemo(
    () => ({
      site: getSanitizedValue<MainSite>({
        value: siteQuery,
        defaultValue: MAIN_SITE.MARKET,
        fn: getSanitizedMainSite,
      }),
      searchKeyword: swordQuery,
      filters: parseFilterData(filtersQuery),
      page: getSanitizedValue<number>({
        value: pageQuery,
        defaultValue: 1,
        fn: getSanitizedNumberValue,
      }),
      perPage: getSanitizedValue<number>({
        value: perPageQuery,
        defaultValue: defaultPerPage,
        fn: getSanitizedNumberValue,
      }),
      sortedType: sortedTypeQuery,
      beautyOnly: isUndefined(beautyOnlyQuery)
        ? beautyOnlyQuery
        : getSanitizedValue<boolean>({
            value: beautyOnlyQuery,
            defaultValue: false,
            fn: getSanitizedBooleanValue,
          }),
      fallback: isUndefined(fallbackQuery)
        ? fallbackQuery
        : getSanitizedValue<boolean>({
            value: fallbackQuery,
            defaultValue: false,
            fn: getSanitizedBooleanValue,
          }),
    }),
    [query],
  );

  return <SearchDataContext.Provider value={value}>{children}</SearchDataContext.Provider>;
};

export const useSearchData = () => {
  return useContext(SearchDataContext);
};
