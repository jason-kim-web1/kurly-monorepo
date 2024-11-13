import { CouponBanner } from './CouponBanner';
import { ProductCouponBannerExtraInfo, CouponBannerType } from './types';

export default class RedirectCouponBanner extends CouponBanner {
  private readonly _bannerLink: string;

  constructor(type: CouponBannerType, bannerName: string, bannerLink: string) {
    super(type, bannerName);
    this._bannerLink = bannerLink;
  }

  get accessKey(): null {
    return null;
  }

  get bannerLink(): string {
    return this._bannerLink;
  }

  get couponExtraInfo(): ProductCouponBannerExtraInfo {
    throw Error('redirect coupon banner 에서는 쿠폰의 추가 정보가 없습니다.');
  }
}
