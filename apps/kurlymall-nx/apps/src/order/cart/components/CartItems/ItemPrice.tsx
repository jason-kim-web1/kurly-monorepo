import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Typography } from '@thefarmersfront/kpds-react';

import { addComma } from '../../../../shared/services';
import { calculateProductPrices } from '../../utils/calculateProductPrices';
import { multiMaxLineText } from '../../../../shared/utils';

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Price = styled(Typography)`
  color: ${vars.color.text.$primary};
  word-break: keep-all;
`;

const DiscountPrice = styled(Typography)`
  color: ${vars.color.text.$disabled};
  text-decoration: line-through;
  margin-left: ${vars.spacing.$4};
  ${multiMaxLineText(1)};
`;

const NotEnoughStockText = styled(Typography)`
  color: ${vars.color.main.$danger};
  margin-top: ${vars.spacing.$4};
`;

interface ItemPriceProps {
  productPrice: number;
  retailPrice: number;
  discountPrice: number;
  quantity: number;
  isNotEnoughStock: boolean;
}

export default function ItemPrice({ isNotEnoughStock, quantity, ...props }: ItemPriceProps) {
  const { price, finalDiscountPrice } = calculateProductPrices(props);

  return (
    <>
      <PriceWrapper>
        <Price variant={`$xlargeBold`}>{addComma((price - finalDiscountPrice) * quantity)}원</Price>
        {finalDiscountPrice > 0 && (
          <DiscountPrice variant={`$mediumRegular`}>{addComma(price * quantity)}원</DiscountPrice>
        )}
      </PriceWrapper>
      {isNotEnoughStock && <NotEnoughStockText variant={`$smallRegular`}>재고 5개 미만</NotEnoughStockText>}
    </>
  );
}
