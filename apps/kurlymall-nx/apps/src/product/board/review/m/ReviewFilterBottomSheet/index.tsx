import styled from '@emotion/styled';
import { chain, isEmpty, isEqual, isUndefined, get, eq, size } from 'lodash';
import { useEffect, useState, useRef } from 'react';

import type { ReviewFilterOptionItem, ReviewFilterType, ReviewFilterTypeListMapping } from '../../types';
import { REVIEW_FILTER_TYPE } from '../../constants';
import COLOR from '../../../../../shared/constant/colorset';
import { ReviewFiltersType, useFilters } from '../../context/ReviewSearchOptionContext';

import useWindowSize from '../../../../../shared/hooks/useWindowSize';
import { useReviewCount } from '../../hooks/useReviewCount';

import SlideModal from '../../../../../shared/components/modal/SlideModal';
import { TabBar } from './TabBar';
import { BottomActions } from './BottomActions';
import { FilterList } from './FilterList';
import { useReviewFilters } from '../../hooks/useReviewFilters';
import { getActiveFilterListByFilterType } from '../../utils';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 71vh;
  max-height: calc(var(--vh) * 100 - 44px);
`;

const BottomSheetContentWrap = styled.div`
  display: flex;
  flex: 1;
  flex-shrink: 0;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h3`
  flex-shrink: 0;
  padding: 0 20px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 8px;
  color: ${COLOR.kurlyGray800};
`;

export type FilterDictionaryState = {
  [filterType in ReviewFilterType]: FilterDictionary;
};

export type FilterDictionary = {
  [code: string]: boolean;
};

export type FilterListItemProp = ReviewFilterOptionItem & {
  active: boolean;
};

const getFilterListByFilterType = (
  filterType: ReviewFilterType,
  filterTypeListDataMapping: ReviewFilterTypeListMapping,
) => {
  const targetList = get(filterTypeListDataMapping[filterType], 'list');
  if (isUndefined(targetList) || isEmpty(targetList)) {
    return [];
  }
  return targetList;
};
const getFilterDictionaryByFilterType = (
  filterType: ReviewFilterType,
  filterDictionary: FilterDictionaryState,
): FilterDictionary => get(filterDictionary, filterType, {});

const getCurrentFilterList = (
  filterType: ReviewFilterType,
  filterDictionary: FilterDictionaryState,
  filterTypeListDataMapping: ReviewFilterTypeListMapping,
) => {
  const targetFilterList = getFilterListByFilterType(filterType, filterTypeListDataMapping);
  const targetDictionary = getFilterDictionaryByFilterType(filterType, filterDictionary);
  return targetFilterList.map((item) => ({ ...item, active: targetDictionary[item.code] }));
};

const getActiveFilterCount = (filterType: ReviewFilterType, filterDictionary: FilterDictionaryState) =>
  chain(filterDictionary[filterType])
    .keys()
    .filter((code) => filterDictionary[filterType][code])
    .size()
    .value();

const transformReviewFiltersToDictionary = (filters: ReviewFiltersType) =>
  chain(filters)
    .keys()
    .map((type: ReviewFilterType) => {
      const targetFilters = filters[type];
      const values = chain(targetFilters)
        .map((code) => [code, true])
        .fromPairs()
        .value();
      return [type, values];
    })
    .fromPairs()
    .value() as FilterDictionaryState;

const transformFilterDictionaryToReviewFilters = (filterDictionary: FilterDictionaryState): ReviewFiltersType =>
  chain(filterDictionary)
    .keys()
    .map((key: ReviewFilterType) => {
      const targetDictionary = filterDictionary[key];
      const activeCodeList = chain(targetDictionary)
        .entries()
        .filter((entry) => {
          const [, state] = entry;
          return isEqual(state, true);
        })
        .map((entry) => {
          const [code] = entry;
          return code;
        })
        .value();
      return [key, activeCodeList];
    })
    .fromPairs()
    .value() as ReviewFiltersType;

const initialFilterDictionary: FilterDictionaryState = {
  DEAL_PRODUCT: {},
  MEMBER_GROUP: {},
};

