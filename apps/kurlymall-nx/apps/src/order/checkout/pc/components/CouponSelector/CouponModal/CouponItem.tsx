import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useCallback } from 'react';

import { CheckoutCoupon } from '../../../../../../shared/interfaces';
import { BenefitTitle, couponExpired } from '../../../../../shared/shared/utils';
import COLOR from '../../../../../../shared/constant/colorset';

import { SortCouponType } from '../../../../../../shared/utils/getDuplicateCoupons';

import { CouponCheck } from './CouponCheck';
import { CouponLabelList } from '../../CouponLabelList';

const Wrapper = styled.button<{ disabled: boolean }>`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: row;
  padding: 15px 20px 15px 46px;
  text-align: left;

  + button {
    border-top: 1px solid ${COLOR.bg};
  }

  ${({ disabled }) =>
    disabled
      ? css`
          color: ${COLOR.kurlyGray350};
        `
      : css`
          :hover {
            background: ${COLOR.kurlyGray100};
          }
          color: ${COLOR.kurlyGray800};
        `};
`;

const Detail = styled.div`
  overflow: hidden;
  flex: 1;
  width: 388px;
  font-size: 12px;
  line-height: 17px;
  margin-left: 20px;
`;

const TextOverflow = css`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  display: flex;
  width: 90px;
  flex-direction: column;
`;

const BenefitText = styled.p`
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 8px;
`;

const Name = styled.strong`
  margin-bottom: 6px;
  font-size: 14px;
  line-height: 20px;
  ${TextOverflow};
  font-weight: 500;
`;

const Condition = styled.span(TextOverflow);
const Expired = styled.span(TextOverflow);

interface Props {
  coupon: SortCouponType<CheckoutCoupon>;
  selectedCouponCode: string | null;
  onClickCoupon(coupon?: CheckoutCoupon): void;
}

export const CouponItem = ({ coupon, selectedCouponCode, onClickCoupon }: Props) => {
  const { couponCode, usable, description, endAt, name, type, totalCouponDiscount, ...restProps } = coupon;
  const isCheck = selectedCouponCode === couponCode;

  const handleClickCoupon = useCallback(() => {
    if (!usable) return;

    onClickCoupon(coupon);
  }, [coupon, onClickCoupon, usable]);

  return (
    <Wrapper onClick={handleClickCoupon} disabled={!usable}>
      <CouponCheck isCheck={isCheck} />
      <Title>
        <BenefitText>{BenefitTitle({ disabled: !usable, type, totalCouponDiscount })}</BenefitText>
        <CouponLabelList coupon={restProps} disabled={!usable} />
      </Title>
      <Detail>
        <Name>{name}</Name>
        <Condition>{description}</Condition>
        <Expired>{couponExpired(endAt)}</Expired>
      </Detail>
    </Wrapper>
  );
};
