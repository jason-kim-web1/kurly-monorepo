import styled from '@emotion/styled';
import { useCallback } from 'react';
import { isArray, isEmpty } from 'lodash';

import COLOR from '../../../../../shared/constant/colorset';
import { addComma } from '../../../../../shared/services';

import type { ProductShowablePriceName, ProductShowablePrices } from '../../../types';
import { amplitudeService } from '../../../../../shared/amplitude';
import { SelectPriceTooltipButton } from '../../../../../shared/amplitude/events/product/SelectPriceTooltipButton';
import { getFusionQueryId } from '../../../shared/utils/productDetailEvent';
import { useAppSelector } from '../../../../../shared/store';
import TooltipIcon from '../../../../../shared/icons/TooltipIcon';
import PriceInformationAlert from '../../../shared/alert/PriceInformationAlert';

const PriceWrapper = styled.h2`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-top: 20px;
  font-weight: bold;
  line-height: 30px;
  letter-spacing: -0.5px;
`;

const DiscountPercent = styled.span`
  padding-right: 9px;
  font-size: 28px;
  color: ${COLOR.pointText};
`;

const PriceValue = styled.span`
  padding-right: 4px;
  font-size: 28px;
  color: ${COLOR.kurlyGray800};
`;

const PriceSubText = styled.span`
  display: inline-block;
  position: relative;
  top: 3px;
  font-size: 18px;
  color: ${COLOR.kurlyGray800};
  vertical-align: top;
`;

const SubPriceText = styled.span`
  display: flex;
  flex-direction: row;
  margin-top: 8px;

  > span {
    font-size: 16px;
    color: ${COLOR.kurlyGray400};
    letter-spacing: -0.5px;
    text-decoration: line-through;
    margin-right: 1px;
  }
`;

interface Props {
  showablePrices: ProductShowablePrices;
  showablePricesInToolTip: ProductShowablePriceName[];
  discountRate: number;
  isMultiplePrice: boolean;
}

export default function Price({ showablePrices, showablePricesInToolTip, discountRate, isMultiplePrice }: Props) {
  const queryId = useAppSelector(({ productList }) => productList.queryId);
  const representativePrice = showablePrices.salesPrice;
  const originalPrice = showablePrices.basePrice || showablePrices.retailPrice || 0;

  const handleClickPriceInformation = useCallback(() => {
    amplitudeService.logEvent(
      new SelectPriceTooltipButton({
        fusionQueryId: getFusionQueryId(queryId),
      }),
    );

    if (!isArray(showablePricesInToolTip) || isEmpty(showablePricesInToolTip)) {
      return;
    }

    const showablePriceList = [originalPrice, representativePrice];
    PriceInformationAlert({
      discountRate,
      showablePriceList,
      showablePricesInToolTip,
    });
  }, [discountRate, representativePrice, originalPrice, showablePricesInToolTip, queryId]);

  return (
    <>
      <PriceWrapper>
        {discountRate > 0 && <DiscountPercent>{discountRate}%</DiscountPercent>}
        <PriceValue>{addComma(representativePrice)}</PriceValue>
        <PriceSubText>원{isMultiplePrice && '~'}</PriceSubText>
      </PriceWrapper>
      {!!originalPrice ? (
        <SubPriceText>
          <span>{addComma(originalPrice)}원</span>
          <button type="button" onClick={handleClickPriceInformation}>
            <TooltipIcon />
          </button>
        </SubPriceText>
      ) : null}
    </>
  );
}
