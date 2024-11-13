import styled from '@emotion/styled';

import { useCallback, useEffect, useRef, useState } from 'react';

import { chain, fromPairs, get, isEqual, map, size, some } from 'lodash';

import { motion } from 'framer-motion';

import COLOR from '../../../../../shared/constant/colorset';
import FilterTypeButton from './FilterTypeButton';
import {
  getActiveFilterCountByFilterType,
  ReviewFiltersType,
  useFilters,
  useSortType,
} from '../../context/ReviewSearchOptionContext';
import type { ReviewFilterType } from '../../types';
import useToggle from '../../../../../order/checkout/shared/hooks/useToggle';
import ReviewFilterModal from '../ReviewFilterModal';
import { FilterDictionary, FilterDictionaryState } from '../../m/ReviewFilterBottomSheet';
import { useReviewFilters } from '../../hooks/useReviewFilters';
import { useReviewCount } from '../../hooks/useReviewCount';
import { PRODUCT_REVIEW_COMMON_TRANSITION, REVIEW_FILTER_TYPE, REVIEW_FILTER_TYPE_LIST } from '../../constants';
import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';
import Repeat from '../../../../../shared/components/Repeat';
import { getActiveFilterListByFilterType } from '../../utils';
import { ne } from '../../../../../shared/utils/lodash-extends';
import {
  ResetReviewFilter,
  SelectReviewFilterButton,
  SubmitReviewFilter,
} from '../../../../../shared/amplitude/events/review';
import { amplitudeService } from '../../../../../shared/amplitude';
import { useAppSelector } from '../../../../../shared/store';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${COLOR.kurlyWhite};
  gap: 10px;
  padding-bottom: 20px;
  list-style: none;
