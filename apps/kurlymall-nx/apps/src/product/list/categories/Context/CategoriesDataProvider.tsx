import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useMemo } from 'react';

import { computeQueryValue } from '../../../../shared/utils/computeQueryValue';
import { getSanitizedMainSite, getSanitizedValue } from '../../../../shared/utils/getSanitizedValues';

import { parseFilterData } from '../../shared/util/parseFilterData';

import type { MainSite } from '../../../../main/interfaces/MainSection.interface';
import type { UrlBasedFilter } from '../../shared/util/parseFilterData';
import { MAIN_SITE } from '../../../../main/constants';

interface InitialState {
  site: MainSite;
  categoryNo: string;
  filters: UrlBasedFilter;
}

const initialState: InitialState = {
  site: MAIN_SITE.MARKET,
  categoryNo: '',
  filters: {},
};

const CategoriesDataContext = createContext(initialState);

interface Props {
  children: ReactNode;
}

export const CategoriesDataProvider = ({ children }: Props) => {
  const { query } = useRouter();
  const getTargetQuery = computeQueryValue(query);

  const siteQuery = getTargetQuery('site', MAIN_SITE.MARKET) as MainSite;
  const categoryNoQuery = getTargetQuery('categoryNo', '') as string;
  const filtersQuery = getTargetQuery('filters', '') as string;

  const value = useMemo(
    () => ({
      site: getSanitizedValue<MainSite>({
        value: siteQuery,
        defaultValue: MAIN_SITE.MARKET,
        fn: getSanitizedMainSite,
      }),
      categoryNo: categoryNoQuery,
      filters: parseFilterData(filtersQuery),
    }),
    [categoryNoQuery, filtersQuery, siteQuery],
  );

  return <CategoriesDataContext.Provider value={value}>{children}</CategoriesDataContext.Provider>;
};

export const useCategoriesPageQueries = () => {
  const value = useContext(CategoriesDataContext);

  return value;
};
