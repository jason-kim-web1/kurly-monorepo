import styled from '@emotion/styled';

import { useRouter } from 'next/router';

import { chain } from 'lodash';

import type { Dispatch, SetStateAction } from 'react';

import { zIndex } from '../../../shared/styles';
import COLOR from '../../../shared/constant/colorset';

import SearchProductsCount from './SearchProductsCount';
import SearchProductsSort from './SearchProductsSort';
import SearchProductFilterButton from './SearchProductFilterButton';
import { parseQueryString } from '../../../shared/utils/parseQueryString';
import { DEFAULT_SORT_TYPE } from '../../shared/constants';
import { ProductAvailableSort } from '../../../product/list/types';
import { UrlBasedFilter } from '../../../product/list/shared/util/parseFilterData';

const Container = styled.nav`
  display: flex;
  position: sticky;
  top: 44px;
  width: 100%;
  padding: 4px 16px 2px 20px;
  justify-content: space-between;
  z-index: ${zIndex.productSort};
  background-color: ${COLOR.kurlyWhite};
`;

const SortAndFilterGroup = styled.div`
  display: flex;
`;

interface Props {
  totalProductsCount: number;
  sortOptions: ProductAvailableSort[];
  onSortingEvent: Dispatch<SetStateAction<boolean>>;
  onChangeSortEvent: ({ type, name }: { type: string; name: string }) => void;
  toggleModalState: () => void;
  urlFilters: UrlBasedFilter;
}

export default function SearchSortBarContainer({
  totalProductsCount,
  sortOptions,
  onSortingEvent,
  onChangeSortEvent,
  toggleModalState,
  urlFilters,
}: Props) {
  const router = useRouter();
  const { pathname, query } = router;
  const { sorted_type: parsedSortType } = parseQueryString(query);
  const selectedType = parsedSortType || DEFAULT_SORT_TYPE;

  const sortOptionsWithLink = sortOptions.map(({ type, name }) => {
    const newQuery = {
      ...query,
      sorted_type: type,
    };
    const queryParams = chain(newQuery)
      .entries()
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
      .value();
    return {
      type,
      name,
      link: `${pathname}?${queryParams}`,
    };
  });

  return (
    <Container>
      <SearchProductsCount totalProductsCount={totalProductsCount} />
      <SortAndFilterGroup>
        <SearchProductsSort
          sortOptions={sortOptionsWithLink}
          selectedType={selectedType}
          onSortingEvent={onSortingEvent}
          onChangeSortEvent={onChangeSortEvent}
        />
        <SearchProductFilterButton toggleModalState={toggleModalState} urlFilters={urlFilters} />
      </SortAndFilterGroup>
    </Container>
  );
}
