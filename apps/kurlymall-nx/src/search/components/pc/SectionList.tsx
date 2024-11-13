import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { QueryStatus } from '@tanstack/react-query';
import { eq, get, gt, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getDefaultPerPage } from '../../../product/list/shared/util/getDefaultPerPage';
import { UrlBasedFilter } from '../../../product/list/shared/util/parseFilterData';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectCategorySort, SelectListProduct, SelectProductCart } from '../../../shared/amplitude/events';
import COLOR from '../../../shared/constant/colorset';
import { usePreviousRouteFromGoodsDetail } from '../../../shared/context/PreviousRoutePathContext';
import { ProductSelectData } from '../../../shared/interfaces';
import { redirectTo } from '../../../shared/reducers/page';
import { useAppSelector } from '../../../shared/store';
import { zIndex } from '../../../shared/styles';
import { parseQueryString } from '../../../shared/utils/parseQueryString';
import { emptyResultText, SCROLL_RESTORATION_QUANTITY } from '../../shared/constants';
import type { NormalizedFilterGroup, ProductAvailableSort } from '../../shared/types';
import Alert from '../../../shared/components/Alert/Alert';
import Sort from '../../../product/list/pc/components/Sort';
import ActiveFilterValueContainer from '../../../product/list/pc/containers/ActiveFilterValueContainer';
import { LoadingList } from '../../../product/list/pc/components/LoadingList';
import CircularProgress from '../../../shared/components/CircularProgress/index';
import { ExclamationMark, MagnifyingGlass, Reset } from '../../../shared/icons';
import ProductCard from '../../../product/list/pc/components/ProductCard';
import Pagination from '../../../product/list/pc/components/Pagination';
import { ignoreError } from '../../../shared/utils/general';
import { fusionSignalsService } from '../../../shared/fusion-signals/FusionSignalsService';
import { FUSION_SIGNALS_EVENT } from '../../../shared/fusion-signals/fusionSignalsType';
import { SHORTCUT_TYPE } from '../../../shared/constant/shortcut-type';
import { getSortTypeName } from '../../shared/utils/getSortTypeName';
import { NormalSearchResultMeta } from '../../types';
import {
  isProductListSectionViewModel,
  isNoResultInfoSectionViewModel,
  ProductListSectionItemViewModel,
  UnSpecifiedSectionList,
} from '../../features/Section/factory';
import { DeliveryInfoName } from '../../../product/types';
import { ImpressionPolicy } from '../../../shared/context/ImpressionPolicyContext';
import { LOG_HISTORY_KEY_TYPE, useDesktopSearchLog } from '../../hooks/useDesktopSearchLog';
import { ImpressionProduct } from '../../../shared/amplitude/events/search/ImpressionProduct';

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
  text-align: center;
  font-size: 16px;
  color: ${COLOR.kurlyGray400};
  margin-top: 16px;
  line-height: normal;
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

type SectionMeta = {
  code: string;
  position: number;
};

interface Props {
  code: string;
  activeFilter: UrlBasedFilter;
  defaultSortType: string;
  availableSort?: ProductAvailableSort[];
  filterData?: NormalizedFilterGroup[];
  topSections?: UnSpecifiedSectionList;
  listSections?: UnSpecifiedSectionList;
  filterLoading?: boolean;
  meta?: NormalSearchResultMeta;
  totalProductsCount: number;
  productListQueryStatus: QueryStatus;
  isFetchingProducts?: boolean;
  isError?: boolean;
  scrollToTop: () => void;
}

