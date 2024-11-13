import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { vars } from '@thefarmersfront/kpds-css';

import { Benefit, MembershipBenefitType } from '../shared/type';

const BenefitItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  word-break: break-all;
`;

const PriceText = styled.div<{ isUsed: boolean }>`
  display: flex;
  gap: ${vars.spacing.$4};
  font-weight: 400;
  color: ${({ isUsed }) => (isUsed ? vars.color.text.$quaternary : vars.color.text.$tertiary)};

  strong {
    font-weight: 600;
    color: ${({ isUsed }) => (isUsed ? vars.color.text.$quaternary : vars.color.text.$primary)};
  }
`;

const ConditionText = styled.div<{ isBenefitTypePoint: boolean; isUsed: boolean }>`
  min-width: 60px;
  display: flex;
  justify-content: flex-end;

  p {
    font-weight: 600;

    ${({ isBenefitTypePoint }) =>
      isBenefitTypePoint
        ? css`
            font-size: 16px;
            line-height: 22px;
            color: ${vars.color.$mint950};
          `
        : css`
            padding: 4px 8px;
            font-size: 12px;
            line-height: 16px;
            border-radius: 6px;
            background-color: ${vars.color.background.$background2};
            color: ${vars.color.text.$secondary};
          `}

    ${({ isUsed }) =>
      isUsed &&
      css`
        color: ${vars.color.text.$quaternary};
      `}
  }
`;

type CouponProps = {
  type: MembershipBenefitType;
  isUsed: boolean;
  value: string;
  condition: string;
  duplicateCoupons: Benefit[];
};

export default function CurrentBenefitItem({ type, isUsed, value, condition, duplicateCoupons }: CouponProps) {
  const isBenefitTypePoint = type === MembershipBenefitType.POINT;

  const badgeText = () => {
    if (isUsed) return '사용완료';
    if (duplicateCoupons.length > 0) return `${duplicateCoupons.length + 1}장`;

    return '사용가능';
  };

  const benefitTitle = () => {
    if (isBenefitTypePoint) return '즉시 적립금';

    return `${value} 쿠폰`;
  };

  return (
    <BenefitItem>
      <PriceText isUsed={isUsed}>
        <strong>{benefitTitle()}</strong>
        {!isBenefitTypePoint && condition}
      </PriceText>
      <ConditionText isUsed={isUsed} isBenefitTypePoint={isBenefitTypePoint}>
        <p>{isBenefitTypePoint ? value : badgeText()}</p>
      </ConditionText>
    </BenefitItem>
  );
}
