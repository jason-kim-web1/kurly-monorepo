import httpClient from '../../configs/http-client';

import { UnknownError } from '../../errors';
import { BaseResponse } from '../../interfaces';

interface ProductCouponBannerData {
  banner_name: string;
  banner_type: string;
  link: string | null;
  access_key: string | null;
  coupon: CouponData | null;
}

interface CouponData {
  name: string;
  benefitType: string;
  benefitValue: number;
  minimumOrderAmount: number;
  minimumOrderPrice: number;
  disallowDiscountedProducts: boolean;
  hurdleType: string;
  paymentGateways: string[] | null;
  creditCardId: string;
  effectivePeriod: {
    startDateTime: string;
    endDateTime: string;
    infinite: boolean;
  };
  couponMeta: {
    maximumDiscountPrice: number;
    target: {
      allowedProducts: {
        code: string;
        name: string;
      }[];
      disallowedProducts: number[];
      allowedCategories: number[];
      disallowedCategories: number[];
    };
  };
}

export const fetchProductCouponBanner = async (productCode: number): Promise<ProductCouponBannerData | null> => {
  const path = `/banner/v1/download-coupon/product-detail/${productCode}`;
  try {
    const { data } = await httpClient.get<BaseResponse<ProductCouponBannerData | []>>(path);

    const bannerData = data?.data;

    if (Array.isArray(bannerData)) {
      // 놀랍게도 데이터가 없으면 빈 배열이 응답으로 온다.
      return null;
    }

    return {
      ...bannerData,
      coupon: bannerData?.coupon?.name ? bannerData.coupon : null,
    };
  } catch (err) {
    throw new UnknownError(err);
  }
};

/**
 * @param accessKey 쿠폰 발급에 필요한 access key
 * @return Promise<boolean> 중복 발급 여부
 */
export const postCouponAccessKey = async (accessKey: string): Promise<{ type: string; message: string }> => {
  const path = '/v3/coupon/download-lacoupon-by-access-key';
  try {
    await httpClient.post(path, {
      access_key: accessKey,
    });

    return {
      type: 'success',
      message: '쿠폰이 다운로드 되었습니다.',
    };
  } catch (err) {
    const status = err.response?.status ?? 500;
    if (status === 409 || status === 400) {
      return {
        type: 'duplicated',
        message: err.response.data.message,
      };
    }

    if (status === 417) {
      return {
        type: 'failed',
        message: err.response.data.message || '쿠폰이 정상적으로 다운로드되지 않습니다. 다시 시도해주세요.',
      };
    }

    return {
      type: 'failed',
      message: '쿠폰이 정상적으로 다운로드되지 않습니다. 다시 시도해주세요.',
    };
  }
};