interface Props {
  open: boolean;
  contentsProductNo: number;
  filterType: ReviewFilterType;
  onClose(): void;
  onChangeFilterType(filterType: ReviewFilterType): void;
}

export const ReviewFilterBottomSheet = ({
  open,
  contentsProductNo,
  filterType,
  onChangeFilterType,
  onClose,
}: Props) => {
  const prevOpenRef = useRef(open);
  const { height: windowInnerHeight } = useWindowSize();
  const [filters, { applyFilters }] = useFilters();
  const [filterDictionary, setFilterDictionary] = useState<FilterDictionaryState>(initialFilterDictionary);
  const {
    filterTypeList,
    filterTypeListDataMapping,
    isLoading: isFilterTypeListLoading,
    isError: isFilterTypeListError,
  } = useReviewFilters({ contentsProductNo });
  const tabList = filterTypeList.map((filterTypeItem) => {
    const { value } = filterTypeItem;
    return {
      ...filterTypeItem,
      active: eq(value, filterType),
      count: getActiveFilterCount(value, filterDictionary),
    };
  });
  const activeFilterList = {
    DEAL_PRODUCT: getActiveFilterListByFilterType(REVIEW_FILTER_TYPE.DEAL_PRODUCT, filterDictionary),
    MEMBER_GROUP: getActiveFilterListByFilterType(REVIEW_FILTER_TYPE.MEMBER_GROUP, filterDictionary),
  };
  const { reviewCount, isLoading } = useReviewCount({
    contentsProductNo,
    dealProduct: activeFilterList.DEAL_PRODUCT,
    memberGroup: activeFilterList.MEMBER_GROUP,
  });
  const totalActiveFilterCount = chain(activeFilterList)
    .keys()
    .map((key: ReviewFilterType) => size(activeFilterList[key]))
    .sum()
    .value();
  const currentFilterList = getCurrentFilterList(filterType, filterDictionary, filterTypeListDataMapping);
  const isResetButtonDisabled = isEqual(totalActiveFilterCount, 0);

  const handleClickFilterType = (nextFilterType: ReviewFilterType) => () => onChangeFilterType(nextFilterType);
  const handleClickFilterItem = (targetFilterType: ReviewFilterType) => (code: string) => () => {
    const prevActive = isEqual(filterDictionary[targetFilterType][code], true);
    const nextFilterDictionary = {
      ...filterDictionary,
      [targetFilterType]: {
        ...filterDictionary[targetFilterType],
        [code]: !prevActive,
      },
    };
    setFilterDictionary(nextFilterDictionary);
  };
  const handleClickReset = () => setFilterDictionary(initialFilterDictionary);
  const handleClickApplyFilter = () => {
    applyFilters(transformFilterDictionaryToReviewFilters(filterDictionary));
    onClose();
  };

  useEffect(() => {
    const vh = windowInnerHeight * 0.01;
    if (vh > 0) {
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }, [windowInnerHeight]);

  useEffect(() => {
    if (!prevOpenRef.current && open) {
      setFilterDictionary(transformReviewFiltersToDictionary(filters));
    }
    prevOpenRef.current = open;
  }, [open, filters]);

  useEffect(() => {
    if (!isFilterTypeListError) {
      return;
    }
    onClose();
  }, [isFilterTypeListError, onClose]);

  return (
    <SlideModal open={open} onClose={onClose}>
      <Wrap>
        <BottomSheetContentWrap>
          <Title>필터</Title>
          <TabBar isLoading={isFilterTypeListLoading} tabList={tabList} onClickTabItem={handleClickFilterType} />
          <FilterList
            isLoading={isFilterTypeListLoading}
            list={currentFilterList}
            onClickFilterItem={handleClickFilterItem(filterType)}
          />
        </BottomSheetContentWrap>
        <BottomActions
          disableReset={isResetButtonDisabled}
          onClickApply={handleClickApplyFilter}
          onClickReset={handleClickReset}
          reviewCount={reviewCount}
          isReviewCountLoading={isLoading}
        />
      </Wrap>
    </SlideModal>
  );
};
