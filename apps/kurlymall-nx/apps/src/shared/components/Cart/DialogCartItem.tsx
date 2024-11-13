import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';
import StepperButton from '../Button/StepperButton';
import { DealProduct } from '../../../mypage/order/shared/interfaces';
import { getDealDisabledText } from '../../../product/detail/shared/utils/productDetailState';
import { addComma } from '../../services';
import { getSubPrice, PriceService } from '../../../product/service/priceService';
import { multiMaxLineText } from '../../utils';
import MembershipLabels from '../MembershipLabels/MembershipLabels';
import PointBannerText from '../product/pointBannerText/PointBannerText';

const Container = styled.div`
  padding: 12px 0;
  border-radius: 3px;
  border-bottom: 1px solid ${COLOR.bg};
`;

const NameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.span<{ disabled: boolean }>`
  font-size: 14px;
  line-height: 19px;
  word-break: break-word;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray800)};
  ${multiMaxLineText(2)};
`;

const PointBannerWrapper = styled.div`
  margin-top: 2px;
  line-height: 1.33;
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 5px;
`;

const PriceWrapper = styled.div`
  padding-top: 3px;
`;

const Price = styled.span<{ disabled: boolean }>`
  font-weight: bold;
  font-size: 14px;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray800)};
  line-height: 19px;
`;

const BasePrice = styled.span<{ disabled: boolean }>`
  margin-left: 4px;
  font-weight: normal;
  font-size: 12px;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray400)};
  text-decoration: line-through;
  line-height: 16px;
  letter-spacing: -0.5px;
`;

const CartStepperButton = styled(StepperButton)`
  display: flex;
  justify-content: center;
  width: 88px;
  height: 30px;
`;

interface Props {
  deal: DealProduct;
  quantity: number;
  isMultiProduct: boolean;
  onChangeBuyUnit(productNo: number): (newBuyUnit: number) => void;
}

export default function DialogCartItem({ deal, quantity, onChangeBuyUnit, isMultiProduct }: Props) {
  const {
    no,
    name,
    basePrice,
    discountedPrice,
    isPurchaseStatus,
    isSoldOut,
    minEa,
    retailPrice,
    buyUnit,
    membershipLabels,
    pointBanner,
  } = deal;

  const { representativePrice, kurlyPrice, originalPrice } = new PriceService({
    retailPrice,
    basePrice,
    discountedPrice,
  });

  const subPrice = getSubPrice({ originalPrice, kurlyPrice });

  const disabled = !isPurchaseStatus || isSoldOut;
  const dealDisabledState = getDealDisabledText({
    isPurchaseStatus,
    isSoldOut,
  });
  const minusDisableQuantity = isMultiProduct ? 0 : minEa;

  return (
    <Container>
      <MembershipLabels labels={membershipLabels} />
      <NameWrapper>
        <Name disabled={disabled}>
          {dealDisabledState && `(${dealDisabledState}) `}
          {name}
        </Name>
      </NameWrapper>
      {pointBanner.isShow ? (
        <PointBannerWrapper>
          <PointBannerText pointBanner={pointBanner} disabled={disabled} />
        </PointBannerWrapper>
      ) : null}
      <Option>
        <PriceWrapper>
          <Price disabled={disabled}>{addComma(representativePrice)}원</Price>
          {!!subPrice && <BasePrice disabled={disabled}>{addComma(subPrice)}원</BasePrice>}
        </PriceWrapper>
        {!disabled && (
          <CartStepperButton
            count={quantity}
            unit={buyUnit}
            minusDisabled={quantity <= minusDisableQuantity || disabled}
            plusDisabled={disabled}
            onChange={onChangeBuyUnit(no)}
          />
        )}
      </Option>
    </Container>
  );
}
