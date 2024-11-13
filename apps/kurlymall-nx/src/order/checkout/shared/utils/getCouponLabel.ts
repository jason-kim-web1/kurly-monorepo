import {
  APP_ONLY_MESSAGE,
  CheckoutCouponTargetType,
  COUPON_TARGET_MESSAGE,
  KURLY_TARGET_MESSAGE,
  NOW_ONLY_MESSAGE,
} from '../constants/coupon-target';
import { SiteType, TargetSiteType } from '../../../../shared/interfaces';

interface UseCouponItemProps {
  duplicateCoupons: unknown[];
  target?: CheckoutCouponTargetType;
  siteType: TargetSiteType;
  isAppOnly: boolean;
}

export const getCouponLabel = ({ duplicateCoupons, target, siteType, isAppOnly }: UseCouponItemProps) => {
  const hasDuplicateCoupon = duplicateCoupons.length > 0;
  const duplicateCouponCount = duplicateCoupons.length + 1;
  const isKurlyProductTarget = target === COUPON_TARGET_MESSAGE.kurly;
  const isNowOnly = siteType === SiteType.KURLY_NOW;

  const duplicateCouponText = hasDuplicateCoupon ? `${duplicateCouponCount}장` : '';
  const appOnlyText = isAppOnly ? APP_ONLY_MESSAGE : '';
  const kurlyProductTargetText = isKurlyProductTarget ? KURLY_TARGET_MESSAGE : '';
  const nowOnlyText = isNowOnly ? NOW_ONLY_MESSAGE : '';
  const emptyLabel = !hasDuplicateCoupon && !duplicateCouponCount && !isKurlyProductTarget && !isNowOnly;

  return { duplicateCouponText, appOnlyText, kurlyProductTargetText, nowOnlyText, emptyLabel };
};
