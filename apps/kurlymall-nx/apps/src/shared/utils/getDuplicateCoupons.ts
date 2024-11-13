import { get } from 'lodash';
import { nanoid } from 'nanoid';

export type SortCouponType<T> = T & { duplicateCoupons: T[] };

const getCouponUniqueKey = <T>(coupon: T, keyProperty: string[]): string =>
  keyProperty.map((property) => get(coupon, property)).join('_');

/**
 * 중복 검증 반환 쿠폰 유틸
 * @param coupons 원본 쿠폰 리스트 배열
 * @param keyProperty 중복 검수용 프로퍼티 배열
 * @param typeProperty FREE_SHIPPING 확인용 타입 프로퍼티
 */
export default function getDuplicateCoupons<T>({
  coupons,
  keyProperty,
  typeProperty,
}: {
  coupons: T[];
  keyProperty: string[];
  typeProperty: string;
}): SortCouponType<T>[] {
  const sortCoupons: { [key: string]: SortCouponType<T>[] } = {};

  coupons.map((coupon) => {
    const key = getCouponUniqueKey<T>(coupon, keyProperty);
    const type: string | undefined = get(coupon, typeProperty);

    if (sortCoupons[key] && sortCoupons[key].length > 0) {
      if (type === 'FREE_SHIPPING') {
        sortCoupons[key][0].duplicateCoupons.push(coupon);
        return;
      }

      // 기존 키가 존재하나, FREE_SHIPPING이 아닐경우에 key가 중복 될 수 있으므로 해쉬값을 추가합니다.
      sortCoupons[`${key}_${nanoid()}`] = [{ ...coupon, duplicateCoupons: [] }];
      return;
    }

    sortCoupons[key] = [{ ...coupon, duplicateCoupons: [] }];
  });

  return Object.values(sortCoupons).flat();
}
