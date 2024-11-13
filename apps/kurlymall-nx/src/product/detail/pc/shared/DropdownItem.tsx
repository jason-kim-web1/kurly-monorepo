import styled from '@emotion/styled';
import React from 'react';

import MembershipLabels from '../../../../shared/components/MembershipLabels/MembershipLabels';
import PointBannerText from '../../../../shared/components/product/pointBannerText/PointBannerText';
import COLOR from '../../../../shared/constant/colorset';
import type { MembershipLabel } from '../../../../shared/interfaces/Members';
import { addComma } from '../../../../shared/services';
import { getSubPrice, PriceService } from '../../../service/priceService';
import { getDealDisabledText } from '../../shared/utils/productDetailState';
import type { PointBanner } from '../../types';

const Container = styled.div`
  width: 100%;
  padding: 14px 16px 12px 15px;
`;

const DescriptionPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Description = styled.p`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Name = styled.span<{ disabled: boolean }>`
  width: 240px;
  line-height: 16px;
  font-size: 12px;
  letter-spacing: -0.5px;
  overflow-wrap: break-word;
  ${({ disabled }) => disabled && `color: ${COLOR.kurlyGray350}`};
`;

const PointBannerWrapper = styled.span`
  padding: 1px 0 2px;
  line-height: 16px;
  letter-spacing: -0.5px;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 4px;
`;

const BasePrice = styled.div<{ disabled: boolean }>`
  margin-left: 50px;
  text-decoration: line-through;
  font-size: 12px;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray400)};
`;

const DiscountedPrice = styled.div<{ disabled: boolean }>`
  font-size: 12px;
  font-weight: bold;
  letter-spacing: -0.5px;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray800)};
`;

interface Props {
  description: string | null;
  basePrice: number;
  retailPrice: number | null;
  discountedPrice: number | null;
  isSoldOut: boolean;
  isPurchaseStatus: boolean;
  membershipLabels?: MembershipLabel[];
  isGroupProduct?: boolean;
  pointBanner?: PointBanner;
}

export default function DropdownItem({
  description,
  basePrice,
  retailPrice,
  discountedPrice,
  isSoldOut,
  isPurchaseStatus,
  isGroupProduct = false,
  membershipLabels = [],
  pointBanner,
}: Props) {
  const { representativePrice, kurlyPrice, originalPrice } = new PriceService({
    retailPrice,
    basePrice,
    discountedPrice,
  });

  const subPrice = getSubPrice({ originalPrice, kurlyPrice });

  const disabledText = getDealDisabledText({ isPurchaseStatus, isSoldOut });

  const disabled = isSoldOut || !isPurchaseStatus;

  // 옵션상자
  return (
    <Container onClick={(e) => disabled && !isGroupProduct && e.stopPropagation()}>
      <MembershipLabels labels={membershipLabels} />
      <DescriptionPriceWrapper>
        <Description>
          <Name disabled={disabled}>
            {disabledText && `(${disabledText}) `}
            {description}
          </Name>
          {pointBanner && pointBanner.isShow ? (
            <PointBannerWrapper>
              <PointBannerText pointBanner={pointBanner} disabled={disabled} />
            </PointBannerWrapper>
          ) : null}
        </Description>
        {!!representativePrice && (
          <PriceWrapper>
            {!!subPrice && <BasePrice disabled={disabled}>{`${addComma(subPrice)}원`}</BasePrice>}
            <DiscountedPrice disabled={disabled}>{`${addComma(representativePrice)}원`}</DiscountedPrice>
          </PriceWrapper>
        )}
      </DescriptionPriceWrapper>
    </Container>
  );
}
