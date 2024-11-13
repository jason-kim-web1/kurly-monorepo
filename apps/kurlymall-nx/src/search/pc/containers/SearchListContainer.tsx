import styled from '@emotion/styled';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { eq, get, includes } from 'lodash';

import useSearchProductList from '../../hooks/useSearchProductList';
import SearchList from '../../components/pc/SearchList';
import { ListPageSkeleton } from '../../../product/list/pc/components/ListPageSkeleton';
import SearchListError from '../../components/pc/SearchListError';
import { setQueryId } from '../../../product/list/slice';
import { useSearchData } from '../../contexts/SearchDataProvider';
import { DEFAULT_SORT_TYPE, KEYWORD_CONVERT_INFO_TYPE, SEARCH_RESULT_SELECTION_TYPE } from '../../shared/constants';
import { isNotEmpty, ne } from '../../../shared/utils/lodash-extends';
import { sendSearchResultAmplitude } from '../../shared/utils/sendSearchResultAmplitude';
import { useAppSelector } from '../../../shared/store';
import { usePreviousRoutePath } from '../../../shared/context/PreviousRoutePathContext';
import { sendSearchRefreshAmplitude } from '../../shared/utils/sendSearchRefreshAmplitude';
import type { NormalizedFilterGroup } from '../../shared/types';
import { checkModifiedFilter } from '../../shared/utils/checkModifiedFilter';
import { checkModifiedSortType } from '../../shared/utils/checkModifiedSortType';
import { useSearchPixel } from '../../hooks/useSearchPixel';

const Container = styled.main`
  width: 1050px;
  margin: 0 auto;
`;

