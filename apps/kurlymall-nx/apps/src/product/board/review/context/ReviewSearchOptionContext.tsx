import { createContext, useContext, useState, useMemo, ReactNode, Dispatch, SetStateAction } from 'react';

import { noop, get, chain, keys, size } from 'lodash';

import type { ProductReviewSortType, ReviewFilterType } from '../types';
import { REVIEW_FILTER_TYPE, REVIEW_SORT_TYPE } from '../constants';

export type ReviewFiltersType = {
  [keyName in ReviewFilterType]: string[];
};

interface State {
  sortType: ProductReviewSortType;
  filters: ReviewFiltersType;
  actions: {
    setSortType: Dispatch<SetStateAction<ProductReviewSortType>>;
    setFilters: (filterType: ReviewFilterType, filterValue: string[]) => void;
    resetFilters: () => void;
    applyFilters: (nextFilters: ReviewFiltersType) => void;
  };
}

const initialState: State = {
  sortType: REVIEW_SORT_TYPE.RECOMMEND,
  filters: {
    DEAL_PRODUCT: [],
    MEMBER_GROUP: [],
  },
  actions: {
    setSortType: noop,
    setFilters: () => noop,
    resetFilters: () => noop,
    applyFilters: () => noop,
  },
};

const ReviewSearchOptionContext = createContext(initialState);

interface ReviewSearchOptionProviderProps {
  children: ReactNode;
}

export const ReviewSearchOptionProvider = ({ children }: ReviewSearchOptionProviderProps) => {
  const [sortType, setSortType] = useState<ProductReviewSortType>(REVIEW_SORT_TYPE.RECOMMEND);
  const [filters, setFilters] = useState<ReviewFiltersType>({
    DEAL_PRODUCT: [],
    MEMBER_GROUP: [],
  });
  const actions = useMemo(
    () => ({
      setSortType,
      setFilters: (filterType: ReviewFilterType, filterValue: string[]) =>
        setFilters((prev) => ({
          ...prev,
          [filterType]: filterValue,
        })),
      resetFilters: () => setFilters({ ...initialState.filters }),
      applyFilters: (nextFilters: ReviewFiltersType) => setFilters(nextFilters),
    }),
    [],
  );
  const value = useMemo(() => ({ sortType, filters, actions }), [sortType, filters, actions]);
  return <ReviewSearchOptionContext.Provider value={value}>{children}</ReviewSearchOptionContext.Provider>;
};

export const useReviewSearchOption = () => {
  const value = useContext(ReviewSearchOptionContext);
  if (value === undefined) {
    throw new Error('useReviewSearchOption 는 ReviewSearchOptionContext 와 함께 사용되어야 합니다.');
  }
  return value;
};

export const useSortType = () => {
  const value = useContext(ReviewSearchOptionContext);
  if (value === undefined) {
    throw new Error('useSortType 는 ReviewSearchOptionContext 와 함께 사용되어야 합니다.');
  }
  const {
    sortType,
    actions: { setSortType },
  } = value;
  return [sortType, setSortType] as const;
};

export const useFilters = () => {
  const value = useContext(ReviewSearchOptionContext);
  if (value === undefined) {
    throw new Error('useFilters 는 ReviewSearchOptionContext 와 함께 사용되어야 합니다.');
  }
  const filters = get(value, 'filters');
  const { setFilters, resetFilters, applyFilters } = get(value, 'actions');
  const getActiveFilterCount = () =>
    chain(keys(REVIEW_FILTER_TYPE))
      .map((reviewFilterType: ReviewFilterType) => size(filters[reviewFilterType]))
      .sum()
      .value();
  return [filters, { setFilters, resetFilters, applyFilters, getActiveFilterCount }] as const;
};

export const getActiveFilterCountByFilterType = (filterType: ReviewFilterType, filters: ReviewFiltersType) =>
  chain(filters).get(filterType).size().value();
