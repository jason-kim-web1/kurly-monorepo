import styled from '@emotion/styled';

import { head, isEmpty, isEqual, isUndefined } from 'lodash';

import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { useCategory } from '../hook/useCategory';
import { useCategoryFilter } from '../hook/useCategoryFilter';
import { useCategoriesPageQueries } from '../Context/CategoriesDataProvider';

import ProductList from '../../m/containers/ProductList';

import Banner from '../../m/components/Banner';

import useInfiniteProductList from '../../hook/useInfiniteProductList';

import { amplitudeService } from '../../../../shared/amplitude';
import { SelectCategoryBanner } from '../../../../shared/amplitude/events';
import { initializeScroll } from '../../pc/util/initializeScroll';
import { useAppSelector } from '../../../../shared/store';
import getValidatedFiltersAndUrlFilters from '../../shared/util/getValidatedFiltersAndUrlFilters';
import {
  usePreviousRouteFromGoodsDetail,
  usePreviousRoutePath,
} from '../../../../shared/context/PreviousRoutePathContext';
import { Error, ListContainer } from '../../m/components/styled-components';
import { redirectTo } from '../../../../shared/reducers/page';
import PullToRefreshNew from '../../../../shared/components/PullToRefresh/m/PullToRefreshNew';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 75px;
`;

const BannerView = styled(Banner)`
  padding-bottom: 7px;
`;

interface Props {
  extraHeight: number;
}

export default function CategoryListContainer({ extraHeight }: Props) {
  const { site, categoryNo, filters: activeFilter } = useCategoriesPageQueries();
  const { data: categoryData, status } = useCategory({ categoryNo });
  const {
    data: productsData,
    status: productListQueryStatus,
    refetch,
  } = useInfiniteProductList({
    section: 'categories',
    code: categoryNo,
    defaultSortType: categoryData?.defaultSortType || '',
  });
  const { data: filterData } = useCategoryFilter({ categoryNo, productListQueryStatus });
  const mobileHeaderHeight = useAppSelector(({ header }) => header.mobileHeaderHeight);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const { pathname, query, asPath } = router;

  const { previousRoutePath } = usePreviousRoutePath();
  const previousRoutePathOnly = head(previousRoutePath?.split('?'));
  const pathOnly = head(asPath.split('?'));
  const isPageFromGoodsDetail = usePreviousRouteFromGoodsDetail();

  const totalProductsCount = productsData?.pages?.[0].meta?.pagination.total;
  const categoryBanner = categoryData?.rootCategory.banner;

  const handleClickBanner = (url: string) => {
    amplitudeService.logEvent(
      new SelectCategoryBanner({
        url,
        rootCategory: {
          code: categoryData?.rootCategory.code ?? '',
          name: categoryData?.rootCategory.name ?? '',
        },
        siblingCategory: {
          code: categoryData?.code ?? '',
          name: categoryData?.name ?? '',
        },
      }),
    );
  };

  useEffect(() => {
    if (isEmpty(filterData) || !filterData) {
      return;
    }

    const { validatedFilters, urlFilters } = getValidatedFiltersAndUrlFilters({ activeFilter, filterData });

    if (!isEqual(urlFilters, validatedFilters)) {
      dispatch(
        redirectTo({
          url: pathname,
          query: {
            ...query,
            filters: validatedFilters.join('|'),
          },
          replace: true,
        }),
      );
    }
  }, [activeFilter, filterData, dispatch, pathname, query]);

  useEffect(() => {
    if (isPageFromGoodsDetail) {
      return;
    }

    if (previousRoutePathOnly !== pathOnly) {
      window.scrollTo(0, 0);
      return;
    }

    if (productListQueryStatus === 'success') {
      initializeScroll({ refObject: wrapperRef, mobileHeaderHeight: mobileHeaderHeight + extraHeight });
    }
  }, [
    extraHeight,
    isPageFromGoodsDetail,
    mobileHeaderHeight,
    pathOnly,
    previousRoutePathOnly,
    productListQueryStatus,
    query,
  ]);

  const handleRefresh = useCallback(async () => {
    refetch();
  }, [refetch]);

  return (
    <PullToRefreshNew onRefresh={handleRefresh}>
      <ListContainer>
        {!!categoryData &&
        !isUndefined(categoryBanner) &&
        productListQueryStatus === 'success' &&
        !!totalProductsCount ? (
          <BannerView banner={categoryBanner} site={site} onClickBanner={handleClickBanner} />
        ) : null}
        <Wrapper ref={wrapperRef}>
          {status === 'success' && !!categoryData ? (
            <ProductList
              data={categoryData}
              section="categories"
              code={categoryNo}
              filterData={filterData}
              extraHeight={extraHeight}
            />
          ) : (
            <Error />
          )}
        </Wrapper>
      </ListContainer>
    </PullToRefreshNew>
  );
}
