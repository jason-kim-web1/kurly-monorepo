import styled from '@emotion/styled';

import { chain, cloneDeep, eq, get, includes, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';
import { useInView } from 'react-intersection-observer';

import COLOR from '../../../../shared/constant/colorset';

import { Reset } from '../../../../shared/icons';
import ProductCard from '../components/ProductCard';
import Sort from '../components/Sort';
import ActiveFilterValueContainer from './ActiveFilterValueContainer';
import QuickFilter from '../components/QuickFilter';
import Loading from '../../../../shared/components/Loading/Loading';
import EmptyContainer from './EmptyContainer';

import useInfiniteProductList from '../../hook/useInfiniteProductList';
import type {
  FilterGroup,
  FilterTemplate,
  PageType,
  ProductCategories,
  ProductCollections,
  ProductList as ProductListType,
} from '../../types';
import { FILTER_TEMPLATE } from '../../types';
import { parseQueryString } from '../../../../shared/utils/parseQueryString';
import { useCollectionListPageQueryParams } from '../../collections/hook/useCollectionsPageQueryParams';
import { ProductSelectData, ProductStatusCode } from '../../../../shared/interfaces';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectCategorySort, SelectListProduct, SelectProductCart } from '../../../../shared/amplitude/events';
import { getDefaultPerPage } from '../../shared/util/getDefaultPerPage';

import { zIndex } from '../../../../shared/styles';
import Alert from '../../../../shared/components/Alert/Alert';
import { productStatusMap } from '../../../../shared/services/product.service';
import { getNumberTypeProductRanking } from '../../shared/util/getNumberTypeProductRanking';
import { createFilterQueryString } from '../../shared/util/createFilterQueryString';
import { parseFilterData } from '../../shared/util/parseFilterData';

const ProductsWrapper = styled.div`
  width: 100%;
  margin-top: 2px;
`;

