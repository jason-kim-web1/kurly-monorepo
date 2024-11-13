import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { QueryStatus } from '@tanstack/react-query';
import { eq, get, gt, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { amplitudeService } from '../../../../shared/amplitude';
import { SelectCategorySort, SelectListProduct, SelectProductCart } from '../../../../shared/amplitude/events';
import Alert from '../../../../shared/components/Alert/Alert';
import CircularProgress from '../../../../shared/components/CircularProgress';
import COLOR from '../../../../shared/constant/colorset';
import { zIndex } from '../../../../shared/styles';
import { ExclamationMark, Reset } from '../../../../shared/icons';
import type { ProductData, ProductSelectData, ProductStatusCode } from '../../../../shared/interfaces';
import { parseQueryString } from '../../../../shared/utils/parseQueryString';
import { getDefaultPerPage } from '../../shared/util/getDefaultPerPage';
import type { FilterGroup, PageType, ProductAvailableSort, ProductListMeta } from '../../types';
import { LoadingList } from '../components/LoadingList';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import ActiveFilterValueContainer from './ActiveFilterValueContainer';
import { usePreviousRouteFromGoodsDetail } from '../../../../shared/context/PreviousRoutePathContext';
import { UrlBasedFilter } from '../../shared/util/parseFilterData';
import { emptyResultText } from '../../../../search/shared/constants';
import { redirectTo } from '../../../../shared/reducers/page';
import ProductCard from '../components/ProductCard';
import { getNumberTypeProductRanking } from '../../shared/util/getNumberTypeProductRanking';

const ProductsWrapper = styled.div`
  width: 100%;
`;

const Products = styled.div<{ isDimmed?: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, 249px);
  grid-gap: 31px 18px;
  gap: 31px 18px;
  width: 100%;
  ${({ isDimmed }) =>
    isDimmed &&
    css`
      opacity: 0.4;
    `}
`;

const LoadingWrapper = styled.div<{ hasFilterArea: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  ${({ hasFilterArea }) =>
    !hasFilterArea &&
    css`
      transform: translateX(-50%);
    `}
  z-index: ${zIndex.pcProductListLoader};
`;

const EmptyProductContainer = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: ${({ height }) => `${height}px`};
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 100px 0;
`;

const EmptyProduct = styled.span`
  font-size: 16px;
  color: ${COLOR.kurlyGray400};
  margin-top: 16px;
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  width: 138px;
  height: 44px;
  border-radius: 22px;
  padding: 12px 20px 12px 20px;
  margin-top: 28px;
  background-color: ${COLOR.kurlyPurple};
`;

const ResetText = styled.span`
  color: ${COLOR.kurlyWhite};
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  margin-left: 6px;
  white-space: nowrap;
`;

const emptyContainerHeight = 480;
const emptyContainerWithFilterHeight = 396;

interface Props {
  section: Exclude<PageType, 'search'>;
  code: string;
  activeFilter: UrlBasedFilter;
  defaultSortType: string;
  availableSort?: ProductAvailableSort[];
  filterData?: FilterGroup[];
  filterLoading?: boolean;
  products?: ProductData[];
  meta?: ProductListMeta;
  totalProductsCount: number;
  productListQueryStatus: QueryStatus;
  isFetchingProducts?: boolean;
  isError?: boolean;
  scrollToTop?: () => void;
  isDesignKindNumber?: boolean;
}

const scrollRestorationQuantity = 7;

export default function ProductList({
  section,
  // Todo: code 및 activeFilter -- 검색에서도 사용하므로 props로 받아야 할 듯 (context에서 만든 커스텀 hook을 conditional하게 못 쓰니)
  code,
  activeFilter,
  defaultSortType,
  availableSort,
  filterData,
  filterLoading,
  products,
  meta,
  totalProductsCount,
  productListQueryStatus,
  isFetchingProducts,
  isError = false,
  scrollToTop,
  isDesignKindNumber = false,
}: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { query, pathname } = router;
  const [isSorting, setIsSorting] = useState(false);
  const previousCount = useRef<number>();
  const isPageFromGoodsDetail = usePreviousRouteFromGoodsDetail();
  const hasFilterArea = !isEmpty(filterData) || filterLoading;
  const totalPages = get(meta, 'pagination.totalPages');
  const currentPage = get(meta, 'pagination.currentPage');
  const isVisiblePagination = !!products && !!meta && gt(totalPages, 1);

  const emptyText = !isEmpty(activeFilter) ? emptyResultText.noneActiveFilter : emptyResultText.default;

  const generateRank = useCallback(
    (index: number, pageIndex: number, statusCode: ProductStatusCode, pageType: Exclude<PageType, 'search'>) => {
      // 컬렉션 페이지에서만 넘버형일 때 랭킹이 노출되어야 함
      if (!isDesignKindNumber || eq(pageType, 'categories')) {
        return undefined;
      }
      const rank = index + 1 + (pageIndex - 1) * getDefaultPerPage(pageType);
      return getNumberTypeProductRanking(rank, statusCode);
    },
    [isDesignKindNumber],
  );

  const resetFilter = useCallback(() => {
    dispatch(
      redirectTo({
        url: pathname,
        query: {
          ...query,
          page: 1,
          filters: null,
        },
        replace: true,
      }),
    );
  }, [pathname, query, dispatch]);

  const handleLinkClick = (selectLink: ProductSelectData) => {
    if (!availableSort) {
      return;
    }

    const { page = 1, sorted_type: sortType = defaultSortType } = parseQueryString(query);
    const selectedSortTypeName = availableSort.find((sort) => sort.type === sortType)?.name ?? '';

    amplitudeService.logEvent(
      new SelectListProduct({
        ...selectLink,
        section,
        paramCode: code,
        product: selectLink.productData,
        perPage: meta?.pagination.perPage ?? getDefaultPerPage(section),
        pagination: {
          currentPage: meta?.pagination.currentPage ?? Number(page),
          totalProductsCount: meta?.pagination.total ?? 0,
        },
        sort: {
          item: availableSort,
          selectedType: sortType,
          selectedName: selectedSortTypeName,
          defaultSort: defaultSortType,
        },
        isSorting: sortType !== defaultSortType || isSorting,
      }),
    );
  };

  const handleShortcut = (productShortcut: ProductSelectData) => {
    if (!availableSort) {
      return;
    }

    const { page = 1, sorted_type: sortType = defaultSortType } = parseQueryString(query);
    const selectedSortTypeName = availableSort.find((sort) => sort.type === sortType)?.name ?? '';

    amplitudeService.logEvent(
      new SelectProductCart({
        ...productShortcut,
        section,
        paramCode: code,
        product: productShortcut.productData,
        perPage: meta?.pagination.perPage ?? getDefaultPerPage(section),
        pagination: {
          currentPage: meta?.pagination.currentPage ?? Number(page),
          totalProductsCount: meta?.pagination.total ?? 0,
        },
        sort: {
          item: availableSort,
          selectedType: sortType,
          selectedName: selectedSortTypeName,
          defaultSort: defaultSortType,
        },
        isSorting: sortType !== defaultSortType || isSorting,
      }),
    );
  };

  const handleChangeSortEvent = ({ type, name }: { type: string; name: string }) => {
    amplitudeService.logEvent(
      new SelectCategorySort({
        section,
        value: {
          type,
          name,
        },
        totalProductsCount: totalProductsCount,
        paramCode: code,
      }),
    );
  };

  const handleClickPage = (page: number) => {
    if (page === meta?.pagination.currentPage) {
      return;
    }

    dispatch(
      redirectTo({
        url: pathname,
        query: { ...query, page },
      }),
    );
  };

  useEffect(() => {
    if (isFetchingProducts || !scrollToTop) {
      return;
    }

    if (previousCount.current === undefined) {
      previousCount.current = totalProductsCount;
      return;
    }

    if (!isPageFromGoodsDetail && (previousCount.current === 0 || totalProductsCount < scrollRestorationQuantity)) {
      scrollToTop();
    }

    previousCount.current = totalProductsCount;
  }, [isFetchingProducts, isPageFromGoodsDetail, scrollToTop, totalProductsCount]);

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

  if (!availableSort) {
    return null;
  }

  return (
    <ProductsWrapper>
      {!isDesignKindNumber ? (
        <>
          {!isEmpty(activeFilter) || totalProductsCount > 0 ? (
            <Sort
              totalProductsCount={totalProductsCount}
              defaultSortType={defaultSortType}
              availableSort={availableSort}
              section={section}
              onSortingEvent={setIsSorting}
              onChangeSortEvent={handleChangeSortEvent}
            />
          ) : null}
          {filterData && !isEmpty(activeFilter) ? (
            <ActiveFilterValueContainer filterData={filterData} activeFilter={activeFilter} />
          ) : null}
        </>
      ) : null}
      {productListQueryStatus === 'loading' ? (
        <LoadingList repeatNumber={!!hasFilterArea && !isDesignKindNumber ? 3 : 4} />
      ) : null}
      {productListQueryStatus === 'success' && isFetchingProducts ? (
        <LoadingWrapper hasFilterArea={!!hasFilterArea}>
          <CircularProgress theme="gray" width={48} />
        </LoadingWrapper>
      ) : null}
      {productListQueryStatus === 'error' ? (
        <EmptyProductContainer height={isEmpty(activeFilter) ? emptyContainerHeight : emptyContainerWithFilterHeight}>
          <ExclamationMark width={48} height={48} />
          <EmptyProduct>{emptyText}</EmptyProduct>
          {!isEmpty(activeFilter) ? (
            <ResetButton onClick={resetFilter}>
              <Reset width={14} height={14} stroke={COLOR.kurlyWhite} />
              <ResetText>필터 초기화</ResetText>
            </ResetButton>
          ) : null}
        </EmptyProductContainer>
      ) : null}
      {productListQueryStatus === 'success' ? (
        !!products && products.length > 0 ? (
          <Products isDimmed={isFetchingProducts}>
            {products.map(
              (
                {
                  no,
                  name,
                  salesPrice,
                  discount,
                  productVerticalMediumUrl,
                  listImageUrl,
                  groupProduct,
                  canRestockNotify,
                  status,
                  tags,
                  shortDescription,
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
                  shortDescription={shortDescription}
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
                  ranking={generateRank(index, currentPage, status.code, section)}
                  stickers_v2={stickers_v2}
                />
              ),
            )}
          </Products>
        ) : (
          <EmptyProductContainer height={isEmpty(activeFilter) ? emptyContainerHeight : emptyContainerWithFilterHeight}>
            <ExclamationMark width={48} height={48} />
            <EmptyProduct>{emptyText}</EmptyProduct>
            {!isEmpty(activeFilter) ? (
              <ResetButton onClick={resetFilter}>
                <Reset width={14} height={14} stroke={COLOR.kurlyWhite} />
                <ResetText>필터 초기화</ResetText>
              </ResetButton>
            ) : null}
          </EmptyProductContainer>
        )
      ) : null}
      {isVisiblePagination ? (
        <Pagination currentPage={currentPage} totalPages={totalPages} onClickPage={handleClickPage} />
      ) : null}
    </ProductsWrapper>
  );
}
