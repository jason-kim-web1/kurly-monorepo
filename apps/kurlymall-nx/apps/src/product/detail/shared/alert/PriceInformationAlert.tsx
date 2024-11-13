import styled from '@emotion/styled';

import { eq } from 'lodash';

import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';
import { addComma } from '../../../../shared/services';

import Alert from '../../../../shared/components/Alert/Alert';
import { ProductShowablePriceName } from '../../types';

const Title = styled.h3`
  margin-top: ${isPC ? '-17px' : 0};
  margin-bottom: ${isPC ? '20px' : '16px'};
  font-size: 18px;
  font-weight: ${isPC ? 500 : 600};
  line-height: 24px;
  color: ${COLOR.kurlyGray800};
  text-align: left;
`;

const PriceInfo = styled.div`
  text-align: left;
  padding-top: 12px;
  color: ${COLOR.kurlyGray600};
  letter-spacing: 0;
  &:first-of-type {
    margin-top: -1px;
    padding-top: 0;
  }
  &:last-of-type {
    margin-bottom: -10px;
  }
`;

const Price = styled.span<{ lineThrough?: boolean }>`
  font-weight: 500;
  font-size: 16px;
  color: ${COLOR.kurlyGray800};
  line-height: 21px;
  text-decoration: ${({ lineThrough }) => (lineThrough ? 'line-through' : 'none')};
`;

const PriceDiscountRate = styled.span`
  margin-right: 3px;
  color: ${COLOR.pointText};
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
`;

const PriceGuideText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${COLOR.kurlyGray450};
  line-height: 19px;
  word-break: keep-all;
  margin-top: 6px;
`;

const ORIGINAL_PRICE_GUIDE_TEXT: { [index: string]: string } = {
  retailPrice: '희망소매가격, 타 채널 판매가격 또는 컬리에서 판매되었던 가격입니다.',
  basePrice: '컬리 판매 가격입니다. 이 가격은 시장 현황 등에 따라 변경될 수 있습니다.',
} as const;

const REPRESENTATIVE_PRICE_GUIDE_TEXT: { [index: string]: string } = {
  basePrice: '컬리 판매 가격입니다. 이 가격은 시장 현황 등에 따라 변경될 수 있습니다.',
  discountedPrice: '현 시점 모든 할인이 적용된 가격입니다.',
} as const;

const PRICE_GUIDE_TEXT = [ORIGINAL_PRICE_GUIDE_TEXT, REPRESENTATIVE_PRICE_GUIDE_TEXT];

interface Props {
  discountRate: number;
  showablePriceList: number[];
  showablePricesInToolTip: ProductShowablePriceName[];
}

export default function PriceInformationAlert({ discountRate, showablePriceList, showablePricesInToolTip }: Props) {
  const priceInfoList = showablePricesInToolTip.map((priceName, index) => ({
    name: priceName,
    value: showablePriceList[index],
    guideText: PRICE_GUIDE_TEXT[index][priceName],
  }));

  return Alert({
    title: '',
    contents: (
      <>
        <Title>가격 안내</Title>
        {priceInfoList.map(({ name, value, guideText }, index) => (
          <PriceInfo key={`${name}-${index}`}>
            <Price lineThrough={eq(index, 0)}>
              {!!discountRate && eq(index, 1) ? <PriceDiscountRate>{addComma(discountRate)}%</PriceDiscountRate> : null}
              {addComma(value)}원
            </Price>
            <PriceGuideText>{guideText}</PriceGuideText>
          </PriceInfo>
        ))}
      </>
    ),
  });
}
