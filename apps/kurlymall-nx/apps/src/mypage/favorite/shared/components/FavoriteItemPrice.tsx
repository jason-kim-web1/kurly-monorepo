import styled from '@emotion/styled';

import { useMemo } from 'react';

import COLOR from '../../../../shared/constant/colorset';
import { addComma } from '../../../../shared/services';
import { FavoriteProductExtend } from '../../../../shared/interfaces';
import { calculateProductPrices } from '../../../../order/cart/utils/calculateProductPrices';

const DiscountRate = styled.span`
  color: ${COLOR.pointText};
  font-weight: bold;
`;

const ProductPrice = styled.span`
  color: ${COLOR.kurlyGray800};
  font-weight: bold;
`;

const SellingPrice = styled.span<{ discountedPriceFontSize: number }>`
  color: ${COLOR.kurlyGray400};
  font-size: ${({ discountedPriceFontSize }) => discountedPriceFontSize}px;
  text-decoration: line-through;
`;

interface Props {
  productExtend: FavoriteProductExtend;
  discountedPriceFontSize?: number;
}

export default function FavoriteItemPrice({ productExtend, discountedPriceFontSize = 12 }: Props) {
  const { discountRate, retailPrice, discountPrice, productPrice } = productExtend;

  const { price, finalDiscountPrice } = calculateProductPrices({
    productPrice,
    retailPrice,
    discountPrice,
  });
  const isShowDiscountRate = useMemo(() => discountRate > 0, [discountRate]);

  if (finalDiscountPrice === 0) {
    return <ProductPrice>{addComma(price)}원</ProductPrice>;
  }

  return (
    <>
      {isShowDiscountRate && <DiscountRate>{discountRate}%</DiscountRate>}
      <ProductPrice aria-label="할인 가격">{addComma(price - finalDiscountPrice)}원</ProductPrice>
      <SellingPrice aria-label="판매 가격" discountedPriceFontSize={discountedPriceFontSize}>
        {addComma(price)}원
      </SellingPrice>
    </>
  );
}
