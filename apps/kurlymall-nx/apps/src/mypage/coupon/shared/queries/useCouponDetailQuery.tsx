import { useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/router';

import { useMemo } from 'react';

import { isEmpty } from 'lodash';

import { AxiosError } from 'axios';

import { getMinutes } from '../../../../shared/utils/time';
import { getCouponDetail } from '../../../../shared/api/coupon/coupon.api';

import { ParsedUrlQuery } from 'querystring';
import { convertCouponDetail } from '../utils/couponResponseConvert';
import { CouponDetailRespons } from '../interfaces/Coupon.interfaces';

export default function useCouponDetailQuery() {
  const { query } = useRouter();

  const { couponNo } = query as ParsedUrlQuery & { couponNo: string };

  const queryKey = ['mypage', 'coupon', `detail-${couponNo}`];
  const queryResult = useQuery<CouponDetailRespons, AxiosError>(queryKey, () => getCouponDetail({ couponNo }), {
    staleTime: getMinutes(30),
    retry: 0,
    enabled: !isEmpty(couponNo),
  });

  const { data: couponDetailData } = queryResult;

  const couponDetail = useMemo(() => {
    return couponDetailData ? convertCouponDetail(couponDetailData) : null;
  }, [couponDetailData]);

  return { ...queryResult, queryKey, data: couponDetail };
}
