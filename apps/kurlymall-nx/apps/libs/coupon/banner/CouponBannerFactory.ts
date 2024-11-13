import { CouponBannerType, ProductCouponBanner } from './types';
import DownloadableCouponBanner from './DownloadableCouponBanner';
import RedirectCouponBanner from './RedirectCouponBanner';

interface Params {
  type: CouponBannerType;
  bannerName: string;
  bannerLink: string | null;
  accessKey: string | null;
  couponMeta: ProductCouponBanner | null;
}

export const createCouponBanner = ({ type, bannerName, bannerLink, couponMeta, accessKey }: Params) => {
  if (type === 'DIRECT') {
    return new RedirectCouponBanner(type, bannerName, bannerLink ?? '');
  }

  if (type === 'DOWNLOAD_COUPON') {
    if (!couponMeta || !accessKey) {
      throw Error('cannot create DownloadableCouponBanner. couponMeta and accessKey are required.');
    }

    return new DownloadableCouponBanner(type, bannerName, accessKey, couponMeta);
  }

  throw Error('undefined banner type');
};
