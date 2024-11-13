import styled from '@emotion/styled';

import { eq, isArray, isEmpty, sortBy } from 'lodash';

import { useRef } from 'react';

import FilterContainer from '../../../pc/containers/FilterContainer';
import { LoadingListTop } from '../../../pc/components/LoadingList';
import { useCategory } from '../../hook/useCategory';
import CategoryListTopContainer from './CategoryListTopContainer';
import { useCategoryFilter } from '../../hook/useCategoryFilter';
import { initializeScroll } from '../../../pc/util/initializeScroll';
import { useCategoriesPageQueries } from '../../Context/CategoriesDataProvider';
import { Error, ListContainer } from '../../../pc/components/styled-components';
import useProductList from '../../../hook/useProductList';
import ProductList from '../../../pc/containers/ProductList';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 1050px;
  margin-top: 50px;
  margin-bottom: 75px;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 480px;
  padding: 100px 0;
`;

export default function CategoryListContainer() {
  // Todo: activeFilter가 현재 적용된 필터가 맞기는 하나 `url`에 존재하는 필터이므로 `urlBasedFilter`로 변경 예정
  const { categoryNo, filters: activeFilter } = useCategoriesPageQueries();
  const { data: categoryData, status: categoryQueryStatus } = useCategory({ categoryNo });
  const {
    data: productsData,
    status: productListQueryStatus,
    isFetching,
    isError,
  } = useProductList({
    section: 'categories',
    code: categoryNo,
    defaultSortType: categoryData?.defaultSortType || '',
  });
  const { data: filterData, isLoading: filterLoading } = useCategoryFilter({
    categoryNo,
    productListQueryStatus,
  });
  const filteredAndSortedData = isArray(filterData)
    ? sortBy(filterData, [(item) => !eq(item.template, 'promotion')])
    : filterData;

  const titleRef = useRef<HTMLHeadingElement>(null);

  const scrollToTop = () => {
    initializeScroll({ refObject: titleRef });
  };

  return (
    <ListContainer>
      {categoryQueryStatus === 'success' ? (
        !!categoryData ? (
          <CategoryListTopContainer
            section="categories"
            defaultSortType={categoryData.defaultSortType}
            titleRef={titleRef}
          />
        ) : null
      ) : categoryQueryStatus === 'loading' ? (
        <LoadingListTop />
      ) : null}
      <Wrapper>
        {productListQueryStatus !== 'error' ? (
          <FilterContainer
            filterData={filteredAndSortedData}
            filterLoading={filterLoading}
            activeFilter={activeFilter}
          />
        ) : null}
        {categoryQueryStatus === 'success' ? (
          !!categoryData && !isEmpty(categoryData) ? (
            <ProductList
              section="categories"
              code={categoryNo}
              defaultSortType={categoryData.defaultSortType}
              availableSort={categoryData.availableSort}
              filterData={filteredAndSortedData}
              filterLoading={filterLoading}
              activeFilter={activeFilter}
              products={productsData?.products ?? []}
              meta={productsData?.meta}
              totalProductsCount={productsData?.meta.pagination.total ?? 0}
              productListQueryStatus={productListQueryStatus}
              isFetchingProducts={isFetching}
              isError={isError}
              scrollToTop={scrollToTop}
            />
          ) : (
            <ErrorWrapper>
              <Error />
            </ErrorWrapper>
          )
        ) : null}
      </Wrapper>
    </ListContainer>
  );
}
