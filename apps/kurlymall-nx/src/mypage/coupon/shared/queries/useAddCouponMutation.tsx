import { useMutation } from '@tanstack/react-query';

import postCoupon from '../../../../shared/api/coupon/postCoupon.api';

export default function useAddCouponMutation() {
  return useMutation({
    mutationFn: postCoupon,
  });
}
