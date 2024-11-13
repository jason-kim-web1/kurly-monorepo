import { UnknownError } from '../../errors';

import { BaseResponse, BaseApiResponse } from '../../interfaces';
import httpClient from '../../configs/http-client';
import { CouponDetailRespons, CouponResponse } from '../../../mypage/coupon/shared/interfaces/Coupon.interfaces';
import { LuckyBoxCoupon } from '../../../mypage/coupon/shared/interfaces/LuckyBoxCoupon.interfaces';
import { NonExistCouponDetailsError } from '../../errors/NonExistCouponDetailsError';

export const getLuckyBoxCoupons = async () => {
  const url = '/marketing-voucher-api/v1/vouchers?voucherType=LUCKY_BOX';
  try {
    const { data } = await httpClient.get<BaseApiResponse<LuckyBoxCoupon[]>>(url);
    return data.data;
  } catch (error) {
    throw new UnknownError(error);
  }
};

export const getCoupon = async () => {
  const url = '/marketing-coupon-api/v3/coupons/my';

  try {
    const { data } = await httpClient.get<BaseResponse<CouponResponse[]>>(url);
    return data.data;
  } catch (error) {
    throw new UnknownError(error);
  }
};

export const getCouponDetail = async ({ couponNo }: { couponNo: string }) => {
  const url = `/marketing-coupon-api/v3/coupons/${couponNo}`;

  try {
    const { data } = await httpClient.get<BaseResponse<CouponDetailRespons>>(url);
    return data.data;
  } catch (error) {
    if (error?.response?.status === 404 || error?.response?.status === 400) {
      throw new NonExistCouponDetailsError(error);
    }

    throw new UnknownError(error);
  }
};
