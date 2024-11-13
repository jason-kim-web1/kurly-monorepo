import { useQuery } from '@tanstack/react-query';

import { fetchCouponPack } from '../../../shared/api/membership/membership.api';
import { getSecond } from '../../../shared/utils/time';
import { useAppSelector } from '../../../shared/store';

const STALE_TIME = getSecond(60);

export default function useCouponPackQuery() {
  const isSubscribed = useAppSelector(({ member }) => member.subscription.isSubscribed);

  const queryKey = ['mypage', 'couponpack'];
  const queryResult = useQuery(queryKey, () => fetchCouponPack(), {
    staleTime: STALE_TIME,
    enabled: isSubscribed,
  });
  const { data } = queryResult;

  const selectedBenefitOptionId = data?.selectedBenefitOptionId ?? 0;
  const providedBenefitOptionId = data?.providedBenefitOptionId ?? 0;
  const couponMetaList = data?.benefitOptionCouponMetaList ?? [];

  return { ...queryResult, queryKey, selectedBenefitOptionId, providedBenefitOptionId, couponMetaList };
}
