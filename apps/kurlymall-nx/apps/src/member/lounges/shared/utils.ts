import { format } from 'date-fns';

import { loadLocalStorage, storeLocalStorage } from '../../../shared/services/storage.service';

type CouponUsedCountByDate = {
  [key: string]: number;
};

type CouponUsedDateByMemberNo = {
  [key: number]: CouponUsedCountByDate;
};

const storageKey = 'couponUsedDateByMemberNo';

const loadAllCouponUsedDate = (): CouponUsedDateByMemberNo | null => {
  return loadLocalStorage<CouponUsedDateByMemberNo>(storageKey);
};

export const loadCouponUsedDateByMemberNo = (memberNo: number): CouponUsedCountByDate | undefined => {
  return loadLocalStorage<CouponUsedDateByMemberNo>(storageKey)?.[memberNo];
};

export const storeCouponUsedDateByMemberNo = (memberNo: number) => {
  const currentCouponUsedDate = loadAllCouponUsedDate();

  const today = format(new Date(), 'yyyy-MM-dd');

  return storeLocalStorage<CouponUsedDateByMemberNo>(storageKey, {
    ...currentCouponUsedDate,
    [memberNo]: {
      ...currentCouponUsedDate?.[memberNo],
      [today]: (currentCouponUsedDate?.[memberNo]?.[today] || 0) + 1,
    },
  });
};

export const removeCouponUsedDateByMemberNo = (memberNo: number) => {
  const currentCouponUsedDate = loadAllCouponUsedDate();

  const { [memberNo]: _, ...rest } = currentCouponUsedDate || {};

  return storeLocalStorage<CouponUsedDateByMemberNo>(storageKey, rest);
};
