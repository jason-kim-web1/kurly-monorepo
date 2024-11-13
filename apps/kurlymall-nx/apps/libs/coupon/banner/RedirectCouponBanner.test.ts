import RedirectCouponBanner from './RedirectCouponBanner';
import { CouponBanner } from './CouponBanner';

describe('RedirectCouponBanner', () => {
  let instance: CouponBanner;

  const expectedBannerName = 'CJ 3천원 쿠폰 받으러 가기';
  const expectedBannerLink = 'https://www.kurly.com/shop/goods/goods_list.php?category=794';

  beforeEach(() => {
    instance = new RedirectCouponBanner('DIRECT', expectedBannerName, expectedBannerLink);
  });

  it(`배너 이름은 ${expectedBannerName}`, () => {
    expect(instance.bannerName).toBe(expectedBannerName);
  });

  it(`배너 링크는 ${expectedBannerLink}`, () => {
    expect(instance.bannerLink).toBe(expectedBannerLink);
  });

  it('getCouponExtraInfo 을 호출 할 경우 에러를 던진다', () => {
    const getCouponExtraInfo = () => instance.couponExtraInfo;
    expect(getCouponExtraInfo).toThrow(Error);
  });
});
