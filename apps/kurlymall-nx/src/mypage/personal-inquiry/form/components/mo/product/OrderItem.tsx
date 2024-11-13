import styled from '@emotion/styled';

import { useState } from 'react';

import { drop, take } from 'lodash';

import ProductItem from './ProductItem';
import Checkbox from '../../../../../../shared/components/Input/Checkbox';
import { MemberOrder } from '../../../../shared/types';
import useOrderItem from '../../../../hook/useOrderItem';
import ArrowMore from '../../../../icons/ArrowMore';
import MoreOrFoldButton from '../../../../shared/components/MoreOrFoldButton';
import SlideToggleWrapper from '../../../../../../shared/components/motion/SlideToggleWrapper';
import OrderDateNumber from './OrderDateNumber';

const Container = styled.div({
  backgroundColor: 'white',
  marginBottom: '.5rem',
  padding: '.3rem 1.25rem',
});

const OrderContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderBottom: 'none',
  padding: '.4rem 0',
});

const OrderInfo = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const CheckboxWrap = styled.div({
  marginRight: '.25rem',
});

const ProductsContainer = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const MoreOrFoldButtonWrap = styled.div`
  margin: 0.8rem 0;
`;

const DEFAULT_PRODUCT_DISPLAY_COUNT = 3;

interface Props {
  order: MemberOrder;
}

const OrderItem = ({ order }: Props) => {
  const [folded, setFolded] = useState(true);

  const { toggleSelect, toggleFold } = useOrderItem(order);

  const handleClickShowMore = () => {
    setFolded(!folded);
  };

  const firstProduct = order.products[0];

  if (!firstProduct) {
    // 상품이 없는 주문은 있을 수 없다
    return null;
  }

  return (
    <Container>
      <OrderContainer>
        <CheckboxWrap>
          <Checkbox label="" checked={order.selected} onChange={toggleSelect} />
        </CheckboxWrap>
        <OrderInfo onClick={toggleFold}>
          <OrderDateNumber
            orderNo={order.orderNo}
            orderType={order.orderType}
            orderedDatetime={firstProduct.orderedDatetime}
          />
          <ArrowMore direction={order.folded ? 'down' : 'up'} />
        </OrderInfo>
      </OrderContainer>
      <SlideToggleWrapper opened={!order.folded}>
        {!order.folded && (
          <ProductsContainer>
            {take(order.products, DEFAULT_PRODUCT_DISPLAY_COUNT).map((product) => (
              <ProductItem key={`product-${product.dealProductNo}`} product={product} />
            ))}
            <SlideToggleWrapper opened={!folded}>
              {drop(order.products, DEFAULT_PRODUCT_DISPLAY_COUNT).map((product) => (
                <ProductItem key={`product-${product.dealProductNo}`} product={product} />
              ))}
            </SlideToggleWrapper>
            {order.products.length > DEFAULT_PRODUCT_DISPLAY_COUNT && (
              <MoreOrFoldButtonWrap>
                <MoreOrFoldButton folded={folded} onClickMore={handleClickShowMore} />
              </MoreOrFoldButtonWrap>
            )}
          </ProductsContainer>
        )}
      </SlideToggleWrapper>
    </Container>
  );
};

export default OrderItem;
