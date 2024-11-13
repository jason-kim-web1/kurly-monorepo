import { useQuery } from '@tanstack/react-query';

import { useMemo } from 'react';

import { getSecond } from '../../../../shared/utils/time';
import { getCoupon } from '../../../../shared/api/coupon/coupon.api';
import useLuckyBoxQuery from './useLuckyBoxQuery';
import { convertCouponData, convertLuckyBoxCoupon } from '../utils/couponResponseConvert';

export default function useCouponListQuery() {
  const { isLoading: isLuckyBoxLoading, data: luckyBoxData } = useLuckyBoxQuery();

  const queryKey = ['mypage', 'coupon', 'list'];
  const queryResult = useQuery(queryKey, () => getCoupon(), {
    staleTime: getSecond(60),
    enabled: !isLuckyBoxLoading,
  });

  const { data: couponData } = queryResult;

  const coupons = useMemo(() => {
    return couponData ? couponData.map(convertCouponData) : [];
  }, [couponData]);

  const luckyBoxCoupons = useMemo(() => {
    return luckyBoxData ? luckyBoxData.map(convertLuckyBoxCoupon).filter(({ isExpired }) => !isExpired) : [];
  }, [luckyBoxData]);

  const couponList = useMemo(() => {
    return luckyBoxCoupons.concat(coupons);
  }, [coupons, luckyBoxCoupons]);

  return { ...queryResult, queryKey, data: couponList };
}
