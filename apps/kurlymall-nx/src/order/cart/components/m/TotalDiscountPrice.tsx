import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Typography } from '@thefarmersfront/kpds-react';

import { addComma } from '../../../../shared/services';
import { totalPriceSelector } from '../../store/cart';
import { useAppSelector } from '../../../../shared/store';
import useCartDetail from '../../hooks/useCartDetail';

const Wrapper = styled(Typography)`
  color: ${vars.color.text.$tertiary};
  margin-bottom: ${vars.spacing.$8};
  text-align: center;
`;

const Price = styled(Typography)`
  color: ${vars.color.main.$tertiary};
`;

export default function TotalDiscountPrice() {
  const { discountPrice } = useAppSelector(totalPriceSelector);
  const { isCartEmpty } = useCartDetail();

  if (isCartEmpty || discountPrice === 0) {
    return null;
  }

  return (
    <Wrapper variant={'$mediumSemibold'}>
      {`총 할인 금액 `}
      <Price variant={'$largeSemibold'} as={'span'}>
        {addComma(discountPrice)}원
      </Price>
    </Wrapper>
  );
}
