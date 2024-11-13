import httpClient from '../../configs/http-client';

export const postCouponAccessKey = async (couponKey: string) => {
  const url = '/v3/coupon/transfer-papercoupon-to-lacoupon';

  try {
    const response = await httpClient.post(url, {
      coupon_number: couponKey,
    });

    return {
      couponKey,
      res: 'success',
      message: `${response ? '쿠폰이 인증 되었습니다.' : '쿠폰 인증 시간이 초과하였습니다. 다시 시도해주세요.'}`,
    };
  } catch (error) {
    const message: string = error.response?.data.error.message;

    return {
      couponKey,
      res: 'rejected',
      message: message || '일시적인 장애가 발생했습니다. 잠시 후 다시 시도해주세요.',
    };
  }
};
