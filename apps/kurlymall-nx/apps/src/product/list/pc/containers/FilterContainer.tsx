import styled from '@emotion/styled';

import { eq, isArray, isEmpty, isEqual, sortBy } from 'lodash';

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import COLOR from '../../../../shared/constant/colorset';
import { hiddenScrollBar } from '../../../../shared/utils/hidden-scrollbar';

import { Reset } from '../../../../shared/icons';
import FilterGroupList from '../components/FilterGroupList';
import { LoadingFilter } from '../components/LoadingList';
import { zIndex } from '../../../../shared/styles';

import type { FilterGroup } from '../../types';
import type { UrlBasedFilter } from '../../shared/util/parseFilterData';
import getValidatedFiltersAndUrlFilters from '../../shared/util/getValidatedFiltersAndUrlFilters';
import { redirectTo } from '../../../../shared/reducers/page';

const Wrapper = styled.div<{ isFilterLoading: boolean }>`
  position: sticky;
  width: 220px;
  flex-shrink: 0;
  height: 100%;
  max-height: calc(100vh - 120px);
  top: 80px;
  margin-right: 47px;
  border-bottom: ${({ isFilterLoading }) => !isFilterLoading && `1px solid ${COLOR.kurlyGray200}`};
  ${hiddenScrollBar()};
`;

const TitleContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  z-index: ${zIndex.productDetailListFilter};
  background-color: ${COLOR.kurlyWhite};
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid ${COLOR.kurlyGray200};
  line-height: 20px;
`;

const Title = styled.span`
  font-weight: 500;
  font-size: 15px;
  color: ${COLOR.kurlyGray800};
`;

const ResetContainer = styled.button<{ isEnableResetFilter: boolean }>`
  display: flex;
  align-items: center;
  pointer-events: ${({ isEnableResetFilter }) => !isEnableResetFilter && 'none'};
`;

const ResetText = styled.span<{ isEnableResetFilter: boolean }>`
  margin-left: 5px;
  font-weight: 500;
  color: ${({ isEnableResetFilter }) => (isEnableResetFilter ? COLOR.kurlyGray600 : COLOR.lightGray)};
`;

interface Props {
  filterData?: FilterGroup[];
  filterLoading: boolean;
  // TODO: 카컬검에서 내려주므로 props 제거가 힘듦...
  activeFilter: UrlBasedFilter;
}

function FilterContainer({ filterData, filterLoading, activeFilter }: Props) {
  const router = useRouter();
  const { pathname, query } = router;
  const [isEnableResetFilter, setIsEnableResetFilter] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const filteredAndSortedData = isArray(filterData)
    ? sortBy(filterData, [(item) => !eq(item.template, 'promotion')])
    : filterData;

  const dispatch = useDispatch();

  const resetFilter = () => {
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
  };

  const handleReset = () => {
    resetFilter();
  };

  useEffect(() => {
    if (isEmpty(activeFilter)) {
      setIsEnableResetFilter(false);
    }
  }, [activeFilter]);

  useEffect(() => {
    if (wrapperRef.current && !isEmpty(filteredAndSortedData)) {
      wrapperRef.current.scroll(0, 0);
    }
  }, [filteredAndSortedData]);

  useEffect(() => {
    if (isEmpty(filteredAndSortedData) || !filteredAndSortedData) {
      return;
    }

    const { validatedFilters, urlFilters } = getValidatedFiltersAndUrlFilters({
      activeFilter,
      filterData: filteredAndSortedData,
    });

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

    setIsEnableResetFilter(validatedFilters.length > 0);
  }, [activeFilter, filteredAndSortedData, pathname, query, dispatch]);

  if (!filterLoading && isEmpty(filteredAndSortedData)) {
    return null;
  }

  // 여기서 새로운 Context로 감싸기..?
  return (
    <Wrapper ref={wrapperRef} isFilterLoading={filterLoading}>
      <TitleContainer>
        <Title>필터</Title>
        <ResetContainer onClick={handleReset} isEnableResetFilter={isEnableResetFilter}>
          <Reset width={12} height={12} stroke={isEnableResetFilter ? COLOR.kurlyGray600 : COLOR.lightGray} />
          <ResetText isEnableResetFilter={isEnableResetFilter}>초기화</ResetText>
        </ResetContainer>
      </TitleContainer>
      {filterLoading ? <LoadingFilter /> : null}
      {!!filteredAndSortedData ? (
        <FilterGroupList filterData={filteredAndSortedData} activeFilter={activeFilter} />
      ) : null}
    </Wrapper>
  );
}

export default FilterContainer;
