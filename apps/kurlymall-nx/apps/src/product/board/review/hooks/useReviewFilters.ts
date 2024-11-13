import { chain, eq, isEmpty, some } from 'lodash';

import { useReviewFilter } from './useReviewFilter';
import { REVIEW_FILTER_TYPE, REVIEW_FILTER_TYPE_LIST } from '../constants';
import { isNotEmpty } from '../../../../shared/utils/lodash-extends';
import type { ReviewFilterTypeListMapping } from '../types';

interface Props {
  contentsProductNo: number;
}

export const useReviewFilters = ({ contentsProductNo }: Props) => {
  const {
    reviewFilterName: dealProductFilterName,
    reviewFilterList: dealProductFilterList,
    isLoading: isDealProductFilterLoading,
    isError: isDealProductFilterError,
  } = useReviewFilter({
    contentsProductNo,
    filterType: REVIEW_FILTER_TYPE.DEAL_PRODUCT,
  });
  const filterTypeListDataMapping: ReviewFilterTypeListMapping = {
    DEAL_PRODUCT: {
      list: dealProductFilterList,
      name: dealProductFilterName,
    },
    MEMBER_GROUP: {
      list: [],
      name: '',
    },
  };
  const isLoading = some([isDealProductFilterLoading]);
  const isError = some([isDealProductFilterError]);
  const filterTypeList = chain(REVIEW_FILTER_TYPE_LIST)
    .filter((filterType) => {
      const { list } = filterTypeListDataMapping[filterType];
      return isNotEmpty(list);
    })
    .map((filterType) => {
      const { name } = filterTypeListDataMapping[filterType];
      return {
        label: name,
        value: filterType,
      };
    })
    .value();

  const isAllFilterEmpty = chain(filterTypeListDataMapping)
    .entries()
    .map(([, { list }]) => list)
    .map(isEmpty)
    .every((v) => eq(v, true))
    .value();

  return {
    isLoading,
    isError,
    filterTypeList,
    isFilterTypeListEmpty: isEmpty(filterTypeList),
    filterTypeListDataMapping,
    isAllFilterEmpty,
  };
};
