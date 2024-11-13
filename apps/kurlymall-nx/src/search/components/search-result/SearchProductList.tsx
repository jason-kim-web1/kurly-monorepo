import styled from '@emotion/styled';
import { cloneDeep, head, isEmpty, isEqual, isUndefined, eq, gt, get, includes } from 'lodash';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setQueryId } from '../../../product/list/slice';
import { useAppSelector } from '../../../shared/store';
import COLOR from '../../../shared/constant/colorset';
import { zIndex } from '../../../shared/styles';
import { CheckBoxActive, CheckBoxInactive, CommonIconInfo, Reset } from '../../../shared/icons';
import { FILTER_TEMPLATE, FilterGroup, PageType } from '../../../product/list/types';
import { ActiveFilter } from '../../../product/list/m/containers/ProductList';
import Loading from '../../../shared/components/Loading/Loading';
import QuickFilter from '../../../product/list/m/components/QuickFilter';
import ActiveFilterValueContainer from '../../../product/list/m/containers/ActiveFilterValueContainer';
import { amplitudeService, ScreenName } from '../../../shared/amplitude';
import { SelectCategorySort } from '../../../shared/amplitude/events';
import Alert from '../../../shared/components/Alert/Alert';
import { SelectBeautyOnly } from '../../../shared/amplitude/events/SelectBeautyOnly';
import getValidatedFiltersAndUrlFilters from '../../../product/list/shared/util/getValidatedFiltersAndUrlFilters';
import { isDefined, isNotEmpty, ne } from '../../../shared/utils/lodash-extends';
import { ParsedUrlQuery } from 'querystring';
import { useSearchData } from '../../contexts/SearchDataProvider';
import { MAIN_SITE } from '../../../main/constants';
import { redirectTo } from '../../../shared/reducers/page';
import { DEFAULT_SORT_TYPE, KEYWORD_CONVERT_INFO_TYPE, SEARCH_RESULT_SELECTION_TYPE } from '../../shared/constants';
import { sendSearchResultAmplitude } from '../../shared/utils/sendSearchResultAmplitude';
import { sendSearchRefreshAmplitude } from '../../shared/utils/sendSearchRefreshAmplitude';
import useInfiniteSearchData from '../../hooks/useInfiniteSearchData';
import SlideModal from '../../../shared/components/modal/SlideModal';
import FilterContainer from '../../../product/list/m/containers/FilterContainer';
import SearchSortBarContainer from '../sort/SearchSortBarContainer';
import EmptyContainer from '../../../product/list/m/containers/EmptyContainer';
import { checkModifiedFilter } from '../../shared/utils/checkModifiedFilter';
import { checkModifiedSortType } from '../../shared/utils/checkModifiedSortType';
import { fusionSignalsService } from '../../../shared/fusion-signals/FusionSignalsService';
import { ignoreError } from '../../../shared/utils/general';
import { FUSION_SIGNALS_EVENT } from '../../../shared/fusion-signals/fusionSignalsType';
import { getSortTypeName } from '../../shared/utils/getSortTypeName';
import { MainSite } from '../../../main/interfaces/MainSection.interface';
import { SectionList } from '../../features/Section/components/SectionList';
import { LogSearchContextProvider } from '../../contexts/LogSearchContext';
import PullToRefreshNew from '../../../shared/components/PullToRefresh/m/PullToRefreshNew';
import { parseFilterData } from '../../../product/list/shared/util/parseFilterData';
import { createFilterQueryString } from '../../../product/list/shared/util/createFilterQueryString';
import { useSearchPixel } from '../../hooks/useSearchPixel';

const ProductsWrapper = styled.div`
  width: 100%;
`;

const LoadingWrapper = styled.div`
  position: fixed;
  z-index: ${zIndex.productMaximum};
  bottom: 44px;
  width: 100%;
  height: 100%;
  background-color: ${COLOR.kurlyWhite};
  opacity: 0.4;
`;

const SelectedFilterWrapper = styled.div`
  display: flex;
`;

const QuickResetContainer = styled.div`
  display: flex;
`;

const ResetIcon = styled.div`
  height: 20px;
  padding-right: 7px;
  border-left: 1px solid ${COLOR.kurlyGray200};
`;

const SvgReset = styled(Reset)`
  vertical-align: middle;
  margin: 0 16px 0 12px;
`;

const LoadingRef = styled.div`
  height: 1px;
`;

