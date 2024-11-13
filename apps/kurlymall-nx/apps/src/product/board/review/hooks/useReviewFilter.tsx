import { useQuery } from '@tanstack/react-query';
import { eq, get, isEmpty } from 'lodash';

import { fetchReviewFilter } from '../../../../shared/api';

import type {
  FetchReviewFilterProps,
  FetchReviewFilterResponse,
  ReviewFilterOptionItem,
  ReviewFilterType,
} from '../types';
import { useAppSelector } from '../../../../shared/store';

import { everyTrue, isNotEmpty } from '../../../../shared/utils/lodash-extends';
import { checkValidContentProductNo } from '../../../utils';
import { ReviewKeys } from '../queries';
import { REVIEW_FILTER_TYPE, REVIEW_MEMBERSHIP_TYPE } from '../constants';

const getReviewFilterList = (data: FetchReviewFilterResponse | undefined): ReviewFilterOptionItem[] => {
  if (isEmpty(data)) {
    return [];
  }
  const options = get(data, 'data.options', []) as ReviewFilterOptionItem[];
  return options.map((option) => {
    const { count } = option;
    return {
      ...option,
      disabled: eq(count, 0),
    };
  });
};

const getReviewFilterName = (data: FetchReviewFilterResponse | undefined): string =>
  get(data, 'data.filterTypeName', '');

const checkReviewFilterEnabled = (hasSession: boolean, contentsProductNo: number, filterType: string) =>
  everyTrue([hasSession, checkValidContentProductNo(contentsProductNo), isNotEmpty(filterType)]);

const getFilterTypeValue = (filterType: ReviewFilterType) =>
  filterType === REVIEW_FILTER_TYPE.MEMBER_GROUP ? REVIEW_MEMBERSHIP_TYPE : filterType;

export const useReviewFilter = ({ contentsProductNo, filterType }: FetchReviewFilterProps) => {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const queryResult = useQuery(
    ReviewKeys.filter(contentsProductNo, filterType),
    () => fetchReviewFilter({ contentsProductNo, filterType: getFilterTypeValue(filterType) }),
    {
      enabled: checkReviewFilterEnabled(hasSession, contentsProductNo, filterType),
    },
  );
  const { data } = queryResult;
  const reviewFilterName = getReviewFilterName(data);
  const reviewFilterList = getReviewFilterList(data);
  return {
    ...queryResult,
    reviewFilterName,
    reviewFilterList,
  };
};
