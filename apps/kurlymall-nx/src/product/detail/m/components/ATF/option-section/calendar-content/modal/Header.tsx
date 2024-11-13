import styled from '@emotion/styled';

import COLOR from '../../../../../../../../shared/constant/colorset';

import { addComma } from '../../../../../../../../shared/services';
import { PriceService } from '../../../../../../../service/priceService';
import { getDealDisabledText, getFormattedDate } from '../../../../../../shared/utils/productDetailState';

import { NoMainImageLogo } from '../../../../../../../../shared/images';

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  border-radius: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
`;

const Thumbnail = styled.div<{ imageUrl: string; disabled: boolean }>`
  flex: 0 0 50px;
  height: 50px;
  border-radius: 4px;
  background: url(${({ imageUrl }) => imageUrl}), url(${NoMainImageLogo}) no-repeat 50% 50%;
  background-size: cover, contain;
  background-color: ${COLOR.kurlyGray150};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

const ProductDescription = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  margin: 0 0 0 14px;
  line-height: 19px;
`;

const NameText = styled.p<{ disabled: boolean }>`
  overflow: hidden;
  width: 100%;
  font-size: 14px;
  line-height: 19px;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray800)};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PriceWrapper = styled.div`
  margin-top: 4px;
  line-height: 19px;
`;

const DiscountPercent = styled.span<{ disabled: boolean }>`
  padding-right: 4px;
  font-weight: bold;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.pointText)};
  line-height: 19px;
`;

const PriceValue = styled.span<{ disabled: boolean }>`
  padding-right: 4px;
  font-weight: bold;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray800)};
  line-height: 19px;
`;

const OriginPrice = styled.span<{ disabled: boolean }>`
  padding-right: 1px;
  font-size: 13px;
  line-height: 21px;
  text-decoration: line-through;
  color: ${({ disabled }) => (disabled ? COLOR.kurlyGray350 : COLOR.kurlyGray400)};
`;

interface Props {
  selectedOption: {
    description: string[];
    contentsProductNo?: number;
    imageUrl?: string;
    isSoldOut?: boolean;
    isPurchaseStatus?: boolean;
    prices?: {
      retailPrice: number;
      basePrice: number;
      discountedPrice: number;
      discountedRate: number;
    };
  };
}

export default function Header({ selectedOption }: Props) {
  const { description, imageUrl, prices, isSoldOut, isPurchaseStatus } = selectedOption;

  const { representativePrice, kurlyPrice, originalPrice } = new PriceService({
    retailPrice: prices?.retailPrice ?? null,
    basePrice: prices?.basePrice ?? 0,
    discountedPrice: prices?.discountedPrice ?? null,
  });

  const notSalePrice = (originalPrice ? originalPrice : kurlyPrice) ?? 0;

  const productName = description.map((it) => getFormattedDate(it ?? '', 'yyyy.MM.dd')).join(' ');

  const disabledText = getDealDisabledText({
    isPurchaseStatus: isPurchaseStatus ?? true,
    isSoldOut: isSoldOut ?? false,
  });

  const disabled = (isSoldOut ?? false) || !(isPurchaseStatus ?? true);

  return (
    <Container>
      <ProductInfo>
        <Thumbnail imageUrl={imageUrl ?? ''} disabled={disabled} />
        <ProductDescription>
          <NameText disabled={disabled}>
            {disabledText && `(${disabledText})`}
            {productName}
          </NameText>
          <PriceWrapper>
            {!!prices?.discountedRate && (
              <DiscountPercent disabled={disabled}>{prices?.discountedRate}%</DiscountPercent>
            )}
            <PriceValue disabled={disabled}>{addComma(representativePrice)}원</PriceValue>
            {!!notSalePrice && <OriginPrice disabled={disabled}>{addComma(notSalePrice)}원</OriginPrice>}
          </PriceWrapper>
        </ProductDescription>
      </ProductInfo>
    </Container>
  );
}