export default function SearchListContainer() {
  const dispatch = useDispatch();
  const { asPath } = useRouter();
  const { searchKeyword, filters, sortedType } = useSearchData();
  const { previousRoutePath } = usePreviousRoutePath();
  const {
    data: searchData,
    status: searchStatus,
    isFetching,
    isPreviousData,
    totalProductsCount,
    availableSortType,
    queryId,
    actualKeyword,
    listSections,
    topSections,
    filterSection,
    isSuccess,
    isLoading,
    isError,
    isFetchedAfterMount,
    sortSection,
    displayMessageType,
    isRefetching,
  } = useSearchProductList({
    keyword: searchKeyword,
    defaultSortType: DEFAULT_SORT_TYPE,
  });
  const [previousFilter, setPreviousFilter] = useState<{
    initialKeyword: string | null;
    convertedKeyword: string | null;
    filters: NormalizedFilterGroup[];
  }>({
    initialKeyword: null,
    convertedKeyword: null,
    filters: [],
  });
  const filtersRef = useRef(filters);
  const sortedTypeRef = useRef(sortedType);
  const isExternalSourceRef = useRef(previousRoutePath === null);
  const beforeRefetchUrlRef = useRef<string | null>(null);
  const refetchStatus = useRef<'unset' | 'start' | 'finish'>('unset');
  const storedQueryId = useAppSelector(({ productList }) => productList.queryId);
  const hasConvertedKeyword = includes(KEYWORD_CONVERT_INFO_TYPE, displayMessageType);
  const isSorted = ne(sortedType, DEFAULT_SORT_TYPE);
  const isFiltered = isNotEmpty(filters);
  const amplitudeSelectionType = isExternalSourceRef.current
    ? SEARCH_RESULT_SELECTION_TYPE.OUT_LINK
    : SEARCH_RESULT_SELECTION_TYPE.KEYWORD;
  const initRefs = useCallback(() => {
    filtersRef.current = filters;
    sortedTypeRef.current = sortedType;
    isExternalSourceRef.current = previousRoutePath === null;
  }, [filters, previousRoutePath, sortedType]);
  const { initialKeyword, convertedKeyword } = previousFilter;
  const isPreviousKeyword = eq(initialKeyword, searchKeyword) && eq(convertedKeyword, actualKeyword);
  useSearchPixel({ listSections, isFetching, isPreviousKeyword, searchKeyword });

  useEffect(() => {
    if (!isPreviousKeyword) {
      initRefs();
    }
  }, [initRefs, isPreviousKeyword]);

  useEffect(() => {
    if (isFetching) {
      return;
    }
    if (ne(initialKeyword, searchKeyword)) {
      dispatch(setQueryId(queryId));
    }
  }, [dispatch, initialKeyword, isFetching, queryId, searchKeyword]);

  useEffect(() => {
    if (isFetching || isPreviousData || isPreviousKeyword) {
      return;
    }
    const filterData = get(filterSection, 'data.items');
    setPreviousFilter({
      initialKeyword: searchKeyword,
      convertedKeyword: actualKeyword,
      filters: filterData ?? [],
    });
  }, [actualKeyword, filterSection, isFetching, isPreviousData, isPreviousKeyword, searchKeyword]);

  useEffect(() => {
    if (isFetching || !isFetchedAfterMount) {
      return;
    }

    if (!isPreviousKeyword) {
      sendSearchResultAmplitude({
        queryId: eq(initialKeyword, searchKeyword) ? storedQueryId : queryId,
        keyword: searchKeyword,
        totalCount: totalProductsCount,
        selectionType: amplitudeSelectionType,
        fallback: false,
        filter: isFiltered,
        sort: isSorted,
        ...(displayMessageType && { keywordConvertType: displayMessageType }),
        ...(hasConvertedKeyword && {
          convertedKeyword: actualKeyword,
        }),
      });
    }
  }, [
    actualKeyword,
    amplitudeSelectionType,
    displayMessageType,
    hasConvertedKeyword,
    initialKeyword,
    isFetchedAfterMount,
    isFetching,
    isFiltered,
    isPreviousKeyword,
    isSorted,
    queryId,
    searchKeyword,
    storedQueryId,
    totalProductsCount,
  ]);

  useEffect(() => {
    if (
      !checkModifiedFilter({
        isPreviousKeyword,
        currentFilter: filtersRef.current,
        urlFilters: filters,
        isFetchedAfterMount,
      })
    ) {
      return;
    }

    sendSearchResultAmplitude({
      queryId: storedQueryId,
      keyword: searchKeyword,
      totalCount: totalProductsCount,
      selectionType: amplitudeSelectionType,
      fallback: false,
      filter: true,
      sort: false,
      ...(displayMessageType && { keywordConvertType: displayMessageType }),
      ...(hasConvertedKeyword && {
        convertedKeyword: actualKeyword,
      }),
    });
    filtersRef.current = filters;
  }, [
    actualKeyword,
    amplitudeSelectionType,
    displayMessageType,
    filters,
    hasConvertedKeyword,
    isFetchedAfterMount,
    isPreviousKeyword,
    searchKeyword,
    storedQueryId,
    totalProductsCount,
  ]);

  useEffect(() => {
    if (
      !checkModifiedSortType({
        isPreviousKeyword,
        currentSortType: sortedTypeRef.current,
        sortedType,
        isFetchedAfterMount,
      })
    ) {
      return;
    }

    sendSearchResultAmplitude({
      queryId: storedQueryId,
      keyword: searchKeyword,
      totalCount: totalProductsCount,
      selectionType: amplitudeSelectionType,
      fallback: false,
      filter: false,
      sort: true,
      ...(displayMessageType && { keywordConvertType: displayMessageType }),
      ...(hasConvertedKeyword && {
        convertedKeyword: actualKeyword,
      }),
    });
    sortedTypeRef.current = sortedType;
  }, [
    actualKeyword,
    amplitudeSelectionType,
    displayMessageType,
    hasConvertedKeyword,
    isFetchedAfterMount,
    isPreviousKeyword,
    searchKeyword,
    sortedType,
    storedQueryId,
    totalProductsCount,
  ]);

  useEffect(() => {
    if (isRefetching) {
      refetchStatus.current = 'start';
      return;
    }

    if (refetchStatus.current === 'start') {
      refetchStatus.current = 'finish';
    }
  }, [isRefetching]);

  useEffect(() => {
    if (beforeRefetchUrlRef.current === asPath && refetchStatus.current === 'start') {
      sendSearchRefreshAmplitude({
        refreshType: 'dev_refresh',
        queryId: storedQueryId,
        keyword: searchKeyword,
      });
    }

    beforeRefetchUrlRef.current = asPath;
  }, [asPath, searchKeyword, storedQueryId, isRefetching]);

  return (
    <Container id="container">
      {isLoading ? <ListPageSkeleton pageType="search" /> : null}
      {isSuccess ? (
        <SearchList
          searchData={searchData}
          fetchStatus={searchStatus}
          isFetchingProducts={isFetching}
          filterData={previousFilter.filters}
          listSections={listSections}
          topSections={topSections}
          sortSection={sortSection}
          totalProductsCount={totalProductsCount}
          availableSortType={availableSortType}
          hasConvertedKeyword={hasConvertedKeyword}
        />
      ) : null}
      {isError ? <SearchListError /> : null}
    </Container>
  );
}