const EmptyWrapper = styled.div`
  width: 100%;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  margin-bottom: 16px;
  gap: 8px;
`;

const CheckBoxText = styled.div<{ isBeautyOnlyResult: boolean }>`
  display: flex;
  align-items: center;
  font-weight: ${({ isBeautyOnlyResult }) => (isBeautyOnlyResult ? 600 : 400)};
  line-height: 20px;
  color: ${COLOR.kurlyGray800};
`;

const FallbackWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 16px;
  margin-bottom: 14px;

  @supports (gap: 5px) {
    gap: 5px;
  }
`;

const FallbackText = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray450};

  @supports not (gap: 5px) {
    margin-left: 5px;
  }
`;

interface ReplaceRouterQuery {
  replacedPathname: string;
  originalQuery: ParsedUrlQuery;
  nextQuery: ParsedUrlQuery;
}

const section: PageType = 'search';

const getCurrentSite = (site: MainSite, fallbackQuery: boolean | undefined, beautyOnlyQuery: boolean | undefined) => {
  const isMarket = eq(site, MAIN_SITE.MARKET);
  const isBeauty = eq(site, MAIN_SITE.BEAUTY);
  if (isMarket) {
    return MAIN_SITE.MARKET;
  }
  if (isBeauty && fallbackQuery === true) {
    return MAIN_SITE.MARKET;
  }
  if (isBeauty && beautyOnlyQuery === false) {
    return MAIN_SITE.MARKET;
  }
  return MAIN_SITE.BEAUTY;
};

