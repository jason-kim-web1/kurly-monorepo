import { createCouponBanner } from './CouponBannerFactory';
import DownloadableCouponBanner from './DownloadableCouponBanner';
import RedirectCouponBanner from './RedirectCouponBanner';
import { ProductCouponBanner } from './types';

const mock = {
  type: 'DIRECT',
  couponMeta: null,
  bannerLink: null,
  bannerName: '동물복지 우유 15% 지원 쿠폰',
  accessKey: '9c161496',
};

const couponMetaMock: ProductCouponBanner = {
  name: '동물복지 우유 15% 지원 쿠폰',
  benefitType: 'PERCENT_DISCOUNT',
  benefitValue: 15,
  allowDiscountedProducts: true,
  creditCardId: '15',
  effectivePeriod: {
    startDateTime: '2022-03-21 11:00:00',
    endDateTime: '2022-03-28 11:00:00',
    infinite: false,
  },
  hurdleType: 'ORDERED_PRODUCT',
  minimumOrderAmount: 1,
  minimumOrderPrice: 0,
  paymentGateways: null,
  maximumDiscountPrice: 10000,
  allowedCategories: [],
  allowedProducts: [],
  disallowedCategories: [],
  disallowedProducts: [],
};

describe('CouponBannerFactory', () => {
  it('DownloadableCouponBanner instance 생성', () => {
    const couponBanner = createCouponBanner({
      ...mock,
      type: 'DOWNLOAD_COUPON',
      couponMeta: couponMetaMock,
    });

    expect(couponBanner).toBeInstanceOf(DownloadableCouponBanner);
  });

  it('RedirectCouponBanner instance 생성', () => {
    const couponBanner = createCouponBanner({
      ...mock,
      type: 'DIRECT',
    });

    expect(couponBanner).toBeInstanceOf(RedirectCouponBanner);
  });
});
