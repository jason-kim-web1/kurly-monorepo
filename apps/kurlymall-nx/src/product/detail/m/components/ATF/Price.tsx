import styled from '@emotion/styled';
import { isArray, isEmpty } from 'lodash';

import COLOR from '../../../../../shared/constant/colorset';
import { addComma } from '../../../../../shared/services';
import { getFormattedDate } from '../../../shared/utils/productDetailState';

import type {
  LegacyPromotionType,
  MemberCoupon,
  ProductShowablePriceName,
  ProductShowablePrices,
} from '../../../types';

import { amplitudeService } from '../../../../../shared/amplitude';
import { SelectPriceTooltipButton } from '../../../../../shared/amplitude/events/product/SelectPriceTooltipButton';
import { getFusionQueryId } from '../../../shared/utils/productDetailEvent';
import { useAppSelector } from '../../../../../shared/store';
import TooltipIcon from '../../../../../shared/icons/TooltipIcon';
import PriceInformationAlert from '../../../shared/alert/PriceInformationAlert';

const DiscountPercent = styled.span`
  padding-right: 8px;
  font-size: 24px;
  font-weight: bold;
  color: ${COLOR.pointText};
  line-height: 30px;
  letter-spacing: -1px;
`;

const PriceValue = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: ${COLOR.kurlyGray800};
  letter-spacing: -0.5px;
  margin-right: 3px;
`;

const PriceText = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: ${COLOR.kurlyGray800};
`;

const SubPriceText = styled.span`
  display: flex;
  flex-direction: row;
  margin-top: 4px;

  > span {
    font-size: 16px;
    text-decoration: line-through;
    line-height: 21px;
    color: ${COLOR.kurlyGray400};
  }
`;

const MemberCouponGuide = styled.div`
  color: ${COLOR.kurlyPurple};
  line-height: 1.31;
  white-space: pre-line;
  margin-top: 10px;
`;

interface Props {
  showablePrices: ProductShowablePrices;
  showablePricesInToolTip: ProductShowablePriceName[];
  discountRate: number;
  isMultiplePrice: boolean;
  legacyPromotion: LegacyPromotionType;
  memberCoupon: MemberCoupon;
}

export default function Price({
  showablePrices,
  showablePricesInToolTip,
  discountRate,
  isMultiplePrice,
  legacyPromotion,
  memberCoupon,
}: Props) {
  const queryId = useAppSelector(({ productList }) => productList.queryId);
  const representativePrice = showablePrices.salesPrice;
  const originalPrice = showablePrices.basePrice || showablePrices.retailPrice || 0;
  const { newbieLimitDatetime, newbieMinPrice } = memberCoupon;

  const handleClickPriceInformation = () => {
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
  };

  return (
    <>
      <div>
        {discountRate > 0 && <DiscountPercent>{discountRate}%</DiscountPercent>}
        <PriceValue>{addComma(representativePrice)}</PriceValue>
        <PriceText>원{isMultiplePrice && '~'}</PriceText>
      </div>
      {!!originalPrice ? (
        <SubPriceText>
          <span>{addComma(originalPrice)}원</span>
          <button type="button" onClick={handleClickPriceInformation}>
            <TooltipIcon />
          </button>
        </SubPriceText>
      ) : null}
      {legacyPromotion === 'NEWBIE' && newbieLimitDatetime && (
        <MemberCouponGuide>
          {getFormattedDate(newbieLimitDatetime, 'MM월 dd일 HH시 mm분')}까지 구매 가능{'\n'}
          {addComma(newbieMinPrice)}원 이상 결제 시 구매 가능
        </MemberCouponGuide>
      )}
    </>
  );
}
