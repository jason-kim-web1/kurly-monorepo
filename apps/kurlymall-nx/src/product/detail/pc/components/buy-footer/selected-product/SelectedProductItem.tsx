import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';

import { addComma } from '../../../../../../shared/services';
import { getSubPrice, PriceService } from '../../../../../service/priceService';

import { DealProduct, DirectOrderType } from '../../../../types';

import RemoveButton from './RemoveButton';
import useDealProduct from '../../../../hooks/useDealProduct';
import DealProductStepper from '../../../../shared/DealProductStepper';
import { getDealDisabledText } from '../../../../shared/utils/productDetailState';
import MembershipLabels from '../../../../../../shared/components/MembershipLabels/MembershipLabels';
import { useAppSelector } from '../../../../../../shared/store';
import PointBannerText from '../../../../../../shared/components/product/pointBannerText/PointBannerText';

const Container = styled.div`
  min-height: 50px;
  padding: 10px 0 10px 20px;
  background-color: ${COLOR.bgLightGray};
`;

const ProductNameSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProductNameWrapper = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 500px;
  margin-right: 40px;
`;

const ProductName = styled.span<{ disabled: boolean }>`
  line-height: 1.36;
  letter-spacing: -0.5px;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray800)};
  width: 500px;
  overflow-wrap: break-word;
`;

const PointBannerWrapper = styled.span`
  width: 320px;
  line-height: 1.33;
  letter-spacing: -0.3px;
  margin-top: 4px;
`;

const ProductSelectWrapper = styled.span`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const StepperWrapper = styled(DealProductStepper)`
  background-color: ${COLOR.kurlyWhite};
  margin-right: 19px;
`;

const PriceWrapper = styled.span<{ isDisplayRemove: boolean }>`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding-right: ${(props) => (props.isDisplayRemove ? '12px' : '20px')};
`;

const OriginPrice = styled.span<{ disabled: boolean }>`
  padding-top: 2px;
  text-decoration: line-through;
  line-height: 1.43;
  letter-spacing: -0.5px;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray400)};
`;

const DiscountedPrice = styled.span<{ disabled: boolean }>`
  padding-top: 2px;
  font-weight: bold;
  line-height: 1.43;
  letter-spacing: -0.5px;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray800)};
  margin-left: 6px;
`;

const MembershipLabelsWrapper = styled(MembershipLabels)`
  margin-bottom: 0;
`;

interface Props {
  dealProduct: DealProduct;
  isDisplayRemove?: boolean;
  directOrderType: DirectOrderType;
}

export default function SelectedProductItem({ dealProduct, isDisplayRemove = false, directOrderType }: Props) {
  const productNo = useAppSelector(({ productDetail }) => productDetail.no);
  const contentType = useAppSelector(({ productDetail }) => productDetail.contentType);
  const { deselect, changeQuantity } = useDealProduct(productNo, dealProduct, contentType);
  const { name, isSoldOut, isPurchaseStatus, retailPrice, basePrice, discountedPrice, membershipLabels, pointBanner } =
    dealProduct;
  const { representativePrice, kurlyPrice, originalPrice } = new PriceService({
    retailPrice,
    basePrice,
    discountedPrice,
  });
  const subPrice = getSubPrice({ originalPrice, kurlyPrice });
  const disabled = isSoldOut || !isPurchaseStatus;
  const disabledDealText = getDealDisabledText({ isPurchaseStatus, isSoldOut });

  const handleChangeQuantity = (nextQuantity: number) => changeQuantity(nextQuantity);

  return (
    <Container>
      <MembershipLabelsWrapper labels={membershipLabels} />
      <ProductNameSelectWrapper>
        <ProductNameWrapper>
          <ProductName disabled={disabled}>
            {disabledDealText ? `(${disabledDealText}) ` : null}
            {name}
          </ProductName>
          {pointBanner.isShow ? (
            <PointBannerWrapper>
              <PointBannerText pointBanner={pointBanner} disabled={disabled} />
            </PointBannerWrapper>
          ) : null}
        </ProductNameWrapper>
        <ProductSelectWrapper>
          {!disabled && (
            <StepperWrapper
              contentType={contentType}
              dealProduct={dealProduct}
              directOrderType={directOrderType}
              onChange={handleChangeQuantity}
            />
          )}
          <PriceWrapper isDisplayRemove={isDisplayRemove}>
            {!!subPrice && <OriginPrice disabled={disabled}>{addComma(subPrice)}원</OriginPrice>}
            <DiscountedPrice disabled={disabled}>{addComma(representativePrice)}원</DiscountedPrice>
            {isDisplayRemove && <RemoveButton onClick={deselect} />}
          </PriceWrapper>
        </ProductSelectWrapper>
      </ProductNameSelectWrapper>
    </Container>
  );
}
