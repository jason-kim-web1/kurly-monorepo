import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { CheckoutCoupon } from '../../../../../../shared/interfaces';

import Radio from '../../../../../../shared/components/Input/Radio';
import { SortCouponType } from '../../../../../../shared/utils/getDuplicateCoupons';
import { Coupon } from './Coupon';

const Wrapper = styled.div`
  > label {
    padding-bottom: 17px;
  }
`;

const radio = css`
  align-items: flex-start;
`;

interface Props {
  coupon: SortCouponType<CheckoutCoupon>;
  selectedCouponCode: string;
  onChange(code: string): void;
}

export default function CouponRadio({
  coupon: { usable, couponCode, ...restProps },
  selectedCouponCode,
  onChange,
}: Props) {
  const handleChange = ({ value }: { name: string; value: string }) => {
    onChange(value);
  };

  return (
    <Wrapper>
      <Radio
        css={radio}
        label={<Coupon coupon={restProps} disabled={!usable} />}
        selectedValue={selectedCouponCode}
        value={couponCode}
        id={couponCode}
        name="checkout-coupon"
        disabled={!usable}
        onChange={handleChange}
      />
    </Wrapper>
  );
}