`;

const getFilterDictionary = (
  filterType: ReviewFilterType,
  filterDictionary: FilterDictionaryState,
): FilterDictionary => {
  const targetFilterDictionary = {
    DEAL_PRODUCT: filterDictionary.DEAL_PRODUCT,
    MEMBER_GROUP: filterDictionary.MEMBER_GROUP,
  }[filterType];
  return targetFilterDictionary || {};
};

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

const LIST_DEFAULT_PAGE = 1;

interface Props {
  contentsProductNo: number;
  prevReviewCount: number;
  onChangeCurrentPage(pageNum: number): void;
}

export default function ReviewQuickFilter({ contentsProductNo, prevReviewCount, onChangeCurrentPage }: Props) {
  const { filterTypeList, isFilterTypeListEmpty, isLoading, isError } = useReviewFilters({ contentsProductNo });
  const [filters, { applyFilters, resetFilters }] = useFilters();
  const { isOpen, open, close } = useToggle();
  const prevProductNoRef = useRef(contentsProductNo);
  const ref = useRef<{ index: number; key: ReviewFilterType; width: number }[]>([]);
  const [sortType] = useSortType();
  const [selectedFilterType, setSelectedFilterType] = useState<ReviewFilterType>(REVIEW_FILTER_TYPE.DEAL_PRODUCT);
  const [filterDictionary, setFilterDictionary] = useState<FilterDictionaryState>(initialFilterDictionary);
  const { discountedPrice, basePrice, retailPrice, name, contentType, deliveryTypeInfos, sellerName } = useAppSelector(
    ({ productDetail }) => productDetail,
  );
  const isModalOpen = (filterType: ReviewFilterType) => isOpen && selectedFilterType === filterType;
  const targetFilterDictionary = getFilterDictionary(selectedFilterType, filterDictionary);
  const activeFilterList = {
    DEAL_PRODUCT: getActiveFilterListByFilterType(REVIEW_FILTER_TYPE.DEAL_PRODUCT, filterDictionary),
    MEMBER_GROUP: getActiveFilterListByFilterType(REVIEW_FILTER_TYPE.MEMBER_GROUP, filterDictionary),
  };
  const currentActiveFilterCount = size(get(activeFilterList, selectedFilterType, []));
  const isResetButtonDisabled = isEqual(currentActiveFilterCount, 0);
  const [isResetFilter, setIsResetFilter] = useState(false);
  const { reviewCount, isLoading: isReviewCountLoading } = useReviewCount({
    contentsProductNo,
    dealProduct: activeFilterList.DEAL_PRODUCT,
    memberGroup: activeFilterList.MEMBER_GROUP,
  });
  const shouldHideQuickFilter = some([isFilterTypeListEmpty && !isLoading, isError]);

  const restoreFilters = (targetFilterType: ReviewFilterType) => {
    const prevFilterList = filters[targetFilterType].reduce((acc, code) => ({ ...acc, [code]: true }), {});
    return {
      ...filterDictionary,
      [targetFilterType]: prevFilterList,
    };
  };

  const handleClickClose = (prevFilterType: ReviewFilterType) => () => {
    const prevFilterDictionary = restoreFilters(prevFilterType);
    setFilterDictionary(prevFilterDictionary);
    close();
  };

  const handleClickFilterType = (filterGroup: ReviewFilterType) => () => {
    if (isOpen) {
      handleClickClose(filterGroup);
      return;
    }

    amplitudeService.logEvent(
      new SelectReviewFilterButton({
        filterGroup,
        selectionSortType: sortType,
        retailPrice,
        basePrice,
        discountedPrice,
        contentsProductNo,
        name,
        contentType,
        deliveryTypeInfos,
        sellerName,
      }),
    );

    setSelectedFilterType(filterGroup);
    setFilterDictionary({
      ...filterDictionary,
      [filterGroup]: fromPairs(map(filters[filterGroup], (code) => [code, true])),
    });
    open();
  };

  const handleClickFilterItem = (targetFilterType: ReviewFilterType, code: string) => () => {
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

  const handleClickFiltersReset = () => {
    const nextFilterDictionary = {
      ...filterDictionary,
      [selectedFilterType]: {},
    };
    setFilterDictionary(nextFilterDictionary);
    setIsResetFilter(true);
  };

  const handleApplyFilters = () => {
    onChangeCurrentPage(LIST_DEFAULT_PAGE);
    const transformedFilterDictionary = transformFilterDictionaryToReviewFilters(filterDictionary);
    applyFilters(transformedFilterDictionary);
    setIsResetFilter(false);
    close();

    const isCleanedFilters = Object.values(targetFilterDictionary).some((it) => !it);
    if (isResetFilter || isCleanedFilters) {
      amplitudeService.logEvent(new ResetReviewFilter());
      return;
    }

    amplitudeService.logEvent(
      new SubmitReviewFilter({
        filterGroup: selectedFilterType,
        contentCount: prevReviewCount,
        filterFacetLovers: transformedFilterDictionary.MEMBER_GROUP,
        filterFacetDeal: transformedFilterDictionary.DEAL_PRODUCT,
        filterReviewCount: reviewCount,
        selectionSortType: sortType,
        retailPrice,
        basePrice,
        discountedPrice,
        contentsProductNo,
        name,
        contentType,
        deliveryTypeInfos,
        sellerName,
      }),
    );
  };

  const getCalculatedModalLeft = useCallback(() => {
    const foundItem = ref.current.find(({ key }) => key === selectedFilterType);
    if (foundItem && foundItem.index === 0) {
      return 0;
    }
    return ref.current.reduce((acc, { width }) => width + 8, 0);
  }, [selectedFilterType]);

  useEffect(() => {
    if (ne(prevProductNoRef.current, contentsProductNo)) {
      resetFilters();
    }
    prevProductNoRef.current = contentsProductNo;
  }, [contentsProductNo, resetFilters]);

  if (shouldHideQuickFilter) {
    return null;
  }

  return (
    <Wrapper>
      {isLoading ? (
        <Repeat count={size(REVIEW_FILTER_TYPE_LIST)}>
          <motion.li {...PRODUCT_REVIEW_COMMON_TRANSITION}>
            <SkeletonLoading width={100} height={38} radius={19} />
          </motion.li>
        </Repeat>
      ) : (
        filterTypeList.map(({ label, value }, index) => (
          <FilterTypeButton
            key={value}
            ref={(element) => {
              if (!element) {
                return;
              }
              const { width } = element.getBoundingClientRect();
              ref.current[index] = { index, key: value, width };
            }}
            label={label}
            count={getActiveFilterCountByFilterType(value, filters)}
            onClick={handleClickFilterType(value)}
            open={isModalOpen(value)}
          />
        ))
      )}
      <ReviewFilterModal
        open={isOpen}
        modalLeft={getCalculatedModalLeft()}
        contentsProductNo={contentsProductNo}
        filterType={selectedFilterType}
        filterDictionary={targetFilterDictionary}
        onClickClose={handleClickClose(selectedFilterType)}
        onClickFilterItem={handleClickFilterItem}
        onClickFiltersReset={handleClickFiltersReset}
        onClickApplyFilter={handleApplyFilters}
        disableReset={isResetButtonDisabled}
        reviewCount={reviewCount}
        isReviewCountLoading={isReviewCountLoading}
      />
    </Wrapper>
  );
}
