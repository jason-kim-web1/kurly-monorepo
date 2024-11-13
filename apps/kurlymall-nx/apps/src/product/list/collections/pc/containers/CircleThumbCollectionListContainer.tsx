import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { useCallback, useRef } from 'react';

import { useCollection } from '../../hook/useCollection';
import FilterContainer from '../../../pc/containers/FilterContainer';
import { useCollectionFilter } from '../../hook/useCollectionFilter';
import { useCollectionListPageQueryParams } from '../../hook/useCollectionsPageQueryParams';
import { ListContainer, Error } from '../../../pc/components/styled-components';
import { Error as RetryError } from '../../../shared/components/Error';
import useProductList from '../../../hook/useProductList';
import ProductList from '../../../pc/containers/ProductList';
import { FilterScrollPolicy } from '../../../shared/components/FilterScrollPolicy';

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

interface Props {
  collectionName: string;
}

export default function CircleThumbCollectionListContainer({ collectionName }: Props) {
  const { data: collectionData, status: collectionQueryStatus, isDesignKindNumber } = useCollection({ collectionName });
  const {
    data: productsData,
    status: productListQueryStatus,
    isFetching,
    isError,
    refetch: refetchProductList,
  } = useProductList({
    section: 'collections',
    code: collectionName,
    defaultSortType: collectionData?.defaultSortType || '',
  });
  const { data: filterData, isLoading: filterLoading } = useCollectionFilter({
    collectionName,
    productListQueryStatus,
  });
  const { filters: activeFilter } = useCollectionListPageQueryParams();

  const productListWrapperRef = useRef<HTMLDivElement>(null);

  const getScrollPositionOnFilterChange = useCallback(() => {
    return productListWrapperRef.current?.offsetTop || 0;
  }, []);

  return (
    <ListContainer>
      <Wrapper ref={productListWrapperRef}>
        <FilterScrollPolicy offsetGetter={getScrollPositionOnFilterChange}>
          {productListQueryStatus !== 'error' && !isDesignKindNumber ? (
            <FilterContainer filterData={filterData} filterLoading={filterLoading} activeFilter={activeFilter} />
          ) : null}
          {collectionQueryStatus === 'success' ? (
            !!collectionData && !isEmpty(collectionData) ? (
              <ProductList
                section="collections"
                code={collectionName}
                defaultSortType={collectionData.defaultSortType}
                availableSort={collectionData.availableSort}
                filterData={filterData}
                filterLoading={filterLoading}
                activeFilter={activeFilter}
                products={productsData?.products ?? []}
                meta={productsData?.meta}
                totalProductsCount={productsData?.meta.pagination.total ?? 0}
                productListQueryStatus={productListQueryStatus}
                isFetchingProducts={isFetching}
                isError={isError}
                isDesignKindNumber={isDesignKindNumber}
              />
            ) : (
              <ErrorWrapper>
                {productListQueryStatus === 'error' ? <RetryError onRetry={refetchProductList} /> : <Error />}
              </ErrorWrapper>
            )
          ) : null}
        </FilterScrollPolicy>
      </Wrapper>
    </ListContainer>
  );
}
