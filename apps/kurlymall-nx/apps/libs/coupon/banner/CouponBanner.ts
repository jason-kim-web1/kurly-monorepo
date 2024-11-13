import { ProductCouponBannerExtraInfo, CouponBannerType } from './types';

export abstract class CouponBanner {
  private readonly _type: CouponBannerType;

  private readonly _bannerName: string;

  protected constructor(type: CouponBannerType, bannerName: string) {
    this._type = type;
    this._bannerName = bannerName;
  }

  get type(): CouponBannerType {
    return this._type;
  }

  get bannerName(): string {
    return this._bannerName;
  }

  abstract get accessKey(): string | null;

  abstract get bannerLink(): string | null;

  abstract get couponExtraInfo(): ProductCouponBannerExtraInfo;
}
