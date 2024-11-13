import { fetchProductCouponBanner } from '../../shared/api/product/coupon';
import { createCouponBanner } from '../../../libs/coupon/banner/CouponBannerFactory';
import { CouponBannerBenefitType, CouponBannerHurdleType, CouponBannerType } from '../../../libs/coupon/banner/types';
import { CardVendorCode, PaymentVendorCode } from '../../shared/constant/payment-method';

export const getProductCouponBanner = async (productCode: number) => {
  const data = await fetchProductCouponBanner(productCode);

  if (!data) {
    return null;
  }

  const coupon = data.coupon;

  return createCouponBanner({
    type: data.banner_type as CouponBannerType,
    bannerName: data.banner_name,
    bannerLink: data.link,
    accessKey: data.access_key,
    couponMeta: coupon
      ? {
          name: coupon.name,
          hurdleType: coupon.hurdleType as CouponBannerHurdleType,
          benefitType: coupon.benefitType as CouponBannerBenefitType,
          benefitValue: coupon.benefitValue,
          minimumOrderAmount: coupon.minimumOrderAmount,
          minimumOrderPrice: coupon.minimumOrderPrice,
          allowDiscountedProducts: !coupon.disallowDiscountedProducts,
          paymentGateways: coupon.paymentGateways as PaymentVendorCode[] | null,
          creditCardId: coupon.creditCardId ? (coupon.creditCardId as CardVendorCode) : null,
          effectivePeriod: {
            startDateTime: coupon.effectivePeriod.startDateTime,
            endDateTime: coupon.effectivePeriod.endDateTime,
            infinite: coupon.effectivePeriod.infinite,
          },
          maximumDiscountPrice: coupon.couponMeta.maximumDiscountPrice,
          allowedProducts: coupon.couponMeta.target.allowedProducts,
          allowedCategories: coupon.couponMeta.target.allowedCategories,
          disallowedProducts: coupon.couponMeta.target.disallowedProducts,
          disallowedCategories: coupon.couponMeta.target.disallowedCategories,
        }
      : null,
  });
};