export default function SectionList({
  code,
  activeFilter,
  defaultSortType,
  availableSort,
  filterData,
  topSections,
  listSections,
  filterLoading,
  meta,
  totalProductsCount,
  productListQueryStatus,
  isFetchingProducts,
  isError = false,
  scrollToTop,
}: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const section = 'search';
  const { query, pathname } = router;
  const [isSorting, setIsSorting] = useState(false);
  const queryId = useAppSelector(({ productList }) => productList.queryId) ?? meta?.queryId;
  const previousCount = useRef<number>();
  const isPageFromGoodsDetail = usePreviousRouteFromGoodsDetail();
  const hasFilterArea = !isEmpty(filterData) || filterLoading;
  const totalPages = get(meta, 'pagination.totalPages', 1);
  const currentPage = get(meta, 'pagination.currentPage', 1);
  const totalProductCount = get(meta, 'pagination.total', 0);
  const emptyText = !isEmpty(activeFilter) ? emptyResultText.noneActiveFilter : emptyResultText.search;
  const { sorted_type: currentSortType } = parseQueryString(query);
  const currentSortTypeName = getSortTypeName(availableSort, currentSortType);
  const fusionQueryId = queryId || '';
  const productListElementRef = useRef<HTMLDivElement | null>(null);
  // TOFIX: MWEB 과 달리 PC 는 로그 관련 로직 재사용 불가능
  const { createLogHistoryId, log } = useDesktopSearchLog();

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

  const handleImpressionSectionItem = (sectionMeta: SectionMeta, product: ProductListSectionItemViewModel) => () => {
    const { position, no, name, salesPrice, discountedPrice } = product;
    const logId = createLogHistoryId({ keyword: code, sortTypeName: currentSortTypeName }, product);
    log(logId, LOG_HISTORY_KEY_TYPE.IMPRESSION_SECTION_ITEM, () => {
      amplitudeService.logEvent(
        new ImpressionProduct({
          content_id: no,
          content_name: name,
          fusion_query_id: fusionQueryId,
          position,
          sales_price: salesPrice,
          price: discountedPrice || salesPrice,
        }),
      );
    });
  };

  const handleLinkClick =
    (product: ProductListSectionItemViewModel, position: number) => (selectLink: ProductSelectData) => {
      if (!availableSort) {
        return;
      }
      const { productData } = selectLink;
      const logId = createLogHistoryId({ keyword: code, sortTypeName: currentSortTypeName }, product);
      handleImpressionSectionItem(
        {
          code: 'PRODUCT_LIST',
          position: 1,
        },
        product,
      );
      log(logId, LOG_HISTORY_KEY_TYPE.SELECT_SECTION_ITEM, () => {
        amplitudeService.logEvent(
          new SelectListProduct({
            ...selectLink,
            section,
            paramCode: code,
            product: productData,
            perPage: meta?.pagination.perPage ?? getDefaultPerPage(section),
            pagination: {
              currentPage,
              totalProductsCount: totalProductCount,
            },
            sort: {
              item: availableSort,
              selectedType: currentSortType,
              selectedName: currentSortTypeName,
              defaultSort: defaultSortType,
            },
            isSorting: currentSortType !== defaultSortType || isSorting,
            queryId: fusionQueryId,
            position,
          }),
        );
        ignoreError(() => {
          fusionSignalsService.logEvent({
            type: FUSION_SIGNALS_EVENT.CLICK_PRODUCT,
            docId: productData.no,
            label: productData.name,
            resPos: position,
          });
        });
      });
    };

  const handleShortcut =
    (product: ProductListSectionItemViewModel, position: number) => (productShortcut: ProductSelectData) => {
      if (!availableSort) {
        return;
      }
      const logId = createLogHistoryId({ keyword: code, sortTypeName: currentSortTypeName }, product);
      handleImpressionSectionItem(
        {
          code: 'PRODUCT_LIST',
          position: 1,
        },
        product,
      );
      const { productData, type } = productShortcut;
      log(logId, LOG_HISTORY_KEY_TYPE.SELECT_SECTION_ITEM_SHORT_CUT, () => {
        amplitudeService.logEvent(
          new SelectProductCart({
            ...productShortcut,
            section,
            paramCode: code,
            product: productData,
            perPage: meta?.pagination.perPage ?? getDefaultPerPage(section),
            pagination: {
              currentPage,
              totalProductsCount: totalProductCount,
            },
            sort: {
              item: availableSort,
              selectedType: currentSortType,
              selectedName: currentSortTypeName,
              defaultSort: defaultSortType,
            },
            isSorting: currentSortType !== defaultSortType || isSorting,
            queryId: fusionQueryId,
            position,
          }),
        );
        ignoreError(() => {
          fusionSignalsService.logEvent({
            type: eq(type, SHORTCUT_TYPE.DETAIL)
              ? FUSION_SIGNALS_EVENT.CLICK_PRODUCT
              : FUSION_SIGNALS_EVENT.CLICK_SELECT,
            docId: productData.no,
            label: productData.name,
            resPos: position,
          });
        });
      });
    };

  const handleChangeSortEvent = ({ type, name }: { type: string; name: string }) => {
    amplitudeService.logEvent(
      new SelectCategorySort({
        section,
        queryId: fusionQueryId,
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
    if (isFetchingProducts) {
      return;
    }
    if (previousCount.current === undefined) {
      previousCount.current = totalProductsCount;
      return;
    }
    if (!isPageFromGoodsDetail && (previousCount.current === 0 || totalProductsCount < SCROLL_RESTORATION_QUANTITY)) {
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

  useEffect(() => {
    if (eq(productListQueryStatus, 'success') && totalProductsCount > 0 && queryId) {
      ignoreError(() => {
        fusionSignalsService.logEvent({
          type: FUSION_SIGNALS_EVENT.REQUEST,
          query: code,
          fusionQueryId: queryId,
        });
      });
    }
  }, [totalProductsCount, productListQueryStatus, queryId]);

  return (
    <ProductsWrapper>
      {(!isEmpty(activeFilter) || totalProductsCount > 0) && availableSort ? (
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
      {productListQueryStatus === 'loading' ? <LoadingList repeatNumber={!!hasFilterArea ? 3 : 4} /> : null}
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
      {productListQueryStatus === 'success' && topSections
        ? topSections.map((topSection) => {
            const { _id } = topSection;
            if (isNoResultInfoSectionViewModel(topSection)) {
              const {
                data: { headerDescription, footerDescription },
              } = topSection;
              return (
                <EmptyProductContainer
                  key={_id}
                  height={isEmpty(activeFilter) ? emptyContainerHeight : emptyContainerWithFilterHeight}
                >
                  <MagnifyingGlass width={48} height={48} />
                  <EmptyProduct>
                    {headerDescription}
                    <br />
                    {footerDescription}
                  </EmptyProduct>
                </EmptyProductContainer>
              );
            }
            return null;
          })
        : null}
      {productListQueryStatus === 'success' ? (
        !!listSections && gt(totalProductsCount, 0) ? (
          listSections.map((listSection, sectionIndex) => {
            const sectionCode = listSection.view.sectionCode;
            const sectionPosition = sectionIndex + 1;
            const sectionMeta = {
              code: sectionCode,
              position: sectionPosition,
            };
            if (isProductListSectionViewModel(listSection)) {
              return (
                <Products
                  key={`${sectionCode}-${sectionPosition}`}
                  isDimmed={isFetchingProducts}
                  ref={productListElementRef}
                >
                  {listSection.data.items.map((product, productIndex) => {
                    const {
                      _id,
                      no,
                      name,
                      salesPrice,
                      discountedPrice,
                      discountRate,
                      listImageUrl,
                      productVerticalMediumUrl,
                      groupProduct,
                      canRestockNotify,
                      tags,
                      shortDescription,
                      isMultiplePrice,
                      isBuyNow,
                      isGiftable,
                      reviewCount,
                      _status,
                      position,
                      _stickers,
                      _deliveryTypeNames,
                    } = product;
                    return (
                      <ImpressionPolicy key={_id} onInView={handleImpressionSectionItem(sectionMeta, product)}>
                        <ProductCard
                          index={productIndex}
                          name={name}
                          productNo={no}
                          price={salesPrice}
                          discount={{ price: discountedPrice, rate: discountRate }}
                          imageUrl={productVerticalMediumUrl || listImageUrl}
                          tags={tags}
                          shortDescription={shortDescription}
                          deliveryTypeNames={_deliveryTypeNames as DeliveryInfoName[]}
                          status={_status}
                          isGroupProduct={groupProduct.isGroup}
                          canRestockNotify={canRestockNotify}
                          isMultiplePrice={isMultiplePrice}
                          isBuyNow={isBuyNow}
                          queryId={section === 'search' ? queryId : ''}
                          handleLinkClick={handleLinkClick(product, position)}
                          selectProduct={handleShortcut(product, position)}
                          isGiftable={isGiftable}
                          reviewCount={reviewCount}
                          stickers_v2={_stickers}
                        />
                      </ImpressionPolicy>
                    );
                  })}
                </Products>
              );
            }
          })
        ) : !isEmpty(activeFilter) ? (
          <EmptyProductContainer height={emptyContainerWithFilterHeight}>
            <ExclamationMark width={48} height={48} />
            <EmptyProduct>{emptyText}</EmptyProduct>
            <ResetButton onClick={resetFilter}>
              <Reset width={14} height={14} stroke={COLOR.kurlyWhite} />
              <ResetText>필터 초기화</ResetText>
            </ResetButton>
          </EmptyProductContainer>
        ) : null
      ) : null}
      {!!listSections && totalPages > 1 ? (
        <Pagination currentPage={currentPage} totalPages={totalPages} onClickPage={handleClickPage} />
      ) : null}
    </ProductsWrapper>
  );
}
