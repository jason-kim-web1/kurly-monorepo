import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Radio from '../../../../../../shared/components/Input/Radio';
import { CheckoutCoupon } from '../../../../../../shared/interfaces';
import COLOR from '../../../../../../shared/constant/colorset';

const Item = styled.label`
  width: 295px;
  > label {
    padding-bottom: 17px;
  }
`;

const Label = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.strong<{ disable: boolean }>`
  color: ${(props) => (props.disable ? COLOR.disabled : COLOR.kurlyBlack)};
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
`;

const Name = styled.span<{ disable: boolean }>`
  color: ${(props) => (props.disable ? COLOR.kurlyGray450 : COLOR.kurlyBlack)};
  padding-top: 8px;
  font-size: 16px;
  line-height: 20px;
`;

const Detail = styled.span`
  color: #666;
  padding-top: 8px;
  font-size: 12px;
  line-height: 16px;
  + span {
    padding-top: 2px;
  }
`;

const radio = css`
  align-items: flex-start;
`;

interface Props {
  coupon: CheckoutCoupon;
  selectedCouponCode: string;
  onChange(code: string): void;
}

export default function CouponRadio({ coupon, selectedCouponCode, onChange }: Props) {
  const { type, couponCode, usable } = coupon;

  const handleChange = ({ value }: { name: string; value: string }) => {
    onChange(value);
  };

  const label = (
    <Label>
      <Title disable={!usable}>{type}</Title>
      <Name disable={!usable}>{coupon.name}</Name>
      <Detail>{coupon.description}</Detail>
      <Detail>{coupon.endAt}</Detail>
    </Label>
  );

  return (
    <Item htmlFor={couponCode}>
      <Radio
        css={radio}
        label={label}
        selectedValue={selectedCouponCode}
        value={couponCode}
        id={couponCode}
        name="checkout-cart-coupon"
        disabled={!usable}
        onChange={handleChange}
      />
    </Item>
  );
}
