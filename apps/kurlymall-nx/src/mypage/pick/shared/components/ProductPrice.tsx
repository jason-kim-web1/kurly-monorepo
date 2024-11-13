import { useCallback } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { PickProductExtend } from '../../../../shared/api';
import { addComma } from '../../../../shared/services';
import { isNotNull } from '../../../../shared/utils/lodash-extends';

const DiscountRate = styled.span`
  color: ${COLOR.pointText};
  font-weight: bold;
`;

const Price = styled.span`
  color: ${COLOR.kurlyGray800};
  font-weight: bold;
`;

const DiscountedPrice = styled.span<{ discountedPriceFontSize: number }>`
  color: ${COLOR.kurlyGray400};
  font-size: ${({ discountedPriceFontSize }) => discountedPriceFontSize}px;
  text-decoration: line-through;
`;

interface Props {
  product: PickProductExtend;
  discountedPriceFontSize?: number;
}

export default function ProductPrice({ product, discountedPriceFontSize = 12 }: Props) {
  const { discountRate, discountedPrice, salesPrice, isMultiplePrice, isUnavailable } = product;

  const ProductPriceText = useCallback(() => {
    const isDiscountedProduct = discountedPrice !== salesPrice && (discountRate > 0 || isNotNull(discountedPrice));

    if (isUnavailable) {
      return null;
    }

    if (isDiscountedProduct) {
      return (
        <>
          {discountRate > 0 && <DiscountRate>{discountRate}%</DiscountRate>}
          <Price>
            {discountedPrice !== null && addComma(discountedPrice)}원{isMultiplePrice && '~'}
          </Price>
          <DiscountedPrice discountedPriceFontSize={discountedPriceFontSize}>{addComma(salesPrice)}원</DiscountedPrice>
        </>
      );
    }

    return (
      <Price>
        {addComma(salesPrice)}원{isMultiplePrice && '~'}
      </Price>
    );
  }, [isUnavailable, discountRate, discountedPrice, discountedPriceFontSize, isMultiplePrice, salesPrice]);

  return <ProductPriceText />;
}
