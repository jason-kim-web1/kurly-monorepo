import { useQuery } from '@tanstack/react-query';

import { getSecond } from '../../../../shared/utils/time';
import { getLuckyBoxCoupons } from '../../../../shared/api/coupon/coupon.api';

export default function useLuckyBoxQuery() {
  const queryKey = ['mypage', 'luckybox', 'list'];
  const queryResult = useQuery(queryKey, () => getLuckyBoxCoupons(), {
    staleTime: getSecond(60),
  });
  const { data } = queryResult;

  return { ...queryResult, queryKey, data: data ?? [] };
}
