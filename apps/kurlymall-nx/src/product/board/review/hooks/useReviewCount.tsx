import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { fetchReviewCount } from '../../../../shared/api';

import { useAppSelector } from '../../../../shared/store';
import { everyTrue } from '../../../../shared/utils/lodash-extends';
import { checkValidContentProductNo } from '../../../utils';
import { ReviewKeys } from '../queries';
import { getProductReviewFilterQueryString } from '../utils';

interface UseReviewListCountProps {
  contentsProductNo: number;
  dealProduct: string[];
  memberGroup: string[];
}

export const useReviewCount = ({ contentsProductNo, dealProduct, memberGroup }: UseReviewListCountProps) => {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const filters = getProductReviewFilterQueryString(dealProduct, memberGroup);
  const queryResult = useQuery(
    ReviewKeys.count(contentsProductNo, filters),
    () => fetchReviewCount({ contentsProductNo, filters }),
    {
      enabled: everyTrue([hasSession, checkValidContentProductNo(contentsProductNo)]),
      staleTime: 1000 * 60 * 3,
    },
  );
  const { data } = queryResult;
  const reviewCount = get(data, 'data.count', 0);
  return {
    ...queryResult,
    reviewCount,
  };
};
