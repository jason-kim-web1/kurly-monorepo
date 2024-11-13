import { memo } from 'react';

import styled from '@emotion/styled';

import { CheckoutCoupon } from '../../../../../shared/interfaces';
import { placeholderCheckoutCouponText } from '../../../../../shared/utils/order';
import COLOR from '../../../../../shared/constant/colorset';

import CouponModal from './CouponModal/CouponModal';
import CouponSelectPlaceholder from './CouponModal/CouponSelectPlaceholder';
import useToggle from '../../../shared/hooks/useToggle';

const Wrapper = styled.div`
  margin-top: 18px;
`;

const Description = styled.p`
  padding: 10px 0;
  font-size: 14px;
  color: ${COLOR.kurlyGray450};
`;

interface Props {
  couponList: CheckoutCoupon[];
  selectedCoupon?: CheckoutCoupon;
  disable?: boolean;
  onConfirm: (coupon?: CheckoutCoupon) => void;
}

function CouponSelector({ couponList, selectedCoupon, disable, onConfirm }: Props) {
  const { isOpen, open, close } = useToggle();

  const availableCouponCount = couponList.filter((coupon) => coupon.usable).length;
  const totalCouponCount = couponList.length;

  const placeholder = placeholderCheckoutCouponText({
    selectedCoupon,
    availableCouponCount,
    totalCouponCount,
    isMobile: true,
  });

  return (
    <Wrapper>
      <CouponSelectPlaceholder
        placeholder={placeholder}
        disable={disable}
        dimmed={availableCouponCount <= 0}
        onClick={open}
      />
      {disable && <Description>쿠폰 적용 불가 상품입니다</Description>}
      <CouponModal
        couponList={couponList}
        open={isOpen}
        selectedCoupon={selectedCoupon}
        onConfirm={onConfirm}
        onClose={close}
      />
    </Wrapper>
  );
}

export default memo(CouponSelector);
