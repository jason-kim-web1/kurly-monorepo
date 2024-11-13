import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { CheckoutCoupon } from '../../../../../../shared/interfaces';
import { BenefitTitle, couponExpired } from '../../../../../shared/shared/utils';

import COLOR from '../../../../../../shared/constant/colorset';
import { SortCouponType } from '../../../../../../shared/utils/getDuplicateCoupons';
import { CouponLabelList } from '../../CouponLabelList';

const Wrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  word-break: break-all;
  margin-top: ${vars.spacing.$2};
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray800)};
`;

const Name = styled.span`
  padding-top: 8px;
  font-size: 15px;
  line-height: 20px;
`;

const Detail = styled.div<{ disabled: boolean }>`
  padding-top: 6px;

  > p {
    padding-top: 2px;
    font-size: 13px;
    line-height: 18px;
    color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray450)};
  }
`;

const BenefitText = styled.p`
  margin-right: 4px;
  font-weight: 600;
  font-size: 17px;
`;

interface Props {
  coupon: SortCouponType<Omit<CheckoutCoupon, 'couponCode' | 'usable'>>;
  disabled: boolean;
}

export const Coupon = ({
  coupon: { name, description, endAt, type, totalCouponDiscount, ...restProps },
  disabled,
}: Props) => {
  return (
    <Wrapper disabled={disabled}>
      <CouponLabelList coupon={restProps} disabled={disabled}>
        <BenefitText>{BenefitTitle({ disabled, type, totalCouponDiscount })}</BenefitText>
      </CouponLabelList>
      <Name>{name}</Name>
      <Detail disabled={disabled}>
        <p>{description}</p>
        <p>{couponExpired(endAt)}</p>
      </Detail>
    </Wrapper>
  );
};
