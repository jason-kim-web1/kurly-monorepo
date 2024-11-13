import { UnknownError } from '../../errors';
import { handleGiftCartNotExists, handleUnauthenticated } from '../../error-handlers';

import { BaseResponse, BenefitType } from '../../interfaces';
import httpClient from '../../configs/http-client';

interface Coupon {
  benefit_price: number;
  benefit_summary: string;
  benefit_type: BenefitType;
  coupon_code: number;
  credit_card_id: null | string;
  description: string;
  expired_at: string;
  name: string;
  payment_gateways: string[];
  point_allowed: boolean;
  usable: boolean;
}

export const fetchCoupons = async ({ accessToken }: { accessToken: string }) => {
  const url = '/checkout/v1/checkout/coupons/for-checkout';
  try {
    const { data } = await httpClient.get<BaseResponse<Coupon[]>>(url, {
      params: {
        order_type: 'gift',
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.data.map((coupon) => ({
      benefitPrice: coupon.benefit_price,
      benefitSummary: coupon.benefit_summary,
      benefitType: coupon.benefit_type,
      couponCode: coupon.coupon_code,
      creditCardId: coupon.credit_card_id,
      description: coupon.description,
      expiredAt: coupon.expired_at,
      name: coupon.name,
      paymentGateways: coupon.payment_gateways,
      pointAllowed: coupon.point_allowed,
      usable: coupon.usable,
    }));
  } catch (err) {
    handleUnauthenticated(err);
    handleGiftCartNotExists(err);

    throw new UnknownError(err);
  }
};
