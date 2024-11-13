import { useState } from 'react';
import styled from '@emotion/styled';

import { drop, isEmpty, take } from 'lodash';

import { format } from 'date-fns';

import { MemberOrderProduct } from '../../../../shared/types';
import InquiryOrderProduct from './InquiryOrderProduct';
import ShowMoreButton from '../../shared/ShowMoreButton';
import SlideToggleWrapper from '../../../../../../shared/components/motion/SlideToggleWrapper';
import KurlyNowTag from '../../../../../../shared/components/KurlyNowTag';
import { isKurlyNowOrder } from '../../../../../../shared/utils/order';
import { OrderType } from '../../../../../../shared/constant/order';

const Container = styled.div`
  width: 100%;
  margin-top: 14px;
  margin-bottom: 8px;
  + button {
    margin-bottom: 4px;
  }
`;

const OrderWrap = styled.div({});

const OrderDescription = styled.div`
  padding-bottom: 7px;
  display: flex;
  align-items: center;
`;

const TextBold = styled.span({
  color: '#333333',
  fontSize: 14,
  lineHeight: '18px',
  fontWeight: 'bold',
  letterSpacing: '-0.025em',
  marginRight: '6px',
});

const OrderNumberText = styled.span({
  color: '#999999',
  fontSize: 12,
  marginRight: '9px',
});

const ProductWarp = styled.div``;

const FoldArea = styled.div`
  text-align: center;
`;

const DEFAULT_PRODUCT_DISPLAY_COUNT = 3;

interface Props {
  products: MemberOrderProduct[];
  displayDeselectButton: boolean;
  onDeselectProduct(product: MemberOrderProduct): void;
  orderType: OrderType;
}

export default function SelectedOrderProducts({
  products,
  displayDeselectButton,
  onDeselectProduct,
  orderType,
}: Props) {
  const [folded, setFolded] = useState(true);

  const isOverLength = products.length > DEFAULT_PRODUCT_DISPLAY_COUNT;

  if (isEmpty(products)) {
    return null;
  }

  const handleDeselectProduct = (product: MemberOrderProduct) => () => {
    onDeselectProduct(product);
  };

  const handleClickShowMore = () => {
    setFolded(!folded);
  };

  const firstProduct = products[0];
  const { orderNo, orderedDatetime } = firstProduct;

  return (
    <Container>
      <OrderWrap>
        <OrderDescription>
          <TextBold>{format(new Date(orderedDatetime), 'yyyy.MM.dd')}</TextBold>
          <OrderNumberText>{`주문번호 ${orderNo}`}</OrderNumberText>
          {isKurlyNowOrder(orderType) && <KurlyNowTag />}
        </OrderDescription>
        <ProductWarp>
          {take(products, DEFAULT_PRODUCT_DISPLAY_COUNT).map((product) => (
            <InquiryOrderProduct
              key={product.dealProductNo}
              product={product}
              displayDeselectButton={displayDeselectButton}
              handleDeselected={handleDeselectProduct(product)}
            />
          ))}
          <SlideToggleWrapper opened={!folded}>
            {drop(products, DEFAULT_PRODUCT_DISPLAY_COUNT).map((product) => (
              <InquiryOrderProduct
                key={product.dealProductNo}
                product={product}
                displayDeselectButton={displayDeselectButton}
                handleDeselected={handleDeselectProduct(product)}
              />
            ))}
          </SlideToggleWrapper>
          {isOverLength && (
            <FoldArea>
              <ShowMoreButton onClick={handleClickShowMore} folded={folded} />
            </FoldArea>
          )}
        </ProductWarp>
      </OrderWrap>
    </Container>
  );
}