export default function SearchProductList() {
  const router = useRouter();
  const { query, pathname, asPath, replace } = router;
  const dispatch = useDispatch();
  const {
    site,
    searchKeyword: keyword,
    filters: urlFilters,
    sortedType,
    fallback: fallbackQuery,
    beautyOnly: beautyOnlyQuery,
  } = useSearchData();
  const isFiltered = isNotEmpty(urlFilters);
  const isExistFallbackQuery = isDefined(fallbackQuery);
  const replaceRouterQuery = useCallback(
    ({ replacedPathname, originalQuery, nextQuery }: ReplaceRouterQuery) => {
      dispatch(
        redirectTo({
          url: replacedPathname,
          query: { ...originalQuery, ...nextQuery },
          replace: true,
        }),
      );
    },
    [dispatch],
  );
  const currentSite = getCurrentSite(site, fallbackQuery, beautyOnlyQuery);
  const {
    data: searchData,
    isSuccess: productListSuccess,
    isLoading: productListLoading,
    isError: productListError,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isPreviousData,
    refetch,
    isRefetching,
    queryId,
    actualKeyword,
    actualSite,
    isFetchedAfterMount,
    totalProductsCount,
    displayMessageType,
    filterSection,
    sortSection,
    topSections,
    listSections,
    googleResultVersion,
  } = useInfiniteSearchData({
    keyword,
    defaultSortType: DEFAULT_SORT_TYPE,
    currentSite,
  });
  const firstPage = head(searchData?.pages);
  const hasConvertedKeyword = includes(KEYWORD_CONVERT_INFO_TYPE, displayMessageType);
  const isBeautyOnlyResult = beautyOnlyQuery === true || (isUndefined(beautyOnlyQuery) && site === MAIN_SITE.BEAUTY);
  const filtersRef = useRef(urlFilters);
  const sortedTypeRef = useRef(sortedType);
  const prevIsBeautyOnlyResult = useRef(isBeautyOnlyResult);
  const refetchStatus = useRef<'unset' | 'start' | 'finish'>('unset');
  const pullToRefreshStatus = useRef<'unset' | 'start' | 'refetching' | 'finish'>('unset');
  const beforeRefetchUrlRef = useRef<string | null>(null);
  const sortOptions = sortSection?.data.items;
  const [activeFilter, setActiveFilter] = useState(cloneDeep(urlFilters));
  const [isSorting, setIsSorting] = useState(false);
  const firstSortType = get(head(sortOptions), 'type');
  const defaultSortType = firstSortType ? firstSortType : DEFAULT_SORT_TYPE;
  const defaultSortTypeName = getSortTypeName(sortOptions, defaultSortType);
  const selectedSortTypeName = getSortTypeName(sortOptions, sortedType);
  const storedQueryId = useAppSelector(({ productList }) => productList.queryId);
  const searchSelectionType =
    useAppSelector(({ productList }) => productList.searchSelectionType) || SEARCH_RESULT_SELECTION_TYPE.OUT_LINK;
  const [previousFilter, setPreviousFilter] = useState<{
    initialKeyword: string | null;
    convertedKeyword: string | null;
    filters: FilterGroup[] | undefined;
  }>({
    initialKeyword: null,
    convertedKeyword: null,
    filters: [],
  });
  const { initialKeyword, convertedKeyword } = previousFilter;
  const isPreviousKeyword = eq(initialKeyword, keyword) && eq(convertedKeyword, actualKeyword);
  const initRefs = useCallback(() => {
    filtersRef.current = urlFilters;
    sortedTypeRef.current = sortedType;
  }, [urlFilters, sortedType]);
  const firstPageFilterData = filterSection?.data?.items;
  const firstKeyOfQuickFilter = firstPageFilterData?.find((filterGroup) => filterGroup.isQuick)?.key ?? '';
  const { ref, inView } = useInView();
  const [loadingSpinnerVisible, setLoadingSpinnerVisible] = useState(false);
  const [selectedFilterKey, setSelectedFilterKey] = useState(firstKeyOfQuickFilter);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const isQuickFilterVisible = useMemo(() => {
    const total = firstPage?.meta.pagination.total ?? 0;
    return total > 0 || !isEmpty(urlFilters);
  }, [firstPage?.meta.pagination.total, urlFilters]);
  const hasProducts = totalProductsCount > 0;
  useSearchPixel({ searchKeyword: keyword, listSections, isFetching, isPreviousKeyword });

  const showLoadingSpinner = () => {
    setLoadingSpinnerVisible(true);
    const loadingTime = setTimeout(() => {
      setLoadingSpinnerVisible(false);
      clearTimeout(loadingTime);
    }, 300);
  };

  const getSiteChangedSearchResult = () => {
    if (!isPreviousData) {
      showLoadingSpinner();
    }
    amplitudeService.logEvent(
      new SelectBeautyOnly({
        // amplitude 이벤트 전송 후 url 및 값들이 변경되기 때문에, 해당 속성을 보낼 때의 site 값은 변경되기 이전
        isBeautyOnlyChecked: !isBeautyOnlyResult,
        fusionQueryId: storedQueryId,
      }),
    );
    replaceRouterQuery({
      replacedPathname: pathname,
      originalQuery: query,
      nextQuery: { page: '1', filters: undefined, beauty_only: String(!isBeautyOnlyResult) },
    });
  };

  const handleChangeSortEvent = ({ type, name }: { type: string; name: string }) => {
    amplitudeService.logEvent(
      new SelectCategorySort({
        section,
        queryId: storedQueryId,
        value: {
          type,
          name,
        },
        totalProductsCount,
        paramCode: keyword,
      }),
    );
  };

  const updatedPromotion = (valueKey: string) => {
    const prevFilterData = parseFilterData((query.filters || '') as string);
    const prevPromotions = get(prevFilterData, 'promotion', []);
    const isActivePromotion = includes(prevPromotions, valueKey);
    prevFilterData.promotion = isActivePromotion
      ? prevPromotions.filter((promotion) => promotion !== valueKey)
      : [...prevPromotions, valueKey];
    replace({
      query: {
        ...query,
        filters: createFilterQueryString(prevFilterData),
      },
    });
  };

  const handleQuickFilterModal = (key: string, valueKey?: string) => {
    setSelectedFilterKey(valueKey ? valueKey : key);

    if (valueKey) {
      updatedPromotion(valueKey);
      return;
    }

    setIsFilterModalOpen(() => true);
  };

  const resetFilter = useCallback(() => {
    replaceRouterQuery({
      replacedPathname: pathname,
      originalQuery: query,
      nextQuery: { page: '1', filters: undefined },
    });
  }, [replaceRouterQuery, pathname, query]);

  // TODO: PC 쪽 로직과 같으므로 util 함수로 변경할 예정입니다.
  const handleActiveFilter = useCallback(
    ({ filterGroupKey, template, filterKey, isActive }: ActiveFilter) => {
      const copiedFilter = cloneDeep(activeFilter);
      if (isActive) {
        const filterQuery = copiedFilter[filterGroupKey].filter((filterValue) => filterValue !== filterKey);

        if (!isEmpty(filterQuery)) {
          copiedFilter[filterGroupKey] = filterQuery;
        } else {
          delete copiedFilter[filterGroupKey];
        }
      } else {
        const filterQuery =
          template === FILTER_TEMPLATE.RADIO_BUTTON
            ? [filterKey]
            : [...(copiedFilter[filterGroupKey] || []), filterKey];

        if (!isEmpty(filterQuery)) {
          copiedFilter[filterGroupKey] = filterQuery;
        } else {
          delete copiedFilter[filterGroupKey];
        }
      }
      setActiveFilter(() => copiedFilter);
    },
    [activeFilter],
  );

  const syncFilterWithUrl = () => {
    setActiveFilter(urlFilters);
  };

  const toggleModalState = () => {
    syncFilterWithUrl();
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const resetBottomSheetFilter = () => {
    setActiveFilter({});
  };

  const handleRefresh = useCallback(async () => {
    pullToRefreshStatus.current = 'start';
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isExistFallbackQuery || site === MAIN_SITE.MARKET || !actualSite || isPreviousData) {
      return;
    }
    if (!isExistFallbackQuery && site !== actualSite.toUpperCase()) {
      replaceRouterQuery({ replacedPathname: pathname, originalQuery: query, nextQuery: { fallback: 'true' } });
      return;
    }
    replaceRouterQuery({ replacedPathname: pathname, originalQuery: query, nextQuery: { fallback: 'false' } });
  }, [actualSite, isExistFallbackQuery, isPreviousData, pathname, query, replaceRouterQuery, site]);

  useEffect(() => {
    if (!isPreviousKeyword) {
      initRefs();
    }
  }, [initRefs, isPreviousKeyword]);

  useEffect(() => {
    if (isFetching || isPreviousData) {
      return;
    }
    if (!isPreviousKeyword) {
      dispatch(setQueryId(queryId));
    }
  }, [dispatch, isFetching, isPreviousData, isPreviousKeyword, queryId]);

  useEffect(() => {
    if (
      isFetching ||
      (eq(JSON.stringify(firstPageFilterData), JSON.stringify(previousFilter.filters)) && isPreviousKeyword)
    ) {
      return;
    }
    setPreviousFilter({
      initialKeyword: keyword,
      convertedKeyword: actualKeyword,
      // TOFIX: 필터 타입추론되도록 수정 필요
      filters: firstPageFilterData as FilterGroup[],
    });
  }, [actualKeyword, firstPageFilterData, isFetching, isPreviousKeyword, keyword, previousFilter.filters]);

  useEffect(() => {
    const isFallback =
      (totalProductsCount > 0 || isNotEmpty(urlFilters)) && (fallbackQuery || site !== actualSite?.toUpperCase());
    if (isFetching || isPreviousData || !isFetchedAfterMount) {
      return;
    }
    if (!isPreviousKeyword) {
      sendSearchResultAmplitude({
        queryId,
        keyword,
        totalCount: totalProductsCount,
        selectionType: searchSelectionType,
        fallback: isFallback,
        filter: isFiltered,
        sort: isSorting,
        ...(displayMessageType && { keywordConvertType: displayMessageType }),
        ...(hasConvertedKeyword && {
          convertedKeyword: actualKeyword,
        }),
        google_search: googleResultVersion,
      });
    }
  }, [
    actualKeyword,
    actualSite,
    displayMessageType,
    fallbackQuery,
    hasConvertedKeyword,
    isFetchedAfterMount,
    isFetching,
    isFiltered,
    isPreviousData,
    isPreviousKeyword,
    isSorting,
    queryId,
    searchSelectionType,
    site,
    totalProductsCount,
    urlFilters,
    googleResultVersion,
    listSections,
  ]);

  useEffect(() => {
    if (!isFetchedAfterMount) {
      return;
    }
    if (ne(isBeautyOnlyResult, prevIsBeautyOnlyResult.current)) {
      sendSearchResultAmplitude({
        queryId: storedQueryId,
        keyword,
        totalCount: totalProductsCount,
        selectionType: searchSelectionType,
        fallback: false,
        filter: true,
        sort: false,
        ...(displayMessageType && { keywordConvertType: displayMessageType }),
        ...(hasConvertedKeyword && {
          convertedKeyword: actualKeyword,
        }),
      });
      prevIsBeautyOnlyResult.current = isBeautyOnlyResult;
    }
  }, [
    actualKeyword,
    displayMessageType,
    hasConvertedKeyword,
    isBeautyOnlyResult,
    isFetchedAfterMount,
    keyword,
    searchSelectionType,
    storedQueryId,
    totalProductsCount,
  ]);

  useEffect(() => {
    const isFallback = eq(fallbackQuery, true);
    if (ne(isBeautyOnlyResult, prevIsBeautyOnlyResult.current)) {
      filtersRef.current = urlFilters;
      return;
    }
    if (
      !checkModifiedFilter({ isPreviousKeyword, currentFilter: filtersRef.current, urlFilters, isFetchedAfterMount })
    ) {
      return;
    }
    sendSearchResultAmplitude({
      queryId: storedQueryId,
      keyword,
      totalCount: totalProductsCount,
      selectionType: searchSelectionType,
      fallback: isFallback,
      filter: true,
      sort: false,
      ...(displayMessageType && { keywordConvertType: displayMessageType }),
      ...(hasConvertedKeyword && {
        convertedKeyword: actualKeyword,
      }),
    });
    filtersRef.current = urlFilters;
  }, [
    actualKeyword,
    displayMessageType,
    fallbackQuery,
    hasConvertedKeyword,
    isBeautyOnlyResult,
    isFetchedAfterMount,
    isPreviousKeyword,
    keyword,
    searchSelectionType,
    storedQueryId,
    totalProductsCount,
    urlFilters,
  ]);

  useEffect(() => {
    const isFallback = eq(fallbackQuery, true);
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
      keyword,
      totalCount: totalProductsCount,
      selectionType: searchSelectionType,
      fallback: isFallback,
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
    displayMessageType,
    fallbackQuery,
    hasConvertedKeyword,
    isFetchedAfterMount,
    isPreviousKeyword,
    keyword,
    searchSelectionType,
    sortedType,
    storedQueryId,
    totalProductsCount,
  ]);

  useEffect(() => {
    if (isRefetching && !isFetchingNextPage) {
      refetchStatus.current = 'start';
      return;
    }
    if (eq(refetchStatus.current, 'start')) {
      refetchStatus.current = 'finish';
    }
    if (eq(pullToRefreshStatus.current, 'start')) {
      pullToRefreshStatus.current = 'finish';
    }
  }, [isFetchingNextPage, isRefetching, productListLoading]);

  useEffect(() => {
    const refreshType = eq(pullToRefreshStatus.current, 'start') ? 'user_refresh' : 'dev_refresh';
    if (beforeRefetchUrlRef.current === asPath && eq(refetchStatus.current, 'start')) {
      sendSearchRefreshAmplitude({
        refreshType,
        queryId: storedQueryId,
        keyword,
      });
    }
    beforeRefetchUrlRef.current = asPath;
  }, [asPath, keyword, storedQueryId, isRefetching]);

  useEffect(() => {
    amplitudeService.setScreenName(ScreenName.SEARCH_PRODUCT_LIST);
    setActiveFilter(cloneDeep(urlFilters));
  }, [urlFilters]);

  useEffect(() => {
    setSelectedFilterKey(firstKeyOfQuickFilter);
  }, [firstKeyOfQuickFilter]);

  useEffect(() => {
    const { filters: filterData } = previousFilter;
    if (isEmpty(filterData) || !filterData) {
      return;
    }
    const { validatedFilters, urlFilters: activeUrlFilters } = getValidatedFiltersAndUrlFilters({
      activeFilter,
      filterData,
    });
    if (!isEqual(activeUrlFilters, validatedFilters)) {
      replaceRouterQuery({
        replacedPathname: pathname,
        originalQuery: query,
        nextQuery: { filters: validatedFilters.join('|') },
      });
    }
  }, [activeFilter, pathname, query, router, previousFilter, replaceRouterQuery]);

  useEffect(() => {
    if (!productListError || isEmpty(activeFilter)) {
      return;
    }

    Alert({
      text: '일시적인 오류가 발생했어요.\n잠시 후 다시 시도해주세요.',
      allowOutsideClick: false,
    }).then(() => {
      resetFilter();
    });
  }, [activeFilter, productListError, resetFilter]);

  useEffect(() => {
    if (!inView || !hasNextPage || isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  useEffect(() => {
    if (productListSuccess && totalProductsCount > 0) {
      ignoreError(() => {
        fusionSignalsService.logEvent({
          type: FUSION_SIGNALS_EVENT.REQUEST,
          query: keyword,
          fusionQueryId: queryId,
        });
      });
    }
  }, [totalProductsCount, productListSuccess, keyword, queryId]);

  return (
    <LogSearchContextProvider
      data={{
        defaultSortTypeName,
        selectionSortTypeName: selectedSortTypeName,
        serverSortTypeName: selectedSortTypeName,
        keyword,
        fusionQueryId: storedQueryId,
        isSorting,
      }}
    >
      <PullToRefreshNew onRefresh={handleRefresh}>
        <>
          {(productListLoading || isFetchingNextPage || isFetching) && <Loading />}
          <ProductsWrapper>
            <SectionList sections={topSections} />
            {(!isEmpty(urlFilters) || hasProducts) && sortOptions && (
              <SearchSortBarContainer
                sortOptions={sortOptions}
                totalProductsCount={totalProductsCount}
                onSortingEvent={setIsSorting}
                onChangeSortEvent={handleChangeSortEvent}
                toggleModalState={toggleModalState}
                urlFilters={urlFilters}
              />
            )}
            {get(filterSection, 'data.items') && isQuickFilterVisible && previousFilter.filters && (
              <>
                <QuickFilter
                  filterData={previousFilter.filters}
                  selectedFilterData={urlFilters}
                  setQuickFilterKey={handleQuickFilterModal}
                />
                {!isEmpty(urlFilters) ? (
                  <SelectedFilterWrapper>
                    <ActiveFilterValueContainer
                      filterData={previousFilter.filters}
                      isBottomSheet={false}
                      activeFilter={urlFilters}
                      onActiveFilter={handleActiveFilter}
                    />
                    <QuickResetContainer onClick={resetFilter}>
                      <ResetIcon>
                        <SvgReset width={13} height={13} stroke={COLOR.kurlyGray600} strokeWidth={1.2} />
                      </ResetIcon>
                    </QuickResetContainer>
                  </SelectedFilterWrapper>
                ) : null}
              </>
            )}
            {isExistFallbackQuery && site === MAIN_SITE.BEAUTY && productListSuccess ? (
              fallbackQuery === true ? (
                totalProductsCount ? (
                  <FallbackWrapper>
                    <CommonIconInfo fill={COLOR.kurlyGray400} stroke={COLOR.kurlyGray400} />
                    <FallbackText>뷰티컬리 검색결과가 없어 마켓컬리 검색결과를 제공합니다.</FallbackText>
                  </FallbackWrapper>
                ) : null
              ) : (
                <CheckBox onClick={getSiteChangedSearchResult}>
                  {isBeautyOnlyResult ? <CheckBoxActive /> : <CheckBoxInactive />}
                  <CheckBoxText isBeautyOnlyResult={isBeautyOnlyResult}>뷰티컬리 상품만 보기</CheckBoxText>
                </CheckBox>
              )
            ) : null}
            {loadingSpinnerVisible ? (
              <LoadingWrapper>
                <Loading />
              </LoadingWrapper>
            ) : null}
            {productListSuccess ? (
              gt(totalProductsCount, 0) || (eq(totalProductsCount, 0) && isEmpty(urlFilters)) ? (
                <SectionList sections={listSections} />
              ) : (
                <EmptyContainer activeFilter={urlFilters} section={section} />
              )
            ) : null}
            {productListError ? (
              <EmptyWrapper>
                <EmptyContainer activeFilter={urlFilters} section={'search'} />
              </EmptyWrapper>
            ) : null}
            <LoadingRef ref={ref} />
          </ProductsWrapper>
          {!isEmpty(previousFilter.filters) && previousFilter.filters ? (
            <SlideModal open={isFilterModalOpen} onClose={toggleModalState}>
              <FilterContainer
                filterData={previousFilter.filters}
                selectedFilterKey={selectedFilterKey}
                setSelectedFilterKey={setSelectedFilterKey}
                onClickShowProductsButton={toggleModalState}
                activeFilter={activeFilter}
                onActiveFilter={handleActiveFilter}
                resetBottomSheetFilter={resetBottomSheetFilter}
                keyword={keyword}
                code={''}
                section={section}
                currentSite={currentSite}
              />
            </SlideModal>
          ) : null}
        </>
      </PullToRefreshNew>
    </LogSearchContextProvider>
  );
}
