import styled from '@emotion/styled';

import { addComma } from '../../../../../shared/services';

import COLOR from '../../../../../shared/constant/colorset';
import { useAppSelector } from '../../../../../shared/store';
import { selectCurrentTotalPrice } from '../../../selectors';

const Container = styled.div`
  letter-spacing: -0.5px;
`;

const ProductPriceWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ProductPriceDescription = styled.span`
  padding-right: 12px;
  font-size: 13px;
  font-weight: 500;
  color: ${COLOR.kurlyGray800};
  line-height: 20px;
`;

const ProductPrice = styled.span`
  font-weight: bold;
  font-size: 32px;
  color: ${COLOR.kurlyGray800};
  line-height: 36px;
`;

const ProductPriceUnit = styled.span`
  padding-left: 5px;
  font-size: 20px;
  font-weight: 600;
  color: ${COLOR.kurlyGray800};
  line-height: 30px;
`;

export default function ProductBuyPrice() {
  const totalPrice = useAppSelector(selectCurrentTotalPrice);

  return (
    <Container>
      <ProductPriceWrapper>
        <ProductPriceDescription>총 상품금액 :</ProductPriceDescription>
        <ProductPrice>{addComma(totalPrice)}</ProductPrice>
        <ProductPriceUnit>원</ProductPriceUnit>
      </ProductPriceWrapper>
    </Container>
  );
}