const Products = styled.div<{ isDesignKindNumber: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${({ isDesignKindNumber }) => (isDesignKindNumber ? '16px 16px 0 16px' : '0 16px 0')};
`;

const SelectedFilterWrapper = styled.div`
  display: flex;
`;

const QuickResetContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-basis: 52px;
`;

const ResetIcon = styled.div`
  height: 20px;
  padding: 1px 0 0 2px;
  border-left: 1px solid ${COLOR.kurlyGray200};
`;

const SvgReset = styled(Reset)`
  vertical-align: middle;
  margin: 0 16px 0 12px;
`;

const LoadingRef = styled.div`
  height: 1px;
`;

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${COLOR.kurlyWhite};
  opacity: 0.4;
  overflow: hidden;
  z-index: ${zIndex.mobileProductList};
`;

export interface ActiveFilter {
  filterGroupKey: string;
  template: FilterTemplate;
  filterKey: string;
  isActive: boolean;
}

interface Props {
  data: ProductCollections | ProductCategories;
  section: Exclude<PageType, 'search'>;
  code: string;
  filterData?: FilterGroup[];
  extraHeight?: number;
  isCollectionGroup?: boolean;
  isDesignKindNumber?: boolean;
}

export default function ProductList({
  data,
  section,
  code,
  filterData,
  extraHeight = 0,
  isCollectionGroup,
  isDesignKindNumber = false,
}: Props) {
  const {
    data: productsData,
    status: productListQueryStatus,
    isLoading: productListLoading,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isError,
  } = useInfiniteProductList({
    section,
    code,
    defaultSortType: data?.defaultSortType || '',
  });
  const { query, replace: routerReplace } = useRouter();
  const { ref, inView } = useInView();
  const { filters: urlFilters } = useCollectionListPageQueryParams();
  const [activeFilter, setActiveFilter] = useState(cloneDeep(urlFilters));
  const [selectedFilterKey, setSelectedFilterKey] = useState('');
  const [modalState, setModalState] = useState(false);
  const isQuickFilterVisible = useMemo(() => {
    const total = productsData?.pages[0].meta.pagination.total ?? 0;
    return total > 0 || !isEmpty(urlFilters);
  }, [urlFilters, productsData]);
  const totalProductCount = productsData?.pages[0].meta.pagination.total ?? 0;

  const generateRank = useCallback(
    (
      index: number,
      pageIndex: number,
      statusCode: string,
      page: ProductListType,
      pageType: Exclude<PageType, 'search'>,
    ) => {
      // 컬렉션 페이지에서만 넘버형일 때 랭킹이 노출되어야 함
      if (!isDesignKindNumber || eq(pageType, 'categories')) {
        return undefined;
      }

      const rank = index + 1 + pageIndex * getDefaultPerPage(pageType);
      const soldOutStartRank = chain(page.products)
        .map((product) => get(product, 'status.code'))
        .findIndex((productStatus) => eq(productStatus, productStatusMap.SOLD_OUT))
        .thru((result) => (eq(result, -1) ? result : result + 1 + pageIndex * getDefaultPerPage(pageType)))
        .value();

      return getNumberTypeProductRanking(rank, statusCode as ProductStatusCode, soldOutStartRank);
    },
    [isDesignKindNumber],
  );

  const handleLinkClick = (selectLink: ProductSelectData) => {
    const { page = 1, sorted_type: sortType = data.defaultSortType } = parseQueryString(query);

    const selectedSortTypeName = data.availableSort.find((sort) => sort.type === sortType)?.name ?? '';
    const { pagination } = productsData?.pages[0].meta ?? {};

    amplitudeService.logEvent(
      new SelectListProduct({
        ...selectLink,
        section,
        paramCode: code,
        product: selectLink.productData,
        isSorting: sortType !== data.defaultSortType,
        perPage: pagination?.perPage ?? getDefaultPerPage(section),
        pagination: {
          currentPage: pagination?.currentPage ?? Number(page),
          totalProductsCount: pagination?.total ?? 0,
        },
        sort: {
          item: data.availableSort,
          selectedType: sortType,
          selectedName: selectedSortTypeName,
          defaultSort: data.defaultSortType,
        },
      }),
    );
  };

  const handleShortcut = (productShortcut: ProductSelectData) => {
    const { page = 1, sorted_type: sortType = data.defaultSortType } = parseQueryString(query);

    const selectedSortTypeName = data.availableSort.find((sort) => sort.type === sortType)?.name ?? '';
    const { pagination } = productsData?.pages[0].meta ?? {};

    amplitudeService.logEvent(
      new SelectProductCart({
        ...productShortcut,
        section,
        paramCode: code,
        product: productShortcut.productData,
        isSorting: sortType !== data.defaultSortType,
        perPage: pagination?.perPage ?? getDefaultPerPage(section),
        pagination: {
          currentPage: pagination?.currentPage ?? Number(page),
          totalProductsCount: pagination?.total ?? 0,
        },
        sort: {
          item: data.availableSort,
          selectedType: sortType,
          selectedName: selectedSortTypeName,
          defaultSort: data.defaultSortType,
        },
      }),
    );
  };

  const resetFilter = useCallback(() => {
    void routerReplace({
      query: {
        ...query,
        filters: null,
      },
    });
  }, [routerReplace, query]);

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

  const updatedPromotion = (valueKey: string) => {
    const prevFilterData = parseFilterData((query.filters || '') as string);
    const prevPromotions = get(prevFilterData, 'promotion', []);
    const isActivePromotion = includes(prevPromotions, valueKey);
    prevFilterData.promotion = isActivePromotion
      ? prevPromotions.filter((promotion) => promotion !== valueKey)
      : [...prevPromotions, valueKey];
    routerReplace({
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

    setModalState(() => true);
  };

  const syncFilterWithUrl = () => {
    setActiveFilter(urlFilters);
  };

  const resetBottomSheetFilter = () => {
    setActiveFilter({});
  };

  const handleChangeSortEvent = ({ type, name }: { type: string; name: string }) => {
    amplitudeService.logEvent(
      new SelectCategorySort({
        section,
        value: {
          type,
          name,
        },
        totalProductsCount: productsData?.pages[0].meta.pagination.total,
        paramCode: code,
      }),
    );
  };

  useEffect(() => {
    setActiveFilter(cloneDeep(urlFilters));
  }, [query]);

  useEffect(() => {
    const firstKeyOfQuickFilter = filterData?.find((filterGroup) => filterGroup.isQuick)?.key ?? '';
    setSelectedFilterKey(firstKeyOfQuickFilter);
  }, [filterData]);

  useEffect(() => {
    if (!isError || isEmpty(activeFilter)) {
      return;
    }

    Alert({
      text: '일시적인 오류가 발생했어요.\n잠시 후 다시 시도해주세요.',
      allowOutsideClick: false,
    }).then(() => {
      resetFilter();
    });
  }, [activeFilter, isError, resetFilter]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (isFetching) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.removeProperty('overflow');
  }, [isFetching]);

  if (isEmpty(productsData) && productListLoading) {
    return <Loading />;
  }

  return (
    <>
      {productListLoading || isFetchingNextPage || isFetching ? (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      ) : null}
      <ProductsWrapper>
        {!isDesignKindNumber ? (
          <>
            {!isEmpty(urlFilters) || totalProductCount > 0 ? (
              <Sort
                totalProductsCount={totalProductCount}
                availableSort={data.availableSort}
                defaultSortType={data.defaultSortType}
                section={section}
                modalState={modalState}
                setModalState={setModalState}
                selectedFilterKey={selectedFilterKey}
                setSelectedFilterKey={setSelectedFilterKey}
                filterData={filterData}
                activeFilter={activeFilter}
                urlFilters={urlFilters}
                onActiveFilter={handleActiveFilter}
                syncFilterWithUrl={syncFilterWithUrl}
                resetBottomSheetFilter={resetBottomSheetFilter}
                onChangeSortEvent={handleChangeSortEvent}
                extraHeight={extraHeight}
                code={code}
                isCollectionGroup={isCollectionGroup}
              />
            ) : null}
            {filterData ? (
              <>
                {isQuickFilterVisible ? (
                  <QuickFilter
                    filterData={filterData}
                    selectedFilterData={urlFilters}
                    setQuickFilterKey={handleQuickFilterModal}
                  />
                ) : null}
                {!isEmpty(urlFilters) ? (
                  <SelectedFilterWrapper>
                    <ActiveFilterValueContainer
                      filterData={filterData}
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
            ) : null}
          </>
        ) : null}
        {productListQueryStatus === 'error' ? <EmptyContainer activeFilter={urlFilters} section={section} /> : null}
        {productListQueryStatus === 'success' && !!productsData
          ? productsData.pages.map((page, idx) =>
              page.products.length > 0 ? (
                <Products key={`page-${idx}`} isDesignKindNumber={isDesignKindNumber}>
                  {page.products.map(
                    (
                      {
                        no,
                        name,
                        salesPrice,
                        discount,
                        listImageUrl,
                        productVerticalMediumUrl,
                        groupProduct,
                        canRestockNotify,
                        status,
                        tags,
                        deliveryTypeNames,
                        isMultiplePrice,
                        isBuyNow,
                        isGiftable,
                        reviewCount,
                        stickers_v2,
                      },
                      index,
                    ) => (
                      <ProductCard
                        key={no}
                        index={index}
                        name={name}
                        productNo={no}
                        price={salesPrice}
                        discount={discount}
                        imageUrl={productVerticalMediumUrl || listImageUrl}
                        tags={tags}
                        deliveryTypeNames={deliveryTypeNames}
                        status={status}
                        isGroupProduct={groupProduct.isGroup}
                        canRestockNotify={canRestockNotify}
                        isMultiplePrice={isMultiplePrice}
                        isBuyNow={isBuyNow}
                        handleLinkClick={handleLinkClick}
                        selectProduct={handleShortcut}
                        isGiftable={isGiftable}
                        reviewCount={reviewCount}
                        ranking={generateRank(index, idx, status.code, page, section)}
                        stickers_v2={stickers_v2}
                      />
                    ),
                  )}
                </Products>
              ) : (
                <Fragment key="empty-page">
                  <EmptyContainer activeFilter={urlFilters} section={section} />
                </Fragment>
              ),
            )
          : null}
        <LoadingRef ref={ref} />
      </ProductsWrapper>
    </>
  );
}
