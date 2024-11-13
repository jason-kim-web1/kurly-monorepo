import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { get, eq, head, chain, isEmpty } from 'lodash';

import { useAppSelector } from '../../shared/store';
import { parseQueryString } from '../../shared/utils/parseQueryString';
import { getNormalSearchResult, NormalSearchResultViewModel } from '../service/search.service';
import { productsQueryKey } from '../queries';
import { createFilterData } from '../shared/utils/createFilterData';
import {
  FilterSectionViewModel,
  isFilterSectionViewModel,
  isKeywordConvertInfoSection,
  isSortSectionViewModel,
  KeywordConvertInfoSectionViewModel,
  SortSectionViewModel,
  UnSpecifiedSectionList,
} from '../features/Section/factory';

const getSortSections = (data?: NormalSearchResultViewModel): SortSectionViewModel[] =>
  chain(data).get('sortSections', []).filter(isSortSectionViewModel).value();

const getFilterSections = (data?: NormalSearchResultViewModel): FilterSectionViewModel[] =>
  chain(data).get('filterSections', []).filter(isFilterSectionViewModel).value();

const getKeywordConvertInfoSection = (
  topSections: UnSpecifiedSectionList | undefined,
  totalProductCount: number,
): KeywordConvertInfoSectionViewModel | null => {
  if (!topSections || isEmpty(topSections) || !totalProductCount || eq(totalProductCount, 0)) {
    return null;
  }
  const targetSection = chain(topSections)
    .filter(isKeywordConvertInfoSection)
    .head()
    .value() as KeywordConvertInfoSectionViewModel;
  if (!targetSection) {
    return null;
  }
  return targetSection;
};

interface Params {
  keyword: string;
  defaultSortType?: string;
}

export default function useSearchProductList({ keyword, defaultSortType = '' }: Params) {
  const site = useAppSelector(({ main }) => main.site);
  const isGuest = useAppSelector(({ auth }) => auth.isGuest);
  const isLoggedIn = !isGuest;
  const { query } = useRouter();
  const {
    filters = '',
    page: currentPage = '1',
    sorted_type: sortedType = defaultSortType,
    qvt,
  } = parseQueryString(query);
  const queryResult = useQuery(
    productsQueryKey.paginatedProductList(
      'search',
      keyword,
      isLoggedIn,
      Number(currentPage),
      sortedType,
      filters,
      site,
      qvt,
    ),
    () =>
      getNormalSearchResult({
        siteMain: site,
        keyword,
        currentPage: Number(currentPage),
        selectedSortType: sortedType,
        filters,
        qvt,
      }),
    {
      staleTime: 1 * 60 * 1000,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    },
  );

  const { data } = queryResult;
  const topSections = get(data, 'topSections');
  const listSections = get(data, 'listSections');
  const filterSections = getFilterSections(data);
  const filterSection = head(filterSections);
  const sortSections = getSortSections(data);
  const sortSection = head(sortSections);
  const totalProductsCount = get(data, 'meta.pagination.total', 0);
  const keywordConvertInfoSection = getKeywordConvertInfoSection(topSections, totalProductsCount);
  const displayMessageType = get(keywordConvertInfoSection, 'data.type');
  const normalizedFilterSection = {
    ...filterSection,
    data: {
      ...filterSection?.data,
      items: filterSection?.data.items.map((filterGroup) => createFilterData(filterGroup)),
    },
  };
  const sortItems = sortSection?.data.items;
  const availableSortType = head(sortItems)?.type ?? defaultSortType;
  const meta = get(data, 'meta');
  const queryId = get(meta, 'queryId', '');
  const actualKeyword = get(meta, 'actualKeyword', keyword);

  return {
    ...queryResult,
    totalProductsCount,
    availableSortType,
    queryId,
    actualKeyword,
    topSections,
    listSections,
    filterSection: normalizedFilterSection,
    sortSection,
    displayMessageType,
  };
}
