import styled from '@emotion/styled';
import { eq, isArray, isEmpty, sortBy } from 'lodash';
import { useCallback, useRef } from 'react';

import { useCollection } from '../../hook/useCollection';
import CollectionListTopContainer from './CollectionListTopContainer';
import FilterContainer from '../../../pc/containers/FilterContainer';
import { LoadingListTop } from '../../../pc/components/LoadingList';
import { useCollectionFilter } from '../../hook/useCollectionFilter';
import { useCollectionListPageQueryParams } from '../../hook/useCollectionsPageQueryParams';
import { ListContainer, Error } from '../../../pc/components/styled-components';
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
  isCollectionGroup?: boolean;
}

export default function CollectionListContainer({ collectionName, isCollectionGroup }: Props) {
  const { data: collectionData, status: collectionQueryStatus, isDesignKindNumber } = useCollection({ collectionName });
  const {
    data: productsData,
    status: productListQueryStatus,
    isFetching,
    isError,
  } = useProductList({
    section: 'collections',
    code: collectionName,
    defaultSortType: collectionData?.defaultSortType || '',
  });
  const { data: filterData, isLoading: filterLoading } = useCollectionFilter({
    collectionName,
    productListQueryStatus,
  });
  const filteredAndSortedData = isArray(filterData)
    ? sortBy(filterData, [(item) => !eq(item.template, 'promotion')])
    : filterData;

  const { filters: activeFilter } = useCollectionListPageQueryParams();
  const productListWrapperRef = useRef<HTMLDivElement>(null);

  const getScrollPositionOnFilterChange = useCallback(() => {
    return productListWrapperRef.current?.offsetTop || 0;
  }, []);

  return (
    <ListContainer>
      {!isCollectionGroup ? (
        <>
          {collectionQueryStatus === 'success' ? (
            !!collectionData ? (
              <CollectionListTopContainer
                collectionName={collectionName}
                section="collections"
                defaultSortType={collectionData.defaultSortType}
              />
            ) : null
          ) : collectionQueryStatus === 'loading' ? (
            <LoadingListTop isDesignKindNumber={isDesignKindNumber} />
          ) : null}
        </>
      ) : null}
      <Wrapper ref={productListWrapperRef}>
        <FilterScrollPolicy offsetGetter={getScrollPositionOnFilterChange}>
          {productListQueryStatus !== 'error' && !isDesignKindNumber ? (
            <FilterContainer
              filterData={filteredAndSortedData}
              filterLoading={filterLoading}
              activeFilter={activeFilter}
            />
          ) : null}
          {collectionQueryStatus === 'success' ? (
            !!collectionData && !isEmpty(collectionData) ? (
              <ProductList
                section="collections"
                code={collectionName}
                defaultSortType={collectionData.defaultSortType}
                availableSort={collectionData.availableSort}
                filterData={filteredAndSortedData}
                filterLoading={filterLoading}
                activeFilter={activeFilter}
                products={productsData?.products ?? []}
                meta={productsData?.meta}
                totalProductsCount={productsData?.meta.pagination.total ?? 0}
                productListQueryStatus={productListQueryStatus}
                isFetchingProducts={isFetching}
                isDesignKindNumber={isDesignKindNumber}
                isError={isError}
              />
            ) : (
              <ErrorWrapper>
                <Error />
              </ErrorWrapper>
            )
          ) : null}
        </FilterScrollPolicy>
      </Wrapper>
    </ListContainer>
  );
}
