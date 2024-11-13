import styled from '@emotion/styled';

import { getCouponLabel } from '../../shared/utils/getCouponLabel';
import { CheckoutCoupon } from '../../../../shared/interfaces';
import { SortCouponType } from '../../../../shared/utils/getDuplicateCoupons';
import { CouponLabel } from '../../shared/components/CouponLabel';

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex-direction: column;
`;

interface Props {
  coupon: SortCouponType<Pick<CheckoutCoupon, 'target' | 'duplicateCoupons' | 'isAppOnly' | 'siteType'>>;
  disabled: boolean;
}

export const CouponLabelList = ({ coupon: { target, duplicateCoupons, isAppOnly, siteType }, disabled }: Props) => {
  const { duplicateCouponText, appOnlyText, kurlyProductTargetText, nowOnlyText, emptyLabel } = getCouponLabel({
    duplicateCoupons,
    target,
    siteType,
    isAppOnly,
  });

  if (emptyLabel) return null;

  return (
    <Wrapper>
      <CouponLabel disabled={disabled} labelText={duplicateCouponText} />
      <CouponLabel disabled={disabled} labelText={appOnlyText} />
      <CouponLabel disabled={disabled} labelText={kurlyProductTargetText} isPurpleLabel />
      <CouponLabel disabled={disabled} labelText={nowOnlyText} isPurpleLabel />
    </Wrapper>
  );
};
