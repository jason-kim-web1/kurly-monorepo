import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { chain, eq, get, head, last } from 'lodash';

import { getNormalSearchResult, NormalSearchResultViewModel } from '../service/search.service';
import type { MainSite } from '../../main/interfaces/MainSection.interface';
import { useAppSelector } from '../../shared/store';
import { parseQueryString } from '../../shared/utils/parseQueryString';
import { productsQueryKey } from '../queries';
import { isNotNull, ne } from '../../shared/utils/lodash-extends';
import { createFilterData } from '../shared/utils/createFilterData';
import { isDefined } from '../../shared/utils/typeGuard';
import {
  FilterSectionViewModel,
  isFilterSectionViewModel,
  isKeywordConvertInfoSectionViewModel,
  isSortSectionViewModel,
  SortSectionViewModel,
} from '../features/Section/factory';

const getListSections = (searchResult: NormalSearchResultViewModel): NormalSearchResultViewModel['listSections'] =>
  get(searchResult, 'listSections', []);

const getTopSections = (searchResult: NormalSearchResultViewModel): NormalSearchResultViewModel['topSections'] =>
  get(searchResult, 'topSections', []);

const getFilterSections = (searchResult: NormalSearchResultViewModel): NormalSearchResultViewModel['filterSections'] =>
  get(searchResult, 'filterSections', []);

const getSortSections = (searchResult: NormalSearchResultViewModel): NormalSearchResultViewModel['sortSections'] =>
  get(searchResult, 'sortSections', []);

const getActualSite = (data?: InfiniteData<NormalSearchResultViewModel>) => {
  return get(head(get(data, 'pages')), 'meta.actualSite');
};

const getTotalCount = (data?: InfiniteData<NormalSearchResultViewModel>): number => {
  const pages = get(data, 'pages');
  const lastPage = last(pages);
  return get(lastPage, 'meta.pagination.total', 0);
};

const flatListSections = (pages?: NormalSearchResultViewModel[]) =>
  chain(pages).map(getListSections).flatten().filter(isNotNull).filter(isDefined).value();

const flatTopSections = (pages?: NormalSearchResultViewModel[]) =>
  chain(pages).map(getTopSections).flatten().filter(isNotNull).filter(isDefined).value();

const flatSortSections = (pages?: NormalSearchResultViewModel[]): SortSectionViewModel[] =>
  chain(pages)
    .map(getSortSections)
    .flatten()
    .filter(isSortSectionViewModel)
    .filter(isNotNull)
    .filter(isDefined)
    .value();

const flatFilterSections = (pages?: NormalSearchResultViewModel[]): FilterSectionViewModel[] =>
  chain(pages)
    .map(getFilterSections)
    .flatten()
    .filter(isFilterSectionViewModel)
    .filter(isNotNull)
    .filter(isDefined)
    .value();

interface Params {
  keyword: string;
  defaultSortType: string;
  currentSite?: MainSite;
  enabledCondition?: boolean;
}

export default function useInfiniteSearchData({
  keyword,
  defaultSortType,
  currentSite,
  enabledCondition = true,
}: Params) {
  const site = useAppSelector(({ main }) => main.site);
  const isGuest = useAppSelector(({ auth }) => auth.isGuest);
  const isLoggedIn = !isGuest;
  const siteValue = !!currentSite ? currentSite : site;
  const { query } = useRouter();
  const queryClient = useQueryClient();
  const { filters = '', sorted_type: sortedType = defaultSortType, qvt } = parseQueryString(query);
  const params = {
    keyword,
    selectedSortType: sortedType,
    filters,
    siteMain: siteValue,
    qvt,
  };

  const queryResult = useInfiniteQuery<NormalSearchResultViewModel>(
    productsQueryKey.infiniteProductList('search', keyword, isLoggedIn, sortedType, filters, siteValue, qvt),
    ({ pageParam = 1 }) =>
      getNormalSearchResult({
        currentPage: pageParam,
        ...params,
      }),
    {
      staleTime: 1 * 60 * 1000,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
      enabled: enabledCondition,
      getPreviousPageParam: (firstPage) => {
        const { currentPage } = firstPage.meta.pagination;
        return currentPage > 0 ? currentPage : undefined;
      },
      getNextPageParam: (lastPage) => {
        const { currentPage, totalPages } = lastPage.meta.pagination;
        return currentPage + 1 <= totalPages ? currentPage + 1 : undefined;
      },
      onSuccess: (data) => {
        const actualSite = getActualSite(data);
        if (ne(actualSite?.toUpperCase(), siteValue)) {
          queryClient.setQueryData(
            productsQueryKey.infiniteProductList(
              'search',
              keyword,
              isLoggedIn,
              sortedType,
              filters,
              actualSite?.toUpperCase(),
              qvt,
            ),
            data,
          );
        }
      },
    },
  );
  const { data } = queryResult;
  const pages = get(data, 'pages', []);
  const topSections = flatTopSections(pages);
  const listSections = flatListSections(pages);
  const filterSections = flatFilterSections(pages);
  const filterSection = head(filterSections);
  const sortSections = flatSortSections(pages);
  const sortSection = head(sortSections);
  const actualSite = getActualSite(data);
  const totalProductsCount = getTotalCount(data);
  const keywordConvertInfo = chain(topSections).filter(isKeywordConvertInfoSectionViewModel).head().value();
  const displayMessageType = get(keywordConvertInfo, 'data.type');
  const firstPageData = get(data, 'pages[0].meta');
  const queryId = get(firstPageData, 'queryId', '');
  const actualKeyword = get(firstPageData, 'actualKeyword', keyword);
  const normalizedFilterSection = {
    ...filterSection,
    data: {
      ...filterSection?.data,
      items: filterSection?.data.items.map((filterSectionItem) => createFilterData(filterSectionItem)),
    },
  };
  const googleResultVersion = chain(listSections)
    .filter((section) => eq(section.view.sectionCode, 'GOOGLE_RESULT'))
    .map((section) => section.view.version)
    .head()
    .value();

  return {
    ...queryResult,
    actualSite,
    totalProductsCount,
    queryId,
    actualKeyword,
    displayMessageType,
    filterSection: normalizedFilterSection,
    sortSection,
    topSections,
    listSections,
    googleResultVersion,
  };
}
