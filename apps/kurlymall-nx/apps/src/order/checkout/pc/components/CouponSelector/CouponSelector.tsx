import { memo } from 'react';

import styled from '@emotion/styled';

import useToggle from '../../../shared/hooks/useToggle';

import { placeholderCheckoutCouponText } from '../../../../../shared/utils/order';
import { CheckoutCoupon } from '../../../../../shared/interfaces';

import CouponModal from './CouponModal/CouponModal';
import CouponSelectPlaceholder from './CouponModal/CouponSelectPlaceholder';
import useMembersBanner from '../../../../shared/shared/hooks/useMembersBanner';
import { MEMBERS_BANNER } from '../../../shared/constants/kurly-members-banner';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

interface Props {
  couponList: CheckoutCoupon[];
  selectedCoupon?: CheckoutCoupon;
  disabled?: boolean;
  onConfirm(coupon?: CheckoutCoupon): void;
}

function CouponSelector({ couponList, selectedCoupon, disabled, onConfirm }: Props) {
  const { toggle, isOpen, close } = useToggle();
  const { membersBanner, goToMembership } = useMembersBanner({ bannerType: MEMBERS_BANNER.PC_COUPON_LIST });

  const availableCouponCount = couponList.filter((coupon) => coupon.usable).length;
  const totalCouponCount = couponList.length;

  const placeholder = placeholderCheckoutCouponText({
    selectedCoupon,
    availableCouponCount,
    totalCouponCount,
  });

  const onClickCoupon = (coupon?: CheckoutCoupon) => {
    toggle();
    onConfirm(coupon);
  };

  return (
    <Wrapper>
      <CouponSelectPlaceholder
        opened={isOpen}
        placeholder={placeholder}
        disable={disabled}
        dimmed={availableCouponCount <= 0}
        onClick={toggle}
      />
      {isOpen && (
        <CouponModal
          onMouseLeave={close}
          couponList={couponList}
          selectedCoupon={selectedCoupon}
          onClick={onClickCoupon}
          membersBanner={membersBanner}
          goToMembership={goToMembership}
        />
      )}
    </Wrapper>
  );
}

export default memo(CouponSelector);
