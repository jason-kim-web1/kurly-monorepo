import styled from '@emotion/styled';

import { isNull } from 'lodash';

import { CouponCheck } from './CouponCheck';
import { CheckoutCoupon } from '../../../../../../shared/interfaces';

const Wrapper = styled.button`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: row;
  padding: 15px 20px 15px 46px;
  text-align: left;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;

interface Props {
  selectedCouponCode: string | null;
  couponList?: CheckoutCoupon[];
  handleClickUnselectedCouponOption: () => void;
}

export const UnselectedCouponOption = ({
  selectedCouponCode,
  couponList,
  handleClickUnselectedCouponOption,
}: Props) => {
  const hsaUsableCoupon = couponList?.some(({ usable }) => usable);

  return (
    <Wrapper onClick={handleClickUnselectedCouponOption} disabled={!hsaUsableCoupon}>
      <CouponCheck isCheck={isNull(selectedCouponCode)} />
      <p>쿠폰 적용 안함</p>
    </Wrapper>
  );
};
