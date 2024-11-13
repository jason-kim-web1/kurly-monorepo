import { memo, useState } from 'react';

import { isEmpty } from 'lodash';

import styled from '@emotion/styled';

import CouponModal from './CouponModal/CouponModal';
import CouponSelectPlaceholder from './CouponModal/CouponSelectPlaceholder';

import { CheckoutCoupon } from '../../../../../shared/interfaces';
import { placehoderCouponText } from '../../../../../shared/utils/order';

const Wrapper = styled.div`
  margin-top: 16px;
`;

interface Props {
  couponList: CheckoutCoupon[];
  selectedCoupon?: CheckoutCoupon;
  onConfirm(coupon?: CheckoutCoupon): void;
}

function CouponSelector({ couponList, selectedCoupon, onConfirm }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const availableCouponCount = couponList.filter((coupon) => coupon.usable).length;
  const totalCouponCount = couponList.length;

  const placeholder = placehoderCouponText({
    selectedCoupon,
    availableCouponCount,
    totalCouponCount,
  });

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Wrapper>
      <CouponSelectPlaceholder
        placeholder={placeholder}
        disable={isEmpty(couponList)}
        dimmed={availableCouponCount <= 0}
        onClick={handleOpenModal}
      />
      <CouponModal
        couponList={couponList}
        open={openModal}
        selectedCoupon={selectedCoupon}
        onConfirm={onConfirm}
        onClose={handleCloseModal}
      />
    </Wrapper>
  );
}

export default memo(CouponSelector);
