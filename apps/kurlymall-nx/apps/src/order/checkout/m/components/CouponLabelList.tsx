import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { ReactNode } from 'react';

import { CheckoutCoupon } from '../../../../shared/interfaces';

import { SortCouponType } from '../../../../shared/utils/getDuplicateCoupons';
import { getCouponLabel } from '../../shared/utils/getCouponLabel';
import { CouponLabel } from '../../shared/components/CouponLabel';

const Title = styled.div`
  display: flex;
  align-items: flex-start;

  + ul {
    margin-top: ${vars.spacing.$4};
  }
`;

const LabelWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

interface Props {
  coupon: SortCouponType<Pick<CheckoutCoupon, 'target' | 'duplicateCoupons' | 'isAppOnly' | 'siteType'>>;
  disabled: boolean;
  children: ReactNode;
}

export const CouponLabelList = ({
  coupon: { target, duplicateCoupons, isAppOnly, siteType },
  disabled,
  children,
}: Props) => {
  const { duplicateCouponText, nowOnlyText, appOnlyText, kurlyProductTargetText } = getCouponLabel({
    duplicateCoupons,
    target,
    siteType,
    isAppOnly,
  });

  return (
    <>
      <Title>
        {children}
        {(duplicateCouponText || appOnlyText) && (
          <LabelWrapper>
            <CouponLabel disabled={disabled} labelText={duplicateCouponText} />
            <CouponLabel disabled={disabled} labelText={appOnlyText} />
          </LabelWrapper>
        )}
      </Title>
      {(kurlyProductTargetText || nowOnlyText) && (
        <LabelWrapper>
          <CouponLabel disabled={disabled} labelText={kurlyProductTargetText} isPurpleLabel />
          <CouponLabel disabled={disabled} labelText={nowOnlyText} isPurpleLabel />
        </LabelWrapper>
      )}
    </>
  );
};
