import { postCouponAccessKey } from '../product/couponList';

interface Props {
  couponKey: string;
}

export default async function postCoupon({ couponKey }: Props) {
  const result = await postCouponAccessKey(couponKey);

  return result;
}
